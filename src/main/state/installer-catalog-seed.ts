import { existsSync, mkdirSync, cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { basename, dirname, join } from 'node:path'
import { parse, stringify } from 'yaml'
import {
  installGeneration,
  type GenerationInstallResult
} from 'dsh-desktop-market-installer/generations/installer'
import { projectGenerations } from 'dsh-desktop-market-installer/generations/projection'
import {
  SHARED_TREE_ONLY,
  listGenerations,
  readDesired,
  withRegistryLock,
  writeDesired
} from 'dsh-desktop-market-installer/generations/registry'

export const CATALOG_STAMP_NAME = '.desktop-catalog-applied'
export const MCP_CLIENT_PACKAGE = '@deepseek-ai/dsh-mcp-client'
/**
 * Where a `kind: payload` tree lands. A payload is a content bundle the
 * desktop delivers but does not consume itself: it is seeded once, beside the
 * skills, and the component that owns it (a plugin) unpacks it into a project
 * on demand. The manifest inside names the revision so a consumer can report
 * and pin the exact ruleset it deployed.
 */
export const PAYLOAD_HOME_DIR = '1c-rules'
export const PAYLOAD_MANIFEST_NAME = 'payload.json'

export type CatalogItemKind = 'plugin' | 'mcp' | 'skill' | 'rules' | 'payload'

export interface CatalogItem {
  kind: CatalogItemKind
  id: string
  label: string
  name?: string
  version?: string
  file?: string
  digest?: string
  path?: string
  transport?: 'stdio' | 'streamable-http'
  command?: string
  args?: string[]
  url?: string
  connector?: string
}

export interface CatalogManifest {
  name: string
  version: string
  id: string
  items: CatalogItem[]
}

export type CatalogSeedOutcome = 'applied' | 'skipped' | 'missing' | 'deferred'

type Note = (line: string) => void

export interface SeedInstallPluginOptions {
  dshHome: string
  pluginSpec: string
  expectedPluginName?: string
  nodeExecutablePath: string
  pnpmEntryPath: string
  hostNodeModulesPath?: string
  offline?: boolean
}

export interface InstallerCatalogSeedOptions {
  dshHome: string
  catalogRoot: string
  /** Desktop app version; included in the stamp so an app update re-seeds. */
  appVersion?: string
  nodeExecutablePath?: string
  pnpmEntryPath?: string
  hostNodeModulesPath?: string
  installPlugin?: (options: SeedInstallPluginOptions) => Promise<GenerationInstallResult>
  /**
   * Install a shared-tree catalog package (the market) into the Profile. Such a
   * package is never resolved from a generation, so seeding one would leave a
   * pointer that startup demotes.
   */
  installSharedTreeMarket?: (options: {
    item: CatalogItem
    tarball: string
    version: string
  }) => Promise<void>
  note: Note
}

export function catalogStampPath(dshHome: string): string {
  return join(dshHome, CATALOG_STAMP_NAME)
}

export function catalogManifestPath(catalogRoot: string): string {
  return join(catalogRoot, 'manifest.json')
}

export function readCatalogManifest(catalogRoot: string): CatalogManifest | undefined {
  const file = catalogManifestPath(catalogRoot)
  if (!existsSync(file)) return undefined
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as Partial<CatalogManifest>
  if (typeof parsed.name !== 'string' || !Array.isArray(parsed.items)) return undefined
  return {
    name: parsed.name,
    version: typeof parsed.version === 'string' ? parsed.version : '0.0.0',
    id: typeof parsed.id === 'string' ? parsed.id : parsed.name,
    items: parsed.items
  }
}

export function catalogFingerprint(manifest: CatalogManifest, appVersion = ''): string {
  const items = [...manifest.items]
    .map((item) =>
      [item.kind, item.id, item.version ?? '', item.file ?? item.path ?? '', item.digest ?? ''].join(':')
    )
    .sort()
    .join(';')
  const catalog = `${manifest.id}@${manifest.version}|${items}`
  return appVersion === '' ? `${catalog}\n` : `${appVersion}|${catalog}\n`
}

function readStamp(dshHome: string): string | undefined {
  const stamp = catalogStampPath(dshHome)
  if (!existsSync(stamp)) return undefined
  return readFileSync(stamp, 'utf8')
}

async function installCatalogPlugin(
  options: InstallerCatalogSeedOptions,
  item: CatalogItem,
  tarball: string
): Promise<void> {
  const nodeExecutablePath = options.nodeExecutablePath
  const pnpmEntryPath = options.pnpmEntryPath
  if (!nodeExecutablePath || !pnpmEntryPath) {
    throw new Error(`cannot install catalog plugin ${item.id}: bundled Node/pnpm paths are missing`)
  }
  const pluginSpec = `file:${tarball}`
  const install = options.installPlugin
    ?? ((request) =>
      installGeneration({
        dshHome: request.dshHome,
        pluginSpec: request.pluginSpec,
        expectedPluginName: request.expectedPluginName,
        sourceSpec: request.pluginSpec,
        nodeExecutablePath: request.nodeExecutablePath,
        pnpmEntryPath: request.pnpmEntryPath,
        hostNodeModulesPath: request.hostNodeModulesPath,
        offline: true
      }))

  await withRegistryLock(options.dshHome, async () => {
    const result = await install({
      dshHome: options.dshHome,
      pluginSpec,
      expectedPluginName: item.name,
      nodeExecutablePath,
      pnpmEntryPath,
      hostNodeModulesPath: options.hostNodeModulesPath,
      offline: true
    })
    if (!result.ok || !result.generation) {
      throw new Error(result.detail ?? `generation install failed for ${item.id}`)
    }
    const [desired, generations] = await Promise.all([
      readDesired(options.dshHome),
      listGenerations(options.dshHome)
    ])
    const byId = new Map(generations.map((generation) => [generation.id, generation]))
    // Drop every generation of this catalog plugin (newer, older, or same)
    // and keep every other plugin — including ones the user installed later.
    const kept = desired.filter((id) => {
      const generation = byId.get(id)
      return generation === undefined || generation.pluginName !== result.generation!.pluginName
    })
    await writeDesired(options.dshHome, [...kept, result.generation.id])
    await projectGenerations(options.dshHome)
  })
}

function extractTarball(archive: string, destination: string): string {
  mkdirSync(destination, { recursive: true })
  const result = spawnSync('tar', ['-xf', archive, '-C', destination], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`failed to extract ${archive}: ${(result.stderr || result.stdout || '').trim()}`)
  }
  const packageDir = join(destination, 'package')
  return existsSync(packageDir) ? packageDir : destination
}

