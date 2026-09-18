import { existsSync, mkdirSync, cpSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { basename, dirname, join } from 'node:path'
import { isMap, isSeq, parseDocument, type Document } from 'yaml'
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
/**
 * The MCP manager plugin's global server store, `$DSH_HOME/dsh-mcp.json`.
 *
 * Catalog MCP servers are delivered here, not into the loader patch layer:
 * that layer mounts `@deepseek-ai/dsh-mcp-client` rows, which the manager
 * neither reads nor lists, and one `serverName` mounted twice is a hard client
 * load error — so a server has exactly one home. The store is the surface a
 * user actually works with: the manager's panel lists the server, switches it
 * on and off, shows its state and its tools.
 */
export const MCP_MANAGER_STORE_NAME = 'dsh-mcp.json'
/** Store format version: the value the manager writes on its own saves. */
const MCP_MANAGER_STORE_VERSION = 1

/**
 * The loader-row id catalog MCP servers were mounted under before the manager
 * took them over. Only the migration reads it now.
 */
export function mcpPatchEntryId(serverId: string): string {
  return `mcp-${serverId}`
}

/** One server as the manager's global store keeps it. */
export interface McpManagerServerEntry {
  name: string
  transport: 'stdio' | 'streamable-http'
  url?: string
  headers?: Record<string, string>
  command?: string
  args?: string[]
}
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
  serverName?: string
  headers?: Record<string, string>
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

function mcpManagerStorePath(dshHome: string): string {
  return join(dshHome, MCP_MANAGER_STORE_NAME)
}

/**
 * First line of the header earlier builds wrote when they created the home
 * patch layer. The migration drops that layer only when the file carries it,
 * so a layer a user wrote themselves is never removed.
 */
const HOME_PATCH_MARKER =
  '# Written by DSH Desktop: the loader patch layer applied to every profile'

/** Replace a file through a sibling temp file, the way the manager saves its store. */
function writeAtomically(filePath: string, text: string): void {
  mkdirSync(dirname(filePath), { recursive: true })
  const tmp = `${filePath}.${process.pid}.${Date.now().toString(36)}.tmp`
  writeFileSync(tmp, text, { encoding: 'utf8', mode: 0o600 })
  renameSync(tmp, filePath)
}

/** The entry's own keys, without the ones a catalog item left undefined. */
function definedOnly(entry: McpManagerServerEntry): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(entry)) {
    if (value !== undefined) out[key] = value
  }
  return out
}

/**
 * Merge one catalog MCP server into the manager's global store.
 *
 * The store belongs to the plugin, so the edit is surgical: every other server
 * survives verbatim, and so does every field of ours the user changed — the
 * manager keeps a server's `enabled` switch, its call timeout and its
 * description in the same row, and a re-seed must not undo a switch the user
 * flipped. A file the manager could not read is left exactly as it is.
 */
export function mergeMcpServerIntoManagerStore(
  text: string | undefined,
  entry: McpManagerServerEntry
): { text: string; added: boolean; changed: boolean; skipped: boolean } {
  const current = text ?? ''
  let store: Record<string, unknown>
  if (current.trim() === '') {
    store = { version: MCP_MANAGER_STORE_VERSION, servers: [] }
  } else {
    let parsed: unknown
    try {
      parsed = JSON.parse(current)
    } catch {
      return { text: current, added: false, changed: false, skipped: true }
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { text: current, added: false, changed: false, skipped: true }
    }
    store = parsed as Record<string, unknown>
  }
  if (store.servers !== undefined && !Array.isArray(store.servers)) {
    return { text: current, added: false, changed: false, skipped: true }
  }

  const servers = (store.servers ?? []) as Record<string, unknown>[]
  const own = definedOnly(entry)
  const at = servers.findIndex(
    (server) => server !== null && typeof server === 'object' && server.name === entry.name
  )
  if (at < 0) {
    servers.push({ ...own, enabled: true })
  } else {
    const merged = { ...servers[at], ...own }
    if (JSON.stringify(merged) === JSON.stringify(servers[at])) {
      return { text: current, added: false, changed: false, skipped: false }
    }
    servers[at] = merged
  }

  // Version first and every unrelated top-level key kept: the manager reads
  // only `servers`, but the file is not ours to prune.
  const next: Record<string, unknown> = {
    version: typeof store.version === 'number' ? store.version : MCP_MANAGER_STORE_VERSION,
    servers
  }
  for (const [key, value] of Object.entries(store)) {
    if (key !== 'version' && key !== 'servers') next[key] = value
  }
  return { text: JSON.stringify(next, null, 2), added: at < 0, changed: true, skipped: false }
}

/**
 * Remove the desktop's own MCP rows from the home patch layer.
 *
 * Up to 0.9.0-1 the catalog mounted its MCP servers here as `mcp-<id>` rows.
 * They have to go before the manager mounts the same server: one `serverName`
 * twice is a hard mcp-client load error, not a duplicate that resolves. The
 * document is edited in place, so comments, `!!js` expressions and rows the
 * user wrote survive, and a file the desktop cannot parse is left alone.
 */
