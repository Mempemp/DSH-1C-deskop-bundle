import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { readFile } from 'node:fs/promises'
import { projectRoot } from './patch-path'

/**
 * Локальная редакция `@wingsky-1/dsh-mcp-manager` 0.2.12 держит очередь записи
 * каталога инструментов в памяти. Тест гоняет **код из собранного бандла**, а не
 * копию логики: функции вырезаются из `lib/index.js` и вызываются с подменённым
 * диском. Иначе проверка ничего не говорит о том, что поедет в установщике.
 *
 * Что именно защищается (issue #3): старая очередь записи держала нагрузку каждого
 * ждущего вызова, а projections каталога шли на каждое `tools/change`. У машины с
 * 8 MCP-серверами это 8651 удержанный снимок root-каталога и смерть хоста по OOM.
 */
const packageRoot = path.join(projectRoot, 'packages', 'dsh-mcp-manager')
const bundlePath = path.join(packageRoot, 'lib', 'index.js')

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type Slot = { data: string | undefined; waiters: unknown[]; running: boolean }
type QueueApi = {
  writeFileAtomic: (file: string, data: string) => Promise<void>
  writeSlots: Map<string, Slot>
}

/** Очередь записи из бандла: срез от объявления слотов до первого читателя файлов. */
function makeQueue(writeOnce: (file: string, data: string | undefined) => Promise<unknown>): QueueApi {
  const source = readFileSync(bundlePath, 'utf8')
  const start = source.indexOf('var writeSlots =')
  const end = source.indexOf('async function readTextFile(file) {')
  expect(start, 'в бандле нет очереди записи writeSlots').toBeGreaterThan(-1)
  expect(end, 'не найден конец блока очереди записи').toBeGreaterThan(start)
  const slice = source.slice(start, end)
  // Срез — настоящий код бандла; writeOnce подменяется, чтобы не трогать диск.
  const factory = new Function('writeOnce', `${slice}\nreturn { writeFileAtomic, writeSlots };`) as (
    stub: unknown
  ) => QueueApi
  return factory(writeOnce)
}

type CatalogEntry = { discoveredAt: number; tools: Map<string, { description: string; inputSchema: unknown }> }
type Directory = {
  byRoot: Map<string, Map<string, CatalogEntry>>
  roots: Set<string>
  persistSlots: Map<string, { waiters: unknown[]; running: boolean }>
  persistRoot: (root: string, opts: PersistOptions) => Promise<void>
}
type PersistOptions = {
  cachePath: () => string
  isRuntimeServer: (name: string) => boolean
  warn: (message: string) => void
}

/** Каталог инструментов из бандла: класс целиком, запись на диск подменена. */
function makeDirectory(
  write: (file: string, data: string) => Promise<void>
): new () => Directory {
  const source = readFileSync(bundlePath, 'utf8')
  const start = source.indexOf('var CatalogDirectory = class {')
  const end = source.indexOf('var catalogDirectory = new CatalogDirectory();')
  expect(start, 'в бандле нет класса CatalogDirectory').toBeGreaterThan(-1)
  expect(end, 'не найден конец класса CatalogDirectory').toBeGreaterThan(start)
  const classText = source.slice(start, end)
  const factory = new Function(
    'writeDirectoryCacheFile',
    'msgOf',
    `${classText}\nreturn CatalogDirectory;`
  ) as (writeDirectoryCacheFile: unknown, msgOf: (error: unknown) => string) => new () => Directory
  return factory(write, (error) => (error instanceof Error ? error.message : String(error)))
}

function entry(discoveredAt: number, tool: string): CatalogEntry {
  return {
    discoveredAt,
    tools: new Map([[tool, { description: '', inputSchema: { type: 'object' } }]])
  }
}

