/**
 * The languages the shell itself speaks. Deliberately separate from the harness
 * locale: the harness ships Chinese and English, the shell adds Russian, and a
 * window that guesses its own language from the page is how a Russian machine
 * ends up with an English menu.
 */
export const desktopLocales = ['en', 'zh', 'ru'] as const

export type DesktopLocale = (typeof desktopLocales)[number]

export type LocaleText = { en: string; zh: string; ru: string }

const desktopLocaleSet = new Set<string>(desktopLocales)

export function isDesktopLocale(value: unknown): value is DesktopLocale {
  return typeof value === 'string' && desktopLocaleSet.has(value)
}

/** One entry per language: the shape every shell-owned label table uses. */
export function desktopLocaleText(locale: DesktopLocale, values: LocaleText): string {
  return values[locale]
}
