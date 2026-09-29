import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { projectRoot } from './patch-path'

/**
 * Русская редакция плагина уведомлений живёт в сборке как компонент: сборка
 * доставляет её из packages/dsh-notifier-ru, а текст правится генератором поверх
 * опубликованного апстрима. Тест держит обе половины контракта — провенанс сборки
 * и то, что пользователь действительно видит по-русски.
 */
const packageRoot = path.join(projectRoot, 'packages', 'dsh-notifier-ru')
const bundleFiles = [
  'lib/index.js',
  'lib/client.js',
  'lib/server/channels/impl/system/toast.ps1',
  'lib/THIRD-PARTY-LICENSES'
]
const han = /[\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]/

type Notification = { title: string; body: string }
type RenderOutput = {
  kinds: Record<string, Notification>
  test: Notification
  duration: string
  tools: Record<string, string>
}
type Run = { status: number; stdout: string; stderr: string }

function runNode(args: string[], cwd: string): Run {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8' })
  return { status: result.status ?? -1, stdout: result.stdout ?? '', stderr: result.stderr ?? '' }
}

function renderNotifications(): RenderOutput {
  const render = runNode(
    [path.join('test', 'fixtures', 'dsh-notifier-ru-render.mjs'), path.join(packageRoot, 'lib', 'index.js')],
    projectRoot
  )

  expect(render.status, render.stderr).toBe(0)
  return JSON.parse(render.stdout) as RenderOutput
}

describe('dsh-notifier-ru: русская редакция плагина уведомлений', () => {
  it('собрана из зафиксированного апстрима без расхождений по переводу и словарю', () => {
    const check = runNode(['tools/localize.mjs', '--check'], packageRoot)

    expect(check.stderr.trim()).toBe('')
    expect(check.status).toBe(0)
  })

  it('рендерит русский текст в каждом виде уведомления', () => {
    const rendered = renderNotifications()

    expect(Object.keys(rendered.kinds)).toEqual(
      expect.arrayContaining(['ask', 'question', 'done', 'subagent-done', 'error', 'turn-end'])
    )
    expect(JSON.stringify(rendered)).not.toMatch(han)

    expect(rendered.kinds.ask?.title).toBe('DSH: нужно подтверждение')
    expect(rendered.kinds.ask?.body).toContain('ждёт подтверждения (инструмент: команда PowerShell)')
    expect(rendered.kinds.ask?.body).toContain('Подтвердите или отклоните в DSH')
    expect(rendered.kinds.question?.title).toBe('DSH: вопрос к вам')
    expect(rendered.kinds.question?.body).toContain('Вопрос: Какой отчёт нужен?')
    expect(rendered.kinds.done?.title).toBe('DSH: задача выполнена')
    expect(rendered.kinds.done?.body).toContain('Задача «Отчёт за квартал» выполнена')
    expect(rendered.kinds['subagent-done']?.title).toBe('DSH: подзадача выполнена')
    expect(rendered.kinds.error?.title).toBe('DSH: ошибка задачи')
    expect(rendered.kinds.error?.body).toContain('Раунд 3, шаг 2: провайдер не ответил')
    expect(rendered.kinds['turn-end']?.body).toBe('Задача «Отчёт за квартал», раунд 3: работа завершена')
    expect(rendered.test.body).toBe('Цепочка уведомлений работает (тест из настроек плагина)')
  })

  it('считает длительность и называет инструменты по-русски', () => {
    const rendered = renderNotifications()

    expect(rendered.duration).toBe('1 ч 2 мин 5 с')
    expect(rendered.kinds.done?.body).toContain('Заняло: 1 ч 2 мин 5 с')
    expect(rendered.tools.pwsh).toBe('команда PowerShell')
    expect(rendered.tools.read).toBe('чтение файла')
    expect(rendered.tools.ssh_tunnel).toBe('SSH-туннель')
    expect(JSON.stringify(rendered.tools)).not.toMatch(han)
  })

  it('едет в сборке как локальный компонент с русской локалью в клиенте', async () => {
    const flavor = parseYaml(await readFile(path.join(projectRoot, 'installer-flavor.yml'), 'utf8')) as {
      sources: { kind?: string; from?: string; path?: string }[]
    }
    const row = flavor.sources.find((source) => source.path === './packages/dsh-notifier-ru')

    expect(row).toMatchObject({ kind: 'plugin', from: 'local' })

    const manifest = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf8')) as {
      name: string
      version: string
      exports: Record<string, string>
      peerDependencies: Record<string, string>
    }

    expect(manifest.name).toBe('dsh-notifier-ru')
    // Сам плагин читает свою версию из этого манифеста и разбирает её
    // собственным строго числовым parseVersion (`lib/index.js`, upgrade-цепочка):
    // «0.2.7-ru.1» роняет его на активации — «неподдерживаемый номер версии»,
    // и харнесс не стартует. Форк сохраняет версию апстрима; отличие от него —
    // в имени пакета и текстах.
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+$/)
    expect(manifest.exports['.']).toBe('./lib/index.js')
    expect(manifest.exports['./client']).toBe('./lib/client.js')
    expect(manifest.peerDependencies['@deepseek-ai/dsh-settings']).toBe('0.1.7-rc.2')

    for (const file of bundleFiles) expect(existsSync(path.join(packageRoot, file)), file).toBe(true)

    const client = readFileSync(path.join(packageRoot, 'lib', 'client.js'), 'utf8')
    expect(client).toContain('window.__ModuleLoader__.load({')
    expect(client).toContain('id: "dsh-notifier-ru",')
    expect(client).toContain('localeService.register(NS, { zh, en, ru });')

    const dict = JSON.parse(readFileSync(path.join(packageRoot, 'tools', 'ui-ru.json'), 'utf8')) as Record<
      string,
      string
    >
    expect(Object.keys(dict).length).toBeGreaterThan(200)
    expect(JSON.stringify(dict)).not.toMatch(han)
    for (const key of Object.keys(dict)) expect(client, key).toContain(`${key}:`)
  })
})
