import { execFile as execFileCallback } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { afterEach, describe, expect, it } from 'vitest'
import { parse, stringify } from 'yaml'
import {
  AUTO_INSTALL_ON_APP_QUIT,
  shouldCheckAfterResume,
  supportsAutoUpdates,
  updateChannelEnabled,
  usesBundleFeed,
  UPDATE_CHECK_INTERVAL_MS
} from '../src/main/update/update-policy'
import {
  bundleArchiveFeedUrl,
  BUNDLE_FEED_URL,
  fetchBundleVersion,
  parseChannelFileVersion,
  selectOwnReleases
} from '../src/main/update/version-catalog'

const execFile = promisify(execFileCallback)
const projectRoot = path.resolve(import.meta.dirname, '..')
const temporaryRoots: string[] = []

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true })))
})

describe('desktop update policy', () => {
  it('only installs a downloaded update after explicit user confirmation', () => {
    expect(AUTO_INSTALL_ON_APP_QUIT).toBe(false)
  })

  it('only enables updates for installed macOS and Windows builds', () => {
    expect(supportsAutoUpdates(true, 'darwin')).toBe(true)
    expect(supportsAutoUpdates(true, 'win32')).toBe(true)
    expect(supportsAutoUpdates(true, 'linux')).toBe(false)
    expect(supportsAutoUpdates(false, 'darwin')).toBe(false)
  })

  it('takes updates on the bundle channel and refuses them in development', () => {
    expect(updateChannelEnabled(undefined)).toBe(true)
    expect(updateChannelEnabled('production')).toBe(true)
    expect(updateChannelEnabled('bundle')).toBe(true)
    expect(updateChannelEnabled('development')).toBe(false)
  })

  it('reads its own release feed on the bundle channel only', () => {
    expect(usesBundleFeed('bundle')).toBe(true)
    expect(usesBundleFeed('production')).toBe(false)
    expect(usesBundleFeed('development')).toBe(false)
    expect(usesBundleFeed(undefined)).toBe(false)
  })

  it('consults the build channel before it contacts the update service', async () => {
    const manager = await readFile(path.join(projectRoot, 'src/main/update/update-manager.ts'), 'utf8')

    expect(manager).toContain('updateChannelEnabled(appChannel())')
    expect(manager).toContain('readAppChannel(app.getAppPath())')
    // A bundle build takes its answer from its own feed. The rollout service
    // would answer with an upstream build, which replaces this product.
    expect(manager).toContain('usesOwnFeed() ? await bundleUpdate() : await checkDesktopUpdate()')
  })

  it('checks after resume only when the interval has elapsed', () => {
    const now = 20_000_000
    expect(shouldCheckAfterResume(now - UPDATE_CHECK_INTERVAL_MS, now)).toBe(true)
    expect(shouldCheckAfterResume(now - UPDATE_CHECK_INTERVAL_MS + 1, now)).toBe(false)
  })
})

