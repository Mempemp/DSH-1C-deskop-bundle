#!/usr/bin/env node
// Сборка русской редакции плагина уведомлений из апстрим-пакета.
//
// Генератор берёт опубликованный `@wingsky-1/dsh-notifier@0.2.11` (исходников
// апстрима у нас нет: плагин публикуется уже собранным), проверяет его файлы по
// хешам из этой таблицы, применяет русские тексты из `host-texts.mjs` и словарь
// интерфейса из `ui-ru.json`, дельты `deep-link.mjs`, `banner.mjs` и
// `single-toast.mjs`, и раскладывает готовые `lib/*` в наш пакет.
//
// Запуск:  node tools/localize.mjs [--upstream <каталог|tgz>] [--out <каталог>]
// Проверка: node tools/localize.mjs --check

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { HOST_IDENTITY, HOST_TEXT } from './host-texts.mjs'
import { CLIENT_TEXT } from './client-texts.mjs'
import { CLIENT_DELTAS, FEATURE_MARKERS, HOST_DELTAS, TOAST_DELTAS } from './deep-link.mjs'
import { BANNER_CLIENT_DELTAS, BANNER_CSS_DELTAS } from './banner.mjs'
import { SINGLE_TOAST_DELTAS } from './single-toast.mjs'

export const UPSTREAM = {
  name: '@wingsky-1/dsh-notifier',
  version: '0.2.11',
  integrity: 'sha512-kd/0tjgnXODr0zLh1NfF84P44s/OtCaWyzP+Cx9tlYYFo19Nsierwie0+vuh6vDB7PF2s8nWh442NXbduYx6Lg=='
}

// Хеши исходных файлов апстрима: генерация обязана идти из ровно этих байтов.
export const UPSTREAM_SHA256 = {
  'lib/index.js': '7f8aed2bdfea1ea46ac1c94b6775b934dc1801f0fc06cce8f3ab4c92bb5d5a90',
  'lib/client.js': '320c6d6f13c8b82b5c9ae746aaa8194bb0d2e2ee7b05f1a4620de340a7aeb359',
  'lib/server/channels/impl/system/toast.ps1': '2e9a8adc100599fd80537a73c23990e2adac3ee8c3d379ce9220064f55e83d6e',
  'lib/THIRD-PARTY-LICENSES': '7631be7cfcd922e26b7e5fa653b75a75f7a7ecd75c18e601281f6b64eae78ac9'
}

// Файлы, которые едут в наш пакет: два бандла правим, toast.ps1 правим одной
// дельтой (см. localizeToast), лицензии копируем как есть.
export const PATCHED_FILES = ['lib/index.js', 'lib/client.js']
export const COPIED_FILES = ['lib/THIRD-PARTY-LICENSES']

// toast.ps1 — копия апстрима плюс дельта deep-link (см. tools/deep-link.mjs):
// launch="dsh-notify://goto/<sessionId>" из payload, регистрация протокола,
// запасной dsh://open. Апстримный файл проверяется по UPSTREAM_SHA256 до
// дельты, результат — по TOAST_PATCHED_SHA256 после неё.
export const TOAST_PS1 = 'lib/server/channels/impl/system/toast.ps1'
export const TOAST_PATCHED_SHA256 = 'a75e9f7d619123015985785297f319bb9ff3659253417bee57154eb3fd0674fa'
// goto.ps1 — наш helper протокола dsh-notify:// (источник: tools/goto.ps1).
export const GOTO_PS1 = 'lib/server/goto.ps1'
// dsh-notify-helper.exe — нативная замена toast.ps1 + goto.ps1 (без PowerShell):
// исходник tools/helper/NotifyHelper.cs, сборка tools/helper/build.ps1.
// Хеш пинится: пересобрал exe — обнови HELPER_SHA256, иначе --check упадёт.
export const HELPER_EXE = 'lib/server/dsh-notify-helper.exe'
export const HELPER_SOURCE_EXE = 'tools/helper/dsh-notify-helper.exe'
export const HELPER_SHA256 = '1687f4d9960ca7cdc343aef286ccf6d8e1137b8b1a996016a5ecfceda321fdfa'

