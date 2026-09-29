import { execFile } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/

/**
 * Version index for the desktop's own version picker. Unlike the upstream
 * index, this one lists this repository's releases: tags here carry no `v`
 * prefix, and every release serves its own assets from
 * `github.com/<owner>/<repo>/releases/download/<version>/`.
 *
 * Every release ships this file, so it always lists the full history — the
 * picker exists to go back to a version an earlier release is still known by.
 */
export function buildBundleVersionIndex(tags, archivePrefix) {
  const versions = [...new Set(tags)]
    .filter((tag) => semver.test(tag))
    .map((version) => ({
      version,
      tag: version,
      archiveUrl: `${archivePrefix}${version}/`
    }))
  return { versions }
}

/** Release directory prefix behind the feed URL the app checks. */
export function archivePrefixFromFeed(feedUrl) {
  const suffix = '/releases/latest/download/'
  if (typeof feedUrl !== 'string' || !feedUrl.endsWith(suffix)) {
    throw new Error(`Publish URL is not a release feed: ${String(feedUrl)}`)
  }
  return `${feedUrl.slice(0, -suffix.length)}/releases/download/`
}

async function tagsFromGit() {
  const { stdout } = await execFileAsync('git', ['tag', '--sort=-v:refname'])
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

async function main() {
  const outputPath = process.argv[2] ?? 'dist/versions.json'
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'))
  const archivePrefix = archivePrefixFromFeed(packageJson.build.publish[0]?.url)
  const index = buildBundleVersionIndex(await tagsFromGit(), archivePrefix)
  await writeFile(outputPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${index.versions.length} versions to ${outputPath}.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main()
}
