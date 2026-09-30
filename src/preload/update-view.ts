import type { UpdateStatus } from '../shared/contracts'

export type UpdateLocale = 'en' | 'zh' | 'ru'

export function shouldShowUpdate(status: UpdateStatus): boolean {
  if (['available', 'downloading', 'downloaded'].includes(status.phase)) return true
  return status.manual && ['checking', 'up-to-date', 'error', 'unsupported'].includes(status.phase)
}

export function isUpdateDismissed(
  status: UpdateStatus,
  dismissedVersion: string | null,
  dismissedTransientPhase: UpdateStatus['phase'] | null = null
): boolean {
  if (status.availableVersion) return status.availableVersion === dismissedVersion
  return status.phase === dismissedTransientPhase
}

/**
 * The card's language: what the shell reports wins, because Chromium's own locale
 * is the system's and can disagree with the language the app is used in. The
 * page's language is the answer only until the shell replies.
 */
export function cardLocale(shellValue: unknown, navigatorLanguage: string): UpdateLocale {
  if (shellValue === 'en' || shellValue === 'zh' || shellValue === 'ru') return shellValue
  const language = navigatorLanguage.toLowerCase()
  if (language.startsWith('zh')) return 'zh'
  if (language.startsWith('ru')) return 'ru'
  return 'en'
}

export interface UpdateHeadline {
  title: string
  description: string
}

/**
 * One entry per language, so a new locale is a branch in one place instead of a
 * hunt for ternaries; the type keeps every locale filled in.
 */
type LocaleText = { en: string; zh: string; ru: string }

const text = (locale: UpdateLocale, values: LocaleText): string => values[locale]

/**
 * The card's two lines: what happened, then what it means for the user.
 *
 * The version belongs in the second line rather than the first — a release
 * number answers "which one", not "what now", and reading the state should not
 * require parsing a version string out of a sentence.
 */
export function updateHeadline(status: UpdateStatus, locale: UpdateLocale): UpdateHeadline {
  const version = status.availableVersion ? `v${status.availableVersion}` : ''

  if (status.downgrade && status.availableVersion) {
    return {
      title: text(locale, {
        en: `Downgrading to ${version}`,
        zh: `正在降级到 ${version}`,
        ru: `Откат к ${version}`
      }),
      description: text(locale, {
        en: `Rolling back v${status.currentVersion} to ${version}`,
        zh: `将当前 v${status.currentVersion} 回退到 ${version}`,
        ru: `Возврат с v${status.currentVersion} на ${version}`
      })
    }
  }

  switch (status.phase) {
    case 'checking':
      return {
        title: text(locale, {
          en: 'Checking for updates',
          zh: '正在检查更新',
          ru: 'Проверка обновлений'
        }),
        description: text(locale, {
          en: `Currently on v${status.currentVersion}`,
          zh: `当前 v${status.currentVersion}`,
          ru: `Сейчас установлена v${status.currentVersion}`
        })
      }
    case 'available':
      return {
        title: text(locale, {
          en: 'Update available',
          zh: '有可用更新',
          ru: 'Доступно обновление'
        }),
        description: text(locale, {
          en: `${version} is ready to download.`,
          zh: `${version} 已发布，同意后开始下载。`,
          ru: `${version} готово к загрузке.`
        })
      }
    case 'downloading':
      return {
        title: text(locale, {
          en: 'Downloading update',
          zh: '正在下载更新',
          ru: 'Загрузка обновления'
        }),
        description: `${version} · ${Math.round(status.percent ?? 0)}%`
      }
    case 'downloaded':
      return {
        title: text(locale, { en: 'Update ready', zh: '更新已就绪', ru: 'Обновление готово' }),
        description: text(locale, {
          en: `${version} will be applied on next launch.`,
          zh: `${version} 将在重启后生效。`,
          ru: `${version} установится при следующем запуске.`
        })
      }
    case 'up-to-date':
      return {
        title: text(locale, { en: 'Up to date', zh: '已是最新版本', ru: 'Обновлений нет' }),
        description: text(locale, {
          en: `Currently on v${status.currentVersion}`,
          zh: `当前 v${status.currentVersion}`,
          ru: `Сейчас установлена v${status.currentVersion}`
        })
      }
    case 'unsupported':
      return {
        title: text(locale, {
          en: 'Automatic updates unavailable',
          zh: '此版本不支持自动更新',
          ru: 'Автообновление недоступно'
        }),
        description: text(locale, {
          en: 'Download new versions from the website.',
          zh: '请从官网下载新版本。',
          ru: 'Новую версию можно скачать со страницы релизов.'
        })
      }
    case 'error':
      return {
        title: text(locale, {
          en: 'Update failed',
          zh: '更新失败',
          ru: 'Не удалось обновить'
        }),
        description: text(locale, {
          en: 'Unable to check for or download updates.',
          zh: '无法检查或下载更新。',
          ru: 'Не удалось проверить или скачать обновление.'
        })
      }
    case 'idle':
      return { title: '', description: '' }
  }
}

