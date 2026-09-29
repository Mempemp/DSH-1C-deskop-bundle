import { describe, expect, it } from 'vitest'
import type { UpdateStatus } from '../src/shared/contracts'
import {
  aboutLabels,
  isUpdateDismissed,
  shouldShowUpdate,
  updateCardLabels,
  updateHeadline,
  updateMessage
} from '../src/preload/update-view'

const downloading: UpdateStatus = {
  phase: 'downloading',
  currentVersion: '1.0.0',
  availableVersion: '1.1.0',
  percent: 42.2,
  manual: false
}

const downloaded: UpdateStatus = {
  phase: 'downloaded',
  currentVersion: '1.0.0',
  availableVersion: '1.1.0',
  manual: false
}

describe('desktop update card visibility', () => {
  it('shows automatic downloads but keeps automatic background checks quiet', () => {
    expect(shouldShowUpdate(downloading)).toBe(true)
    expect(
      shouldShowUpdate({ phase: 'checking', currentVersion: '1.0.0', manual: false })
    ).toBe(false)
    expect(
      shouldShowUpdate({ phase: 'checking', currentVersion: '1.0.0', manual: true })
    ).toBe(true)
  })

  it('keeps a dismissed version hidden while its download phase changes', () => {
    expect(isUpdateDismissed(downloading, '1.1.0')).toBe(true)
    expect(isUpdateDismissed({ ...downloading, availableVersion: '1.2.0' }, '1.1.0')).toBe(
      false
    )
  })

  it('dismisses a downloaded update when the user closes the card', () => {
    expect(isUpdateDismissed(downloaded, null)).toBe(false)
    expect(isUpdateDismissed(downloaded, '1.0.0')).toBe(false)
    expect(isUpdateDismissed(downloaded, '1.1.0')).toBe(true)
  })

  it('formats localized progress copy', () => {
    expect(updateMessage(downloading, 'zh')).toBe('正在下载更新 42%')
    expect(updateMessage(downloading, 'en')).toBe('Downloading update 42%')
  })
})

describe('downgrade copy', () => {
  it('names the downgrade in both locales', () => {
    const status: UpdateStatus = {
      phase: 'downloading',
      currentVersion: '1.5.0',
      availableVersion: '1.2.0',
      manual: true,
      downgrade: true,
      percent: 30
    }
    expect(updateHeadline(status, 'zh').title).toContain('降级')
    expect(updateMessage(status, 'zh')).toContain('1.2.0')
    expect(updateHeadline(status, 'en').title.toLowerCase()).toContain('downgrad')
    expect(updateMessage(status, 'en')).toContain('1.2.0')
  })
})

describe('accepting an update is what starts the download', () => {
  it('asks rather than announcing a download already under way', () => {
    const available: UpdateStatus = {
      phase: 'available',
      currentVersion: '0.4.3',
      availableVersion: '0.4.4',
      manual: false
    }
    expect(updateMessage(available, 'zh')).toBe('发现新版本 0.4.4，是否更新？')
    expect(updateMessage(available, 'en')).toBe('DSH Desktop 0.4.4 is available. Update now?')
  })
})

describe('Russian copy', () => {
  const available: UpdateStatus = {
    phase: 'available',
    currentVersion: '0.4.3',
    availableVersion: '0.4.4',
    manual: false
  }

  it('answers in Russian without touching the other two locales', () => {
    expect(updateHeadline(available, 'ru').title).toBe('Доступно обновление')
    expect(updateHeadline(available, 'ru').description).toBe('v0.4.4 готово к загрузке.')
    expect(updateMessage(available, 'ru')).toBe('Доступна версия DSH Desktop 0.4.4. Обновить?')
    expect(updateMessage(available, 'en')).toBe('DSH Desktop 0.4.4 is available. Update now?')
    expect(updateMessage(available, 'zh')).toBe('发现新版本 0.4.4，是否更新？')
  })

  it('labels the card, including what a screen reader reads', () => {
    expect(updateCardLabels('ru')).toEqual({
      card: 'Обновление DSH Desktop',
      close: 'Закрыть',
      updateNow: 'Обновить',
      restarting: 'Перезапуск…',
      restartAndInstall: 'Перезапустить и установить',
      skip: 'Пропустить эту версию'
    })
    expect(updateCardLabels('en').updateNow).toBe('Update now')
    expect(updateCardLabels('zh').skip).toBe('跳过此版本')
  })
})

describe('about window labels', () => {
  it('names the version picker, the check button and the rollback group in Russian', () => {
    const labels = aboutLabels('ru')
    expect(labels.windowTitle).toBe('О программе DSH Desktop')
    expect(labels.selectVersion).toBe('Выбрать версию')
    expect(labels.checkUpdates).toBe('Проверить обновления')
    expect(labels.olderGroup).toBe('Откат к прежней версии')
    expect(labels.versionListError).toBe('Не удалось получить список версий')
  })

  it('keeps the confirmation of a downgrade apart from that of a plain install', () => {
    const ru = aboutLabels('ru')
    expect(ru.confirmInstall('0.10.0-4')).toBe('Установить 0.10.0-4?')
    expect(ru.confirmDowngrade('0.10.0-2', '0.10.0-3')).toContain('не переносятся')
    expect(aboutLabels('en').confirmDowngrade('0.10.0-2', '0.10.0-3')).toContain('0.10.0-2')
  })

  it('fills every language, so a new one cannot ship half translated', () => {
    for (const locale of ['en', 'zh', 'ru'] as const) {
      const labels = aboutLabels(locale)
      expect(labels.windowTitle.trim().length).toBeGreaterThan(0)
      expect(labels.harnessHint.trim().length).toBeGreaterThan(0)
      expect(labels.confirmInstall('1.0.0')).toContain('1.0.0')
    }
  })
})

