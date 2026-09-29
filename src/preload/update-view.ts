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