export function localizeToast(source) {
  const applied = applyEntries(source, TOAST_DELTAS, 'дельта toast.ps1 (deep-link)')
  if (applied.absent.length > 0) {
    throw new Error(`${TOAST_PS1}: в апстриме не найдены якоря дельты — ${applied.absent.join(' | ')}`)
  }
  return applied.text
}

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Дельты сверх deep-link: оформление плашек (клиент) и «одно событие — один тост»
// (хост). Свой ярлык для сообщений об ошибке, проверка якорей — та же, что у
// CLIENT_DELTAS/HOST_DELTAS.
const EXTRA_DELTAS = {
  'lib/client.js': [['вид плашек', [...BANNER_CSS_DELTAS, ...BANNER_CLIENT_DELTAS]]],
  'lib/index.js': [['один тост на событие', SINGLE_TOAST_DELTAS]]
}

const CLIENT_ID = 'dsh-notifier-ru'
const HOST_PACKAGE_DIR = 'dsh-notifier-ru'
const RU_DICT_ANCHOR = '\n    var KIND_KEY_TABLE = {'
const CLIENT_REGISTER = 'localeService.register(NS, { zh, en });'
const CLIENT_LOADER_ID = 'id: "@wingsky-1/dsh-notifier",'
// Клиент различает конфликт версий по тексту сообщения хоста — обе половины наши,
// поэтому текст и проверка меняются вместе.
const CLIENT_CONFLICT_CHECK = 'failure.message.indexOf("版本冲突") >= 0'

const HAN = /[\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]/

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')
const sha512base64 = (buf) => `sha512-${createHash('sha512').update(buf).digest('base64')}`

// Комментарии апстрима остаются китайскими: это провенанс кода, а не текст для
// пользователя. Проверка ищет иероглифы только в строковых литералах.
export function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, ' ')
}

export function stringLiterals(text) {
  const out = []
  const re = /"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g
  let m
  while ((m = re.exec(text)) !== null) out.push(m[1] ?? m[2] ?? m[3])
  return out
}

// Строковые литералы, в которых остались иероглифы (то есть непереведённый текст).
export function untranslatedLiterals(text) {
  return [...new Set(stringLiterals(stripComments(text)).filter((lit) => HAN.test(lit)))]
}

// Китайский словарь апстрима остаётся в бандле: это настоящая локаль плагина,
// а не забытый перевод. Проверка клиента смотрит мимо него.
export function untranslatedClientLiterals(text) {
  return untranslatedLiterals(maskDict(text, 'zh'))
}

function maskDict(text, name) {
  const start = text.indexOf(`var ${name} = {`)
  if (start < 0) return text
  const end = text.indexOf('\n    };', start)
  if (end < 0) return text
  return text.slice(0, start) + ' '.repeat(end - start) + text.slice(end)
}

function applyEntries(text, entries, label) {
  const absent = []
  for (const [from] of entries) if (!text.includes(from)) absent.push(from)
  let result = text
  for (const [from, to] of [...entries].sort((a, b) => b[0].length - a[0].length)) {
    result = result.split(from).join(to)
  }
  return { text: result, absent, label }
}

// Фрагменты, которые апстрим склеивает с подстановками, оставляют после перевода
// полноширинные знаки: переводим их в обычные.
const PUNCTUATION = [
  ['，', ', '],
  ['。', '.'],
  ['：', ': '],
  ['；', '; '],
  ['、', ', '],
  ['（', ' ('],
  ['）', ')'],
  ['「', '«'],
  ['」', '»']
]

function normalizePunctuation(text, punctuation) {
  let result = text
  for (const [from, to] of punctuation) result = result.split(from).join(to)
  return result
}

export function localizeHost(source) {
  const identity = applyEntries(source, HOST_IDENTITY, 'хостовые идентификаторы')
  const texts = applyEntries(identity.text, HOST_TEXT, 'тексты хоста')
  const text = normalizePunctuation(texts.text, PUNCTUATION)
  return { text, absent: [...identity.absent, ...texts.absent] }
}

