#!/usr/bin/env node
// Локальная редакция `@wingsky-1/dsh-mcp-manager` 0.2.14: сборочная копия плагина
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
// пользователей), а версия у нас своя — 0.2.14, чтобы пересборку можно было
// отличить от опубликованной 0.2.11. Из-за этого в апгрейд-лестницу добавляется
// пустой шаг 0.2.11 → 0.2.14: последняя ступень апстрима остаётся 0.2.11, и без
// своего шага `diagnoseGap` предупреждал бы при каждом старте плагина, что
// хранилище отстало от версии пакета.
//
// Запуск:  node tools/patch.mjs [--upstream <каталог|tgz>] [--out <каталог>]
// Проверка: node tools/patch.mjs --check
//
// Дельта — две темы:
//
// Очередь записи каталога инструментов (issue #3, 0.2.13):
//   1. writeFileAtomic держит одну очередь на файл и только **последнюю** нагрузку
//      вместо цепочки промисов, где каждый ждущий вызов удерживает свою копию.
//   2. persistRoot сливает параллельные вызовы на один root: пока идёт цикл,
//      новые запросы становятся отметкой «ещё один проход», а снимок считается
//      внутри цикла. Раньше каждый параллельный вызов держал готовую строку
//      всего root-каталога, и шторм tools/change превращался в гигабайты.
//
// Служба `mcpManager` на ядре 0.2.2-rc.3 (0.2.14):
//   3. С rc.3 ядро само регистрирует `mcpManager` (свой менеджер MCP:
//      list/register/restart/probe/watch). Наш повторный `ctx.provide` того же
//      имени бросал `service "mcpManager" has been registered at <...>`, apply
//      падал целиком — ни одной HTTP-маршруты не появлялось, и панель получала
//      `HTTP 404` на каждый запрос. Теперь имя занимается только если оно
//      свободно; на новом ядре недостающие старые методы (registerServer,
//      unregisterServer, connect, disconnect, reconnect, getStatus, getTools)
//      дописываются на службу ядра и снимаются при выгрузке, а методы ядра
//      (list, register, restart, probe, watch) не трогаются.

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
export const LOCAL_VERSION = '0.2.14'

// Хеш исходного бандла апстрима: дельта применяется только к ровно этим байтам.
export const UPSTREAM_SHA256 = {
  'lib/index.js': '5c1935867430a5e90fd694f5b950586b54e8cabc3a622bb8c0e844f219da08a9'
}