function resolveMcpEntry(extracted: string): string | undefined {
  const manifestPath = join(extracted, 'package.json')
  if (!existsSync(manifestPath)) return undefined
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
    bin?: string | Record<string, string>
    main?: string
  }
  if (typeof manifest.bin === 'string') return join(extracted, manifest.bin)
  if (manifest.bin && typeof manifest.bin === 'object') {
    const first = Object.values(manifest.bin)[0]
    if (typeof first === 'string') return join(extracted, first)
  }
  if (typeof manifest.main === 'string') return join(extracted, manifest.main)
  return undefined
}

function homeCordisPatchPath(dshHome: string): string {
  return join(dshHome, 'cordis.patch.yml')
}

function profileCordisPatchPath(dshHome: string): string {
  return join(dshHome, 'profiles', 'web', 'cordis.patch.yml')
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

/**
 * Merge one MCP server into a cordis patch document.
 * Existing server ids win unless `replace` is set (installer catalog always
 * replaces its own ids and leaves every other server untouched).
 */
export function mergeMcpServerIntoPatch(
  text: string,
  serverId: string,
  server: Record<string, unknown>,
  options?: { replace?: boolean }
): { text: string; added: boolean; changed: boolean } {
  let rows: unknown[]
  try {
    const parsed = parse(text)
    rows = Array.isArray(parsed) ? parsed : []
  } catch {
    rows = []
  }

  let target = rows.find((row) => asRecord(row)?.name === MCP_CLIENT_PACKAGE) as
    | Record<string, unknown>
    | undefined
  if (target === undefined) {
    target = { name: MCP_CLIENT_PACKAGE, config: { servers: {} } }
    rows.push(target)
  }
  const config = asRecord(target.config) ?? {}
  target.config = config
  const servers = asRecord(config.servers) ?? {}
  config.servers = servers
  if (servers[serverId] !== undefined && options?.replace !== true) {
    return { text, added: false, changed: false }
  }
  const existed = servers[serverId] !== undefined
  servers[serverId] = server
  return { text: `${stringify(rows)}\n`, added: !existed, changed: true }
}

function writeMcpPatch(
  filePath: string,
  serverId: string,
  server: Record<string, unknown>,
  note: Note,
  replace = false
): void {
  const existing = existsSync(filePath) ? readFileSync(filePath, 'utf8') : '[]\n'
  const merged = mergeMcpServerIntoPatch(existing, serverId, server, { replace })
  if (!merged.changed) {
    note(`[desktop] catalog MCP ${serverId} already present in ${basename(filePath)}`)
    return
  }
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, merged.text, 'utf8')
}

