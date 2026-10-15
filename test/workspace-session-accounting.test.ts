import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Context } from '@deepseek-ai/cordis'
import { SessionId } from '@deepseek-ai/dsh-session'
import Storage from '@deepseek-ai/dsh-storage'
import * as StorageDomain from '@deepseek-ai/dsh-storage-domain'
import * as StorageJson from '@deepseek-ai/dsh-storage-json'
import Workspace, { WorkspaceId, realpathNormalize } from '@deepseek-ai/dsh-workspace'
import { describe, expect, it } from 'vitest'

// One session may be accounted by exactly one workspace. The registry enforces
// that before anything else on startup and cannot repair it afterwards, so the
// add-only `attachSession` used to turn a stale membership into a state that
// refuses to boot. These tests drive the real registry over a real storage
// domain file: the drift is tolerated and hidden, attaching the session to the
// workspace that owns its cwd moves the accounting, and two owners never start.
//
// The boot mirrors the Harness profile: `storage` hub, the `json` backend and
// the `storage-domain` facility over the same `{ backend: 'json' }` config the
// shipped `dsh-base/cordis.patch.yml` uses.

// The registry service is typed by the package's own declaration merging, so
// the tests use `ctx.workspaceRegistry` directly.

interface SessionHeader {
  id: string
  cwd: string
  createdAt: number
}

interface Booted {
  ctx: Context
  dispose(): Promise<void>
}

function domainFile(records: Array<{ id: string; path: string; sessionIds: string[] }>): string {
  const createdAt = '2026-10-01T00:00:00.000Z'
  return JSON.stringify({
    unit: { name: 'workspace', version: 2 },
    global: {
      initialized: true,
      workspaceIds: records.map((record) => record.id),
      archivedSessionIds: [],
      pinnedSessionIds: []
    },
    tables: {
      workspaces: Object.fromEntries(records.map((record) => [
        record.id,
        {
          path: record.path,
          title: path.win32.basename(record.path) || path.posix.basename(record.path),
          sessionIds: record.sessionIds,
          createdAt,
          updatedAt: createdAt
        }
      ]))
    }
  }, null, 2)
}

async function storedSessionIds(storages: string): Promise<Record<string, string[]>> {
  const file = JSON.parse(await readFile(path.join(storages, 'workspace.json'), 'utf8'))
  return Object.fromEntries(
    Object.entries(file.tables.workspaces as Record<string, { sessionIds: string[] }>)
      .map(([id, record]) => [id, record.sessionIds])
  )
}

async function boot(storages: string, headers: SessionHeader[]): Promise<Booted> {
  const ctx = new Context()
  const fibers: Array<{ dispose(): Promise<void> }> = []
  try {
    fibers.push(await ctx.plugin(Storage))
    fibers.push(await ctx.plugin(StorageJson, { root: storages }))
    fibers.push(await ctx.plugin(StorageDomain, { backend: 'json' }))
    // The registry reads stored session headers through persistence only; the
    // fixture keeps them in memory so session files stay out of this test.
    ctx.provide('sessionPersistence', { list: async () => headers.map((header) => ({ header })) })
    fibers.push(await ctx.plugin(Workspace))
  } catch (error) {
    for (const fiber of fibers.reverse()) await fiber.dispose()
    throw error
  }
  return {
    ctx,
    dispose: async () => {
      for (const fiber of fibers.reverse()) await fiber.dispose()
    }
  }
}

interface FixtureRecord {
  id: string
  folder: string
  sessionIds: string[]
}

async function fixture(session: string, records: FixtureRecord[]) {
  const base = await mkdtemp(path.join(tmpdir(), 'dsh-desktop-workspace-accounting-'))
  const storages = path.join(base, 'storages')
  await mkdir(storages)
  const canonical: Record<string, string> = {}
  for (const record of records) {
    const folder = path.join(base, record.folder)
    await mkdir(folder)
    canonical[record.id] = await realpathNormalize(folder)
  }
  await writeFile(
    path.join(storages, 'workspace.json'),
    domainFile(records.map((record) => ({ id: record.id, path: canonical[record.id]!, sessionIds: record.sessionIds }))),
    'utf8'
  )
  return { base, storages, header: { id: session, cwd: canonical['ws-b']!, createdAt: 1 } }
}

describe('workspace session accounting', () => {
  it('moves a session to the workspace that owns its cwd instead of adding a second owner', async () => {
    const session = 'session-accounting-drift'
    const { base, storages, header } = await fixture(session, [
      { id: 'ws-a', folder: 'project-a', sessionIds: [session] },
      { id: 'ws-b', folder: 'project-b', sessionIds: [] }
    ])
    let reopened: Booted | undefined
    const first = await boot(storages, [header])
    try {
      // The stale membership is tolerated, and the folder it no longer belongs
      // to stops showing the session — which is what lets the app reach the
      // attach that used to duplicate the accounting.
      expect(first.ctx.workspaceRegistry.get(WorkspaceId('ws-a'))!.sessionIds).not.toContain(session)

      await first.ctx.workspaceRegistry.get(WorkspaceId('ws-b'))!.attachSession(SessionId(session))
    } finally {
      await first.dispose()
    }

    try {
      expect(await storedSessionIds(storages)).toMatchObject({ 'ws-a': [], 'ws-b': [session] })

      // The next launch is the one that used to fail: the same file now passes
      // the invariant the registry validates before anything else.
      reopened = await boot(storages, [header])
      expect(reopened.ctx.workspaceRegistry.get(WorkspaceId('ws-b'))!.sessionIds).toContain(session)
    } finally {
      await reopened?.dispose()
      await rm(base, { recursive: true, force: true })
    }
  })

  it('never starts when one session is accounted by two workspaces', async () => {
    const session = 'session-accounting-drift'
    const { base, storages, header } = await fixture(session, [
      { id: 'ws-a', folder: 'project-a', sessionIds: [session] },
      { id: 'ws-b', folder: 'project-b', sessionIds: [session] }
    ])
    try {
      // The customer's screen: the registry never comes up, so every dependent
      // plugin stays pending, and the reported reason is the duplicate.
      await expect(boot(storages, [header])).rejects.toThrow(/accounted by both/)
    } finally {
      await rm(base, { recursive: true, force: true })
    }
  })
})