// Хеш нашего результата. Пересчитывается генератором; пин держит провенанс:
// если апстрим подменит содержимое под тем же номером версии, --check это увидит.
export const PATCHED_SHA256 = {
  'lib/index.js': '73e76d4c8da46f15cce7f3b38ebca855dd744154af32e1af08362827d744b3d9',
  'package.json': '051c350979025222020cbce427e080b51a2404e7ae2048e2aad73a4a4f0eb8ac'
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

// Служба mcpManager: на ядре 0.2.2-rc.3 имя уже занято ядром — повторный provide ронял apply.
const OLD_PROVIDE_MCP_MANAGER = [
  "function provideMcpManagerService(ctx, manager) {",
  "  if (typeof ctx.provide !== \"function\")",
  "    return;",
  "  ctx.provide(\"mcpManager\", {",
  "    // 注入面（内存态不落盘，同名幂等；toolDefinitions 可选封装定义透传 supervisor）",
  "    registerServer: (server) => manager.registerServer(server),",
  "    unregisterServer: (name2) => manager.unregisterServer(name2),",
  "    // 控制面（通用 MCP 生命周期：注册即连、注销即断的补充控制）",
  "    connect: (name2, scope) => manager.connect(name2, scope),",
  "    disconnect: (name2, scope) => manager.disconnect(name2, scope),",
  "    reconnect: (name2, scope) => manager.reconnect(name2, scope),",
  "    // 查询面（服务状态感知：连接状态 / 工具列表 / 全量摘要）",
  "    getStatus: (name2) => {",
  "      const servers = manager.summary().servers ?? [];",
  "      const found = servers.find((s) => s.name === name2);",
  "      if (found === void 0)",
  "        return void 0;",
  "      return found;",
  "    },",
  "    getTools: (name2) => {",
  "      return manager.registeredToolsFor(name2);",
  "    },",
  "    // 豁免（#770-14 E）：同上，summary() 宽面经 unknown 中转到 McpServerSummary[]；不断言改动、不重构类型。",
  "    list: () => manager.summary().servers ?? []",
  "  });",
  "}"
].join('\n')

const NEW_PROVIDE_MCP_MANAGER = [
  "function provideMcpManagerService(ctx, manager) {",
  "  if (typeof ctx.provide !== \"function\")",
  "    return;",
  "  const legacy = {",
  "    // 注入面（内存态不落盘，同名幂等；toolDefinitions 可选封装定义透传 supervisor）",
  "    registerServer: (server) => manager.registerServer(server),",
  "    unregisterServer: (name2) => manager.unregisterServer(name2),",
  "    // 控制面（通用 MCP 生命周期：注册即连、注销即断的补充控制）",
  "    connect: (name2, scope) => manager.connect(name2, scope),",
  "    disconnect: (name2, scope) => manager.disconnect(name2, scope),",
  "    reconnect: (name2, scope) => manager.reconnect(name2, scope),",
  "    // 查询面（服务状态感知：连接状态 / 工具列表 / 全量摘要）",
  "    getStatus: (name2) => {",
  "      const servers = manager.summary().servers ?? [];",
  "      const found = servers.find((s) => s.name === name2);",
  "      if (found === void 0)",
  "        return void 0;",
  "      return found;",
  "    },",
  "    getTools: (name2) => {",
  "      return manager.registeredToolsFor(name2);",
  "    },",
  "    // 豁免（#770-14 E）：同上，summary() 宽面经 unknown 中转到 McpServerSummary[]；不断言改动、不重构类型。",
  "    list: () => manager.summary().servers ?? []",
  "  };",
  "  // 本地补丁（rc.3）：宿主自 0.2.2-rc.3 起自己注册 mcpManager（核心 MCP 管理器，面是",
  "  // list/register/restart/probe/watch）。cordis 对同名服务的第二次 provide 直接抛",
  "  // `service \"mcpManager\" has been registered at <...>`，apply 就此整体失败：一条路由都没",
  "  // 注册，面板每个请求都落到宿主的 /api 前缀上，回 HTTP 404。故这里改成——名字空着才认领；",
  "  // 已被占用就只补核心缺的老方法，核心已有的键一律不覆盖，卸载时删掉补上的键。",
  "  // 服务在其提供者 fiber 激活前对 ctx.get 不可见，故读 strict=false 的形态判断名字是否已被声明。",
  "  const existing = currentMcpManagerService(ctx);",
  "  if (existing !== void 0) {",
  "    augmentMcpManagerService(ctx, existing, legacy);",
  "    return;",
  "  }",
  "  try {",
  "    ctx.provide(\"mcpManager\", legacy);",
  "    return;",
  "  } catch (error) {",
  "    ctx.logger.warn(`dsh-mcp-manager: mcpManager 已被宿主占用，改为补缺：${msgOf(error)}`);",
  "  }",
  "  const late = currentMcpManagerService(ctx);",
  "  if (late !== void 0)",
  "    augmentMcpManagerService(ctx, late, legacy);",
  "}",
  "/** 宿主当前的 mcpManager（不论其 fiber 是否已激活）；没有同名服务时 undefined。 */",
  "function currentMcpManagerService(ctx) {",
  "  if (typeof ctx.get !== \"function\")",
  "    return void 0;",
  "  const service = ctx.get(\"mcpManager\", false);",
  "  return service === null ? void 0 : service;",
  "}",
  "/**",
  " * 在宿主（核心）已注册的 mcpManager 上补上本插件的老接口：只写核心没有的键，写了就在",
  " * 卸载时删掉。核心的 list / register 与老门面的同名成员语义不同，故一并不动。",
  " */",
  "function augmentMcpManagerService(ctx, target, legacy) {",
  "  const applied = [];",
  "  for (const [key, method] of Object.entries(legacy)) {",
  "    if (typeof target[key] === \"function\")",
  "      continue;",
  "    try {",
  "      Object.defineProperty(target, key, { configurable: true, writable: true, value: method });",
  "      applied.push(key);",
  "    } catch (error) {",
  "      ctx.logger.warn(`dsh-mcp-manager: 无法补齐 mcpManager.${key}：${msgOf(error)}`);",
  "    }",
  "  }",
  "  if (applied.length === 0)",
  "    return;",
  "  ctx.logger.info(`dsh-mcp-manager: 核心 mcpManager 上补上老接口 ${applied.join(\"/\")}`);",
  "  ctx.effect(() => () => {",
  "    for (const key of applied)",
  "      delete target[key];",
  "  }, \"dsh-mcp-manager: legacy mcpManager methods\");",
  "}"
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
  `  // ${UPSTREAM.version} → ${LOCAL_VERSION} 空步（本地补丁：写队列 + mcpManager 服务兼容，home 级存储形态不变）：run 指共享空函数，只推进刻度。`,
  `  { fromVersion: "${UPSTREAM.version}", targetVersion: "${LOCAL_VERSION}", run: tickUpgradeVersion }`
].join('\n')

/** Правки бандла: каждая должна найтись ровно один раз, иначе генерация падает. */
export const DELTAS = [
  // Старое объявление цепочки убираем целиком: новая очередь вводится в следующей правке.
  { label: 'старая карта цепочек записи', from: `${OLD_WRITE_CHAINS}\n`, to: '' },
  { label: 'схлопывание writeFileAtomic (drainWriteSlot)', from: OLD_WRITE_FILE_ATOMIC, to: NEW_WRITE_FILE_ATOMIC },
  { label: 'поле persistSlots в CatalogDirectory', from: OLD_DIRTY_FIELD, to: NEW_DIRTY_FIELD },
  { label: 'слияние persistRoot по root', from: OLD_PERSIST_ROOT, to: NEW_PERSIST_ROOT },
  { label: 'пустой шаг апгрейда до нашей версии', from: OLD_LAST_STEP, to: NEW_LAST_STEP },
  // Ядро 0.2.2-rc.3 само регистрирует mcpManager: повторный provide ронял apply.
  { label: 'служба mcpManager на новом ядре', from: OLD_PROVIDE_MCP_MANAGER, to: NEW_PROVIDE_MCP_MANAGER }
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
  return Buffer.from(relaxCorePins(text.replace(from, `"version": "${LOCAL_VERSION}"`)), 'utf8')
}

/**
 * Пиры ядра: апстрим объявляет точную версию ядра, на котором собран его тарбол
 * (`"@deepseek-ai/dsh-tools": "0.2.2-rc.1"`). Для хоста это требование «ровно этот
 * релиз»: на следующем rc он отвергает плагин целиком, и панель MCP исчезает.
 * Пакет тот же, меняется только форма требования — диапазон от той же версии.
 * Остальные пиры (`react`, `@deepseek-ai/cordis`) не трогаются: их версии свои.
 * @param {string} text - Манифест апстрима с нашим номером версии.
 * @returns {string} Манифест с диапазонными пирами ядра.
 */
function relaxCorePins(text) {
  return text.replace(
    /("(@deepseek-ai\/dsh-[a-z-]+)":\s*")(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)(")/gu,
    (_match, head, _name, version, tail) => `${head}^${version}${tail}`,
  )
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