export function renderRuDict(dict, keys) {
  const lines = keys.map((key) => {
    const name = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)
    return `      ${name}: ${JSON.stringify(dict[key])}`
  })
  return `    var ru = {\n${lines.join(',\n')}\n    };\n`
}

export function localizeClient(source, ruDict) {
  const absent = []
  const texts = applyEntries(source, CLIENT_TEXT, 'тексты клиента')
  absent.push(...texts.absent)
  let text = normalizePunctuation(texts.text, PUNCTUATION)

  const zhKeys = parseDictKeys(text, 'zh')
  const enKeys = parseDictKeys(text, 'en')
  const ruKeys = Object.keys(ruDict)
  const sameSet = (a, b) => a.length === b.length && a.every((key, index) => key === b[index])
  if (!sameSet(zhKeys, enKeys)) throw new Error('словари zh/en апстрима разошлись по ключам')
  if (!sameSet(enKeys, ruKeys)) throw new Error('словарь ui-ru.json разошёлся по ключам с апстримом')

  if (!text.includes(RU_DICT_ANCHOR)) throw new Error('не найден якорь вставки русского словаря')
  text = text.replace(RU_DICT_ANCHOR, `\n${renderRuDict(ruDict, enKeys)}${RU_DICT_ANCHOR.trimStart()}`)

  for (const [from, to] of [
    [CLIENT_REGISTER, 'localeService.register(NS, { zh, en, ru });'],
    [CLIENT_LOADER_ID, `id: "${CLIENT_ID}",`],
    [CLIENT_CONFLICT_CHECK, 'failure.message.indexOf("конфликт версий") >= 0']
  ]) {
    if (!text.includes(from)) absent.push(from)
    text = text.split(from).join(to)
  }
  return { text, absent }
}

// Ключи словаря из собранного клиента: `var zh = { key: "...", ... }`.
export function parseDictKeys(clientSource, name) {
  const start = clientSource.indexOf(`var ${name} = {`)
  if (start < 0) throw new Error(`в клиенте нет словаря ${name}`)
  const end = clientSource.indexOf('};', start)
  const body = clientSource.slice(clientSource.indexOf('{', start) + 1, end)
  return [...body.matchAll(/^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:/gm)].map(
    (m) => m[1] ?? m[2] ?? m[3]
  )
}

async function resolveUpstream(explicit) {
  if (explicit) {
    const info = await stat(explicit)
    if (info.isDirectory()) return explicit
    return unpackTarball(explicit)
  }
  const env = process.env.DSH_NOTIFIER_UPSTREAM_DIR
  if (env) return env
  const dir = await mkdtemp(path.join(tmpdir(), 'dsh-notifier-upstream-'))
  // На Windows `npm` — это npm.cmd, а .cmd нельзя выполнить прямым spawn (нужна
  // оболочка). Запускаем npm-cli.js тем же node, что и генератор: без cmd.exe и
  // без экранирования аргументов. Если раскладки npm нет — обычный `npm` (POSIX).
  const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
  const local = existsSync(npmCli)
  const command = local ? process.execPath : 'npm'
  const args = local ? [npmCli, 'pack', `${UPSTREAM.name}@${UPSTREAM.version}`, '--pack-destination', dir]
    : ['pack', `${UPSTREAM.name}@${UPSTREAM.version}`, '--pack-destination', dir]
  const out = execFileSync(command, args, { encoding: 'utf8' }).trim().split('\n').pop()
  return unpackTarball(path.join(dir, out))
}

async function unpackTarball(tarball) {
  const bytes = await readFile(tarball)
  const integrity = sha512base64(bytes)
  if (integrity !== UPSTREAM.integrity) {
    throw new Error(`архив ${UPSTREAM.name}@${UPSTREAM.version} не совпал по контрольной сумме: ${integrity}`)
  }
  const dir = await mkdtemp(path.join(tmpdir(), 'dsh-notifier-unpack-'))
  // GNU tar принимает «C:\…» за удалённый хост (host:path) и падает с
  // «Cannot connect to C:» — на Windows просим трактовать имя как локальный файл.
  // bsdtar (macOS) такой опции не знает, поэтому она только для win32.
  const tarArgs = process.platform === 'win32'
    ? ['--force-local', '-xzf', tarball, '-C', dir, '--strip-components=1']
    : ['-xzf', tarball, '-C', dir, '--strip-components=1']
  execFileSync('tar', tarArgs, { stdio: 'inherit' })
  return dir
}

