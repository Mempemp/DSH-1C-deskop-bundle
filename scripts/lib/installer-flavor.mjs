import { existsSync, readFileSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'

export const FLAVOR_KINDS = Object.freeze(['plugin', 'mcp', 'skill', 'rules', 'catalog'])
export const FLAVOR_FROMS = Object.freeze(['git', 'local', 'npm', 'market', 'backup'])
export const MCP_TRANSPORTS = Object.freeze(['stdio', 'streamable-http'])

/** Same format string as packages/dshmarket/src/backup.ts (`BACKUP_FORMAT`). */
export const PROFILE_BACKUP_FORMAT = 'dsh-profile-backup'
/** Same version as packages/dshmarket/src/backup.ts (`ProfileBackup.version`). */
export const PROFILE_BACKUP_VERSION = 0.2

/** Official in-box bundles — not community plugins (dshmarket `INBOX_BUNDLES`). */
const INBOX_BUNDLES = new Set([
  '@deepseek-ai/dsh-base',
  '@deepseek-ai/dsh-web-app',
  '@deepseek-ai/dsh-headless'
])

/** Market host package — already shipped with desktop (dshmarket `SELF_NAMES`). */
const MARKET_SELF_NAMES = new Set(['dshmarket', 'dsh-market'])

const DEFAULT_FLAVOR_NAME = 'installer-flavor.yml'

/**
 * Absolute path of the flavor file: DSH_INSTALLER_FLAVOR, else installer-flavor.yml
 * in the project root. Missing files are not an error here — the caller decides.
 * @param {string} projectRoot
 * @param {NodeJS.ProcessEnv} [env]
 */
export function resolveFlavorPath(projectRoot, env = process.env) {
  const override = env.DSH_INSTALLER_FLAVOR?.trim()
  if (override) return isAbsolute(override) ? override : resolve(projectRoot, override)
  return join(projectRoot, DEFAULT_FLAVOR_NAME)
}

/**
 * @param {unknown} value
 * @param {string} label
 */
function requireString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} must be a non-empty string`)
  }
  return value.trim()
}

/**
 * @param {unknown} source
 * @param {number} index
 */
export function validateFlavorSource(source, index) {
  const at = `sources[${index}]`
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    throw new Error(`${at} must be a mapping`)
  }
  const row = /** @type {Record<string, unknown>} */ (source)
  const kind = requireString(row.kind, `${at}.kind`)
  const from = requireString(row.from, `${at}.from`)
  if (!FLAVOR_KINDS.includes(kind)) {
    throw new Error(`${at}.kind must be one of ${FLAVOR_KINDS.join(', ')}`)
  }
  if (!FLAVOR_FROMS.includes(from)) {
    throw new Error(`${at}.from must be one of ${FLAVOR_FROMS.join(', ')}`)
  }
  if ((from === 'market' || from === 'backup') && kind !== 'plugin') {
    throw new Error(`${at}: from: ${from} is only valid for kind: plugin`)
  }
  if (from === 'git') requireString(row.url, `${at}.url`)
  if (from === 'local' || from === 'backup') requireString(row.path, `${at}.path`)
  if (from === 'npm') requireString(row.spec, `${at}.spec`)
  if (from === 'market') requireString(row.id, `${at}.id`)
  if (kind === 'mcp') {
    requireString(row.id, `${at}.id`)
    const transport = requireString(row.transport ?? 'stdio', `${at}.transport`)
    if (!MCP_TRANSPORTS.includes(transport)) {
      throw new Error(`${at}.transport must be one of ${MCP_TRANSPORTS.join(', ')}`)
    }
  }
  return /** @type {FlavorSource} */ (row)
}

/**
 * @typedef {object} FlavorSource
 * @property {'plugin' | 'mcp' | 'skill' | 'rules' | 'catalog'} kind
 * @property {'git' | 'local' | 'npm' | 'market' | 'backup'} from
 * @property {string} [url]
 * @property {string} [path]
 * @property {string} [spec]
 * @property {string} [id]
 * @property {string} [version]
 * @property {'stdio' | 'streamable-http'} [transport]
 * @property {string} [command]
 * @property {string[]} [args]
 * @property {string} [connector]
 * @property {string} [name]
 * @property {boolean} [fromBackup]
 * @property {boolean} [fromMarket]
 */

/**
 * @typedef {object} InstallerFlavor
 * @property {string} name
 * @property {string} version
 * @property {string} [id]
 * @property {FlavorSource[]} sources
 * @property {string} [filePath]
 */

/**
 * @param {string} text
 * @param {{ filePath?: string }} [options]
 * @returns {InstallerFlavor}
 */
export function parseInstallerFlavor(text, options = {}) {
  let data
  try {
    data = parseYaml(text)
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(`installer flavor is not valid YAML: ${detail}`)
  }
  if (data === undefined || data === null) {
    return { name: 'DSH Desktop', version: '0.0.0', sources: [], filePath: options.filePath }
  }
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('installer flavor must be a mapping with sources[]')
  }
  const row = /** @type {Record<string, unknown>} */ (data)
  const sources = row.sources ?? []
  if (!Array.isArray(sources)) {
    throw new Error('sources must be an array')
  }
  const name = typeof row.name === 'string' && row.name.trim() !== '' ? row.name.trim() : 'DSH Desktop'
  const version = typeof row.version === 'string' && row.version.trim() !== '' ? row.version.trim() : '0.0.0'
  const id = typeof row.id === 'string' && row.id.trim() !== '' ? row.id.trim() : slugify(name)
  return {
    name,
    version,
    id,
    sources: sources.map((source, index) => validateFlavorSource(source, index)),
    filePath: options.filePath
  }
}

/**
 * @param {string} filePath
 * @returns {InstallerFlavor}
 */
export function loadInstallerFlavor(filePath) {
  return parseInstallerFlavor(readFileSync(filePath, 'utf8'), { filePath })
}

/**
 * @param {string} name
 */
export function slugify(name) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'dsh-desktop'
}

/**
 * Resolve a local path against the flavor file directory (or project root).
 * @param {string} relativePath
 * @param {string} [flavorFilePath]
 * @param {string} [projectRoot]
 */
export function resolveFlavorLocalPath(relativePath, flavorFilePath, projectRoot) {
  if (isAbsolute(relativePath)) return relativePath
  const base = flavorFilePath ? dirname(flavorFilePath) : projectRoot
  if (!base) throw new Error(`cannot resolve relative path ${relativePath} without a flavor file`)
  return resolve(base, relativePath)
}

/**
 * @typedef {object} RegistryPlugin
 * @property {string} name
 * @property {string} owner
 * @property {string} [npm]
 * @property {string} [install]
 * @property {string} [url]
 * @property {string} [tarball]
 */

/**
 * @typedef {object} RegistrySnapshot
 * @property {RegistryPlugin[]} plugins
 */

/**
 * @param {string} filePath
 * @returns {RegistrySnapshot}
 */
export function loadRegistrySnapshot(filePath) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  if (!data || !Array.isArray(data.plugins)) {
    throw new Error(`registry snapshot at ${filePath} has no plugins[]`)
  }
  return data
}

/**
 * Pull `github:owner/repo#…` (or a bare npm spec) out of a market install command.
 * @param {string} install
 * @returns {string | undefined}
 */