export function updateMessage(status: UpdateStatus, locale: UpdateLocale): string {
  const version = status.availableVersion ? ` ${status.availableVersion}` : ''

  if (status.downgrade && status.availableVersion) {
    const percent = Math.round(status.percent ?? 0)
    if (status.phase === 'downloading') {
      return text(locale, {
        en: `Downgrading to ${status.availableVersion} (${percent}%)`,
        zh: `正在降级到 ${status.availableVersion}（${percent}%）`,
        ru: `Откат к ${status.availableVersion} (${percent}%)`
      })
    }
    if (status.phase === 'downloaded') {
      return text(locale, {
        en: `Downgrade ${status.availableVersion} is ready to install`,
        zh: `降级包 ${status.availableVersion} 已就绪，重启后生效`,
        ru: `Пакет отката ${status.availableVersion} готов к установке`
      })
    }
    return text(locale, {
      en: `Preparing to downgrade to ${status.availableVersion}`,
      zh: `正在准备降级到 ${status.availableVersion}`,
      ru: `Подготовка к откату на ${status.availableVersion}`
    })
  }

  switch (status.phase) {
    case 'checking':
      return text(locale, {
        en: 'Checking for updates…',
        zh: '正在检查更新…',
        ru: 'Проверка обновлений…'
      })
    case 'available':
      return text(locale, {
        en: `DSH Desktop${version} is available. Update now?`,
        zh: `发现新版本${version}，是否更新？`,
        ru: `Доступна версия DSH Desktop${version}. Обновить?`
      })
    case 'downloading': {
      const percent = Math.round(status.percent ?? 0)
      return text(locale, {
        en: `Downloading update ${percent}%`,
        zh: `正在下载更新 ${percent}%`,
        ru: `Загрузка обновления ${percent}%`
      })
    }
    case 'downloaded':
      return text(locale, {
        en: `DSH Desktop${version} is ready to install`,
        zh: `DSH Desktop${version} 已下载完成`,
        ru: `DSH Desktop${version} готов к установке`
      })
    case 'up-to-date':
      return text(locale, {
        en: 'DSH Desktop is up to date',
        zh: 'DSH Desktop 已是最新版本',
        ru: 'Установлена последняя версия DSH Desktop'
      })
    case 'unsupported':
      return text(locale, {
        en: 'Automatic updates are unavailable in this build',
        zh: '当前版本不支持自动更新',
        ru: 'В этой сборке автообновление недоступно'
      })
    case 'error':
      return text(locale, {
        en: 'Unable to check for or download updates',
        zh: '无法检查或下载更新',
        ru: 'Не удалось проверить или скачать обновление'
      })
    case 'idle':
      return ''
  }
}

/** Card chrome: the buttons, and the labels a screen reader reads instead of them. */
export interface UpdateCardLabels {
  card: string
  close: string
  updateNow: string
  restarting: string
  restartAndInstall: string
  skip: string
}

