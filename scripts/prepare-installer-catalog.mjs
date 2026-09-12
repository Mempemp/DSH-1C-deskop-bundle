import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pipeline } from 'node:stream/promises'
import {
  catalogListLabel,
  escapeNsisString,
  expandBackupFlavorSource,
  loadInstallerFlavor,
  loadRegistrySnapshot,
  parseInstallerFlavor,
  resolveFlavorLocalPath,
  resolveFlavorPath,
  resolveMarketPlugin,
  slugify
} from './lib/installer-flavor.mjs'

const scriptPath = fileURLToPath(import.meta.url)
const projectRoot = resolve(dirname(scriptPath), '..')
const LOG_PREFIX = '[installer-catalog]'

/**
 * @typedef {import('./lib/installer-flavor.mjs').FlavorSource} FlavorSource
 * @typedef {import('./lib/installer-flavor.mjs').InstallerFlavor} InstallerFlavor
 */

/**
 * @param {...unknown} args
 */
function catalogLog(...args) {
  console.log(LOG_PREFIX, ...args)
}

/**
 * @param {...unknown} args
 */
function catalogError(...args) {
  console.error(LOG_PREFIX, ...args)
}

/**
 * One-line identity for a flavor source (kind, from, id/name/url/spec).
 * @param {FlavorSource & { resolvedName?: string }} source
 */
function describeSource(source) {
  const parts = [source.kind, `from=${source.from}`]
  if (source.id) parts.push(`id=${source.id}`)
  if (source.name) parts.push(`name=${source.name}`)
  if (source.spec) parts.push(`spec=${source.spec}`)
  if (source.url) parts.push(`url=${source.url}`)
  if (source.path) parts.push(`path=${source.path}`)
  if (source.resolvedName) parts.push(`resolved=${source.resolvedName}`)
  if (source.fromMarket) parts.push('via=market')
  if (source.fromBackup) parts.push('via=backup')
  return parts.join(' ')
}

/**
 * @param {CatalogItem} item
 */
function describeItem(item) {
  const parts = [item.kind, item.id]
  if (item.name && item.name !== item.id) parts.push(`name=${item.name}`)
  if (item.version) parts.push(`version=${item.version}`)
  if (item.file) parts.push(`file=${item.file}`)
  if (item.path) parts.push(`path=${item.path}`)
  if (item.digest) parts.push(`digest=${item.digest.slice(0, 12)}`)
  return parts.join(' ')
}

/**
 * @typedef {object} CatalogItem
 * @property {'plugin' | 'mcp' | 'skill' | 'rules'} kind
 * @property {string} id
 * @property {string} label
 * @property {string} [name]
 * @property {string} [version]
 * @property {string} [file]
 * @property {string} [digest]
 * @property {string} [path]
 * @property {'stdio' | 'streamable-http'} [transport]
 * @property {string} [command]
 * @property {string[]} [args]
 * @property {string} [url]
 * @property {string} [connector]
 */

/**
 * @typedef {object} CatalogManifest
 * @property {string} name
 * @property {string} version
 * @property {string} id
 * @property {CatalogItem[]} items
 */

/**
 * @param {string} [root]
 */
export function catalogOutputPaths(root = projectRoot) {
  const catalogDir = join(root, 'build', 'installer-catalog')
  return {
    catalogDir,
    pluginsDir: join(catalogDir, 'plugins'),
    mcpDir: join(catalogDir, 'mcp'),
    skillsDir: join(catalogDir, 'skills'),
    rulesDir: join(catalogDir, 'rules'),
    manifestPath: join(catalogDir, 'manifest.json'),
    labelsPath: join(root, 'build', 'installer-catalog-labels.nsh')
  }
}

/**
 * @param {string} name
 */
function safeFileToken(name) {
  return name.replace(/[^A-Za-z0-9._-]+/gu, '-').replace(/^-+|-+$/gu, '') || 'item'
}

/**
 * @param {string} directory
 */
function emptyDir(directory) {
  rmSync(directory, { recursive: true, force: true })
  mkdirSync(directory, { recursive: true })
}

/**
 * @param {string} filePath
 */
function readPackageName(filePath) {
  const manifest = JSON.parse(readFileSync(filePath, 'utf8'))
  if (typeof manifest.name !== 'string' || manifest.name.trim() === '') {
    throw new Error(`${filePath} has no package name`)
  }
  return {
    name: manifest.name.trim(),
    version: typeof manifest.version === 'string' ? manifest.version : '0.0.0'
  }
}

/**
 * Quote a spawn argument when Windows `shell: true` would otherwise split it.
 * @param {string} value
 */