export function extractInstallTarget(install) {
  const match = /\badd\s+(\S+)/u.exec(install)
  return match?.[1]
}

/**
 * @param {string} target
 * @returns {{ kind: 'git' | 'npm'; spec: string } | undefined}
 */
export function classifyInstallTarget(target) {
  if (target.startsWith('github:') || target.startsWith('git+') || /github\.com\//u.test(target)) {
    return { kind: 'git', spec: target }
  }
  if (target.startsWith('npm:')) {
    return { kind: 'npm', spec: target.slice('npm:'.length) }
  }
  if (target.includes('/') && !target.startsWith('@')) {
    return { kind: 'git', spec: target.startsWith('github:') ? target : `github:${target}` }
  }
  return { kind: 'npm', spec: target }
}

/**
 * @typedef {object} ProfileBackupFileJson
 * @property {'package.json'} path
 * @property {Record<string, unknown>} json
 */

/**
 * @typedef {object} ProfileBackupFileLines
 * @property {string} path
 * @property {string[]} lines
 */

/**
 * @typedef {object} ProfileBackup
 * @property {typeof PROFILE_BACKUP_FORMAT} format
 * @property {0.2} version
 * @property {string} [createdAt]
 * @property {string} [profile]
 * @property {Array<ProfileBackupFileJson | ProfileBackupFileLines>} files
 */

