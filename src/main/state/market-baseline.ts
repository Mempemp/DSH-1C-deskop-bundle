import { copyFile, lstat, mkdir, readFile, readlink, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { healProfilesModuleFallback } from '@deepseek-ai/dsh-app-boot'
import { listGenerations, readDesired, writeDesired } from 'dsh-desktop-market-installer/generations/registry'
import { compareSemver, parseSemver, readInstalledPluginVersion } from './plugin-market-check'
import { profilePackageJsonPath } from './plugin-recovery'
import { clearProfileInstallMarker } from './profile-install-marker'
import {
  upgradeMarketInSharedTree,
  type MarketSharedTreeUpgradeOptions,
  type PluginUpgradeResult
} from './plugin-upgrade'

export const VERIFIED_MARKET_BASELINE = '1.47.0'

const MARKET_PACKAGE = 'dshmarket'

interface MarketManifest {
  dependencies?: Record<string, string>
  dsh?: {
    desktop?: {
      generationProjection?: {
        plugins?: Record<string, { visibleVersion?: string; previousOverride?: { present?: boolean; value?: string } }>
      }
    }
    profile?: { bundles?: string[] }
  }
  pnpm?: { overrides?: Record<string, string> }
}

/**
 * Undo any projection of dshmarket as a generation — before generation
 * projection runs.
 *
 * dshmarket is a core bundle that must always be a real directory in the
 * shared tree (`KEEP_IN_SHARED_TREE` in generation-migration.ts). A stray
 * `desired.json` entry for it is otherwise re-linked by `projectGenerations`
 * on *every* launch, which is why an incompatible build kept coming back
 * after each repair: the repair ran after projection had already recreated
 * the link, or never ran at all because an unrelated pending plugin removal
 * had deferred maintenance.
 *
 * This only rewrites declarations and drops the link; the shared-tree install
 * that follows is `ensureMarketBaseline`'s job. Harness must be stopped.
 * @returns whether anything had to be undone.
 */
export async function demoteMarketGeneration(
  dshHome: string,
  note?: (line: string) => void
): Promise<boolean> {
  const manifestPath = profilePackageJsonPath(dshHome)
  let raw: string
  try {
    raw = await readFile(manifestPath, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw error
  }
  const manifest = JSON.parse(raw) as MarketManifest
  const marketPath = join(dirname(manifestPath), 'node_modules', MARKET_PACKAGE)

  const owned = manifest.dsh?.desktop?.generationProjection?.plugins?.[MARKET_PACKAGE]
  const linked = await lstat(marketPath)
    .then(async (info) => {
      if (!info.isSymbolicLink()) return false
      const target = await readlink(marketPath)
      return target.includes('.generations')
    })
    .catch(() => false)
  const [desired, generations] = await Promise.all([readDesired(dshHome), listGenerations(dshHome)])
  const marketGenerations = new Set(
    generations.filter((generation) => generation.pluginName === MARKET_PACKAGE).map((generation) => generation.id)
  )
  const desiredMarket = desired.filter((id) => marketGenerations.has(id))
  if (owned === undefined && !linked && desiredMarket.length === 0) return false

  note?.(`[market-baseline] dshmarket is projected as a generation; restoring it to the shared tree`)

  // Keep the declaration: dropping it would read as "the market was
  // uninstalled" and every later repair would decline to reinstall it.
  // If a newer version >= VERIFIED_MARKET_BASELINE was installed, preserve it
  // rather than forcing a fallback to VERIFIED_MARKET_BASELINE.
  let actualInstalledVersion: string | undefined
  try {
    actualInstalledVersion = await readInstalledPluginVersion(dshHome, MARKET_PACKAGE)
  } catch {
    // unreadable or missing
  }
  const isMeetsBaseline = (v?: string): boolean => {
    const clean = v?.replace(/^[~^v=><\s]+/g, '')
    return !!clean && !!parseSemver(clean) && compareSemver(clean, VERIFIED_MARKET_BASELINE) >= 0
  }

  const candidateVersion =
    owned?.visibleVersion ??
    (isMeetsBaseline(actualInstalledVersion) ? actualInstalledVersion : undefined) ??
    (isMeetsBaseline(manifest.dependencies?.[MARKET_PACKAGE]) ? manifest.dependencies?.[MARKET_PACKAGE] : undefined) ??
    (isMeetsBaseline(generations.find((g) => g.pluginName === MARKET_PACKAGE)?.version)
      ? generations.find((g) => g.pluginName === MARKET_PACKAGE)?.version
      : undefined) ??
    VERIFIED_MARKET_BASELINE

  manifest.dependencies ??= {}
  manifest.dependencies[MARKET_PACKAGE] = candidateVersion
  if (owned !== undefined) {
    delete manifest.dsh!.desktop!.generationProjection!.plugins![MARKET_PACKAGE]
    if (Object.keys(manifest.dsh!.desktop!.generationProjection!.plugins!).length === 0) {
      delete manifest.dsh!.desktop!.generationProjection
    }
    if (owned.previousOverride?.present && typeof owned.previousOverride.value === 'string') {
      manifest.pnpm ??= {}
      manifest.pnpm.overrides ??= {}
      manifest.pnpm.overrides[MARKET_PACKAGE] = owned.previousOverride.value
    } else if (manifest.pnpm?.overrides) {
      delete manifest.pnpm.overrides[MARKET_PACKAGE]
    }
  } else if (manifest.pnpm?.overrides?.[MARKET_PACKAGE]?.includes('.generations/live/')) {
    delete manifest.pnpm.overrides[MARKET_PACKAGE]
  }
  const bundles = manifest.dsh?.profile?.bundles
  if (Array.isArray(bundles) && !bundles.includes(MARKET_PACKAGE)) bundles.push(MARKET_PACKAGE)
  await writeFile(manifestPath, `${JSON.stringify(manifest, undefined, 2)}\n`, 'utf8')

  if (desiredMarket.length > 0) {
    await writeDesired(dshHome, desired.filter((id) => !marketGenerations.has(id)))
  }
  if (linked) {
    // Only the pointer goes: the generation directory it targets is left for
    // the ordinary sweep, and nothing that already loaded it is disturbed.
    await rm(marketPath, { force: true })
  }
  // No need to clear `.install-complete`: it is a fingerprint over
  // package.json and pnpm-lock.yaml, and the manifest write above already
  // invalidated it.
  return true
}

/** A vendored market package the installer catalog can install without a registry. */
export interface CatalogMarketSource {
  version: string
  tarball: string
}

/**
 * Copy a vendored market tarball into DSH_HOME. A Profile records the spec it
 * installed from, so that copy has to outlive an app update — the catalog inside
 * the app resources does not.
 */
export async function stageVendoredMarketTarball(dshHome: string, tarball: string): Promise<string> {
  const directory = join(dshHome, '.desktop-catalog')
  const destination = join(directory, basename(tarball))
  await mkdir(directory, { recursive: true })
  await copyFile(tarball, destination)
  return destination
}

export interface CatalogMarketInstallOptions
  extends Omit<MarketSharedTreeUpgradeOptions, 'targetVersion' | 'spec'> {
  version: string
  tarball: string
}

/**
 * Install the catalog's vendored market into the Profile shared tree. Catalog
 * seeding calls this when the bundle ships the market itself, so the declaration
 * and the pinned version come from the same source as the install.
 */
export async function installCatalogMarket(
  options: CatalogMarketInstallOptions
): Promise<PluginUpgradeResult> {
  const { version, tarball, ...sharedTreeOptions } = options
  const staged = await stageVendoredMarketTarball(options.dshHome, tarball)
  return upgradeMarketInSharedTree({
    ...sharedTreeOptions,
    targetVersion: version,
    spec: 'file:' + staged
  })
}

export interface EnsureMarketBaselineOptions
  extends Omit<MarketSharedTreeUpgradeOptions, 'targetVersion' | 'spec'> {
  /**
   * The catalog's vendored market copy. When the market has to be (re)installed,
   * this local tarball is preferred over the registry, so a machine without
   * registry access still reaches the verified baseline.
   */
  resolveCatalogMarket?: () => Promise<CatalogMarketSource | undefined>
}
/** Run only after startup recovery gates and generation projection, with Harness stopped. */
export async function ensureMarketBaseline(
  options: EnsureMarketBaselineOptions,
  upgrade: (options: MarketSharedTreeUpgradeOptions) => ReturnType<typeof upgradeMarketInSharedTree> = upgradeMarketInSharedTree
): Promise<void> {
  const { resolveCatalogMarket, ...sharedTreeOptions } = options
  let raw: string
  try {
    raw = await readFile(profilePackageJsonPath(options.dshHome), 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return
    throw error
  }
  const manifest = JSON.parse(raw) as {
    dependencies?: Record<string, string>
    dsh?: { profile?: { bundles?: string[] } }
  }
  // A removed/disabled market stays removed. First-install UI owns adding it.
  if (!manifest.dependencies?.dshmarket || !manifest.dsh?.profile?.bundles?.includes('dshmarket')) return

  const installed = await readInstalledPluginVersion(options.dshHome, 'dshmarket')
  // dshmarket must never be a generation (it is a core bundle the migration
  // keeps hoisted — see KEEP_IN_SHARED_TREE in generation-migration.ts). A
  // generation link (pointing to .generations/live/…) forces a repair even
  // when its version reads as current, so a stray generation from an earlier
  // build cannot linger. A pnpm isolated-store symlink (pointing to .pnpm/…)
  // is left alone: it is pnpm's normal representation in non-hoisted profiles.
  const dshmarketPath = join(dirname(profilePackageJsonPath(options.dshHome)), 'node_modules', 'dshmarket')
  const isGenerationLink = await lstat(dshmarketPath)
    .then(async (info) => {
      if (!info.isSymbolicLink()) return false
      const target = await readlink(dshmarketPath)
      return target.includes('.generations')
    })
    .catch(() => false)
  // The vendored catalog copy, when this build has one, decides the target: it is
  // what can be installed here without registry access.
  const catalogMarket =
    resolveCatalogMarket === undefined
      ? undefined
      : await resolveCatalogMarket().catch((error: unknown) => {
          options.note?.(
            `[market-baseline] vendored market copy is unavailable: ${error instanceof Error ? error.message : String(error)}`
          )
          return undefined
        })
  // Without a catalog copy, a profile that already declares a newer market than
  // the verified baseline keeps that declaration as the target.
  const declaredVersion = manifest.dependencies.dshmarket
  const declaredClean = declaredVersion?.replace(/^[~^v=><\s]+/g, '')
  const declaredParsed = declaredClean ? parseSemver(declaredClean) : null
  const targetVersion =
    catalogMarket?.version ??
    (declaredParsed && compareSemver(declaredClean, VERIFIED_MARKET_BASELINE) > 0
      ? declaredVersion
      : VERIFIED_MARKET_BASELINE)
  const meetsTarget = (version: string | undefined): boolean =>
    !!version && !!parseSemver(version) && compareSemver(version, targetVersion) >= 0

  if (meetsTarget(installed) && !isGenerationLink) return

  options.note?.(
    isGenerationLink
      ? `[market-baseline] dshmarket ${installed ?? '(unknown)'} is a generation link; reinstalling into the shared tree`
      : `[market-baseline] upgrading dshmarket ${installed ?? '(missing)'} to ${targetVersion}`
  )
  // Ensure the profile directory has a valid pnpm-workspace.yaml so pnpm --workspace-root succeeds.
  const profileDir = dirname(profilePackageJsonPath(options.dshHome))
  const workspaceYamlPath = join(profileDir, 'pnpm-workspace.yaml')
  try {
    await readFile(workspaceYamlPath, 'utf8')
  } catch {
    await writeFile(workspaceYamlPath, 'packages:\n  - .\n\nnodeLinker: hoisted\nautoInstallPeers: false\n', 'utf8')
  }

  // This normally happens inside Harness boot, which has not run yet. Ensure
  // generation peer validation sees this installation's host packages first.
  await healProfilesModuleFallback({
    installAnchor: join(dirname(options.dshEntryPath), '..', 'package.json'),
    home: options.dshHome
  })
  await clearProfileInstallMarker(options.dshHome)
  const spec =
    catalogMarket === undefined
      ? undefined
      : 'file:' + (await stageVendoredMarketTarball(options.dshHome, catalogMarket.tarball))
  options.note?.(
    spec === undefined
      ? '[market-baseline] installing from the registry'
      : `[market-baseline] installing from the vendored catalog copy ${catalogMarket?.version ?? ''}`
  )
  const result = await upgrade({ ...sharedTreeOptions, targetVersion, spec })
  if (!result.ok) throw new Error(result.detail ?? 'dshmarket installation failed')

  const actual = await readInstalledPluginVersion(options.dshHome, 'dshmarket')
  if (!meetsTarget(actual)) {
    throw new Error(
      `dshmarket installation reported success, but the active version is ${actual ?? 'missing'}; requires >=${targetVersion}`
    )
  }
  options.note?.(`[market-baseline] verified active dshmarket ${actual}`)
}