function applyRulesFile(dshHome: string, sourceFile: string, note: Note): void {
  const name = basename(sourceFile)
  if (name.endsWith('.yml') || name.endsWith('.yaml')) {
    // cordis.patch.yml also holds user MCP servers that are not in the catalog.
    // Seed it only when missing; catalog MCP ids are merged separately.
    const dest = homeCordisPatchPath(dshHome)
    if (existsSync(dest)) {
      note('[desktop] catalog rules left existing cordis.patch.yml untouched')
      return
    }
    cpSync(sourceFile, dest)
    note('[desktop] catalog seeded cordis.patch.yml')
    return
  }
  const dest = join(dshHome, 'AGENTS.md')
  const existed = existsSync(dest)
  cpSync(sourceFile, dest)
  note(
    existed
      ? '[desktop] catalog overwrote AGENTS.md'
      : '[desktop] catalog seeded AGENTS.md'
  )
}

/**
 * Copy a flavor catalog into `$DSH_HOME` when the stamp is missing or the
 * fingerprint changed (catalog items/digests or desktop app version). A matching
 * stamp is a no-op so ordinary launches do not reinstall. When the seed does
 * run, every catalog item is forced from the bundled copy — including a
 * downgrade — and plugins/skills/MCP the user added later are left alone.
 */
/**
 * Seed a shared-tree catalog package. Returns whether it reached the Profile;
 * the caller keeps the stamp unwritten when it did not, so the next launch
 * retries the catalog instead of leaving the market silently missing.
 */
async function installCatalogMarketItem(
  options: InstallerCatalogSeedOptions,
  item: CatalogItem,
  tarball: string
): Promise<boolean> {
  const pluginName = item.name ?? item.id
  const install = options.installSharedTreeMarket
  if (install === undefined) {
    options.note(`[desktop] catalog market ${pluginName} needs the shared-tree installer; deferred`)
    return false
  }
  if (item.version === undefined || item.version === '') {
    throw new Error(`catalog market ${item.id} is missing a version`)
  }
  try {
    await install({ item, tarball, version: item.version })
    options.note(`[desktop] catalog installed market ${pluginName} into the shared profile tree`)
    return true
  } catch (error) {
    options.note(
      `[desktop] catalog market ${pluginName} install failed: ${error instanceof Error ? error.message : String(error)}`
    )
    return false
  }
}

/**
 * The catalog's shared-tree package (the market), when it vendors one. The market
 * baseline step installs from this copy instead of the registry, so a machine
 * without registry access can still reach a verified market.
 * @param catalogRoot
 */
