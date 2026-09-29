import { describe, expect, it } from 'vitest'
import { resolveDesktopLocale, resolveHarnessLocale } from '../src/main/application-locale'

describe('application locale', () => {
  it('uses the saved DSH preference when one exists', () => {
    expect(resolveHarnessLocale('en', ['zh-Hans-CN'])).toBe('en')
    expect(resolveHarnessLocale('zh', ['en-US'])).toBe('zh')
  })

  it('defaults the first launch from the preferred system language', () => {
    expect(resolveHarnessLocale(undefined, ['zh-Hans-CN', 'en-US'])).toBe('zh')
    expect(resolveHarnessLocale(undefined, ['zh-Hant-TW', 'en-US'])).toBe('zh')
    expect(resolveHarnessLocale(undefined, ['en-US', 'zh-Hans-CN'])).toBe('en')
    expect(resolveHarnessLocale(undefined, [])).toBe('en')
  })

  it('falls back to the system language when the saved preference is invalid', () => {
    expect(resolveHarnessLocale('auto', ['zh-CN'])).toBe('zh')
    expect(resolveHarnessLocale({ value: 'zh' }, ['en-US'])).toBe('en')
  })

  it('never hands the harness a language it does not know', () => {
    expect(resolveHarnessLocale('ru', ['ru-RU'])).toBe('en')
    expect(resolveHarnessLocale(undefined, ['ru-RU'])).toBe('en')
  })
})

describe('shell locale', () => {
  it('keeps the preference the harness itself would accept', () => {
    expect(resolveDesktopLocale('en', ['ru-RU'])).toBe('en')
    expect(resolveDesktopLocale('zh', ['en-US'])).toBe('zh')
  })

  it('accepts Russian, which the harness does not ship', () => {
    expect(resolveDesktopLocale('ru', ['en-US'])).toBe('ru')
    expect(resolveDesktopLocale(undefined, ['ru-RU', 'en-US'])).toBe('ru')
  })

  it('falls back to English when neither the preference nor the system asks otherwise', () => {
    expect(resolveDesktopLocale(undefined, ['de-DE'])).toBe('en')
    expect(resolveDesktopLocale(undefined, [])).toBe('en')
    expect(resolveDesktopLocale({ value: 'ru' }, ['en-US'])).toBe('en')
  })
})