async function readUpstreamFile(upstream, rel) {
  // Установленное в приложении поколение правится на месте, поэтому рядом с
  // бандлом апстрим оставляет нетронутую копию — берём её, если она есть.
  const backup = path.join(upstream, `${rel}.upstream-backup`)
  const file = existsSync(backup) ? backup : path.join(upstream, rel)
  const bytes = await readFile(file)
  const actual = sha256(bytes)
  if (actual !== UPSTREAM_SHA256[rel]) {
    throw new Error(`${rel}: хеш не совпал с ${UPSTREAM.name}@${UPSTREAM.version} (получено ${actual})`)
  }
  return bytes
}

export async function readUiDict() {
  const raw = await readFile(path.join(PACKAGE_ROOT, 'tools', 'ui-ru.json'), 'utf8')
  return JSON.parse(raw)
}

export async function generate({ upstream, out = PACKAGE_ROOT }) {
  const dir = await resolveUpstream(upstream)
  const ruDict = await readUiDict()
  const notes = []

  for (const rel of PATCHED_FILES) {
    const bytes = await readUpstreamFile(dir, rel)
    const source = bytes.toString('utf8')
    const result = rel.endsWith('client.js') ? localizeClient(source, ruDict) : localizeHost(source)
    if (result.absent.length > 0) {
      throw new Error(`${rel}: в апстриме не найдены фрагменты — ${result.absent.join(' | ')}`)
    }
    const feature = applyEntries(result.text, rel.endsWith('client.js') ? CLIENT_DELTAS : HOST_DELTAS, 'дельта deep-link')
    if (feature.absent.length > 0) {
      throw new Error(`${rel}: в апстриме не найдены якоря deep-link — ${feature.absent.join(' | ')}`)
    }
    result.text = feature.text
    for (const [label, entries] of EXTRA_DELTAS[rel] ?? []) {
      const extra = applyEntries(result.text, entries, label)
      if (extra.absent.length > 0) {
        throw new Error(`${rel}: в апстриме не найдены якоря (${label}) — ${extra.absent.map((from) => from.slice(0, 80)).join(' | ')}`)
      }
      result.text = extra.text
    }
    const left = rel.endsWith('client.js') ? untranslatedClientLiterals(result.text) : untranslatedLiterals(result.text)
    if (left.length > 0) throw new Error(`${rel}: остались непереведённые строки — ${left.join(' | ')}`)
    const target = path.join(out, rel)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, result.text, 'utf8')
    notes.push(`${rel}: переведено, ${(bytes.length / 1024).toFixed(0)} КБ`)
  }

  const toastBytes = await readUpstreamFile(dir, TOAST_PS1)
  const toastText = localizeToast(toastBytes.toString('utf8'))
  await mkdir(path.dirname(path.join(out, TOAST_PS1)), { recursive: true })
  await writeFile(path.join(out, TOAST_PS1), toastText, 'utf8')
  notes.push(`${TOAST_PS1}: скопировано с дельтой (клик по тосту открывает сессию уведомления)`)

  const gotoSource = await readFile(path.join(PACKAGE_ROOT, 'tools', 'goto.ps1'))
  await mkdir(path.dirname(path.join(out, GOTO_PS1)), { recursive: true })
  await writeFile(path.join(out, GOTO_PS1), gotoSource)
  notes.push(`${GOTO_PS1}: наш helper протокола dsh-notify://`)

  const helperBytes = await readFile(path.join(PACKAGE_ROOT, ...HELPER_SOURCE_EXE.split('/')))
  if (sha256(helperBytes) !== HELPER_SHA256) {
    throw new Error(`${HELPER_SOURCE_EXE}: хеш не совпал с зафиксированным — пересборка? обновите HELPER_SHA256`)
  }
  await mkdir(path.dirname(path.join(out, HELPER_EXE)), { recursive: true })
  await writeFile(path.join(out, HELPER_EXE), helperBytes)
  notes.push(`${HELPER_EXE}: нативный helper (тост и клик без PowerShell)`)

  for (const rel of COPIED_FILES) {
    const bytes = await readUpstreamFile(dir, rel)
    const target = path.join(out, rel)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, bytes)
    notes.push(`${rel}: скопировано без изменений`)
  }
  return notes
}

