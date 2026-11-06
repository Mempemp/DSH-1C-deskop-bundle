#!/usr/bin/env node
// Локальная редакция `@wingsky-1/dsh-mcp-manager` 0.2.12: сборочная копия плагина
// плюс дельта против опубликованного апстрима 0.2.11.
//
// Исходников апстрима у нас нет (он публикуется уже собранным), поэтому генератор
// берёт опубликованный тарбол, проверяет его по контрольной сумме и по хешу
// `lib/index.js`, применяет дельту из DELTAS и раскладывает файлы в наш пакет.
// Всё, что не правится, копируется байт в байт — локаль, `.d.ts`, лицензии.
//
// Манифест — единственное место, где мы правим номер: имя
// `@wingsky-1/dsh-mcp-manager` не меняется (на нём держатся
// `$DSH_HOME/@wingsky-1/dsh-mcp-manager/mcp.json`, сид каталога и профили
// пользователей), а версия у нас своя — 0.2.12, чтобы пересборку можно было
// отличить от опубликованной 0.2.11. Из-за этого в апгрейд-лестницу добавляется
// пустой шаг 0.2.11 → 0.2.12: последняя ступень апстрима остаётся 0.2.11, и без
// своего шага `diagnoseGap` предупреждал бы при каждом старте плагина, что
// хранилище отстало от версии пакета.
//
// Запуск:  node tools/patch.mjs [--upstream <каталог|tgz>] [--out <каталог>]
// Проверка: node tools/patch.mjs --check
//
// Дельта (обе части — про очередь записи каталога инструментов, issue #3):
//   1. writeFileAtomic держит одну очередь на файл и только **последнюю** нагрузку
//      вместо цепочки промисов, где каждый ждущий вызов удерживает свою копию.
//   2. persistRoot сливает параллельные вызовы на один root: пока идёт цикл,
//      новые запросы становятся отметкой «ещё один проход», а снимок считается
//      внутри цикла. Раньше каждый параллельный вызов держал готовую строку
//      всего root-каталога, и шторм tools/change превращался в гигабайты.

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

export const UPSTREAM = {
  name: '@wingsky-1/dsh-mcp-manager',
  version: '0.2.11',
  integrity: 'sha512-GiL4LRhgDTrjLG7BBd+r7O6ecN2vWAV+0pNck2raqjNjQfd2ddBvIUiUO+u2TN6uxQRCw8ouAGXPrjKx2O7dag=='
}

/** Версия нашего пакета: та же сборка, но отличимая от опубликованной апстримом. */
export const LOCAL_VERSION = '0.2.12'

// Хеш исходного бандла апстрима: дельта применяется только к ровно этим байтам.
export const UPSTREAM_SHA256 = {
  'lib/index.js': '5c1935867430a5e90fd694f5b950586b54e8cabc3a622bb8c0e844f219da08a9'
}

// Хеш нашего результата. Пересчитывается генератором; пин держит провенанс:
// если апстрим подменит содержимое под тем же номером версии, --check это увидит.
export const PATCHED_SHA256 = {
  'lib/index.js': '6626103d88207fe472f68ace36da183b3c9eacf8c27b55f7181eae7874c23ac2',
  'package.json': '944a8b471bac0562b8ba59fc6146fcb0cccf10011368a514c4fb7b8d6a0cee33'
}

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Файлы апстрима, которые не едут в наш пакет: у нас свой README. */
const DROPPED = ['README.md', 'README.en.md']

/**
 * Файлы, которые собираются правками, а не копируются: путь → правило.
 * `lib/index.js` получает дельту из DELTAS, `package.json` — наш номер версии.
 */
const REWRITERS = new Map([
  ['lib/index.js', (bytes) => Buffer.from(applyDeltas(bytes.toString('utf8')), 'utf8')],
  ['package.json', setLocalVersion]
])

const OLD_WRITE_CHAINS = 'var writeChains = /* @__PURE__ */ new Map();'

const OLD_WRITE_FILE_ATOMIC = [
  'function writeFileAtomic(file, data) {',
  '  const previous = writeChains.get(file) ?? Promise.resolve();',
  '  const next = previous.then(() => writeOnce(file, data), () => writeOnce(file, data));',
  '  writeChains.set(file, next);',
  '  return next.finally(() => {',
  '    if (writeChains.get(file) === next)',
  '      writeChains.delete(file);',
  '  });',
  '}'
].join('\n')

