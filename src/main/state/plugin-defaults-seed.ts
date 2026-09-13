import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { parse, stringify } from 'yaml'
import { settingsYamlPath } from './onboarding-seed'

/**
 * Durable plugin defaults a prepared bundle seeds before the first Harness
 * boot.
 *
 * `@goodandready/dsh-russian-lang` is vendored by the installer catalog (see
 * the `from: npm` entry in `installer-flavor.yml`). Its own schema already
 * defaults every Smart UX toggle to false, but the bundle must not depend on an
 * upstream default staying false: the schema belongs to the plugin, and a later
 * version is free to flip it. Pinning the explicit `false` values keeps the
 * delivered behaviour — localization available, Smart UX off — stable across
 * plugin upgrades, which matters because those features mutate the composer DOM
 * and are the least stable part of the plugin.
 *
 * The language itself is preselected through the core locale seam
 * (`locale.preference`) rather than the plugin's own `enabled` flag. The locale
 * runtime adopts a stored preference as soon as a language pack registers it
 * (`addLanguage`), and keeps rendering the browser-derived locale while no pack
 * provides it — so a preference written here is safe even before the plugin has
 * loaded, and a plugin that fails to load leaves the UI on its previous
 * language instead of breaking. `enabled` also drives the plugin's spellcheck
 * and its Alt+L layout fix, so the seed deliberately leaves it alone.
 *
 * Existing keys are never overwritten and `overrides` is never touched: a user
 * who turned a toggle on keeps it. The settings provider resolves schema
 * defaults first and this file's user layer last, so a seeded value only wins
 * while the user has expressed no choice of their own.
 */

/** Selectable language this bundle preselects; provided by the russian-lang pack. */
export const PRESELECTED_LOCALE = 'ru'

/** Settings namespace owned by `@goodandready/dsh-russian-lang`. */
const RUSSIAN_LANG_NAMESPACE = 'russian-lang'

/** Settings namespace owned by the core locale feature. */
const LOCALE_NAMESPACE = 'locale'

/** Field carrying the durable locale selection inside {@link LOCALE_NAMESPACE}. */
const LOCALE_PREFERENCE_FIELD = 'preference'

/**
 * Smart UX toggles pinned off. `russian-lang.enabled` is deliberately absent —
 * it is the plugin's language master switch and also gates its spelling and
 * layout-fix behaviour, so the bundle leaves it to the plugin and the user.
 */
export const RUSSIAN_LANG_SMART_UX_OFF = {
  typography: { enabled: false, liveInput: false, yo: false },
  slashAliases: false,
  quickSwitch: false,
  agentPrompt: false
} as const

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

/**
 * Read one namespace section to extend. A section holding a scalar is reported
 * and skipped, the same way the welcome-notice seed leaves an unexpected
 * document to the Harness rather than replacing what the user had.
 * @returns an editable copy of the section, or undefined to leave it alone.
 */
function extendableSection(
  document: Record<string, unknown>,
  namespace: string,
  note: (line: string) => void
): Record<string, unknown> | undefined {
  const current = document[namespace]
  if (current === undefined || current === null) return {}
  const record = asRecord(current)
  if (record === undefined) {
    note(`[plugin-defaults] settings.yaml ${namespace} is not a mapping; leaving it untouched`)
    return undefined
  }
  return { ...record }
}

/**
 * Copy every default the target section does not define yet. A mapping default
 * recurses when the target holds a mapping, and is skipped when the target
 * holds a scalar, so a hand-edited value is never replaced by a subtree.
 * @returns dotted paths that had to be written.
 */
function fillMissing(
  target: Record<string, unknown>,
  defaults: Record<string, unknown>,
  prefix: string
): string[] {
  const written: string[] = []
  for (const [key, value] of Object.entries(defaults)) {
    const path = prefix === '' ? key : `${prefix}.${key}`
    const nested = asRecord(value)
    if (nested !== undefined) {
      const existing = target[key]
      if (existing === undefined || existing === null) {
        const created: Record<string, unknown> = {}
        target[key] = created
        written.push(...fillMissing(created, nested, path))
        continue
      }
      const record = asRecord(existing)
      if (record === undefined) continue
      written.push(...fillMissing(record, nested, path))
      continue
    }
    if (target[key] === undefined) {
      target[key] = value
      written.push(path)
    }
  }
  return written
}

/**
 * Preselect Russian and pin the russian-lang Smart UX toggles off. Reports
 * rather than throws, exactly like the welcome-notice seed, so a launch never
 * depends on it — the caller decides whether to surface the failure.
 * @returns whether settings.yaml had to be written.
 */
export function ensureRussianLangDefaults(options: {
  dshHome: string
  note: (line: string) => void
}): boolean {
  const file = settingsYamlPath(options.dshHome)
  let document: Record<string, unknown> = {}

  if (existsSync(file)) {
    let parsed: unknown
    try {
      parsed = parse(readFileSync(file, 'utf8'))
    } catch {
      // A file the Harness itself cannot parse: leave it to its own recovery
      // rather than replacing whatever the user had.
      options.note('[plugin-defaults] settings.yaml is unreadable; leaving it untouched')
      return false
    }
    const record = asRecord(parsed)
    if (record === undefined) {
      if (parsed !== null && parsed !== undefined) {
        options.note('[plugin-defaults] settings.yaml is not a mapping; leaving it untouched')
        return false
      }
      document = {}
    } else {
      document = record
    }
  }

  const written: string[] = []

  const russian = extendableSection(document, RUSSIAN_LANG_NAMESPACE, options.note)
  if (russian !== undefined) {
    const filled = fillMissing(russian, RUSSIAN_LANG_SMART_UX_OFF, RUSSIAN_LANG_NAMESPACE)
    if (filled.length > 0) {
      document[RUSSIAN_LANG_NAMESPACE] = russian
      written.push(...filled)
    }
  }

  const locale = extendableSection(document, LOCALE_NAMESPACE, options.note)
  if (locale !== undefined && locale[LOCALE_PREFERENCE_FIELD] === undefined) {
    locale[LOCALE_PREFERENCE_FIELD] = PRESELECTED_LOCALE
    document[LOCALE_NAMESPACE] = locale
    written.push(`${LOCALE_NAMESPACE}.${LOCALE_PREFERENCE_FIELD}`)
  }

  if (written.length === 0) return false

  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, stringify(document), 'utf8')
  options.note(`[plugin-defaults] pinned Russian defaults: ${written.join(', ')}`)
  return true
}
