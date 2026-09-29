#!/usr/bin/env node
// Сборка русской редакции плагина уведомлений из апстрим-пакета.
//
// Генератор берёт опубликованный `@wingsky-1/dsh-notifier@0.2.7` (исходников
// апстрима у нас нет: плагин публикуется уже собранным), проверяет его файлы по
// хешам из этой таблицы, применяет русские тексты из `host-texts.mjs` и словарь
// интерфейса из `ui-ru.json`, и раскладывает готовые `lib/*` в наш пакет.
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

export const UPSTREAM = {
  name: '@wingsky-1/dsh-notifier',
  version: '0.2.7',
  integrity: 'sha512-wR5uk4nBVyhQ9HEyMpRJc5EKzTAv1YbQDR6tVeUqphJUWED02/OF+YujJctv8TBMIOL8PdtN0V1D8u1ErCnoag=='
}

// Хеши исходных файлов апстрима: генерация обязана идти из ровно этих байтов.
export const UPSTREAM_SHA256 = {
  'lib/index.js': '87474bc94d70b233be91d20d100bf137182e0a6fbb211203f41dda1f0baf4313',
  'lib/client.js': '8ad6edc6167adcfbf01816b626e661639baf316a28ad1a7e92d8506f3d0ca0ef',
  'lib/server/channels/impl/system/toast.ps1': '2e9a8adc100599fd80537a73c23990e2adac3ee8c3d379ce9220064f55e83d6e',
  'lib/THIRD-PARTY-LICENSES': '7631be7cfcd922e26b7e5fa653b75a75f7a7ecd75c18e601281f6b64eae78ac9'
}

// Файлы, которые едут в наш пакет: два бандла правим, остальное копируем как есть.
export const PATCHED_FILES = ['lib/index.js', 'lib/client.js']
export const COPIED_FILES = ['lib/server/channels/impl/system/toast.ps1', 'lib/THIRD-PARTY-LICENSES']

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

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
  const out = execFileSync('npm', ['pack', `${UPSTREAM.name}@${UPSTREAM.version}`, '--pack-destination', dir], {
    encoding: 'utf8'
  }).trim().split('\n').pop()
  return unpackTarball(path.join(dir, out))
}

async function unpackTarball(tarball) {
  const bytes = await readFile(tarball)
  const integrity = sha512base64(bytes)
  if (integrity !== UPSTREAM.integrity) {
    throw new Error(`архив ${UPSTREAM.name}@${UPSTREAM.version} не совпал по контрольной сумме: ${integrity}`)
  }
  const dir = await mkdtemp(path.join(tmpdir(), 'dsh-notifier-unpack-'))
  execFileSync('tar', ['-xzf', tarball, '-C', dir, '--strip-components=1'], { stdio: 'inherit' })
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
    const left = rel.endsWith('client.js') ? untranslatedClientLiterals(result.text) : untranslatedLiterals(result.text)
    if (left.length > 0) throw new Error(`${rel}: остались непереведённые строки — ${left.join(' | ')}`)
    const target = path.join(out, rel)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, result.text, 'utf8')
    notes.push(`${rel}: переведено, ${(bytes.length / 1024).toFixed(0)} КБ`)
  }

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