export function updateCardLabels(locale: UpdateLocale): UpdateCardLabels {
  return {
    card: text(locale, {
      en: 'DSH Desktop update',
      zh: 'DSH Desktop 更新',
      ru: 'Обновление DSH Desktop'
    }),
    close: text(locale, { en: 'Close', zh: '关闭', ru: 'Закрыть' }),
    updateNow: text(locale, { en: 'Update now', zh: '同意更新', ru: 'Обновить' }),
    restarting: text(locale, { en: 'Restarting…', zh: '正在重启…', ru: 'Перезапуск…' }),
    restartAndInstall: text(locale, {
      en: 'Restart and install',
      zh: '重新启动并安装',
      ru: 'Перезапустить и установить'
    }),
    skip: text(locale, { en: 'Skip this version', zh: '跳过此版本', ru: 'Пропустить эту версию' })
  }
}

/** The About window: where a manual check and a rollback start. */
export interface AboutLabels {
  windowTitle: string
  close: string
  versionLine: string
  harnessLine: string
  harnessHint: string
  selectVersion: string
  checkUpdates: string
  loadingVersions: string
  versionListError: string
  newerGroup: string
  olderGroup: string
  noVersions: string
  confirmInstall: (version: string) => string
  confirmDowngrade: (version: string, current: string) => string
}

export function aboutLabels(locale: UpdateLocale): AboutLabels {
  const zh = {
    windowTitle: '关于 DSH Desktop',
    close: '关闭',
    versionLine: 'DSH Desktop 版本： ',
    harnessLine: '内置 Harness 版本： ',
    harnessHint: 'Harness 随 DSH Desktop 更新。',
    selectVersion: '选择版本',
    checkUpdates: '检查更新',
    loadingVersions: '正在获取版本列表…',
    versionListError: '暂时无法获取版本列表',
    newerGroup: '较新版本',
    olderGroup: '历史版本（回退）',
    noVersions: '没有可选的其它版本',
    confirmInstall: (version: string) => `将安装 ${version}，确定继续？`,
    confirmDowngrade: (version: string, current: string) =>
      `将降级到 ${version}（当前 ${current}）。降级不会迁移新版本写入的数据，可能导致配置不兼容。确定继续？`
  }
  const en = {
    windowTitle: 'About DSH Desktop',
    close: 'Close',
    versionLine: 'DSH Desktop version: ',
    harnessLine: 'Bundled Harness version: ',
    harnessHint: 'Harness is updated with DSH Desktop.',
    selectVersion: 'Select version',
    checkUpdates: 'Check for updates',
    loadingVersions: 'Loading versions…',
    versionListError: 'Unable to load version list',
    newerGroup: 'Newer versions',
    olderGroup: 'Roll back',
    noVersions: 'No other versions available',
    confirmInstall: (version: string) => `Install ${version}?`,
    confirmDowngrade: (version: string, current: string) =>
      `This downgrades to ${version} (currently ${current}). A downgrade does not migrate data written by newer versions and may be config-incompatible. Continue?`
  }
  const ru = {
    windowTitle: 'О программе DSH Desktop',
    close: 'Закрыть',
    versionLine: 'Версия DSH Desktop: ',
    harnessLine: 'Версия встроенного Harness: ',
    harnessHint: 'Harness обновляется вместе с DSH Desktop.',
    selectVersion: 'Выбрать версию',
    checkUpdates: 'Проверить обновления',
    loadingVersions: 'Загружаем список версий…',
    versionListError: 'Не удалось получить список версий',
    newerGroup: 'Более новые версии',
    olderGroup: 'Откат к прежней версии',
    noVersions: 'Других версий нет',
    confirmInstall: (version: string) => `Установить ${version}?`,
    confirmDowngrade: (version: string, current: string) =>
      `Это откат к ${version} (сейчас ${current}). Данные, записанные новой версией, при откате не переносятся — настройки могут не подойти. Продолжить?`
  }
  return { en, zh, ru }[locale]
}
