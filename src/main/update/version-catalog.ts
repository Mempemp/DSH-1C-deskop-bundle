import type { AvailableRelease } from '../../shared/contracts'

export type { AvailableRelease }

export const STABLE_FEED_URL = 'https://dshdesktop.com/updates/latest/'
export const VERSION_INDEX_URL = 'https://dshdesktop.com/updates/versions.json'

/**
 * This bundle's own feed — the release assets of its repository. The update
 * check reads the channel file of the newest release from `BUNDLE_FEED_URL` to
 * learn the version, then points electron-updater at that release's directory
 * so the differential download can also fetch the blockmap of the version the
 * user runs now.
 */
export const BUNDLE_REPOSITORY_URL = 'https://github.com/Mempemp/DSH-1C-deskop-bundle'
export const BUNDLE_FEED_URL = `${BUNDLE_REPOSITORY_URL}/releases/latest/download/`
export const BUNDLE_INDEX_URL = `${BUNDLE_FEED_URL}versions.json`
/** electron-updater's channel file for the default `latest` channel. */
export const CHANNEL_FILE = 'latest.yml'
/** Release assets every published version carries. */
export const BUNDLE_ARCHIVE_PREFIX = `${BUNDLE_REPOSITORY_URL}/releases/download/`

const INDEX_TIMEOUT_MS = 8_000

export function archiveFeedUrl(version: string): string {
  return `https://dshdesktop.com/updates/archive/${version}/`
}

export function bundleArchiveFeedUrl(version: string): string {
  return `${BUNDLE_ARCHIVE_PREFIX}${version}/`
}

/** Split "1.2.3-rc.1" into ([1,2,3], "rc.1"). Non-numeric segments read as 0. */
function splitVersion(value: string): { nums: number[]; pre: string } {
  const [core = '', ...preParts] = value.trim().split('-')
  const nums = core.split('.').map((part) => {
    const parsed = Number.parseInt(part, 10)
    return Number.isFinite(parsed) ? parsed : 0
  })
  while (nums.length < 3) nums.push(0)
  return { nums, pre: preParts.join('-') }
}

export function compareVersions(a: string, b: string): -1 | 0 | 1 {
  const left = splitVersion(a)
  const right = splitVersion(b)
  for (let i = 0; i < Math.max(left.nums.length, right.nums.length); i += 1) {
    const diff = (left.nums[i] ?? 0) - (right.nums[i] ?? 0)
    if (diff !== 0) return diff < 0 ? -1 : 1
  }
  return comparePrerelease(left.pre, right.pre)
}

/**
 * Semver-style prerelease precedence once the numeric core is equal. A release
 * (no prerelease) sorts above any prerelease; dot-separated identifiers
 * compare with numeric identifiers numerically and below alphanumeric ones,
 * and fewer identifiers sort below more ("alpha" < "alpha.1"). Plain string
 * comparison would order "rc.10" below "rc.9", mis-sorting the archive index
 * (and the picker/downgrade split in the preload) once a prerelease counter
 * reaches two digits.
 */
function comparePrerelease(left: string, right: string): -1 | 0 | 1 {
  if (left === right) return 0
  if (!left) return 1 // release > prerelease
  if (!right) return -1
  const l = left.split('.')
  const r = right.split('.')
  const length = Math.max(l.length, r.length)
  for (let i = 0; i < length; i += 1) {
    const x = l[i]
    const y = r[i]
    if (x === undefined) return -1 // fewer identifiers sorts below
    if (y === undefined) return 1
    if (x === y) continue
    const xn = /^\d+$/.test(x)
    const yn = /^\d+$/.test(y)
    if (xn && yn) {
      // Compare without Number() so leading-zero forms and large counters do
      // not lose precision.
      const nx = x.replace(/^0+/, '') || '0'
      const ny = y.replace(/^0+/, '') || '0'
      if (nx.length !== ny.length) return nx.length < ny.length ? -1 : 1
      if (nx !== ny) return nx < ny ? -1 : 1
      continue
    }
    if (xn) return -1 // numeric identifiers sort below alphanumeric ones
    if (yn) return 1
    if (x < y) return -1
    if (x > y) return 1
  }
  return 0
}

function isRelease(value: unknown): value is AvailableRelease {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.version === 'string' &&
    record.version.length > 0 &&
    typeof record.tag === 'string' &&
    record.tag.length > 0 &&
    typeof record.archiveUrl === 'string' &&
    record.archiveUrl.length > 0
  )
}

export function parseVersionIndex(raw: unknown): AvailableRelease[] {
  if (typeof raw !== 'object' || raw === null) return []
  const versions = (raw as { versions?: unknown }).versions
  if (!Array.isArray(versions)) return []
  return versions.filter(isRelease)
}

export async function fetchAvailableReleases(
  currentVersion: string,
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<AvailableRelease[]> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), INDEX_TIMEOUT_MS)
  try {
    const response = await fetchImpl(VERSION_INDEX_URL, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`Version index request failed: ${response.status}`)
    }
    const releases = parseVersionIndex(await response.json())
    return releases
      .filter((release) => compareVersions(release.version, currentVersion) !== 0)
      .sort((a, b) => compareVersions(b.version, a.version))
  } finally {
    clearTimeout(timer)
  }
}

/**
 * The `version` field of an electron-updater channel file (`latest.yml`). The
 * feed's own metadata is what makes a release offerable: the version is read
 * from the file the updater itself will read, never guessed from a tag or a URL.
 */
export function parseChannelFileVersion(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined
  const value = /^version:[ \t]*(.+?)[ \t]*$/m.exec(raw)?.[1]
  if (value === undefined) return undefined
  return value.replace(/^['"]|['"]$/g, '')
}

/**
 * Version of the newest release on this bundle's feed. The channel file is read
 * through the `latest` release alias, which GitHub keeps pointed at the newest
 * published release — no API call and no rate limit.
 */
export async function fetchBundleVersion(
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<string | undefined> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), INDEX_TIMEOUT_MS)
  try {
    const response = await fetchImpl(`${BUNDLE_FEED_URL}${CHANNEL_FILE}`, {
      signal: controller.signal
    })
    if (!response.ok) throw new Error(`Update feed request failed: ${response.status}`)
    return parseChannelFileVersion(await response.text())
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Releases this build may switch to, newest first. An entry counts only when its
 * archive is exactly the directory of the version it names inside this
 * repository: upstream's index lists upstream archives, and installing one would
 * replace this product with plain DSH Desktop.
 */
export function selectOwnReleases(
  releases: AvailableRelease[],
  currentVersion: string
): AvailableRelease[] {
  return releases
    .filter((release) => release.archiveUrl === bundleArchiveFeedUrl(release.version))
    .filter((release) => compareVersions(release.version, currentVersion) !== 0)
    .sort((a, b) => compareVersions(b.version, a.version))
}

/** Index of this bundle's own releases. A missing index offers nothing to pick. */
export async function fetchBundleReleases(
  currentVersion: string,
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<AvailableRelease[]> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), INDEX_TIMEOUT_MS)
  try {
    const response = await fetchImpl(BUNDLE_INDEX_URL, { signal: controller.signal })
    if (response.status === 404) return []
    if (!response.ok) throw new Error(`Version index request failed: ${response.status}`)
    return selectOwnReleases(parseVersionIndex(await response.json()), currentVersion)
  } finally {
    clearTimeout(timer)
  }
}
