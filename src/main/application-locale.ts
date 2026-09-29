export type HarnessLocale = 'en' | 'zh'

/** Languages the shell itself speaks: the harness ships two, the shell adds Russian. */
export type DesktopLocale = 'en' | 'zh' | 'ru'

export function resolveHarnessLocale(
  preference: unknown,
  preferredSystemLanguages: readonly string[]
): HarnessLocale {
  if (preference === 'zh' || preference === 'en') return preference

  return preferredSystemLanguages[0]?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

/**
 * The shell's own surfaces — About window, tray and menu labels, update cards —
 * resolve apart from the harness. A preference the harness cannot use (Russian)
 * must not send the shell back to English, and the harness must never be handed
 * a locale it does not know.
 */
export function resolveDesktopLocale(
  preference: unknown,
  preferredSystemLanguages: readonly string[]
): DesktopLocale {
  if (preference === 'zh' || preference === 'en' || preference === 'ru') return preference

  const system = preferredSystemLanguages[0]?.toLowerCase() ?? ''
  if (system.startsWith('zh')) return 'zh'
  if (system.startsWith('ru')) return 'ru'
  return 'en'
}

export type LocaleText = { en: string; zh: string; ru: string }

/** Main-process counterpart of the card's text helper: one entry per language. */
export function desktopLocaleText(locale: DesktopLocale, values: LocaleText): string {
  return values[locale]
}
