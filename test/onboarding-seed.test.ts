import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { parse } from 'yaml'
import {
  WELCOME_NOTICE_VERSION,
  ensureWelcomeNoticeAcknowledged,
  settingsYamlPath
} from '../src/main/state/onboarding-seed'

const homes: string[] = []
const silent = (): void => undefined

afterEach(async () => {
  await Promise.all(homes.splice(0).map((home) => rm(home, { recursive: true, force: true })))
})

async function freshHome(settings?: string): Promise<string> {
  const home = await mkdtemp(join(tmpdir(), 'dsh-onboarding-'))
  homes.push(home)
  await mkdir(home, { recursive: true })
  if (settings !== undefined) await writeFile(settingsYamlPath(home), settings)
  return home
}

describe('welcome notice seeding', () => {
  it('acknowledges the notice on an install that never ran', async () => {
    const home = await freshHome()
    const notes: string[] = []

    expect(ensureWelcomeNoticeAcknowledged({ dshHome: home, note: (line) => notes.push(line) })).toBe(true)

    const settings = parse(await readFile(settingsYamlPath(home), 'utf8')) as Record<string, unknown>
    expect(settings['ui-onboarding']).toEqual({ welcomeNoticeVersion: WELCOME_NOTICE_VERSION })
    expect(notes.some((line) => line.includes(WELCOME_NOTICE_VERSION))).toBe(true)
  })

  it('keeps every other setting and namespace', async () => {
    const home = await freshHome(
      ['ui-theme:', '  preference: dark', 'llm-deepseek: {}', 'ui-onboarding:', '  somethingElse: keep-me', ''].join('\n')
    )

    expect(ensureWelcomeNoticeAcknowledged({ dshHome: home, note: silent })).toBe(true)

    const settings = parse(await readFile(settingsYamlPath(home), 'utf8')) as Record<string, unknown>
    expect(settings['ui-theme']).toEqual({ preference: 'dark' })
    expect(settings['llm-deepseek']).toEqual({})
    expect(settings['ui-onboarding']).toEqual({
      somethingElse: 'keep-me',
      welcomeNoticeVersion: WELCOME_NOTICE_VERSION
    })
  })

  it('is a no-op once the notice is acknowledged', async () => {
    const home = await freshHome(`ui-onboarding:\n  welcomeNoticeVersion: ${WELCOME_NOTICE_VERSION}\n`)
    const before = await readFile(settingsYamlPath(home), 'utf8')

    expect(ensureWelcomeNoticeAcknowledged({ dshHome: home, note: silent })).toBe(false)
    expect(await readFile(settingsYamlPath(home), 'utf8')).toBe(before)
  })

  it('leaves an unreadable settings file to the Harness recovery', async () => {
    const home = await freshHome('ui-theme: [unclosed\n')
    const notes: string[] = []

    expect(ensureWelcomeNoticeAcknowledged({ dshHome: home, note: (line) => notes.push(line) })).toBe(false)
    expect(await readFile(settingsYamlPath(home), 'utf8')).toBe('ui-theme: [unclosed\n')
    expect(notes.some((line) => line.includes('unreadable'))).toBe(true)
  })

  it('mirrors the notice version the bundled Harness ships', async () => {
    const client = join(
      'node_modules',
      '@deepseek-ai',
      'dsh-client-ui-settings-models',
      'lib',
      'client.js'
    )
    // A development checkout without an install cannot answer this; the packaged
    // build always can, and that is the build that matters here.
    if (!existsSync(client)) return

    const source = await readFile(client, 'utf8')
    const declared = /WELCOME_NOTICE_VERSION\s*=\s*"([^"]+)"/u.exec(source)?.[1]
    expect(declared).toBe(WELCOME_NOTICE_VERSION)
  })
})
