import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { archivePrefixFromFeed } from './build-bundle-version-index.mjs'

/**
 * Release gate for the update feed. An installed build learns about a release
 * from the channel file published with it, so a release that misses it is read
 * as "no update" by every machine that checks before the release is repaired —
 * and a release cannot be repaired in place. Run this before the release is
 * announced, or right after publishing, and treat a failure as "not released
 * yet".
 *
 * Usage: node scripts/verify-update-feed.mjs <tag> [previous-version]
 */
const channelVersion = (text) => /^version:[ \t]*(.+?)[ \t]*$/m.exec(text)?.[1]?.replace(/^['"]|['"]$/g, '')
const fileUrls = (text) => [...text.matchAll(/^\s*-?\s*url:\s*(\S+)\s*$/gm)].map((match) => match[1].replace(/^['"]|['"]$/g, ''))

async function fetchText(url) {
  const response = await fetch(url)
  return { status: response.status, text: response.status === 200 ? await response.text() : '' }
}

/** A release asset is not served through HEAD; a one-byte range proves it is there. */
async function assetStatus(url) {
  const response = await fetch(url, { headers: { Range: 'bytes=0-0' } })
  return response.status === 200 || response.status === 206 ? 'ok' : `HTTP ${response.status}`
}

const failures = []
function report(label, ok, detail) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label.padEnd(24)} ${detail}`)
  if (!ok) failures.push(label)
}

async function main() {
  const [tag, previousVersion] = process.argv.slice(2)
  if (!tag) throw new Error('Usage: node scripts/verify-update-feed.mjs <tag> [previous-version]')

  const packageJson = JSON.parse(await readFile('package.json', 'utf8'))
  const feedUrl = packageJson.build.publish[0]?.url
  const archivePrefix = archivePrefixFromFeed(feedUrl)
  const archiveUrl = `${archivePrefix}${tag}/`
  console.log(`feed    ${feedUrl}\nrelease ${archiveUrl}\n`)

  const feed = await fetchText(`${feedUrl}latest.yml`)
  report('latest.yml', feed.status === 200 && channelVersion(feed.text) === tag, `HTTP ${feed.status}, version ${channelVersion(feed.text) ?? '—'}`)

  const metadata = await fetchText(`${archiveUrl}latest.yml`)
  report('<tag>/latest.yml', metadata.status === 200 && channelVersion(metadata.text) === tag, `HTTP ${metadata.status}, version ${channelVersion(metadata.text) ?? '—'}`)

  const files = fileUrls(metadata.text)
  if (files.length === 0) report('installer files', false, 'the release metadata names no file')
  for (const file of files) {
    const installer = await assetStatus(`${archiveUrl}${file}`)
    report(file, installer === 'ok', installer)
    const blockmap = await assetStatus(`${archiveUrl}${file}.blockmap`)
    report(`${file}.blockmap`, blockmap === 'ok', blockmap)
  }

  const index = await fetchText(`${feedUrl}versions.json`)
  const listed = index.status === 200 && index.text.includes(`"version": "${tag}"`)
  report('versions.json', listed, index.status === 200 ? `HTTP 200, lists ${tag}: ${listed}` : `HTTP ${index.status} (the version picker stays empty)`)

  if (previousVersion) {
    // The running build fetches its own version's blockmap to download a delta.
    for (const file of files) {
      const blockmap = await assetStatus(`${archivePrefix}${previousVersion}/${file}.blockmap`)
      report(`${previousVersion} blockmap`, blockmap === 'ok', blockmap)
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} check(s) failed: ${failures.join(', ')}`)
    process.exitCode = 1
  } else {
    console.log('\nUpdate feed complete.')
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main()
}