/**
 * Validate a dshmarket profile backup (`dsh-profile-backup` v0.2).
 * Mirrors `validatedBackup` in packages/dshmarket/src/backup.ts — format,
 * version, files[], and a `package.json` object entry — so a flavor source
 * cannot invent a second schema.
 * @param {unknown} value
 * @param {string} [label]
 * @returns {ProfileBackup}
 */
export function parseProfileBackup(value, label = 'dshmarket backup') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} is invalid`)
  }
  const backup = /** @type {Record<string, unknown>} */ (value)
  if (backup.format !== PROFILE_BACKUP_FORMAT || backup.version !== PROFILE_BACKUP_VERSION) {
    throw new Error(`${label} has an unsupported format (need ${PROFILE_BACKUP_FORMAT} ${PROFILE_BACKUP_VERSION})`)
  }
  if (!Array.isArray(backup.files)) {
    throw new Error(`${label} has no files[]`)
  }
  const files = []
  for (const entry of backup.files) {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error(`${label} has invalid files[] entries`)
    }
    const file = /** @type {Record<string, unknown>} */ (entry)
    if (typeof file.path !== 'string' || file.path === '') {
      throw new Error(`${label} has invalid files[] entries`)
    }
    if (file.path === 'package.json') {
      if (file.json === null || typeof file.json !== 'object' || Array.isArray(file.json)) {
        throw new Error(`${label} package.json is invalid`)
      }
      files.push({ path: 'package.json', json: /** @type {Record<string, unknown>} */ (file.json) })
    }
  }
  if (!files.some((file) => file.path === 'package.json')) {
    throw new Error(`${label} has no package.json`)
  }
  return {
    format: PROFILE_BACKUP_FORMAT,
    version: PROFILE_BACKUP_VERSION,
    createdAt: typeof backup.createdAt === 'string' ? backup.createdAt : undefined,
    profile: typeof backup.profile === 'string' ? backup.profile : undefined,
    files
  }
}

/**
 * @param {string} filePath
 * @returns {ProfileBackup}
 */
export function loadProfileBackup(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`dshmarket backup not found: ${filePath}`)
  }
  let data
  try {
    data = JSON.parse(readFileSync(filePath, 'utf8'))
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(`dshmarket backup is not valid JSON (${filePath}): ${detail}`)
  }
  return parseProfileBackup(data, `dshmarket backup ${filePath}`)
}

/**
 * Manifest `package.json` from a validated backup.
 * @param {ProfileBackup} backup
 */
export function backupManifest(backup) {
  const file = backup.files.find((entry) => entry.path === 'package.json' && 'json' in entry)
  if (file === undefined || !('json' in file)) {
    throw new Error('dshmarket backup has no package.json')
  }
  return file.json
}

/**
 * Whether this package is official inbox / the market host — not a community
 * plugin the installer catalog should vendor.
 * @param {string} name
 */
export function isInstallerInboxPackage(name) {
  return INBOX_BUNDLES.has(name) || MARKET_SELF_NAMES.has(name)
}

/**
 * Absolute `link:` / `file:` specs cannot travel (dshmarket `unportableDeps`).
 * Relative `file:` / `link:` also cannot be vendored here — the profile tree
 * is not part of the backup payload.
 * @param {string} spec
 */
export function isUnresolvableBackupSpec(spec) {
  return /^(?:link|file|workspace|portal):/i.test(spec)
}

/**
 * Classify a backup dependency spec the same way prepare vendors plugins:
 * npm version/range, git/`github:` install target, or fail.
 * @param {string} name
 * @param {string} spec
 * @returns {{ from: 'npm'; spec: string } | { from: 'git'; url: string }}
 */
export function classifyBackupPluginSpec(name, spec) {
  const trimmed = spec.trim()
  if (trimmed === '') {
    throw new Error(`backup plugin ${name} has an empty spec`)
  }
  if (isUnresolvableBackupSpec(trimmed)) {
    throw new Error(`backup plugin ${name} has an unresolvable local spec: ${trimmed}`)
  }

  if (trimmed.startsWith('npm:')) {
    const target = trimmed.slice('npm:'.length).trim()
    if (target === '') throw new Error(`backup plugin ${name} has an empty npm: spec`)
    return { from: 'npm', spec: target.includes('@') || target === name ? target : `${name}@${target}` }
  }

  const classified = classifyInstallTarget(trimmed)
  if (classified?.kind === 'git') {
    return { from: 'git', url: classified.spec }
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    throw new Error(`backup plugin ${name} has an unresolvable spec: ${trimmed}`)
  }

  if (trimmed === name || trimmed.startsWith(`${name}@`)) {
    return { from: 'npm', spec: trimmed }
  }
  return { from: 'npm', spec: `${name}@${trimmed}` }
}

/**
 * Community plugins recorded in a backup's package.json.
 * Specs come from `dependencies` (dshmarket `extractPluginSelection`);
 * community `dsh.profile.bundles` names without a string spec fail.
 * @param {ProfileBackup} backup
 * @param {string} [label]
 * @returns {Array<{ name: string; spec: string }>}
 */
export function extractBackupPluginEntries(backup, label = 'dshmarket backup') {
  const json = backupManifest(backup)
  const dependencies = json.dependencies === null || typeof json.dependencies !== 'object' || Array.isArray(json.dependencies)
    ? {}
    : /** @type {Record<string, unknown>} */ (json.dependencies)
  const dsh = json.dsh === null || typeof json.dsh !== 'object' || Array.isArray(json.dsh)
    ? undefined
    : /** @type {{ profile?: unknown }} */ (json.dsh)
  const profileBlock = dsh?.profile === null || typeof dsh?.profile !== 'object' || Array.isArray(dsh?.profile)
    ? undefined
    : /** @type {{ bundles?: unknown }} */ (dsh.profile)
  const bundles = Array.isArray(profileBlock?.bundles) ? profileBlock.bundles : []

  /** @type {Array<{ name: string; spec: string }>} */
  const entries = []
  const seen = new Set()

  for (const [name, spec] of Object.entries(dependencies)) {
    if (isInstallerInboxPackage(name)) continue
    if (typeof spec !== 'string' || spec.trim() === '') {
      throw new Error(`${label} plugin ${name} has no string install spec`)
    }
    entries.push({ name, spec: spec.trim() })
    seen.add(name)
  }

  for (const name of bundles) {
    if (typeof name !== 'string' || name === '' || isInstallerInboxPackage(name) || seen.has(name)) {
      continue
    }
    throw new Error(`${label} bundle ${name} has no dependency spec`)
  }

  if (entries.length === 0) {
    throw new Error(`${label} has no community plugins`)
  }

  return entries
}

/**
 * Expand `from: backup` into one plugin source per community plugin.
 * An empty community list is rejected — a backup source that vendors nothing
 * is almost certainly the wrong file.
 * @param {FlavorSource} source
 * @param {number|string} index
 * @param {{ flavorFilePath?: string; projectRoot?: string }} [options]
 * @returns {FlavorSource[]}
 */
export function expandBackupFlavorSource(source, index, options = {}) {
  const at = `sources[${index}]`
  if (source.from !== 'backup') {
    throw new Error(`${at} is not a backup source`)
  }
  const filePath = resolveFlavorLocalPath(source.path ?? '', options.flavorFilePath, options.projectRoot)
  const label = `${at} backup ${filePath}`
  const backup = loadProfileBackup(filePath)
  const entries = extractBackupPluginEntries(backup, label)
  return entries.map((entry) => {
    try {
      const classified = classifyBackupPluginSpec(entry.name, entry.spec)
      if (classified.from === 'git') {
        return {
          kind: 'plugin',
          from: 'git',
          url: classified.url,
          id: entry.name,
          name: entry.name,
          fromBackup: true
        }
      }
      return {
        kind: 'plugin',
        from: 'npm',
        spec: classified.spec,
        id: entry.name,
        name: entry.name,
        fromBackup: true
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      throw new Error(`${label}: ${detail}`)
    }
  })
}

/**
 * Resolve a market plugin id against a registry snapshot. `id` is a catalog
 * name (`dsh-mcp-connector`) or `owner/name` when the name is not unique.
 * @param {{ id: string; version?: string }} source
 * @param {RegistrySnapshot} snapshot
 * @returns {{ from: 'npm' | 'git'; spec: string; plugin: RegistryPlugin }}
 */
export function resolveMarketPlugin(source, snapshot) {
  const id = requireString(source.id, 'market id')
  const slash = id.indexOf('/')
  const owner = slash === -1 ? undefined : id.slice(0, slash)
  const name = slash === -1 ? id : id.slice(slash + 1)
  if (name === '') {
    throw new Error(`market id ${JSON.stringify(id)} is not a catalog name or owner/name`)
  }

  const matches = snapshot.plugins.filter((plugin) => {
    if (plugin.name !== name) return false
    return owner === undefined || plugin.owner === owner
  })

  if (matches.length === 0) {
    throw new Error(`unknown market plugin id: ${id}`)
  }
  if (matches.length > 1) {
    const owners = matches.map((plugin) => plugin.owner).join(', ')
    throw new Error(`ambiguous market plugin id: ${id} (owners: ${owners})`)
  }

  const plugin = matches[0]
  const version = typeof source.version === 'string' && source.version.trim() !== ''
    ? source.version.trim()
    : undefined

  if (typeof plugin.npm === 'string' && plugin.npm.trim() !== '') {
    const spec = version ? `${plugin.npm}@${version}` : plugin.npm
    return { from: 'npm', spec, plugin }
  }

  const target = typeof plugin.install === 'string' ? extractInstallTarget(plugin.install) : undefined
  if (target) {
    const classified = classifyInstallTarget(target)
    if (classified?.kind === 'npm') {
      const spec = version ? `${classified.spec}@${version}` : classified.spec
      return { from: 'npm', spec, plugin }
    }
    if (classified?.kind === 'git') {
      let spec = classified.spec
      if (version && !spec.includes('#')) spec = `${spec}#${version}`
      return { from: 'git', spec, plugin }
    }
  }

  if (typeof plugin.url === 'string' && /github\.com\//u.test(plugin.url)) {
    const repo = plugin.url.replace(/\.git$/u, '')
    const spec = version ? `${repo}.git#${version}` : `${repo}.git`
    return { from: 'git', spec, plugin }
  }

  throw new Error(`market plugin ${id} has no npm package or github install target`)
}

/**
 * @param {string} kind
 * @param {string} title
 */
export function catalogListLabel(kind, title) {
  switch (kind) {
    case 'plugin':
      return `Plugin: ${title}`
    case 'mcp':
      return `MCP: ${title}`
    case 'skill':
      return `Skill: ${title}`
    case 'rules':
      return `Rules: ${title}`
    default:
      return title
  }
}

/**
 * Escape a string for an NSIS double-quoted literal.
 * @param {string} value
 */
export function escapeNsisString(value) {
  return value.replace(/\$/gu, '$$$$').replace(/"/gu, '$\\"')
}