const NEW_WRITE_FILE_ATOMIC = [
  '// 同文件写队列只保留**最新**负载（本地补丁，见 packages/dsh-mcp-manager/README.md）：',
  '// 原来的 promise 链让每个排队调用都挟着自己的完整快照，tools/change 风暴下',
  '// 链长即堆占用，宿主撞上 V8 堆上限退出（exit 134）。',
  'var writeSlots = /* @__PURE__ */ new Map();',
  'function writeFileAtomic(file, data) {',
  '  let slot = writeSlots.get(file);',
  '  if (slot === void 0) {',
  '    slot = { data: void 0, waiters: [], running: false };',
  '    writeSlots.set(file, slot);',
  '  }',
  '  // 合并：被覆盖的负载对调用方没有意义——现有调用方写的都是整份文件快照，',
  '  // 后写覆盖先写是正确契约（last-write-wins）。',
  '  slot.data = data;',
  '  const promise = new Promise((resolve, reject) => slot.waiters.push({ resolve, reject }));',
  '  if (!slot.running)',
  '    void drainWriteSlot(file, slot).catch(() => void 0);',
  '  return promise;',
  '}',
  'async function drainWriteSlot(file, slot) {',
  '  if (slot.running)',
  '    return;',
  '  slot.running = true;',
  '  try {',
  '    // 条件用 waiters.length 而不是 data：数据为 undefined 的调用不能因此永远挂住。',
  '    while (slot.waiters.length > 0) {',
  '      const batch = slot.waiters;',
  '      const data = slot.data;',
  '      slot.waiters = [];',
  '      slot.data = void 0;',
  '      try {',
  '        await writeOnce(file, data);',
  '        for (const waiter of batch)',
  '          waiter.resolve();',
  '      } catch (error) {',
  '        for (const waiter of batch)',
  '          waiter.reject(error);',
  '      }',
  '    }',
  '  } finally {',
  '    slot.running = false;',
  '    // Пока шла запись, могли прийти новые вызовы: они ждут этот проход, а не новый слот.',
  '    if (slot.waiters.length > 0)',
  '      void drainWriteSlot(file, slot).catch(() => void 0);',
  '    else',
  '      writeSlots.delete(file);',
  '  }',
  '}'
].join('\n')

const OLD_DIRTY_FIELD = '  dirty = /* @__PURE__ */ new Set();'

const NEW_DIRTY_FIELD = [
  '  dirty = /* @__PURE__ */ new Set();',
  '  /**',
  '   * persistRoot 的单飞状态：同 root 只跑一个落盘周期，周期内新到的请求只是',
  '   * 「再跑一轮」的标记，不各自持有快照。',
  '   */',
  '  persistSlots = /* @__PURE__ */ new Map();'
].join('\n')

const OLD_PERSIST_ROOT = [
  '  /**',
  '   * 目录 last-good 持久化（空采集不写盘；public 供测试与外部触发）。',
  '   *',
  '   * 路径求值由**调用方**给（连接层用 host.catalogCachePath(root) 算），写盘失败只 warn；',
  '   * 路径求值失败按设计逃出本层、由投影的 catch 收口成 unavailable 降级。',
  '   */',
  '  async persistRoot(root, opts) {',
  '    const servers = this.byRoot.get(root);',
  '    if (servers === void 0)',
  '      return;',
  '    let anyTools = false;',
  '    const payload = {};',
  '    for (const [serverName, entry] of servers) {',
  '      if (opts.isRuntimeServer(serverName))',
  '        continue;',
  '      if (entry.tools.size === 0)',
  '        continue;',
  '      anyTools = true;',
  '      payload[serverName] = {',
  '        discoveredAt: entry.discoveredAt,',
  '        tools: [...entry.tools.entries()].map(([name2, tool]) => ({',
  '          name: name2,',
  '          description: tool.description,',
  '          inputSchema: tool.inputSchema',
  '        }))',
  '      };',
  '    }',
  '    if (!anyTools)',
  '      return;',
  '    const cachePath = opts.cachePath();',
  '    try {',
  '      await writeDirectoryCacheFile(cachePath, JSON.stringify({ version: 1, root, entries: payload }, null, 2));',
  '    } catch (error) {',
  '      opts.warn(`dsh-mcp-manager: catalog cache write failed: ${msgOf(error)}`);',
  '    }',
  '  }'
].join('\n')

