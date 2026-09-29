import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { desktopLocaleText, type DesktopLocale } from './application-locale'

interface PackageMetadata {
  version?: unknown
  dependencies?: Record<string, unknown>
}

function readPackageMetadata(path: string): PackageMetadata | undefined {
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as PackageMetadata
  } catch {
    return undefined
  }
}

function validVersion(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

export function bundledHarnessVersion(appPath: string): string | undefined {
  const installedMetadata = readPackageMetadata(
    join(appPath, 'node_modules', '@deepseek-ai', 'dsh', 'package.json')
  )
  const installedVersion = validVersion(installedMetadata?.version)
  if (installedVersion) return installedVersion

  const appMetadata = readPackageMetadata(join(appPath, 'package.json'))
  return validVersion(appMetadata?.dependencies?.['@deepseek-ai/dsh'])
}

export function aboutDetail(
  desktopVersion: string,
  harnessVersion: string | undefined,
  locale: DesktopLocale
): string {
  const harness =
    harnessVersion ?? desktopLocaleText(locale, { en: 'Unknown', zh: '未知', ru: 'неизвестно' })
  if (locale === 'zh') {
    return `DSH Desktop 版本：${desktopVersion}\n内置 Harness 版本：${harness}\n\nHarness 随 DSH Desktop 更新。`
  }
  if (locale === 'ru') {
    return `Версия DSH Desktop: ${desktopVersion}\nВерсия встроенного Harness: ${harness}\n\nHarness обновляется вместе с DSH Desktop.`
  }
  return `DSH Desktop version: ${desktopVersion}\nBundled Harness version: ${harness}\n\nHarness is updated with DSH Desktop.`
}