export function resolveCatalogMarketPackage(
  catalogRoot: string
): { version: string; tarball: string } | undefined {
  const manifest = readCatalogManifest(catalogRoot)
  if (manifest === undefined) return undefined
  for (const item of manifest.items) {
    if (item.kind !== 'plugin') continue
    const name = item.name ?? item.id
    if (!SHARED_TREE_ONLY.has(name)) continue
    if (item.file === undefined || item.version === undefined || item.version === '') continue
    const tarball = join(catalogRoot, item.file)
    if (!existsSync(tarball)) continue
    return { version: item.version, tarball }
  }
  return undefined
}
export async function applyInstallerCatalogSeed(
  options: InstallerCatalogSeedOptions
): Promise<CatalogSeedOutcome> {
  const manifest = readCatalogManifest(options.catalogRoot)
  if (manifest === undefined) return 'missing'

  const fingerprint = catalogFingerprint(manifest, options.appVersion)
  const previous = readStamp(options.dshHome)
  if (previous === fingerprint) return 'skipped'

  const upgrading = previous !== undefined

  let marketDeferred = false

  for (const item of manifest.items) {
    if (item.kind === 'plugin') {
      const pluginName = item.name ?? item.id
      if (!item.file) throw new Error(`catalog plugin ${item.id} is missing a vendored tarball`)
      const tarball = join(options.catalogRoot, item.file)
      if (!existsSync(tarball)) throw new Error(`catalog plugin tarball is missing: ${tarball}`)
      if (SHARED_TREE_ONLY.has(pluginName)) {
        // A shared-tree package is never resolved from a generation: seeding one
        // would only leave a pointer that startup demotes. Install it into the
        // Profile instead, from the same vendored tarball.
        if (!(await installCatalogMarketItem(options, item, tarball))) marketDeferred = true
        continue
      }
      await installCatalogPlugin(options, item, tarball)
      options.note(
        upgrading
          ? `[desktop] catalog updated plugin ${pluginName}`
          : `[desktop] catalog installed plugin ${pluginName}`
      )
      continue
    }

    if (item.kind === 'payload') {
      if (!item.path) throw new Error(`catalog payload ${item.id} is missing a path`)
      const source = join(options.catalogRoot, item.path)
      if (!existsSync(source)) throw new Error(`catalog payload tree is missing: ${source}`)
      const dest = join(options.dshHome, PAYLOAD_HOME_DIR)
      rmSync(dest, { recursive: true, force: true })
      cpSync(source, dest, { recursive: true })
      writeFileSync(
        join(dest, PAYLOAD_MANIFEST_NAME),
        `${JSON.stringify(
          {
            format: 'dsh-desktop-payload',
            formatVersion: 1,
            id: item.id,
            name: item.name ?? item.id,
            version: item.version ?? '',
            digest: item.digest ?? '',
            catalog: { id: manifest.id, version: manifest.version },
            appVersion: options.appVersion ?? '',
            seededAt: new Date().toISOString()
          },
          null,
          2
        )}\n`,
        'utf8'
      )
      options.note(`[desktop] catalog seeded rules payload ${item.id}@${item.version ?? '0.0.0'}`)
      continue
    }

    if (item.kind === 'skill') {
      if (!item.path) throw new Error(`catalog skill ${item.id} is missing a path`)
      const dest = join(options.dshHome, 'skills', item.id)
      const source = join(options.catalogRoot, item.path)
      rmSync(dest, { recursive: true, force: true })
      mkdirSync(dirname(dest), { recursive: true })
      cpSync(source, dest, { recursive: true })
      options.note(`[desktop] catalog seeded skill ${item.id}`)
      continue
    }

    if (item.kind === 'rules') {
      if (!item.path) throw new Error(`catalog rules ${item.id} is missing a path`)
      applyRulesFile(options.dshHome, join(options.catalogRoot, item.path), options.note)
      continue
    }

    if (item.kind === 'mcp') {
      const server: Record<string, unknown> = {
        transport: item.transport ?? 'stdio'
      }
      if (item.url) server.url = item.url
      if (item.command) server.command = item.command
      if (item.args) server.args = item.args
      if (item.connector) server.connector = item.connector
      if (item.file) {
        const mcpDir = join(options.dshHome, 'mcp', item.id)
        rmSync(mcpDir, { recursive: true, force: true })
        const extracted = extractTarball(join(options.catalogRoot, item.file), mcpDir)
        server.command = item.command ?? options.nodeExecutablePath
        server.args = item.args ?? (resolveMcpEntry(extracted)
          ? [resolveMcpEntry(extracted)!]
          : undefined)
      }
      writeMcpPatch(homeCordisPatchPath(options.dshHome), item.id, server, options.note, true)
      const profilePatch = profileCordisPatchPath(options.dshHome)
      if (existsSync(dirname(profilePatch))) {
        writeMcpPatch(profilePatch, item.id, server, options.note, true)
      }
      options.note(`[desktop] catalog seeded MCP ${item.id}`)
    }
  }

  if (marketDeferred) {
    // Everything else is seeded; leaving the stamp unwritten makes the next
    // launch retry the catalog, which is how the market gets another chance.
    options.note(
      `[desktop] installer catalog ${manifest.id}@${manifest.version} applied without the market; retrying on the next launch`
    )
    return 'deferred'
  }

  writeFileSync(catalogStampPath(options.dshHome), fingerprint, 'utf8')
  options.note(
    upgrading
      ? `[desktop] updated installer catalog ${manifest.id}@${manifest.version}`
      : `[desktop] applied installer catalog ${manifest.id}@${manifest.version}`
  )
  return 'applied'
}