const NEW_PERSIST_ROOT = [
  '  /**',
  '   * 目录 last-good 持久化（空采集不写盘；public 供测试与外部触发）。',
  '   *',
  '   * 路径求值由**调用方**给（连接层用 host.catalogCachePath(root) 算），写盘失败只 warn；',
  '   * 路径求值失败按设计逃出本层、由投影的 catch 收口成 unavailable 降级。',
  '   *',
  '   * 单飞（本地补丁，issue #3）：同一 root 同时只跑一个落盘周期。此前每次投影都排一个',
  '   * 自己的写：排队者各自挟着整份 root 目录的字符串（最多 ~2 MB），tools/change 风暴下',
  '   * 队列长度就是堆占用（实测 8651 份快照 → 宿主 OOM，exit 134）。现在周期内到达的请求',
  '   * 只是「再来一轮」的标记，快照在周期里现算（persistRootOnce），排队者不持有任何负载。',
  '   *',
  '   * 顺带消掉旧实现登记的残留「两次并发投影的落盘可能乱序」：同一 root 只剩一个写者。',
  '   */',
  '  persistRoot(root, opts) {',
  '    let slot = this.persistSlots.get(root);',
  '    if (slot === void 0) {',
  '      slot = { opts: void 0, waiters: [], running: false };',
  '      this.persistSlots.set(root, slot);',
  '    }',
  '    slot.opts = opts;',
  '    const promise = new Promise((resolve, reject) => slot.waiters.push({ resolve, reject }));',
  '    if (!slot.running)',
  '      void this.drainPersistSlot(root, slot).catch(() => void 0);',
  '    return promise;',
  '  }',
  '  /** persistRoot 的单飞循环：一轮算一次快照、写一次盘，期间新到的请求并到下一轮。 */',
  '  async drainPersistSlot(root, slot) {',
  '    if (slot.running)',
  '      return;',
  '    slot.running = true;',
  '    try {',
  '      while (slot.waiters.length > 0) {',
  '        const batch = slot.waiters;',
  '        const opts = slot.opts;',
  '        slot.waiters = [];',
  '        slot.opts = void 0;',
  '        try {',
  '          await this.persistRootOnce(root, opts);',
  '          for (const waiter of batch)',
  '            waiter.resolve();',
  '        } catch (error) {',
  '          for (const waiter of batch)',
  '            waiter.reject(error);',
  '        }',
  '      }',
  '    } finally {',
  '      slot.running = false;',
  '      if (slot.waiters.length > 0)',
  '        void this.drainPersistSlot(root, slot).catch(() => void 0);',
  '      else',
  '        this.persistSlots.delete(root);',
  '    }',
  '  }',
  '  /** 一轮落盘：快照现算（排队者不持有旧负载），其余与合并前逐字节一致。 */',
  '  async persistRootOnce(root, opts) {',
  '    const servers = this.byRoot.get(root);',
  '    if (servers === void 0)',
  '      return;',
  '    let anyTools = false;',
  '    const payload = {};',
  '    for (const [serverName, entry] of servers) {',
  '      if (opts.isRuntimeServer(serverName))',
  '        continue;',
  '      if (entry.tools.size === 0)',
  '        continue;',
  '      anyTools = true;',
  '      payload[serverName] = {',
  '        discoveredAt: entry.discoveredAt,',
  '        tools: [...entry.tools.entries()].map(([name2, tool]) => ({',
  '          name: name2,',
  '          description: tool.description,',
  '          inputSchema: tool.inputSchema',
  '        }))',
  '      };',
  '    }',
  '    if (!anyTools)',
  '      return;',
  '    const cachePath = opts.cachePath();',
  '    try {',
  '      await writeDirectoryCacheFile(cachePath, JSON.stringify({ version: 1, root, entries: payload }, null, 2));',
  '    } catch (error) {',
  '      opts.warn(`dsh-mcp-manager: catalog cache write failed: ${msgOf(error)}`);',
  '    }',
  '  }'
].join('\n')

/**
 * Последняя ступень апстримной апгрейд-лестницы и наш пустой шаг поверх неё.
 * Цель апстримной ступени берётся из `UPSTREAM.version`: если апстрим в следующем
 * релизе добавит шаги, якорь перестанет находиться и генерация упадёт — это лучше,
 * чем тихо оставить лестницу короче нашей версии.
 */
const OLD_LAST_STEP = `  { fromVersion: "0.2.10", targetVersion: "${UPSTREAM.version}", run: tickUpgradeVersion }`

