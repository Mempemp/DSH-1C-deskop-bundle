/**
 * Рендер текстов уведомлений из собранного плагина: тест проверяет, что в тосте
 * и в подписи виден русский текст, а не исходный китайский. Плагин наружу отдаёт
 * только apply(), поэтому к бандлу дописывается экспорт таблиц текста и полученный
 * файл импортируется — так проверяется настоящая сборка, а не её исходник.
 *
 * 0.2.11 вынес тела уведомлений в каталог LOCALE_TEXT и переименовал помощники:
 * NOTIFY_KINDS — это уже getNotifyKinds("zh"), а формат длительности —
 * formatDurationForLocale(ms, locale). Названий инструментов в тексте больше нет:
 * prettyToolName в апстриме возвращает имя инструмента как есть.
 *
 * Запуск: node test/fixtures/dsh-notifier-ru-render.mjs <путь к lib/index.js>
 */
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const bundle = path.resolve(String(process.argv[2] ?? ''))
const source = await readFile(bundle, 'utf8')
const dir = await mkdtemp(path.join(tmpdir(), 'dsh-notifier-ru-render-'))
const file = path.join(dir, 'index.mjs')
await writeFile(
  file,
  `${source}\nexport { NOTIFY_KINDS, TEST_NOTIFICATION, formatDurationForLocale };\n`,
  'utf8'
)

const mod = await import(pathToFileURL(file).href)

const DETAIL = {
  ask: { taskTitle: 'Отчёт за квартал', tool: 'pwsh', reason: 'нужен доступ к диску' },
  question: { taskTitle: 'Отчёт за квартал', question: 'Какой отчёт нужен?' },
  done: { taskTitle: 'Отчёт за квартал', durationMs: 3725000 },
  'subagent-done': { taskTitle: 'Разбор выгрузки', durationMs: 65000 },
  error: { taskTitle: 'Отчёт за квартал', turn: 3, step: 2, message: 'провайдер не ответил' },
  'turn-end': { taskTitle: 'Отчёт за квартал', turn: 3 }
}

const kinds = {}
for (const [kind, spec] of Object.entries(mod.NOTIFY_KINDS)) {
  kinds[kind] = { title: spec.title, body: spec.body(DETAIL[kind] ?? {}) }
}

process.stdout.write(
  JSON.stringify(
    {
      kinds,
      test: { title: mod.TEST_NOTIFICATION.title, body: mod.TEST_NOTIFICATION.body },
      duration: mod.formatDurationForLocale(3725000, "zh")
    },
    null,
    1
  )
)