describe('dsh-mcp-manager: очередь записи каталога не удерживает снимки', () => {
  it('собран генератором из запиненного апстрима', () => {
    const result = spawnSync(process.execPath, ['tools/patch.mjs', '--check'], {
      cwd: packageRoot,
      encoding: 'utf8'
    })

    expect(result.stderr.trim()).toBe('')
    expect(result.status).toBe(0)
  })

  it('держит только последнюю нагрузку независимо от глубины очереди', async () => {
    const written: string[] = []
    const queue = makeQueue(async (_file, data) => {
      await delay(5)
      written.push(String(data))
    })

    const calls: Promise<void>[] = []
    for (let index = 0; index < 50; index += 1) {
      calls.push(queue.writeFileAtomic('/catalog/cache.json', `payload-${index}`))
    }

    // Сразу после 50 вызовов в памяти ровно одна нагрузка — последняя, а не 50 копий:
    // первый вызов уже пишется, остальные ждут и держат только резолверы.
    const slot = queue.writeSlots.get('/catalog/cache.json')
    expect(slot?.data).toBe('payload-49')
    expect(slot?.waiters).toHaveLength(49)
    expect(Object.keys(slot?.waiters[0] as object)).toEqual(['resolve', 'reject'])

    await Promise.all(calls)

    expect(written.length).toBeLessThan(5)
    expect(written.at(-1)).toBe('payload-49')
    await delay(20)
    expect(queue.writeSlots.size).toBe(0)
  })

  it('пишет настоящие файлы и оставляет на диске последнюю нагрузку', async () => {
    const { mkdtemp, readFile, rm } = await import('node:fs/promises')
    const { tmpdir } = await import('node:os')
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-mcp-manager-queue-'))

    try {
      const source = readFileSync(bundlePath, 'utf8')
      const start = source.indexOf('function temporaryNameFor(file) {')
      const end = source.indexOf('async function readTextFile(file) {')
      // Срез — настоящие writeOnce + очередь из бандла; диск настоящий, registry mode подменён
      // на «файл зарегистрирован, явного режима нет» — это та ветка, по которой идёт каталог.
      const factory = new Function(
        'fileMode',
        'directoryMode',
        'dirname2',
        'writeFile',
        'rename',
        'rm',
        'mkdir',
        'randomBytes',
        `${source.slice(start, end)}\nreturn { writeFileAtomic, writeSlots };`
      ) as (...args: unknown[]) => QueueApi
      const fsMod = await import('node:fs/promises')
      const crypto = await import('node:crypto')
      const queue = factory(
        () => null,
        () => null,
        path.dirname,
        fsMod.writeFile,
        fsMod.rename,
        fsMod.rm,
        fsMod.mkdir,
        crypto.randomBytes
      )

      const target = path.join(dir, 'catalog.json')
      const payload = (index: number) => JSON.stringify({ version: 1, entries: { [`s${index}`]: 'x'.repeat(2048) } })
      const calls: Promise<void>[] = []
      for (let index = 0; index < 50; index += 1) calls.push(queue.writeFileAtomic(target, payload(index)))
      expect(queue.writeSlots.get(target)?.data).toBe(payload(49))

      await Promise.all(calls)

      expect(await readFile(target, 'utf8')).toBe(payload(49))
      const leftovers = (await fsMod.readdir(dir)).filter((name) => name.endsWith('.tmp'))
      expect(leftovers).toEqual([])
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('переживает сбой записи и не ядовитит следующую пачку', async () => {
    const written: string[] = []
    const queue = makeQueue(async (_file, data) => {
      if (data === 'boom') throw new Error('диск отказал')
      written.push(String(data))
    })

    await expect(queue.writeFileAtomic('/state.json', 'boom')).rejects.toThrow('диск отказал')
    await queue.writeFileAtomic('/state.json', 'after')

    expect(written).toEqual(['after'])
    expect(queue.writeSlots.size).toBe(0)
  })

  it('ведёт разные файлы независимо', async () => {
    const started: string[] = []
    const queue = makeQueue(async (file) => {
      started.push(file)
      await delay(5)
    })

    await Promise.all([
      queue.writeFileAtomic('/a.json', 'a'),
      queue.writeFileAtomic('/b.json', 'b')
    ])

    expect(started).toHaveLength(2)
  })

  it('не зависает, если новый вызов пришёл из завершения предыдущего', async () => {
    const queue = makeQueue(async () => {
      await Promise.resolve()
    })

    await Promise.race([
      queue.writeFileAtomic('/x.json', 'first').then(() => queue.writeFileAtomic('/x.json', 'second')),
      delay(1000).then(() => {
        throw new Error('очередь не слилась за секунду')
      })
    ])

    expect(queue.writeSlots.size).toBe(0)
  })

  it('сливает параллельные persistRoot на один root в один проход', async () => {
    const writes: { entries: Record<string, { discoveredAt: number }> }[] = []
    let active = 0
    let maxActive = 0
    const Directory = makeDirectory(async (_file, data) => {
      active += 1
      maxActive = Math.max(maxActive, active)
      await delay(10)
      active -= 1
      writes.push(JSON.parse(data) as { entries: Record<string, { discoveredAt: number }> })
    })

    const directory = new Directory()
    directory.byRoot.set('@global', new Map())
    const opts: PersistOptions = {
      cachePath: () => '/catalog/global.json',
      isRuntimeServer: () => false,
      warn: () => undefined
    }

    const calls: Promise<void>[] = []
    for (let index = 0; index < 100; index += 1) {
      directory.byRoot.get('@global')?.set('srv', entry(index, `tool-${index}`))
      calls.push(directory.persistRoot('@global', opts))
    }

    // Первый вызов уже в проходе, остальные ждут его без своих снимков.
    expect(directory.persistSlots.get('@global')?.waiters).toHaveLength(99)

    await Promise.all(calls)

    // Один писатель на root: старая реализация выпускала 100 параллельных записей,
    // и каждая держала готовую строку всего root-каталога.
    expect(maxActive).toBe(1)
    expect(writes.length).toBeLessThan(10)
    // Последний снимок отражает последнее состояние, а не первое.
    expect(writes.at(-1)?.entries.srv?.discoveredAt).toBe(99)
    expect(directory.persistSlots.size).toBe(0)
  })

  it('отдаёт отказ тому, кто его вызвал, и продолжает работать', async () => {
    const Directory = makeDirectory(async () => {
      await delay(5)
    })

    const directory = new Directory()
    directory.byRoot.set('@global', new Map([['srv', entry(1, 'tool')]]))
    const warned: string[] = []
    let pathCalls = 0

    const failing = directory.persistRoot('@global', {
      cachePath: () => {
        pathCalls += 1
        if (pathCalls === 1) throw new Error('корень не разрешён')
        return '/catalog/global.json'
      },
      isRuntimeServer: () => false,
      warn: (message) => warned.push(message)
    })

    await expect(failing).rejects.toThrow('корень не разрешён')
    await directory.persistRoot('@global', {
      cachePath: () => '/catalog/global.json',
      isRuntimeServer: () => false,
      warn: (message) => warned.push(message)
    })

    expect(warned).toEqual([])
    expect(directory.persistSlots.size).toBe(0)
  })

  it('едет в сборке локальной редакцией с тем же именем', async () => {
    const flavor = parseYaml(await readFile(path.join(projectRoot, 'installer-flavor.yml'), 'utf8')) as {
      sources: { kind?: string; from?: string; path?: string }[]
    }

    expect(flavor.sources.find((source) => source.path === './packages/dsh-mcp-manager')).toMatchObject({
      kind: 'plugin',
      from: 'local'
    })
    // Имя не меняем: на нём держатся $DSH_HOME/@wingsky-1/dsh-mcp-manager/mcp.json,
    // сид каталога и профили пользователей. Версия своя — 0.2.12, чтобы пересборку
    // было видно отдельно от опубликованной 0.2.11.
    const manifest = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf8')) as {
      name: string
      version: string
      peerDependencies: Record<string, string>
    }

    expect(manifest.name).toBe('@wingsky-1/dsh-mcp-manager')
    expect(manifest.version).toBe('0.2.12')
    // Пиры — ровно та линия ядра, с которой едет сборка: иначе гейт хоста
    // (plugin-compatibility) отвергает плагин целиком и панель MCP исчезает.
    expect(manifest.peerDependencies['@deepseek-ai/cordis']).toBe('4.1.0')
    expect(manifest.peerDependencies['@deepseek-ai/dsh-tools']).toBe('0.2.2-rc.1')
    const bundle = readFileSync(bundlePath, 'utf8')
    expect(bundle).not.toContain('writeChains')
    // Лестница апгрейда закрывается нашей версией: без этого diagnoseGap на каждом
    // старте плагина предупреждает, что хранилище отстало от версии пакета.
    expect(bundle).toContain('{ fromVersion: "0.2.11", targetVersion: "0.2.12", run: tickUpgradeVersion }')
  })
})
