import { createServer, type Server } from 'node:http'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { downloadFile, extractArchive } from '../scripts/prepare-installer-catalog.mjs'

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let index = 0; index < 256; index += 1) {
    let value = index
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
    }
    table[index] = value >>> 0
  }
  return table
})()

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff
  for (const byte of buffer) crc = (CRC_TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

/** Минимальный ZIP (без сжатия): ровно то, что tar и проверка целостности читают. */
function storedZip(name: string, content: Buffer): Buffer {
  const nameBytes = Buffer.from(name)
  const crc = crc32(content)
  const local = Buffer.alloc(30)
  local.writeUInt32LE(0x04034b50, 0)
  local.writeUInt16LE(20, 4)
  local.writeUInt32LE(crc, 14)
  local.writeUInt32LE(content.length, 18)
  local.writeUInt32LE(content.length, 22)
  local.writeUInt16LE(nameBytes.length, 26)
  const central = Buffer.alloc(46)
  central.writeUInt32LE(0x02014b50, 0)
  central.writeUInt16LE(20, 4)
  central.writeUInt16LE(20, 6)
  central.writeUInt32LE(crc, 16)
  central.writeUInt32LE(content.length, 20)
  central.writeUInt32LE(content.length, 24)
  central.writeUInt16LE(nameBytes.length, 28)
  const body = Buffer.concat([local, nameBytes, content])
  const directory = Buffer.concat([central, nameBytes])
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(1, 8)
  eocd.writeUInt16LE(1, 10)
  eocd.writeUInt32LE(directory.length, 12)
  eocd.writeUInt32LE(body.length, 16)
  return Buffer.concat([body, directory, eocd])
}

describe('catalog download integrity', () => {
  const servers: Server[] = []
  const roots: string[] = []

  afterEach(() => {
    for (const server of servers.splice(0)) server.close()
    for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
  })

  function workRoot(): string {
    const root = mkdtempSync(join(tmpdir(), 'dsh-catalog-download-'))
    roots.push(root)
    return root
  }

  /**
   * Отдаёт архив частями: codeload шлёт zip потоком без content-length, поэтому
   * оборванная загрузка выглядит как успешно завершённая.
   */
  async function serve(source: Buffer, sizes: number[]): Promise<{ url: string; requests: () => number }> {
    let served = 0
    const server = createServer((_request, response) => {
      const size = served < sizes.length ? (sizes[served] ?? source.length) : source.length
      served += 1
      response.writeHead(200, { 'content-type': 'application/zip' })
      response.end(source.subarray(0, size))
    })
    servers.push(server)
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    const address = server.address()
    if (address === null || typeof address === 'string') throw new Error('server did not bind a port')
    return { url: `http://127.0.0.1:${address.port}/archive.zip`, requests: () => served }
  }

  it('redownloads an archive the connection cut short and extracts it', async () => {
    const content = Buffer.from('конфигурация 1С: пакет плагина для каталога установщика\n'.repeat(64))
    const archive = storedZip('payload/marker.txt', content)
    const { url, requests } = await serve(archive, [Math.floor(archive.length / 2)])
    const root = workRoot()
    const file = join(root, 'source.zip')

    await downloadFile(url, file)

    expect(requests()).toBe(2)
    expect(readFileSync(file).length).toBe(archive.length)
    const extracted = join(root, 'extracted')
    extractArchive(file, extracted)
    expect(readFileSync(join(extracted, 'payload', 'marker.txt')).equals(content)).toBe(true)
  }, 30000)

  it('reports a download that stays cut short instead of handing tar a broken archive', async () => {
    const archive = storedZip('payload/marker.txt', Buffer.from('x'.repeat(2000)))
    const { url, requests } = await serve(archive, [1000, 1000, 1000])
    const file = join(workRoot(), 'always-truncated.zip')

    await expect(downloadFile(url, file)).rejects.toThrow(/incomplete zip archive/u)
    expect(requests()).toBe(3)
  }, 30000)

  it('keeps a complete archive on a single request', async () => {
    const archive = storedZip('payload/marker.txt', Buffer.from('готово'))
    const { url, requests } = await serve(archive, [archive.length])
    const file = join(workRoot(), 'complete.zip')

    await downloadFile(url, file)

    expect(requests()).toBe(1)
    expect(readFileSync(file).equals(archive)).toBe(true)
  }, 30000)
})