const NEW_LAST_STEP = [
  `  { fromVersion: "0.2.10", targetVersion: "${UPSTREAM.version}", run: tickUpgradeVersion },`,
  `  // ${UPSTREAM.version} → ${LOCAL_VERSION} 空步（本地补丁：只换写队列，home 级存储形态不变）：run 指共享空函数，只推进刻度。`,
  `  { fromVersion: "${UPSTREAM.version}", targetVersion: "${LOCAL_VERSION}", run: tickUpgradeVersion }`
].join('\n')

/** Правки бандла: каждая должна найтись ровно один раз, иначе генерация падает. */
export const DELTAS = [
  // Старое объявление цепочки убираем целиком: новая очередь вводится в следующей правке.
  { label: 'старая карта цепочек записи', from: `${OLD_WRITE_CHAINS}\n`, to: '' },
  { label: 'схлопывание writeFileAtomic (drainWriteSlot)', from: OLD_WRITE_FILE_ATOMIC, to: NEW_WRITE_FILE_ATOMIC },
  { label: 'поле persistSlots в CatalogDirectory', from: OLD_DIRTY_FIELD, to: NEW_DIRTY_FIELD },
  { label: 'слияние persistRoot по root', from: OLD_PERSIST_ROOT, to: NEW_PERSIST_ROOT },
  { label: 'пустой шаг апгрейда до нашей версии', from: OLD_LAST_STEP, to: NEW_LAST_STEP }
]

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')
const sha512base64 = (buf) => `sha512-${createHash('sha512').update(buf).digest('base64')}`

/** Применение дельты: сначала проверяем, что все якоря на месте, потом правим. */
export function applyDeltas(source, deltas = DELTAS) {
  const absent = []
  const duplicated = []
  for (const { label, from } of deltas) {
    const first = source.indexOf(from)
    if (first < 0) absent.push(label)
    else if (source.indexOf(from, first + from.length) >= 0) duplicated.push(label)
  }
  if (absent.length > 0) throw new Error(`во входном бандле не найдены якоря дельты — ${absent.join(' | ')}`)
  if (duplicated.length > 0) throw new Error(`якоря дельты встречаются больше одного раза — ${duplicated.join(' | ')}`)
  let result = source
  for (const { from, to } of deltas) result = result.replace(from, () => to)
  return result
}

/**
 * Манифест: единственное поле, которое мы меняем, — `version`. Правкой текста, а не
 * разбором с `JSON.stringify`: байты остального манифеста обязаны совпасть с
 * опубликованными (порядок ключей, форматирование, экранирование).
 */
function setLocalVersion(bytes) {
  const text = bytes.toString('utf8')
  const from = `"version": "${UPSTREAM.version}"`
  const first = text.indexOf(from)
  if (first < 0 || text.indexOf(from, first + from.length) >= 0) {
    throw new Error(`package.json: ожидалось единственное поле version ${UPSTREAM.version}`)
  }
  return Buffer.from(text.replace(from, `"version": "${LOCAL_VERSION}"`), 'utf8')
}

const UPSTREAM_URL = `https://registry.npmjs.org/${UPSTREAM.name}/-/${UPSTREAM.name.split('/').pop()}-${UPSTREAM.version}.tgz`

/**
 * Разбор ustar-архива npm-пакета: относительный путь (без общего `package/`) → байты.
 *
 * Свой разбор вместо `tar`/`npm pack`: на Windows `npm` — это `npm.cmd`, и `execFileSync`
 * без shell его не запускает; внешний `tar` тоже не гарантирован. Формат npm-пакета
 * (ustar, файлы и каталоги, без длинных GNU-расширений) разбирается целиком здесь.
 */
export function readTarball(bytes) {
  const tar = gunzipSync(bytes)
  const files = new Map()
  let offset = 0
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512)
    if (header.every((byte) => byte === 0)) break
    const text = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '')
    const size = Number.parseInt(text(124, 12).replace(/[^0-7]/g, '') || '0', 8)
    const type = String.fromCharCode(header[156])
    const path = text(345, 155) === '' ? text(0, 100) : `${text(345, 155)}/${text(0, 100)}`
    const body = tar.subarray(offset + 512, offset + 512 + size)
    offset += 512 + Math.ceil(size / 512) * 512
    // 'x'/'g' — служебные pax-заголовки, они не файлы пакета.
    if (type !== '0' && type !== '\0') continue
    const relative = path.replace(/^package\//, '')
    if (relative === '') continue
    files.set(relative, Buffer.from(body))
  }
  return files
}