export async function check(out = PACKAGE_ROOT) {
  const problems = []
  const ruDict = await readUiDict()
  const host = await readFile(path.join(out, 'lib', 'index.js'), 'utf8')
  const client = await readFile(path.join(out, 'lib', 'client.js'), 'utf8')

  for (const [file, text] of [['lib/index.js', host], ['lib/client.js', client]]) {
    const leftovers = file.endsWith('client.js') ? untranslatedClientLiterals(text) : untranslatedLiterals(text)
    for (const lit of leftovers) problems.push(`${file}: строка без перевода — ${lit.slice(0, 80)}`)
    if (text.includes('@wingsky-1/dsh-notifier')) problems.push(`${file}: осталось имя апстрим-пакета`)
  }
  if (!host.includes(`var PACKAGE_DIR = "${HOST_PACKAGE_DIR}";`)) problems.push('lib/index.js: не переключена папка данных плагина')
  if (!client.includes(`id: "${CLIENT_ID}",`)) problems.push('lib/client.js: не переключён идентификатор модуля')
  if (!client.includes('localeService.register(NS, { zh, en, ru });')) problems.push('lib/client.js: русский словарь не зарегистрирован')

  const ruKeys = Object.keys(ruDict)
  const shippedKeys = parseDictKeys(client, 'ru')
  if (!(ruKeys.length === shippedKeys.length && ruKeys.every((key, index) => key === shippedKeys[index]))) {
    problems.push(`lib/client.js: словарь ru в бандле разошёлся с tools/ui-ru.json (${shippedKeys.length} против ${ruKeys.length})`)
  }
  const toast = await readFile(path.join(out, TOAST_PS1))
  if (sha256(toast) !== TOAST_PATCHED_SHA256) problems.push(`${TOAST_PS1}: файл отличается от зафиксированной копии с дельтой`)
  try {
    const helper = await readFile(path.join(out, HELPER_EXE))
    if (sha256(helper) !== HELPER_SHA256) problems.push(`${HELPER_EXE}: хеш не совпал с зафиксированным`)
  } catch {
    problems.push(`${HELPER_EXE}: файл отсутствует`)
  }
  for (const [rel, markers] of Object.entries(FEATURE_MARKERS)) {
    let text
    try {
      text = await readFile(path.join(out, rel), 'utf8')
    } catch {
      problems.push(`${rel}: файл отсутствует`)
      continue
    }
    for (const marker of markers) if (!text.includes(marker)) problems.push(`${rel}: нет маркера deep-link — ${marker}`)
  }
  for (const rel of COPIED_FILES) {
    const bytes = await readFile(path.join(out, rel))
    if (sha256(bytes) !== UPSTREAM_SHA256[rel]) problems.push(`${rel}: файл отличается от апстрима`)
  }
  return problems
}

async function main() {
  const args = process.argv.slice(2)
  const value = (flag) => {
    const index = args.indexOf(flag)
    return index >= 0 ? args[index + 1] : undefined
  }
  if (args.includes('--check')) {
    const problems = await check(value('--out') ?? PACKAGE_ROOT)
    for (const problem of problems) console.error(`✗ ${problem}`)
    if (problems.length > 0) process.exitCode = 1
    else console.log('✓ русская редакция собрана из апстрима: расхождений нет')
    return
  }
  const notes = await generate({ upstream: value('--upstream'), out: value('--out') ?? PACKAGE_ROOT })
  for (const note of notes) console.log(`✓ ${note}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
