import { spawn, spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { cp, lstat, mkdir, readFile, readdir, realpath, rename, rm, unlink, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ensureRegistryDirectories, generationId, writeGenerationMeta } from './registry.mjs'

/**
 * Install one plugin as its own immutable generation.
 *
 * pnpm runs in a fresh staging directory, the tree is promoted by a single
 * rename into a path the id guarantees is new, and nothing writes into it
 * afterward. On Windows that keeps the operation clear of the one thing pnpm
 * cannot do there — rename over an existing directory — which is what wedges a
 * shared hoisted install into a no-progress spin.
 *
 * Two things a standalone install gets wrong that this corrects before
 * promotion:
 *
 *   1. pnpm resolves the transitive closure of a plugin's @deepseek-ai peers
 *      and installs it privately too. The host owns those, so every one that
 *      matches a host-singleton pattern is deleted from the generation —
 *      resolution then walks up to the shared copy. A `file:` spec (installer
 *      catalog tarball, copied tree) never reaches the registry: the tarball is
 *      unpacked locally. Host peers such as `@deepseek-ai/dsh-client-ui-primitives`
 *      therefore cannot pull `micromark-*` from registry.npmjs.org on first launch.
 *
 *   2. with no host present during the install, pnpm drops a copy of every
 *      unmet peer (react included) straight into node_modules. A second React
 *      instance breaks hooks, so the hoist is unconditional. Staging `.npmrc`
 *      also sets `auto-install-peers=false` for the remaining git/npm path.
 */

/** Packages the host is the sole owner of; a generation must never carry its own copy. */
const HOST_SINGLETON_PATTERNS = [/^react$/u, /^react-dom$/u, /^@deepseek-ai\//u]

const PACKAGE_NAME_PATTERN = /^(?:@[A-Za-z0-9-~][A-Za-z0-9._~-]*\/)?[A-Za-z0-9-~][A-Za-z0-9._~-]*$/u
const GIT_ALLOW_BUILD_PATTERN = /^[A-Za-z0-9@/_.-]+@git\+https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\.git$/u
const CODELOAD_ALLOW_BUILD_PATTERN = /^[A-Za-z0-9@/_.-]+@https:\/\/codeload\.github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/tar\.gz\/[0-9a-f]{40}$/u
const PINNED_GITHUB_TARGET_PATTERN = /^github:(?<owner>[A-Za-z0-9_.-]+)\/(?<repo>[A-Za-z0-9_.-]+)#(?<sha>[0-9a-f]{40})(?<subpath>&path:\/(?:(?!\.\.?\/)[A-Za-z0-9_.-]+\/)*(?!\.\.?$)[A-Za-z0-9_.-]+)?$/u
const PINNED_GIT_APPROVAL_PATTERN = /@git\+ssh:\/\/git@github\.com\//u
const GENERATION_INSTALL_TIMEOUT_MS = 90 * 1000

function isHostSingleton(name) {
  return HOST_SINGLETON_PATTERNS.some((pattern) => pattern.test(name))
}

export function isFilePluginSpec(spec) {
  return typeof spec === 'string' && spec.startsWith('file:')
}

export function filePluginSpecPath(spec) {
  const raw = spec.slice('file:'.length)
  if (raw.startsWith('//')) {
    try {
      return fileURLToPath(spec)
    } catch {
      return raw
    }
  }
  return raw
}

function isTarballPath(path) {
  return /\.(?:tgz|tar\.gz)$/iu.test(path)
}

function packageDirForName(modulesDir, name) {
  return join(modulesDir, ...name.split('/'))
}

function extractTarballSync(archive, destination) {
  const result = spawnSync('tar', ['-xf', archive, '-C', destination], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(
      `failed to extract ${archive}: ${(result.stderr || result.stdout || '').trim()}`
    )
  }
}

async function resolveExtractedPackageDir(root) {
  const nested = join(root, 'package')
  if (existsSync(join(nested, 'package.json'))) return nested
  if (existsSync(join(root, 'package.json'))) return root
  const entries = await readdir(root, { withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const candidate = join(root, entry.name)
    if (existsSync(join(candidate, 'package.json'))) return candidate
  }
  throw new Error(`vendored plugin tarball has no package.json under ${root}`)
}

async function copyMissingProductionDependencies(packageDir, modulesDir, hostNodeModulesPath) {
  if (!hostNodeModulesPath || !existsSync(hostNodeModulesPath)) return []
  let manifest
  try {
    manifest = JSON.parse(await readFile(join(packageDir, 'package.json'), 'utf8'))
  } catch {
    return []
  }
  const copied = []
  const pending = Object.keys(manifest.dependencies ?? {}).filter((name) => !isHostSingleton(name))
  const seen = new Set()
  while (pending.length > 0) {
    const name = pending.pop()
    if (seen.has(name) || isHostSingleton(name)) continue
    seen.add(name)
    const dest = packageDirForName(modulesDir, name)
    if (!existsSync(join(dest, 'package.json'))) {
      const source = packageDirForName(hostNodeModulesPath, name)
      if (!existsSync(join(source, 'package.json'))) continue
      await mkdir(dirname(dest), { recursive: true })
      await cp(source, dest, { recursive: true, dereference: true })
      copied.push(name)
    }
    try {
      const nested = JSON.parse(await readFile(join(dest, 'package.json'), 'utf8'))
      pending.push(...Object.keys(nested.dependencies ?? {}))
    } catch {
      // ignore unreadable nested manifests
    }
  }
  return copied
}

/**
 * Materialize a `file:` plugin into staging without invoking the npm registry.
 * Catalog tarballs and copied trees are already on disk; `pnpm add file:*.tgz`
 * would still fetch host peers (and their markdown stack) from npmjs.
 */
async function materializeFilePlugin(stagingDir, pluginSpec, pluginName, options) {
  const sourcePath = filePluginSpecPath(pluginSpec)
  if (!existsSync(sourcePath)) {
    return { code: 1, output: `vendored plugin path is missing: ${sourcePath}` }
  }
  const extractRoot = join(stagingDir, '.file-extract')
  try {
    let packageSource
    if (isTarballPath(sourcePath)) {
      await mkdir(extractRoot, { recursive: true })
      extractTarballSync(sourcePath, extractRoot)
      packageSource = await resolveExtractedPackageDir(extractRoot)
    } else {
      packageSource = sourcePath
    }
    const manifest = JSON.parse(await readFile(join(packageSource, 'package.json'), 'utf8'))
    const name = PACKAGE_NAME_PATTERN.test(pluginName)
      ? pluginName
      : typeof manifest.name === 'string'
        ? manifest.name
        : ''
    if (!PACKAGE_NAME_PATTERN.test(name)) {
      return { code: 1, output: `vendored plugin has no safe package name: ${pluginName}` }
    }
    const dest = packageDirForName(join(stagingDir, 'node_modules'), name)
    await mkdir(dirname(dest), { recursive: true })
    await cp(packageSource, dest, { recursive: true, dereference: true })
    const copied = await copyMissingProductionDependencies(
      dest,
      join(stagingDir, 'node_modules'),
      options.hostNodeModulesPath
    )
    const version = typeof manifest.version === 'string' ? manifest.version : '0.0.0'
    await writeFile(
      join(stagingDir, 'pnpm-lock.yaml'),
      [
        "lockfileVersion: '9.0'",
        '# dsh-desktop vendored file: install — no registry resolution',
        'importers:',
        '  .:',
        '    dependencies:',
        `      ${JSON.stringify(name)}:`,
        `        specifier: ${JSON.stringify(pluginSpec)}`,
        `        version: ${JSON.stringify(version)}`,
        ''
      ].join('\n'),
      'utf8'
    )
    await rm(extractRoot, { recursive: true, force: true }).catch(() => undefined)
    const extra = copied.length > 0 ? `; copied ${copied.length} host production dep(s)` : ''
    return {
      code: 0,
      output: `vendored file install of ${name}@${version}${extra}`,
      pluginName: name
    }
  } catch (error) {
    await rm(extractRoot, { recursive: true, force: true }).catch(() => undefined)
    return { code: 1, output: error instanceof Error ? error.message : String(error) }
  }
}

function installationClosureDir(dshHome) {
  return join(dshHome, 'profiles', 'node_modules')
}

function safeBuildApprovalKey(key) {
  return PACKAGE_NAME_PATTERN.test(key) ||
    GIT_ALLOW_BUILD_PATTERN.test(key) ||
    CODELOAD_ALLOW_BUILD_PATTERN.test(key)
}

/**
 * Read only explicit, safe `allowBuilds: ...: true` entries from a Profile
 * workspace file. Generation installs run in a separate pnpm workspace, so
 * an approval written by dsh-market has to cross that boundary deliberately.
 * No other Profile workspace setting is inherited: patchedDependencies and
 * relative package globs would be invalid inside the immutable staging tree.
 */
export function generationBuildApprovals(workspaceYaml) {
  if (typeof workspaceYaml !== 'string' || workspaceYaml === '') return []
  const blockPattern = /allowBuilds:[ \t]*\r?\n((?:[ \t]+[^\r\n]*\r?\n?)*)/gu
  const approved = new Set()
  for (const block of workspaceYaml.matchAll(blockPattern)) {
    for (const line of block[1].split(/\r?\n/u)) {
      const match = /^[ \t]+(\S.*?)\s*:\s*(true|false)\s*$/u.exec(line)
      if (match === null || match[2] !== 'true') continue
      let key = match[1]
      if (
        key.length >= 2 &&
        ((key.startsWith("'") && key.endsWith("'")) ||
          (key.startsWith('"') && key.endsWith('"')))
      ) {
        key = key.slice(1, -1)
      }
      if (safeBuildApprovalKey(key)) approved.add(key)
    }
  }
  return [...approved]
}

/**
 * pnpm 10 matches a git prepare approval against its normalized, commit-pinned
 * SSH resolution id. dsh-market deliberately records stable HTTPS/codeload
 * identities instead, so derive the narrower runtime key only when the same
 * package and repository were already approved by the user.
 */
export function pinnedGitBuildApproval(pluginName, pluginSpec, approvals) {
  if (!PACKAGE_NAME_PATTERN.test(pluginName)) return undefined
  const target = PINNED_GITHUB_TARGET_PATTERN.exec(pluginSpec)
  if (target?.groups === undefined) return undefined
  const { owner, repo, sha, subpath = '' } = target.groups
  const stable = `${pluginName}@git+https://github.com/${owner}/${repo}.git`
  const codeload = `${pluginName}@https://codeload.github.com/${owner}/${repo}/tar.gz/${sha}`
  if (!approvals.includes(stable) && !approvals.includes(codeload)) return undefined
  return `${pluginName}@git+ssh://git@github.com/${owner}/${repo}.git#${sha}${subpath}`
}

async function stageBuildApprovals(
  dshHome,
  stagingDir,
  profile = 'web',
  pluginName,
  pluginSpec
) {
  const source = join(dshHome, 'profiles', profile, 'pnpm-workspace.yaml')
  let yaml
  try {
    yaml = await readFile(source, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
  const approvals = generationBuildApprovals(yaml)
  const pinned = pinnedGitBuildApproval(pluginName, pluginSpec, approvals)
  const stagedApprovals = pinned === undefined ? approvals : [...approvals, pinned]
  if (stagedApprovals.length === 0) return []
  const lines = [
    'packages:',
    '  - .',
    '',
    'allowBuilds:',
    ...stagedApprovals.map((key) => `  ${JSON.stringify(key)}: true`),
    ''
  ]
  await writeFile(join(stagingDir, 'pnpm-workspace.yaml'), lines.join('\n'), 'utf8')
  return stagedApprovals
}

async function defaultRunInstall(options, stagingDir) {
  const spawnProcess = options.spawnProcess ?? spawn
  const args = [options.pnpmEntryPath, 'add', options.pluginSpec]
  if (options.offline === true) args.push('--offline')
  return new Promise((resolve) => {
    const child = spawnProcess(
      options.nodeExecutablePath,
      args,
      {
        cwd: stagingDir,
        env: {
          ...(options.environment ?? process.env),
          CI: 'true',
          NO_COLOR: '1',
          npm_config_side_effects_cache: 'false',
          npm_config_auto_install_peers: 'false'
        },
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      }
    )
    let output = ''
    const collect = (chunk) => {
      output = `${output}${chunk.toString()}`.slice(-64 * 1024)
      options.onOutput?.(chunk.toString())
    }
    child.stdout?.on('data', collect)
    child.stderr?.on('data', collect)
    // Do not leave a launch or generation operation stalled indefinitely; the
    // caller may override this ceiling when a longer explicit operation is
    // appropriate.
    const timer = setTimeout(
      () => child.kill('SIGKILL'),
      options.installTimeoutMs ?? GENERATION_INSTALL_TIMEOUT_MS
    )
    options.registerChild?.(child)
    child.once('close', (code) => {
      clearTimeout(timer)
      resolve({ code: code ?? 1, output })
    })
    child.once('error', (error) => {
      clearTimeout(timer)
      resolve({ code: 1, output: `${output}\n${error.message}` })
    })
  })
}

/**
 * Delete every host-singleton package from every nested node_modules in a
 * generation. Returns what was removed.
 */
async function hoistHostSingletons(generationDir) {
  const removed = []
  await walkGenerationPackages(generationDir, {
    async onPackage() {},
    async onSingleton(name, path, info) {
      // Never follow a package link while removing it. A hostile or malformed
      // tarball can otherwise point a singleton name outside staging.
      if (info.isSymbolicLink()) await unlink(path)
      else await rm(path, { recursive: true, force: true })
      removed.push(name)
    },
    async onUnsafePath(detail) {
      throw new Error(`generation package tree is not self-contained: ${detail}`)
    }
  })
  return removed
}

/** The one diagnostic line worth surfacing from a failed pnpm run. */
function diagnosticLine(output) {
  const lines = output
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
  const named = lines.filter((line) => /EPERM|EBUSY|EEXIST|ENOENT|ERR_PNPM|error/iu.test(line))
  return (named.at(-1) ?? lines.at(-1))?.slice(0, 400)
}

export async function installGeneration(options) {
  const { dshHome, pluginSpec, onTrace } = options
  const trace = (line) => onTrace?.(`generation-install: ${line}`)
  const layout = await ensureRegistryDirectories(dshHome)
  let pluginName = options.expectedPluginName ?? (pluginSpec.replace(/@[^@/]+$/u, '') || pluginSpec)

  const stagingDir = join(layout.staging, randomUUID())
  await mkdir(stagingDir, { recursive: true })
  await writeFile(
    join(stagingDir, 'package.json'),
    `${JSON.stringify({ name: 'dsh-generation', private: true, version: '0.0.0' }, undefined, 2)}\n`
  )
  // node-linker=hoisted keeps every package a real directory under the
  // generation's own node_modules — no links into a `.pnpm` store that the
  // promotion rename would strand. auto-install-peers=false stops pnpm from
  // fetching host @deepseek-ai peers (and micromark) from the public registry.
  const npmrc = [
    'node-linker=hoisted',
    'side-effects-cache=false',
    'auto-install-peers=false',
    'strict-peer-dependencies=false',
    ...(options.offline === true ? ['offline=true'] : []),
    ''
  ]
  await writeFile(join(stagingDir, '.npmrc'), npmrc.join('\n'))

  const cleanupStaging = () => rm(stagingDir, { recursive: true, force: true }).catch(() => undefined)

  try {
    const approvals = await stageBuildApprovals(
      dshHome,
      stagingDir,
      options.profile ?? 'web',
      pluginName,
      pluginSpec
    )
    if (approvals.length > 0) {
      trace(`forwarded ${approvals.length} approved build-script key(s) into staging`)
    }
    let installSpec = pluginSpec
    if (options.sourceDirectory !== undefined) {
      const sourceCopy = join(stagingDir, 'source', pluginName.replace(/^@/u, '').replace(/[/\\]/gu, '+'))
      await mkdir(join(stagingDir, 'source'), { recursive: true })
      await cp(options.sourceDirectory, sourceCopy, { recursive: true, dereference: true })
      installSpec = `file:${sourceCopy}`
    }
    trace(`installing ${options.sourceSpec ?? pluginSpec} into staging`)
    // A git subpackage can declare a pnpm version different from its workspace
    // root (the dsh-web remote UI currently does). Once this exact source has
    // been approved, let pnpm follow its own documented compatibility path
    // instead of failing before the authorized prepare script can run.
    const approvedGitPrepare = approvals.some((key) => PINNED_GIT_APPROVAL_PATTERN.test(key))
    const installEnvironment = approvedGitPrepare
      ? {
          ...(options.environment ?? process.env),
          npm_config_pm_on_fail: 'ignore',
          PNPM_CONFIG_PM_ON_FAIL: 'ignore'
        }
      : options.environment
    const runInstall = options.runInstall ?? ((dir) =>
      isFilePluginSpec(installSpec)
        ? materializeFilePlugin(dir, installSpec, pluginName, options)
        : defaultRunInstall({
          ...options,
          environment: installEnvironment,
          pluginSpec: installSpec
        }, dir))
    const started = Date.now()
    const { code, output, pluginName: installedName } = await runInstall(stagingDir)
    if (installedName && PACKAGE_NAME_PATTERN.test(installedName)) pluginName = installedName
    if (code !== 0) {
      trace(`install exited ${code} after ${Date.now() - started}ms`)
      for (const line of output.split(/\r?\n/u).slice(-8)) {
        if (line.trim()) trace(`output| ${line.trim()}`)
      }
      await cleanupStaging()
      return { ok: false, detail: diagnosticLine(output) ?? `pnpm exited ${code}` }
    }
    trace(`installed in ${Date.now() - started}ms`)

    const installedManifestPath = join(stagingDir, 'node_modules', pluginName, 'package.json')
    if (!existsSync(installedManifestPath)) {
      await cleanupStaging()
      return { ok: false, detail: `pnpm reported success but ${pluginName} is not on disk` }
    }
    const manifest = JSON.parse(await readFile(installedManifestPath, 'utf8'))
    const version = typeof manifest.version === 'string' ? manifest.version : '0.0.0'

    const hoisted = await hoistHostSingletons(stagingDir)
    if (hoisted.length > 0) {
      trace(`hoisted ${hoisted.length} host singletons: ${hoisted.slice(0, 6).join(', ')}…`)
    }

    const lockfileText = await readFile(join(stagingDir, 'pnpm-lock.yaml'), 'utf8').catch(() => randomUUID())
    const id = generationId(pluginName, version, lockfileText)
    const generationDir = join(layout.generations, id)

    if (existsSync(generationDir)) {
      trace(`generation ${id} already exists, reusing`)
      await cleanupStaging()
    } else {
      await writeGenerationMeta(stagingDir, {
        pluginName,
        version,
        ...(options.sourceSpec === undefined ? {} : { sourceSpec: options.sourceSpec })
      })
      await rename(stagingDir, generationDir)
      trace(`promoted to ${id}`)
    }

    return { ok: true, hoisted, generation: { id, pluginName, version, directory: generationDir } }
  } catch (error) {
    await cleanupStaging()
    return { ok: false, detail: error instanceof Error ? error.message : String(error) }
  }
}

function isInsideDirectory(parent, candidate) {
  const path = relative(parent, candidate)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

async function pathInfo(path, missingAllowed = false) {
  try {
    return await lstat(path)
  } catch (error) {
    if (missingAllowed && error?.code === 'ENOENT') return undefined
    throw error
  }
}

/**
 * Walk package boundaries in every nested node_modules without following a
 * symlink or allowing a real directory to escape the immutable generation.
 */
async function walkGenerationPackages(generationDir, visitor) {
  const rootInfo = await pathInfo(generationDir)
  if (rootInfo.isSymbolicLink() || !rootInfo.isDirectory()) {
    await visitor.onUnsafePath(`generation root is not a real directory: ${generationDir}`)
    return
  }
  const root = await realpath(generationDir)

  const safeDirectoryEntries = async (directory, missingAllowed, description) => {
    const info = await pathInfo(directory, missingAllowed)
    if (info === undefined) return undefined
    if (info.isSymbolicLink() || !info.isDirectory()) {
      await visitor.onUnsafePath(`${description} is not a real directory: ${directory}`)
      return undefined
    }
    const resolved = await realpath(directory)
    if (!isInsideDirectory(root, resolved)) {
      await visitor.onUnsafePath(`${description} resolves outside the generation: ${resolved}`)
      return undefined
    }
    return readdir(directory, { withFileTypes: true })
  }

  const walkPackage = async (name, packagePath) => {
    const info = await pathInfo(packagePath)
    if (isHostSingleton(name)) {
      await visitor.onSingleton(name, packagePath, info)
      return
    }
    if (info.isSymbolicLink() || !info.isDirectory()) {
      await visitor.onUnsafePath(`package ${name} is not a real directory: ${packagePath}`)
      return
    }
    const resolved = await realpath(packagePath)
    if (!isInsideDirectory(root, resolved)) {
      await visitor.onUnsafePath(`package ${name} resolves outside the generation: ${resolved}`)
      return
    }
    await visitor.onPackage(name, packagePath, root)
    await walkModules(join(packagePath, 'node_modules'), true)
  }

  const walkScope = async (scopeName, scopePath) => {
    const info = await pathInfo(scopePath)
    if (scopeName === '@deepseek-ai' && (info.isSymbolicLink() || !info.isDirectory())) {
      await visitor.onSingleton('@deepseek-ai/*', scopePath, info)
      return
    }
    const entries = await safeDirectoryEntries(scopePath, false, `package scope ${scopeName}`)
    if (entries === undefined) return
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      await walkPackage(`${scopeName}/${entry.name}`, join(scopePath, entry.name))
    }
  }

  async function walkModules(modules, missingAllowed) {
    const entries = await safeDirectoryEntries(modules, missingAllowed, 'node_modules')
    if (entries === undefined) return
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === '.bin') continue
      const path = join(modules, entry.name)
      if (entry.name.startsWith('@')) await walkScope(entry.name, path)
      else await walkPackage(entry.name, path)
    }
  }

  await walkModules(join(generationDir, 'node_modules'), false)
}

async function installedPackageManifestPaths(generationDir) {
  const manifests = []
  const problems = []
  await walkGenerationPackages(generationDir, {
    async onPackage(name, packagePath, root) {
      const manifestPath = join(packagePath, 'package.json')
      const info = await pathInfo(manifestPath, true)
      if (info === undefined) {
        problems.push(`${name} has no package manifest`)
        return
      }
      if (info.isSymbolicLink() || !info.isFile()) {
        problems.push(`${name} package manifest is not a real file: ${manifestPath}`)
        return
      }
      const resolved = await realpath(manifestPath)
      if (!isInsideDirectory(root, resolved)) {
        problems.push(`${name} package manifest resolves outside the generation: ${resolved}`)
        return
      }
      manifests.push(manifestPath)
    },
    async onSingleton(name, path) {
      problems.push(`private host singleton ${name} is present in the generation at ${path}`)
    },
    async onUnsafePath(detail) {
      problems.push(detail)
    }
  })
  return { manifests, problems }
}

/** Verify every installed package's required runtime dependency stays in an allowed closure. */
export async function verifyGenerationPeers(dshHome, generation) {
  const { createRequire } = await import('node:module')
  const generationRoot = await realpath(generation.directory)
  const closure = await realpath(installationClosureDir(dshHome)).catch(
    () => installationClosureDir(dshHome)
  )
  const packageRoot = join(generation.directory, 'node_modules', generation.pluginName)
  const manifestPath = join(packageRoot, 'package.json')
  if (!existsSync(manifestPath)) return { ok: false, problems: ['plugin package root missing'] }

  const problems = []
  const scanned = await installedPackageManifestPaths(generation.directory)
  problems.push(...scanned.problems)
  const manifests = scanned.manifests
  if (!manifests.includes(manifestPath)) {
    problems.push('plugin package root is not a self-contained package directory')
  }
  for (const currentManifestPath of manifests) {
    const manifest = JSON.parse(await readFile(currentManifestPath, 'utf8'))
    if (currentManifestPath === manifestPath && manifest.name !== generation.pluginName) {
      problems.push(
        `plugin package manifest name does not match generation metadata: ` +
          `${String(manifest.name)} != ${generation.pluginName}`
      )
    }
    const owner = typeof manifest.name === 'string' ? manifest.name : currentManifestPath
    const prefix = currentManifestPath === manifestPath ? '' : `${owner}: `
    const requireFromPackage = createRequire(currentManifestPath)
    const peerDependencies = manifest.peerDependencies ?? {}
    const dependencies = manifest.dependencies ?? {}
    const optionalDependencies = manifest.optionalDependencies ?? {}
    const candidates = new Set(
      [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
        ...Object.keys(optionalDependencies)
      ]
    )
    for (const dependency of candidates) {
      let resolved
      try {
        resolved = requireFromPackage.resolve(dependency)
      } catch {
        resolved = undefined
      }
      const requiredDependency =
        Object.hasOwn(dependencies, dependency) && !Object.hasOwn(optionalDependencies, dependency)
      const requiredPeer =
        Object.hasOwn(peerDependencies, dependency) &&
        manifest.peerDependenciesMeta?.[dependency]?.optional !== true
      const optional = !requiredDependency && !requiredPeer
      if (resolved === undefined) {
        if (!optional) {
          problems.push(
            isHostSingleton(dependency)
              ? `${prefix}${dependency} does not resolve from the installation closure`
              : `${prefix}${dependency} does not resolve from the generation or installation closure`
          )
        }
        continue
      }
      const realResolved = await realpath(resolved).catch(() => resolved)
      const insideClosure = isInsideDirectory(closure, realResolved)
      if (isHostSingleton(dependency)) {
        if (!insideClosure) {
          problems.push(
            `${prefix}${dependency} resolves outside the installation closure: ${realResolved}`
          )
        }
      } else if (!insideClosure && !isInsideDirectory(generationRoot, realResolved)) {
        problems.push(
          `${prefix}${dependency} resolves outside the generation and installation closure: ${realResolved}`
        )
      }
    }
  }
  return { ok: problems.length === 0, problems }
}