async function readDirectory(root, prefix = '', files = new Map()) {
  for (const entry of await readdir(path.join(root, prefix), { withFileTypes: true })) {
    const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) await readDirectory(root, relative, files)
    else files.set(relative, await readFile(path.join(root, relative)))
  }
  return files
}

/**
 * Файлы апстрима: явный каталог/архив (офлайн-прогон), переменная окружения или
 * опубликованный тарбол по пиннутой ссылке. Контрольная сумма проверяется всегда.
 */
export async function loadUpstream(explicit) {
  if (explicit !== undefined) {
    if (existsSync(path.join(explicit, 'package.json'))) return readDirectory(explicit)
    const bytes = await readFile(explicit).catch(() => null)
    if (bytes === null) throw new Error(`--upstream: не каталог пакета и не архив: ${explicit}`)
    return readTarball(verified(bytes, explicit))
  }
  const env = process.env.DSH_MCP_MANAGER_UPSTREAM_DIR
  if (env) return readDirectory(env)
  const response = await fetch(UPSTREAM_URL)
  if (!response.ok) throw new Error(`не удалось скачать ${UPSTREAM_URL}: HTTP ${response.status}`)
  return readTarball(verified(Buffer.from(await response.arrayBuffer()), UPSTREAM_URL))
}

function verified(bytes, source) {
  const integrity = sha512base64(bytes)
  if (integrity !== UPSTREAM.integrity) {
    throw new Error(`${source}: контрольная сумма не совпала с пином (${integrity})`)
  }
  return bytes
}

/**
 * Раскладывает пакет в `outDir`: копии апстрима байт в байт плюс патченный бандл.
 * Возвращает относительные пути всех записанных файлов.
 */
export async function generate(upstream, outDir) {
  const files = [...upstream.keys()].sort().filter((file) => !DROPPED.includes(file))
  const written = []
  for (const file of files) {
    const bytes = upstream.get(file)
    const expected = UPSTREAM_SHA256[file]
    if (expected !== undefined && sha256(bytes) !== expected) {
      throw new Error(`${file}: хеш апстрима не совпал (${sha256(bytes)}), дельта не применяется`)
    }
    await mkdir(path.dirname(path.join(outDir, file)), { recursive: true })
    const rewrite = REWRITERS.get(file)
    if (rewrite === undefined) {
      await writeFile(path.join(outDir, file), bytes)
      written.push(file)
      continue
    }
    const result = rewrite(bytes)
    const pin = PATCHED_SHA256[file]
    if (pin !== undefined && sha256(result) !== pin) {
      throw new Error(`${file}: результат дельты не совпал с PATCHED_SHA256 (${sha256(result)})`)
    }
    await writeFile(path.join(outDir, file), result)
    written.push(file)
  }
  return written
}

async function main() {
  const args = process.argv.slice(2)
  const value = (flag) => {
    const index = args.indexOf(flag)
    return index >= 0 ? args[index + 1] : undefined
  }
  const check = args.includes('--check')
  const upstream = await loadUpstream(value('--upstream'))
  const outDir = check
    ? await mkdtemp(path.join(tmpdir(), 'dsh-mcp-manager-check-'))
    : path.resolve(value('--out') ?? PACKAGE_ROOT)

  try {
    const written = await generate(upstream, outDir)
    if (!check) {
      console.log(`собрано файлов: ${written.length}`)
      for (const file of REWRITERS.keys()) {
        console.log(`sha256 ${file}: ${sha256(await readFile(path.join(outDir, file)))}`)
      }
      return
    }
    const diffs = []
    for (const file of written) {
      const expected = await readFile(path.join(outDir, file)).catch(() => null)
      const actual = await readFile(path.join(PACKAGE_ROOT, file)).catch(() => null)
      if (expected === null || actual === null || !expected.equals(actual)) diffs.push(file)
    }
    if (diffs.length > 0) {
      console.error(`расходится с генератором (пересоберите: node tools/patch.mjs): ${diffs.join(' | ')}`)
      process.exitCode = 1
      return
    }
    console.log(`совпадает с генератором: ${written.length} файлов`)
  } finally {
    if (check) await rm(outDir, { recursive: true, force: true }).catch(() => undefined)
  }
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  await main()
}