describe('bundle update feed', () => {
  it('reads the version from the channel file published with the release', () => {
    expect(parseChannelFileVersion('version: 0.10.0-1\nfiles:\n  - url: setup.exe\n')).toBe(
      '0.10.0-1'
    )
    expect(parseChannelFileVersion("version: '0.10.0-1'\npath: setup.exe")).toBe('0.10.0-1')
    expect(parseChannelFileVersion('files:\n  - url: setup.exe')).toBeUndefined()
    expect(parseChannelFileVersion(undefined)).toBeUndefined()
  })

  it('asks for the newest release through the latest-release alias', async () => {
    const requests: string[] = []
    const version = await fetchBundleVersion(async (input) => {
      requests.push(String(input))
      return new Response('version: 0.10.0-2\npath: dsh-desktop-windows-x64-setup.exe\n')
    })

    expect(version).toBe('0.10.0-2')
    expect(requests).toEqual([`${BUNDLE_FEED_URL}latest.yml`])
  })

  it('fails the check loudly when the release carries no channel file', async () => {
    await expect(fetchBundleVersion(async () => new Response('', { status: 404 }))).rejects.toThrow(
      'Update feed request failed: 404'
    )
  })

  it('downloads a version from that version own release directory', () => {
    expect(BUNDLE_FEED_URL).toBe(
      'https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest/download/'
    )
    expect(bundleArchiveFeedUrl('0.10.0-2')).toBe(
      'https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/download/0.10.0-2/'
    )
  })

  it('never offers an archive outside this repository in the version picker', () => {
    const releases = [
      { version: '0.10.0-2', tag: '0.10.0-2', archiveUrl: bundleArchiveFeedUrl('0.10.0-2') },
      { version: '0.9.0-2', tag: '0.9.0-2', archiveUrl: bundleArchiveFeedUrl('0.9.0-2') },
      {
        version: '9.9.9',
        tag: '9.9.9',
        archiveUrl: 'https://dshdesktop.com/updates/archive/9.9.9/'
      },
      { version: '0.8.2-1', tag: '0.8.2-1', archiveUrl: bundleArchiveFeedUrl('0.8.2-2') }
    ]

    expect(selectOwnReleases(releases, '0.10.0-1').map((release) => release.version)).toEqual([
      '0.10.0-2',
      '0.9.0-2'
    ])
    expect(selectOwnReleases(releases, '0.10.0-2').map((release) => release.version)).toEqual([
      '0.9.0-2'
    ])
  })

  it('builds the published index from the release tags', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'dsh-bundle-versions-'))
    temporaryRoots.push(root)
    const outputPath = path.join(root, 'versions.json')

    await execFile(
      process.execPath,
      [path.join(projectRoot, 'scripts', 'build-bundle-version-index.mjs'), outputPath],
      { cwd: projectRoot }
    )

    const index = JSON.parse(await readFile(outputPath, 'utf8')) as {
      versions: Array<{ version: string; tag: string; archiveUrl: string }>
    }
    expect(index.versions.length).toBeGreaterThan(0)
    for (const release of index.versions) {
      expect(release.tag).toBe(release.version)
      // Every entry has to survive the picker's own filter, or the version it
      // names would never appear in it.
      expect(release.archiveUrl).toBe(bundleArchiveFeedUrl(release.version))
    }
    expect(new Set(index.versions.map((release) => release.version)).size).toBe(
      index.versions.length
    )
  })
})

describe('macOS update metadata', () => {
  it('merges both architectures and keeps only ZIP update payloads', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'dsh-update-metadata-'))
    temporaryRoots.push(root)
    const armPath = path.join(root, 'latest-mac-arm64.yml')
    const x64Path = path.join(root, 'latest-mac-x64.yml')
    const outputPath = path.join(root, 'latest-mac.yml')

    await Promise.all([
      writeFile(
        armPath,
        stringify(metadata('arm64', '2026-08-14T01:00:00.000Z')),
        'utf8'
      ),
      writeFile(x64Path, stringify(metadata('x64', '2026-08-14T02:00:00.000Z')), 'utf8')
    ])
    await execFile(process.execPath, [
      path.join(projectRoot, 'scripts', 'merge-mac-update-metadata.mjs'),
      armPath,
      x64Path,
      outputPath
    ])

    const merged = parse(await readFile(outputPath, 'utf8')) as {
      version: string
      files: Array<{ url: string; sha512: string }>
      path: string
      releaseDate: string
    }
    expect(merged.version).toBe('0.2.0')
    expect(merged.files.map((file) => file.url)).toEqual([
      'dsh-desktop-mac-arm64.zip',
      'dsh-desktop-mac-x64.zip'
    ])
    expect(merged.path).toBe('dsh-desktop-mac-arm64.zip')
    expect(merged.releaseDate).toBe('2026-08-14T02:00:00.000Z')
  })
})

function metadata(architecture: 'arm64' | 'x64', releaseDate: string) {
  return {
    version: '0.2.0',
    files: [
      {
        url: `dsh-desktop-mac-${architecture}.zip`,
        sha512: `zip-${architecture}`,
        size: 100
      },
      {
        url: `dsh-desktop-mac-${architecture}.dmg`,
        sha512: `dmg-${architecture}`,
        size: 200
      }
    ],
    releaseDate
  }
}
