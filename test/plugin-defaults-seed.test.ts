import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { parse } from 'yaml'
import { settingsYamlPath } from '../src/main/state/onboarding-seed'
import {
  PRESELECTED_LOCALE,
  RUSSIAN_LANG_SMART_UX_OFF,
  ensureRussianLangDefaults
} from '../src/main/state/plugin-defaults-seed'

const homes: string[] = []
const silent = (): void => undefined

afterEach(async () => {
  await Promise.all(homes.splice(0).map((home) => rm(home, { recursive: true, force: true })))
})

async function freshHome(settings?: string): Promise<string> {
  const home = await mkdtemp(join(tmpdir(), 'dsh-plugin-defaults-'))
  homes.push(home)
  await mkdir(home, { recursive: true })
  if (settings !== undefined) await writeFile(settingsYamlPath(home), settings)
  return home
}

async function readSettings(home: string): Promise<Record<string, unknown>> {
  return parse(await readFile(settingsYamlPath(home), 'utf8')) as Record<string, unknown>
}

describe('russian-lang defaults seeding', () => {
  it('preselects Russian and pins Smart UX off on an install that never ran', async () => {
    const home = await freshHome()
    const notes: string[] = []

    expect(ensureRussianLangDefaults({ dshHome: home, note: (line) => notes.push(line) })).toBe(true)

    const settings = await readSettings(home)
    expect(settings.locale).toEqual({ preference: PRESELECTED_LOCALE })
    expect(settings['russian-lang']).toEqual(RUSSIAN_LANG_SMART_UX_OFF)
    expect(notes.some((line) => line.includes('russian-lang.typography.liveInput'))).toBe(true)
    expect(notes.some((line) => line.includes('locale.preference'))).toBe(true)
  })

  it('seeds every Smart UX toggle as an explicit false, never as an absent key', async () => {
    const home = await freshHome()
    ensureRussianLangDefaults({ dshHome: home, note: silent })

    const section = (await readSettings(home))['russian-lang'] as Record<string, unknown>
    // An explicit false is what outranks a plugin default that later flips; an
    // absent key would silently inherit whatever the new default becomes.
    expect(Object.keys(section).sort()).toEqual([
      'agentPrompt',
      'quickSwitch',
      'slashAliases',
      'typography'
    ])
    expect(section.typography).toEqual({ enabled: false, liveInput: false, yo: false })
  })

  it('keeps a toggle the user already turned on and the language they picked', async () => {
    const home = await freshHome(
      [
        'locale:',
        '  preference: en',
        'russian-lang:',
        '  typography:',
        '    liveInput: true',
        '  overrides:',
        '    conversation.send: Отправить',
        ''
      ].join('\n')
    )

    expect(ensureRussianLangDefaults({ dshHome: home, note: silent })).toBe(true)

    const settings = await readSettings(home)
    expect(settings.locale).toEqual({ preference: 'en' })
    expect(settings['russian-lang']).toEqual({
      typography: { enabled: false, liveInput: true, yo: false },
      slashAliases: false,
      quickSwitch: false,
      agentPrompt: false,
      overrides: { 'conversation.send': 'Отправить' }
    })
  })

  it('keeps every other namespace', async () => {
    const home = await freshHome(['ui-theme:', '  preference: dark', 'llm-deepseek: {}', ''].join('\n'))

    expect(ensureRussianLangDefaults({ dshHome: home, note: silent })).toBe(true)

    const settings = await readSettings(home)
    expect(settings['ui-theme']).toEqual({ preference: 'dark' })
    expect(settings['llm-deepseek']).toEqual({})
  })

  it('is a no-op once the defaults are in place', async () => {
    const home = await freshHome()
    ensureRussianLangDefaults({ dshHome: home, note: silent })
    const before = await readFile(settingsYamlPath(home), 'utf8')

    expect(ensureRussianLangDefaults({ dshHome: home, note: silent })).toBe(false)
    expect(await readFile(settingsYamlPath(home), 'utf8')).toBe(before)
  })

  it('leaves an unreadable settings file to the Harness recovery', async () => {
    const home = await freshHome('ui-theme: [unclosed\n')
    const notes: string[] = []

    expect(ensureRussianLangDefaults({ dshHome: home, note: (line) => notes.push(line) })).toBe(false)
    expect(await readFile(settingsYamlPath(home), 'utf8')).toBe('ui-theme: [unclosed\n')
    expect(notes.some((line) => line.includes('unreadable'))).toBe(true)
  })

  it('leaves a scalar russian-lang section alone instead of replacing it', async () => {
    const home = await freshHome('russian-lang: nope\n')
    const notes: string[] = []

    expect(ensureRussianLangDefaults({ dshHome: home, note: (line) => notes.push(line) })).toBe(true)

    const settings = await readSettings(home)
    expect(settings['russian-lang']).toBe('nope')
    expect(settings.locale).toEqual({ preference: PRESELECTED_LOCALE })
    expect(notes.some((line) => line.includes('is not a mapping'))).toBe(true)
  })
})