export function removeMcpRowsFromPatch(
  text: string,
  entryIds: readonly string[]
): { text: string; removed: number; skipped: boolean; empty: boolean } {
  const doc = parseDocument(text) as Document
  if (doc.errors.length > 0) return { text, removed: 0, skipped: true, empty: false }

  const rows = isSeq(doc.contents) ? doc.contents.items : []
  const owned = new Set(entryIds)
  const isOwned = (node: unknown): boolean =>
    isMap(node) && typeof node.get('id') === 'string' && owned.has(node.get('id') as string)

  let removed = 0
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index]
    if (isOwned(row)) {
      rows.splice(index, 1)
      removed += 1
      continue
    }
    const insert = isMap(row) ? row.get('insert') : undefined
    if (!isSeq(insert)) continue
    for (let nested = insert.items.length - 1; nested >= 0; nested -= 1) {
      if (!isOwned(insert.items[nested])) continue
      insert.items.splice(nested, 1)
      removed += 1
    }
    // An insert list left empty is what a row of ours became: it mounts nothing.
    if (insert.items.length === 0) rows.splice(index, 1)
  }
  if (removed === 0) return { text, removed: 0, skipped: false, empty: false }
  return {
    text: ensureTrailingNewline(doc.toString()),
    removed,
    skipped: false,
    empty: rows.length === 0
  }
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`
}

/**
 * Deliver the catalog's MCP servers: into the manager's store, and out of the
 * patch layer the catalog used before. Both halves are one operation — a
 * machine upgrading from 0.9.0-1 has the row in the layer and nothing in the
 * store, and the two together would break the next boot.
 */
function applyCatalogMcp(
  home: string,
  entries: readonly McpManagerServerEntry[],
  entryIds: readonly string[],
  note: Note
): void {
  const storePath = mcpManagerStorePath(home)
  let text: string | undefined = existsSync(storePath) ? readFileSync(storePath, 'utf8') : undefined
  let touched = false
  for (const entry of entries) {
    const merged = mergeMcpServerIntoManagerStore(text, entry)
    if (merged.skipped) {
      note(
        `[desktop] catalog MCP ${entry.name} left alone: ${MCP_MANAGER_STORE_NAME} is not a manager store`
      )
      continue
    }
    if (!merged.changed) {
      note(`[desktop] catalog MCP ${entry.name} already in ${MCP_MANAGER_STORE_NAME}`)
      continue
    }
    text = merged.text
    touched = true
    note(
      merged.added
        ? `[desktop] catalog seeded MCP ${entry.name} into ${MCP_MANAGER_STORE_NAME}`
        : `[desktop] catalog updated MCP ${entry.name} in ${MCP_MANAGER_STORE_NAME}`
    )
  }
  if (touched) writeAtomically(storePath, text ?? '')
  removeOwnPatchMcpRows(home, entryIds, note)
}

/** Drop the catalog's own MCP rows from the home patch layer. */
function removeOwnPatchMcpRows(home: string, entryIds: readonly string[], note: Note): void {
  const filePath = homeCordisPatchPath(home)
  if (entryIds.length === 0 || !existsSync(filePath)) return
  const text = readFileSync(filePath, 'utf8')
  const cleared = removeMcpRowsFromPatch(text, entryIds.map(mcpPatchEntryId))
  if (cleared.skipped) {
    note(
      `[desktop] catalog left ${basename(filePath)} alone: it still mounts an MCP server the manager owns now`
    )
    return
  }
  if (cleared.removed === 0) return
  if (cleared.empty && text.includes(HOME_PATCH_MARKER)) {
    // Ours were the only rows in a layer the desktop created: leaving an empty
    // one behind would be worse than dropping it.
    rmSync(filePath, { force: true })
    note(
      `[desktop] removed the catalog's MCP rows from ${basename(filePath)} and dropped the empty layer`
    )
    return
  }
  writeFileSync(filePath, cleared.text, 'utf8')
  note(`[desktop] removed the catalog's MCP rows from ${basename(filePath)}`)
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
  /** Collected so every MCP server lands in one pass over the manager's store. */
  const mcpEntries: McpManagerServerEntry[] = []

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
      const entry: McpManagerServerEntry = {
        name: item.serverName ?? item.id,
        transport: item.transport ?? 'stdio'
      }
      if (item.url) entry.url = item.url
      if (item.headers) entry.headers = item.headers
      if (item.command) entry.command = item.command
      if (item.args) entry.args = item.args
      if (item.file) {
        const mcpDir = join(options.dshHome, 'mcp', item.id)
        rmSync(mcpDir, { recursive: true, force: true })
        const extracted = extractTarball(join(options.catalogRoot, item.file), mcpDir)
        entry.command = item.command ?? options.nodeExecutablePath
        entry.args = item.args ?? (resolveMcpEntry(extracted)
          ? [resolveMcpEntry(extracted)!]
          : undefined)
      }
      mcpEntries.push(entry)
    }
  }

  applyCatalogMcp(
    options.dshHome,
    mcpEntries,
    manifest.items.filter((item) => item.kind === 'mcp').map((item) => item.id),
    options.note
  )

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