function winShellArg(value) {
  if (process.platform !== 'win32' || !/[\s&<>|^()"]/u.test(value)) return value
  return `"${value.replaceAll('"', '\\"')}"`
}

/**
 * Run npm in `directory`. On ERESOLVE (strict peers in git checkouts such as
 * better-sidebar 0.18.1 vs @huanlin/dsh-plugin-better-locale), retry with
 * --legacy-peer-deps so the catalog can still pack unpublished git tags.
 * @param {string} directory
 * @param {string[]} args
 */
function npmInstall(directory, args) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const options = {
    cwd: directory,
    encoding: 'utf8',
    shell: process.platform === 'win32'
  }
  const first = spawnSync(npm, args, options)
  if (first.status === 0) return first
  return spawnSync(npm, [...args, '--legacy-peer-deps'], options)
}

function isHostSingletonDependency(name) {
  return name === 'react' || name === 'react-dom' || name.startsWith('@deepseek-ai/')
}

/**
 * Production deps that must travel inside a catalog tarball. Host singletons
 * stay out — Desktop already vendors them, and bundling `@deepseek-ai/*` would
 * pull micromark and friends from npmjs at first-run `pnpm add`.
 * @param {Record<string, unknown>} manifest
 */
export function productionDependenciesToBundle(manifest) {
  return Object.keys(manifest.dependencies ?? {}).filter((name) => !isHostSingletonDependency(name))
}

/**
 * npm-install non-host production deps and mark them `bundleDependencies` so
 * `npm pack` embeds `node_modules`. First-run catalog seed can then unpack
 * offline. No-op when the plugin only depends on host singletons / peers.
 * @param {string} directory
 */
export function ensureBundledProductionDependencies(directory) {
  const manifestPath = join(directory, 'package.json')
  const original = readFileSync(manifestPath, 'utf8')
  const manifest = JSON.parse(original)
  const names = productionDependenciesToBundle(manifest)
  if (names.length === 0) return names

  catalogLog(`vendoring ${names.length} production dep(s) in ${directory}: ${names.join(', ')}`)
  const installManifest = {
    ...manifest,
    dependencies: Object.fromEntries(
      Object.entries(manifest.dependencies ?? {}).filter(([name]) => !isHostSingletonDependency(name))
    )
  }
  writeFileSync(manifestPath, `${JSON.stringify(installManifest, undefined, 2)}\n`)
  try {
    const install = npmInstall(directory, [
      'install',
      '--omit=dev',
      '--ignore-scripts',
      '--no-package-lock',
      '--install-strategy=nested'
    ])
    if (install.status !== 0) {
      throw new Error(
        `cannot vendor production dependencies for ${manifest.name || directory}: ${(
          install.stderr || install.stdout || ''
        ).trim()}`
      )
    }
    writeFileSync(
      manifestPath,
      `${JSON.stringify({ ...manifest, bundleDependencies: names }, undefined, 2)}\n`
    )
    return names
  } catch (error) {
    writeFileSync(manifestPath, original)
    throw error
  }
}

/**
 * Re-pack a published npm tarball after embedding its production closure.
 * @param {string} archive
 * @param {string} destinationDir
 */
export function repackTarballWithBundledDependencies(archive, destinationDir) {
  const work = mkdtempSync(join(tmpdir(), 'dsh-bundle-'))
  try {
    extractArchive(archive, work)
    const packageDir = existsSync(join(work, 'package'))
      ? join(work, 'package')
      : firstExtractedDirectory(work)
    const names = ensureBundledProductionDependencies(packageDir)
    if (names.length === 0) return archive
    const repacked = packDirectoryAsTgz(packageDir, destinationDir)
    if (repacked !== archive && dirname(archive) === destinationDir && existsSync(archive)) {
      rmSync(archive, { force: true })
    }
    return repacked
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}
/**
 * Pack a directory the way npm does (`package/` prefix, gzip).
 * @param {string} directory
 * @param {string} destinationDir
 */
export function packDirectoryAsTgz(directory, destinationDir) {
  mkdirSync(destinationDir, { recursive: true })
  catalogLog(`npm pack directory ${directory}`)
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const result = spawnSync(npm, ['pack', '--ignore-scripts', '--pack-destination', winShellArg(destinationDir)], {
    cwd: directory,
    encoding: 'utf8',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    throw new Error(
      `npm pack failed in ${directory}: ${(result.stderr || result.stdout || '').trim()}`
    )
  }
  const line = (result.stdout || '')
    .trim()
    .split(/\r?\n/u)
    .filter(Boolean)
    .at(-1)
  if (!line) throw new Error(`npm pack produced no tarball in ${directory}`)
  const packed = join(destinationDir, line.trim())
  if (!existsSync(packed)) throw new Error(`npm pack reported ${packed} but the file is missing`)
  catalogLog(`npm pack wrote ${packed}`)
  return packed
}

/**
 * Relative package entry from `exports["."]` or `main`.
 * @param {Record<string, unknown>} manifest
 */
export function packageMainRelativePath(manifest) {
  const exportsField = manifest.exports
  if (exportsField && typeof exportsField === 'object' && !Array.isArray(exportsField)) {
    const dot = /** @type {Record<string, unknown>} */ (exportsField)['.']
    if (typeof dot === 'string') return dot.replace(/^\.\//u, '')
    if (dot && typeof dot === 'object' && !Array.isArray(dot)) {
      const def = /** @type {Record<string, unknown>} */ (dot).default
      if (typeof def === 'string') return def.replace(/^\.\//u, '')
    }
  }
  if (typeof manifest.main === 'string' && manifest.main.trim() !== '') {
    return manifest.main.replace(/^\.\//u, '')
  }
  return 'index.js'
}

/**
 * @param {string} archive
 * @param {string} relativePath
 */
function tarListMatchesNeedle(stdout, needle) {
  return (stdout || '')
    .split(/\r?\n/u)
    .some((name) => {
      const normalized = name.replaceAll('\\', '/').replace(/^\.\//u, '').replace(/\/$/u, '')
      return normalized === `package/${needle}` || normalized === needle || normalized.endsWith(`/${needle}`)
    })
}

/**
 * @param {string} archive
 * @param {string} relativePath
 */
export function tarballContainsPath(archive, relativePath) {
  const needle = relativePath.replaceAll('\\', '/')
  const listOptions = { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  // Prefer a targeted member list so bundled node_modules cannot blow the
  // default 1 MiB spawn buffer (false "packed plugin does not contain main").
  for (const member of [`package/${needle}`, needle]) {
    const targeted = spawnSync('tar', ['-tzf', archive, member], listOptions)
    if (targeted.status === 0 && tarListMatchesNeedle(targeted.stdout, needle)) return true
  }
  const result = spawnSync('tar', ['-tzf', archive], listOptions)
  if (result.status !== 0) return false
  return tarListMatchesNeedle(result.stdout, needle)
}

/**
 * @param {string} file
 */
export function fileSha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex')
}

/**
 * Git checkouts of TypeScript DSH plugins usually omit `lib/`. Prefer the
 * published npm tarball (it already ran prepublish), then a local build.
 * @param {string} directory
 * @param {string} destinationDir
 * @param {(spec: string, destinationDir: string) => string} [packSpec]
 */
export function packPluginDirectory(directory, destinationDir, packSpec) {
  const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
  const name = typeof manifest.name === 'string' ? manifest.name : ''
  const version = typeof manifest.version === 'string' ? manifest.version : ''
  const entry = packageMainRelativePath(manifest)
  const entryPath = join(directory, entry)
  const label = name ? `${name}@${version || '?'}` : directory

  if (!existsSync(entryPath) && name) {
    // Exact version only — unversioned `name` would pack latest (e.g. 0.18.0)
    // when the git tag (0.18.1) is unpublished.
    catalogLog(`plugin pack: ${entry} missing in git tree for ${label}; trying published npm tarball`)
    const specs = version ? [`${name}@${version}`] : [name]
    for (const spec of new Set(specs)) {
      try {
        catalogLog(`plugin pack: npm fallback start ${spec}`)
        const packed = (packSpec ?? packNpmSpec)(spec, destinationDir)
        if (tarballContainsPath(packed, entry)) {
          catalogLog(`plugin pack: npm fallback packed ${spec} -> ${packed}`)
          return packed
        }
        catalogLog(`plugin pack: npm fallback ${spec} is missing ${entry}; continuing`)
      } catch {
        // Unpublished or version-mismatched git tip — try the next spec, then a local build.
        catalogLog(`plugin pack: npm fallback ${spec} failed; will try local build`)
      }
    }
  }

  if (!existsSync(entryPath)) {
    catalogLog(`plugin pack: local build start for ${label} (missing ${entry})`)
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    catalogLog(`plugin pack: npm install --ignore-scripts in ${directory}`)
    const install = npmInstall(directory, ['install', '--ignore-scripts'])
    if (install.status !== 0) {
      throw new Error(
        `cannot install build deps for ${name || directory}: ${(install.stderr || install.stdout || '').trim()}`
      )
    }
    const scripts = manifest.scripts && typeof manifest.scripts === 'object'
      ? /** @type {Record<string, unknown>} */ (manifest.scripts)
      : {}
    // Unpublished git tags (better-sidebar 0.18.1) often have an ESM-unsafe
    // `build` (`require()` in "type":"module") or a tsc types step that needs
    // host peers. `bundle`/`prepare` are usually `tsdown` and still emit main.
    const candidates = ['build', 'bundle', 'prepare'].filter(
      (script) => typeof scripts[script] === 'string'
    )
    if (candidates.length === 0) {
      throw new Error(
        `git plugin ${name || directory} is missing ${entry} and has no build script`
      )
    }
    const failures = []
    let usedScript = ''
    for (const script of candidates) {
      catalogLog(`plugin pack: local build npm run ${script} (${label})`)
      const built = spawnSync(npm, ['run', script], {
        cwd: directory,
        encoding: 'utf8',
        shell: process.platform === 'win32'
      })
      if (existsSync(entryPath)) {
        usedScript = script
        break
      }
      failures.push(
        `${script} (exit ${built.status}): ${(built.stderr || '').trim()}\n${(built.stdout || '').trim()}`
      )
    }
    if (!existsSync(entryPath)) {
      catalogError(`plugin pack: local build failed for ${label}`)
      throw new Error(
        `git plugin ${name || directory} failed to produce ${entry}: ${failures.join('\n')}`
      )
    }
    catalogLog(`plugin pack: local build produced ${entry} via npm run ${usedScript}`)
  } else {
    catalogLog(`plugin pack: packing git tree ${label} (${entry} present)`)
  }

  if (!existsSync(entryPath)) {
    throw new Error(`git plugin ${name || directory} still has no ${entry} after build`)
  }

  ensureBundledProductionDependencies(directory)
  const packed = packDirectoryAsTgz(directory, destinationDir)
  if (!tarballContainsPath(packed, entry)) {
    throw new Error(`packed ${name || directory} does not contain ${entry}`)
  }
  catalogLog(`plugin pack: packed git tree ${label} -> ${packed}`)
  return packed
}

/**
 * @param {string} spec
 * @param {string} destinationDir
 */
export function packNpmSpec(spec, destinationDir) {
  mkdirSync(destinationDir, { recursive: true })
  catalogLog(`npm pack start ${spec}`)
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const result = spawnSync(npm, ['pack', winShellArg(spec), '--pack-destination', winShellArg(destinationDir)], {
    cwd: destinationDir,
    encoding: 'utf8',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    throw new Error(`npm pack ${spec} failed: ${(result.stderr || result.stdout || '').trim()}`)
  }
  const line = (result.stdout || '')
    .trim()
    .split(/\r?\n/u)
    .filter(Boolean)
    .at(-1)
  if (!line) throw new Error(`npm pack ${spec} produced no tarball`)
  const packed = join(destinationDir, line.trim())
  catalogLog(`npm pack wrote ${packed}`)
  return repackTarballWithBundledDependencies(packed, destinationDir)
}

/**
 * Parse `https://github.com/owner/repo.git#ref` or `github:owner/repo#ref`.
 * @param {string} url
 */
export function parseGitSourceUrl(url) {
  const raw = url.trim()
  const hash = raw.indexOf('#')
  const head = hash === -1 ? raw : raw.slice(0, hash)
  const fragment = hash === -1 ? '' : raw.slice(hash + 1)
  let ref = 'HEAD'
  let subpath = ''
  for (const part of fragment.split('&')) {
    if (part.startsWith('path:/')) subpath = part.slice('path:/'.length)
    else if (part.startsWith('path:')) subpath = part.slice('path:'.length)
    else if (part !== '') ref = part
  }

  let ownerRepo
  const shortcut = /^github:([^#]+)/u.exec(head)
  if (shortcut) {
    ownerRepo = shortcut[1].replace(/\.git$/u, '')
  } else {
    const hosted = /github\.com[/:]([^/]+\/[^/#]+)/u.exec(head)
    if (!hosted) {
      throw new Error(`unsupported git url: ${url}`)
    }
    ownerRepo = hosted[1].replace(/\.git$/u, '')
  }
  return { ownerRepo, ref, subpath, archiveUrl: `https://codeload.github.com/${ownerRepo}/zip/${ref}` }
}

/**
 * @param {string} url
 * @param {string} destination
 */
/**
 * @param {string} url
 * @param {string} destination
 */
export async function downloadFile(url, destination) {
  const attempts = 3
  /** @type {unknown} */
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      catalogLog(`download start ${url} (attempt ${attempt}/${attempts})`)
      const response = await fetch(url)
      if (!response.ok || !response.body) {
        throw new Error(`download failed (${response.status} ${response.statusText}): ${url}`)
      }
      mkdirSync(dirname(destination), { recursive: true })
      await pipeline(response.body, createWriteStream(destination))
      catalogLog(`download wrote ${destination}`)
      return
    } catch (error) {
      lastError = error
      catalogError(`download failed ${url} (attempt ${attempt}/${attempts})`)
      if (existsSync(destination)) rmSync(destination, { force: true })
      if (attempt === attempts) break
      await new Promise((resolve) => setTimeout(resolve, 1500 * attempt))
    }
  }
  throw lastError
}

/**
 * @param {string} archive
 * @param {string} destination
 */
export function extractArchive(archive, destination) {
  mkdirSync(destination, { recursive: true })
  const result = spawnSync('tar', ['-xf', archive, '-C', destination], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`tar extract failed: ${(result.stderr || result.stdout || '').trim()}`)
  }
}

/**
 * @param {string} extractedRoot
 */
function firstExtractedDirectory(extractedRoot) {
  const entries = readdirSync(extractedRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
  if (entries.length === 1) return join(extractedRoot, entries[0].name)
  return extractedRoot
}

/**
 * @param {object} options
 * @param {string} options.url
 * @param {string} [options.path]
 * @param {string} options.workDir
 * @param {(url: string, destination: string) => Promise<void>} [options.download]
 */
export async function checkoutGitSource(options) {
  const parsed = parseGitSourceUrl(options.url)
  const archive = join(options.workDir, `${safeFileToken(parsed.ownerRepo)}-${safeFileToken(parsed.ref)}.zip`)
  catalogLog(`git download ${parsed.archiveUrl} -> ${archive}`)
  const download = options.download ?? downloadFile
  await download(parsed.archiveUrl, archive)
  catalogLog(`git downloaded archive ${archive}`)
  const extracted = join(options.workDir, 'extracted')
  extractArchive(archive, extracted)
  const root = firstExtractedDirectory(extracted)
  const nested = options.path || parsed.subpath
  const checkout = nested ? join(root, nested) : root
  catalogLog(`git checkout path ${checkout}`)
  return checkout
}

/**
 * @param {FlavorSource} source
 * @param {number|string} index
 * @param {import('./lib/installer-flavor.mjs').RegistrySnapshot} snapshot
 */
export function resolveSourceOrigin(source, index, snapshot) {
  if (source.from === 'market') {
    const resolved = resolveMarketPlugin({ id: source.id ?? '', version: source.version }, snapshot)
    if (resolved.from === 'git') {
      return {
        ...source,
        from: 'git',
        url: resolved.spec,
        spec: resolved.spec,
        resolvedName: resolved.plugin.name,
        fromMarket: true
      }
    }
    return {
      ...source,
      from: 'npm',
      spec: resolved.spec,
      resolvedName: resolved.plugin.name,
      fromMarket: true
    }
  }
  return source
}

/**
 * Expand `from: backup` sources into one origin per community plugin, then
 * resolve market ids. Other sources stay one-to-one.
 * @param {InstallerFlavor} flavor
 * @param {import('./lib/installer-flavor.mjs').RegistrySnapshot} snapshot
 * @param {Parameters<typeof prepareInstallerCatalog>[0]} options
 */
export function flavorSourceOrigins(flavor, snapshot, options = {}) {
  /** @type {Array<{ source: FlavorSource; index: number | string }>} */
  const origins = []
  for (const [index, raw] of flavor.sources.entries()) {
    if (raw.from === 'backup') {
      const plugins = expandBackupFlavorSource(raw, index, {
        flavorFilePath: flavor.filePath,
        projectRoot: options.projectRoot ?? projectRoot
      })
      for (const [pluginIndex, plugin] of plugins.entries()) {
        const nestedIndex = `${index}.${pluginIndex}`
        origins.push({
          source: resolveSourceOrigin(plugin, nestedIndex, snapshot),
          index: nestedIndex
        })
      }
      continue
    }
    origins.push({
      source: resolveSourceOrigin(raw, index, snapshot),
      index
    })
  }
  return origins
}

/**
 * Directories that contain SKILL.md. A folder that is itself a skill wins;
 * otherwise every nested skill folder is collected (a git skill repo / tree).
 * @param {string} directory
 * @returns {string[]}
 */
export function collectSkillRoots(directory) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) return []
  if (existsSync(join(directory, 'SKILL.md'))) return [directory]
  /** @type {string[]} */
  const roots = []
  const entries = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git')
    .sort((a, b) => a.name.localeCompare(b.name))
  for (const entry of entries) {
    roots.push(...collectSkillRoots(join(directory, entry.name)))
  }
  return roots
}

/**
 * @param {string} directory
 */
function findSkillRoot(directory) {
  const roots = collectSkillRoots(directory)
  if (roots.length === 0) throw new Error(`no SKILL.md under ${directory}`)
  return roots[0]
}

/**
 * @param {string} target
 */
function copySkill(target, destination) {
  const root = statSync(target).isDirectory() ? findSkillRoot(target) : undefined
  if (root === undefined) {
    if (basename(target) !== 'SKILL.md') {
      throw new Error(`skill file must be SKILL.md: ${target}`)
    }
    mkdirSync(destination, { recursive: true })
    cpSync(target, join(destination, 'SKILL.md'))
    return
  }
  mkdirSync(dirname(destination), { recursive: true })
  cpSync(root, destination, { recursive: true })
}

/**
 * @param {CatalogItem[]} items
 */
export function renderCatalogLabelsNsh(items) {
  const lines = [
    '; Generated by scripts/prepare-installer-catalog.mjs — do not edit.',
    `!define DSH_CATALOG_COUNT ${items.length}`,
    '!macro DshFillCatalogList HWND',
    items.length === 0
      ? '  ${NSD_LB_AddString} ${HWND} "Vanilla DSH Desktop"'
      : items
          .map((item) => `  \${NSD_LB_AddString} \${HWND} "${escapeNsisString(item.label)}"`)
          .join('\n'),
    '!macroend',
    ''
  ]
  return lines.join('\n')
}

/**
 * @param {CatalogManifest} manifest
 */
/**
 * App version from package.json — release builds stamp it from the release tag,
 * so a manifest built without an explicit version must follow the same source.
 * @param {string} [root]
 */
function appVersion(root = projectRoot) {
  try {
    const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    return typeof manifest.version === 'string' && manifest.version !== '' ? manifest.version : '0.0.0'
  } catch {
    return '0.0.0'
  }
}

export function emptyCatalogManifest(name = 'DSH Desktop', version = appVersion(), id = 'dsh-desktop') {
  return { name, version, id, items: /** @type {CatalogItem[]} */ ([]) }
}

/**
 * @param {object} options
 * @param {string} [options.projectRoot]
 * @param {string} [options.flavorPath]
 * @param {string} [options.registrySnapshotPath]
 * @param {InstallerFlavor} [options.flavor]
 * @param {(url: string, destination: string) => Promise<void>} [options.download]
 * @param {(spec: string, destinationDir: string) => string} [options.packSpec]
 * @param {boolean} [options.allowNetwork]
 */
export async function prepareInstallerCatalog(options = {}) {
  const root = options.projectRoot ?? projectRoot
  const paths = catalogOutputPaths(root)
  const flavorPath = options.flavorPath ?? resolveFlavorPath(root)
  const flavor = options.flavor ?? (existsSync(flavorPath)
    ? loadInstallerFlavor(flavorPath)
    : parseInstallerFlavor('name: DSH Desktop\nsources: []\n'))

  mkdirSync(join(root, 'build'), { recursive: true })
  emptyDir(paths.catalogDir)
  mkdirSync(paths.pluginsDir, { recursive: true })
  mkdirSync(paths.mcpDir, { recursive: true })
  mkdirSync(paths.skillsDir, { recursive: true })
  mkdirSync(paths.rulesDir, { recursive: true })

  const snapshotPath = options.registrySnapshotPath
    ?? process.env.DSH_INSTALLER_REGISTRY_SNAPSHOT
    ?? join(root, 'build', 'market-registry-snapshot.json')
  const needsSnapshot = flavor.sources.some((source) => source.from === 'market')
  if (needsSnapshot && !existsSync(snapshotPath)) {
    throw new Error(
      `flavor declares "from: market" sources but the registry snapshot is missing: ${snapshotPath}. ` +
        'Point DSH_INSTALLER_REGISTRY_SNAPSHOT at a snapshot file, or switch those sources to npm/git.'
    )
  }
  const snapshot = needsSnapshot ? loadRegistrySnapshot(snapshotPath) : { plugins: [] }

  /** @type {CatalogItem[]} */
  const items = []
  const workRoot = mkdtempSync(join(tmpdir(), 'dsh-installer-catalog-'))

  try {
    const origins = flavorSourceOrigins(flavor, snapshot, options)
    catalogLog(
      `start flavor=${flavor.name} version=${flavor.version} origins=${origins.length} (flavor sources=${flavor.sources.length}) -> ${paths.catalogDir}`
    )

    for (const { source, index } of origins) {
      if (source.kind === 'catalog') {
        catalogLog(`sources[${index}] start ${describeSource(source)}`)
        try {
          const nested = await materializeSourceTree(source, index, workRoot, options)
          const catalogFile = ['catalog.yml', 'installer-flavor.yml']
            .map((name) => join(nested, name))
            .find((file) => existsSync(file))
          if (!catalogFile) {
            throw new Error(`sources[${index}] kind: catalog has no catalog.yml`)
          }
          catalogLog(`sources[${index}] nested catalog ${catalogFile}`)
          const nestedFlavor = loadInstallerFlavor(catalogFile)
          for (const nested of flavorSourceOrigins(nestedFlavor, snapshot, options)) {
            items.push(
              ...(await vendorOneSource({
                source: nested.source,
                index: `${index}.${nested.index}`,
                flavor: nestedFlavor,
                paths,
                workRoot,
                options
              }))
            )
          }
          catalogLog(`sources[${index}] done nested catalog`)
        } catch (error) {
          catalogError(`sources[${index}] failed ${describeSource(source)}`)
          throw error
        }
        continue
      }
      items.push(
        ...(await vendorOneSource({
          source,
          index,
          flavor,
          paths,
          workRoot,
          options
        }))
      )
    }
  } finally {
    rmSync(workRoot, { recursive: true, force: true })
  }

  const manifest = {
    name: flavor.name,
    version: flavor.version,
    id: flavor.id ?? slugify(flavor.name),
    items
  }
  writeFileSync(paths.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  writeFileSync(paths.labelsPath, renderCatalogLabelsNsh(items))
  const pluginCount = items.filter((item) => item.kind === 'plugin').length
  const skillCount = items.filter((item) => item.kind === 'skill').length
  const mcpCount = items.filter((item) => item.kind === 'mcp').length
  const rulesCount = items.filter((item) => item.kind === 'rules').length
  catalogLog(
    `done ${items.length} item(s) (plugins=${pluginCount} skills=${skillCount} mcp=${mcpCount} rules=${rulesCount}) -> ${paths.catalogDir}`
  )
  return { manifest, paths }
}

/**
 * @param {FlavorSource} source
 * @param {number|string} index
 * @param {string} workRoot
 * @param {Parameters<typeof prepareInstallerCatalog>[0]} options
 */
async function materializeSourceTree(source, index, workRoot, options) {
  const slot = join(workRoot, `src-${index}`)
  mkdirSync(slot, { recursive: true })
  if (source.from === 'local') {
    const local = resolveFlavorLocalPath(
      source.path ?? '',
      /** @type {{ filePath?: string }} */ (source).filePath,
      options.projectRoot ?? projectRoot
    )
    if (!existsSync(local)) throw new Error(`sources[${index}] local path does not exist: ${local}`)
    return local
  }
  if (source.from === 'git') {
    return checkoutGitSource({
      url: source.url ?? '',
      path: source.path,
      workDir: slot,
      download: options.download
    })
  }
  if (source.from === 'npm') {
    const packed = (options.packSpec ?? packNpmSpec)(source.spec ?? '', slot)
    const extracted = join(slot, 'pkg')
    extractArchive(packed, extracted)
    const root = firstExtractedDirectory(extracted)
    return source.path ? join(root, source.path) : root
  }
  throw new Error(`sources[${index}] cannot materialize from: ${source.from}`)
}

/**
 * @param {object} input
 * @param {FlavorSource} input.source
 * @param {number|string} input.index
 * @param {InstallerFlavor} input.flavor
 * @param {ReturnType<typeof catalogOutputPaths>} input.paths
 * @param {string} input.workRoot
 * @param {Parameters<typeof prepareInstallerCatalog>[0]} input.options
 * @returns {Promise<CatalogItem[]>}
 */
async function vendorOneSource(input) {
  const { source, index, flavor, paths, workRoot, options } = input
  catalogLog(`sources[${index}] start ${describeSource(source)}`)
  try {
    if (source.from === 'backup') {
      throw new Error(`sources[${index}] backup must be expanded and packed at prepare time`)
    }
    if (source.from === 'market') {
      throw new Error(`sources[${index}] market must be resolved and packed at prepare time`)
    }
    const produced = await vendorResolvedSource({ source, index, flavor, paths, workRoot, options })
    const skillCount = produced.filter((item) => item.kind === 'skill').length
    const extra = skillCount > 0 ? ` skill_ids=${skillCount}` : ''
    catalogLog(`sources[${index}] done${extra}: ${produced.map(describeItem).join('; ') || '(empty)'}`)
    return produced
  } catch (error) {
    catalogError(`sources[${index}] failed ${describeSource(source)}`)
    if (!isRemoteVendorSource(source)) throw error
    const detail = error instanceof Error ? error.message : String(error)
    const origin = source.fromBackup ? 'backup plugin' : source.fromMarket ? 'market plugin' : `${source.from} ${source.kind}`
    const name = source.name ?? source.id ?? source.spec ?? source.url ?? ''
    throw new Error(`sources[${index}] ${origin} ${name} could not be downloaded or packed: ${detail}`)
  }
}

/**
 * Git / npm / market / backup-expanded sources must be fetched and packed
 * during prepare — never left as a URL or spec for first-run network install.
 * @param {FlavorSource} source
 */
function isRemoteVendorSource(source) {
  return source.from === 'git' || source.from === 'npm' || source.fromBackup === true || source.fromMarket === true
}

/**
 * @param {object} input
 * @param {FlavorSource} input.source
 * @param {number|string} input.index
 * @param {InstallerFlavor} input.flavor
 * @param {ReturnType<typeof catalogOutputPaths>} input.paths
 * @param {string} input.workRoot
 * @param {Parameters<typeof prepareInstallerCatalog>[0]} input.options
 * @returns {Promise<CatalogItem[]>}
 */
async function vendorResolvedSource(input) {
  const { source, index, flavor, paths, workRoot, options } = input
  const needsTree = source.from === 'local'
    || source.from === 'git'
    || (source.from === 'npm' && source.kind !== 'plugin')
  const tree = needsTree
    ? await materializeSourceTree(
        { ...source, filePath: flavor.filePath },
        index,
        workRoot,
        options
      )
    : undefined

  if (source.kind === 'plugin') {
    let packed
    let name
    let version
    if (source.from === 'npm' && tree === undefined) {
      packed = (options.packSpec ?? packNpmSpec)(source.spec ?? '', paths.pluginsDir)
      const extracted = join(workRoot, `read-${index}`)
      extractArchive(packed, extracted)
      const pkg = readPackageName(join(firstExtractedDirectory(extracted), 'package.json'))
      name = pkg.name
      version = pkg.version
    } else if (tree) {
      if (statSync(tree).isFile() && tree.endsWith('.tgz')) {
        const dest = join(paths.pluginsDir, basename(tree))
        cpSync(tree, dest)
        packed = dest
        name = source.id ?? source.name ?? basename(tree, '.tgz')
        version = source.version ?? '0.0.0'
      } else {
        const pkg = readPackageName(join(tree, 'package.json'))
        name = pkg.name
        version = pkg.version
        packed = packPluginDirectory(tree, paths.pluginsDir, options.packSpec)
      }
    } else {
      throw new Error(`sources[${index}] plugin is missing a resolvable tree`)
    }
    const id = source.id ?? name
    return [{
      kind: 'plugin',
      id,
      name,
      version,
      label: catalogListLabel('plugin', name),
      file: relative(paths.catalogDir, packed).replaceAll('\\', '/'),
      digest: fileSha256(packed)
    }]
  }

  if (source.kind === 'mcp') {
    const id = source.id ?? `mcp-${index}`
    /** @type {CatalogItem} */
    const item = {
      kind: 'mcp',
      id,
      label: catalogListLabel('mcp', id),
      transport: source.transport ?? 'stdio',
      command: source.command,
      args: Array.isArray(source.args) ? source.args : undefined,
      url: typeof source.url === 'string' && source.from !== 'git' ? source.url : undefined,
      connector: source.connector
    }
    if (tree && statSync(tree).isDirectory() && existsSync(join(tree, 'package.json'))) {
      const packed = packDirectoryAsTgz(tree, paths.mcpDir)
      item.file = relative(paths.catalogDir, packed).replaceAll('\\', '/')
      item.digest = fileSha256(packed)
      const pkg = readPackageName(join(tree, 'package.json'))
      item.name = pkg.name
      item.version = pkg.version
    } else if (tree && statSync(tree).isFile() && tree.endsWith('.tgz')) {
      const dest = join(paths.mcpDir, basename(tree))
      cpSync(tree, dest)
      item.file = relative(paths.catalogDir, dest).replaceAll('\\', '/')
      item.digest = fileSha256(dest)
    }
    return [item]
  }

  if (source.kind === 'skill') {
    if (!tree) throw new Error(`sources[${index}] skill needs a local, git, or npm tree`)
    if (statSync(tree).isFile()) {
      catalogLog(`sources[${index}] skill: copying 1 SKILL.md file`)
      const id = source.id ?? 'skill'
      const dest = join(paths.skillsDir, safeFileToken(id))
      copySkill(tree, dest)
      return [{
        kind: 'skill',
        id,
        label: catalogListLabel('skill', id),
        path: relative(paths.catalogDir, dest).replaceAll('\\', '/')
      }]
    }
    const roots = collectSkillRoots(tree)
    if (roots.length === 0) {
      throw new Error(`sources[${index}] skill has no SKILL.md under ${tree}`)
    }
    catalogLog(`sources[${index}] skill: copying ${roots.length} SKILL.md root(s) under ${tree}`)
    return roots.map((root) => {
      const id = roots.length === 1 && source.id ? source.id : basename(root)
      const dest = join(paths.skillsDir, safeFileToken(id))
      copySkill(root, dest)
      return {
        kind: 'skill',
        id,
        label: catalogListLabel('skill', id),
        path: relative(paths.catalogDir, dest).replaceAll('\\', '/')
      }
    })
  }

  if (source.kind === 'rules') {
    if (!tree) throw new Error(`sources[${index}] rules need a local, git, or npm path`)
    const sourceFile = statSync(tree).isDirectory()
      ? ['AGENTS.md', 'cordis.patch.yml'].map((name) => join(tree, name)).find((file) => existsSync(file))
      : tree
    if (!sourceFile || !existsSync(sourceFile)) {
      throw new Error(`sources[${index}] rules path has no AGENTS.md or cordis.patch.yml`)
    }
    const destName = basename(sourceFile)
    const dest = join(paths.rulesDir, destName)
    cpSync(sourceFile, dest)
    return [{
      kind: 'rules',
      id: source.id ?? destName,
      label: catalogListLabel('rules', destName),
      path: relative(paths.catalogDir, dest).replaceAll('\\', '/')
    }]
  }

  throw new Error(`sources[${index}] has unsupported kind: ${source.kind}`)
}

function invokedDirectly() {
  const entry = process.argv[1]
  if (!entry) return false
  return pathToFileURL(resolve(entry)).href === import.meta.url
}

if (invokedDirectly()) {
  catalogLog('CLI start')
  const prepared = await prepareInstallerCatalog()
  const count = prepared.manifest.items.length
  catalogLog(
    count === 0
      ? `Installer catalog is vanilla (${prepared.manifest.name} ${prepared.manifest.version}).`
      : `Installer catalog wrote ${count} item(s) for ${prepared.manifest.name} ${prepared.manifest.version}.`
  )
}
