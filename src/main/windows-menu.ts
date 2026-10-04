import type { MenuItemConstructorOptions } from 'electron'
import { formatZoomPercentage, type DesktopMenuCommand } from '../shared/desktop-menu'
import { desktopLocaleText, type DesktopLocale } from '../shared/desktop-locale'

/**
 * The two caption menus the Windows page shows beside the sidebar toggle, in
 * the seat the upstream Desktop uses. The popups are native so they paint over
 * the page, the webviews and the caption controls without a separate view.
 */
export const windowsMenuNames = ['application', 'edit'] as const
export type WindowsMenuName = (typeof windowsMenuNames)[number]

/** Editing keys go to the focused editor, whose own history ignores Chromium's native undo stack. */
export type EditingKey = { keyCode: string; modifiers: Array<'control'> }

export interface WindowsMenuActions {
  run(command: DesktopMenuCommand): void
  sendEditingKey(key: EditingKey): void
}

export interface WindowsMenuRequest {
  name: WindowsMenuName
  x: number
  y: number
}

/** Validate a popup request from the page: a known menu anchored inside the window. */
export function parseWindowsMenuRequest(name: unknown, x: unknown, y: unknown): WindowsMenuRequest {
  const coordinate = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100_000
  if (!windowsMenuNames.includes(name as WindowsMenuName) || !coordinate(x) || !coordinate(y)) {
    throw new Error('The Windows caption menu request is invalid.')
  }
  return { name: name as WindowsMenuName, x, y }
}

/** One label per language: the shape keeps a new language from shipping half-translated. */
type MenuLabels = { en: string; zh: string; ru: string }

/**
 * Build one caption menu. The application menu carries every Desktop command
 * the former dropdown offered; the edit menu mirrors upstream.
 * @param locale - the shell's own language, which knows one more than the harness.
 * @param zoomFactor - current page zoom, shown on the reset item.
 */
export function windowsMenuTemplate(
  name: WindowsMenuName,
  locale: DesktopLocale,
  zoomFactor: number,
  actions: WindowsMenuActions
): MenuItemConstructorOptions[] {
  const command = (
    id: DesktopMenuCommand,
    labels: MenuLabels,
    accelerator?: string
  ): MenuItemConstructorOptions => ({
    label: desktopLocaleText(locale, labels),
    ...(accelerator === undefined ? {} : { accelerator, registerAccelerator: false }),
    click: () => actions.run(id)
  })
  const editing = (
    labels: MenuLabels,
    key: EditingKey,
    accelerator?: string
  ): MenuItemConstructorOptions => ({
    label: desktopLocaleText(locale, labels),
    ...(accelerator === undefined ? {} : { accelerator, registerAccelerator: false }),
    click: () => actions.sendEditingKey(key)
  })

  if (name === 'edit') {
    return [
      editing(
        { en: 'Undo', zh: '撤销', ru: 'Отменить' },
        { keyCode: 'Z', modifiers: ['control'] },
        'Ctrl+Z'
      ),
      editing(
        { en: 'Redo', zh: '重做', ru: 'Повторить' },
        { keyCode: 'Y', modifiers: ['control'] },
        'Ctrl+Y'
      ),
      { type: 'separator' },
      editing(
        { en: 'Cut', zh: '剪切', ru: 'Вырезать' },
        { keyCode: 'X', modifiers: ['control'] },
        'Ctrl+X'
      ),
      editing(
        { en: 'Copy', zh: '复制', ru: 'Копировать' },
        { keyCode: 'C', modifiers: ['control'] },
        'Ctrl+C'
      ),
      editing(
        { en: 'Paste', zh: '粘贴', ru: 'Вставить' },
        { keyCode: 'V', modifiers: ['control'] },
        'Ctrl+V'
      ),
      editing({ en: 'Delete', zh: '删除', ru: 'Удалить' }, { keyCode: 'Delete', modifiers: [] }),
      { type: 'separator' },
      editing(
        { en: 'Select All', zh: '全选', ru: 'Выделить всё' },
        { keyCode: 'A', modifiers: ['control'] },
        'Ctrl+A'
      )
    ]
  }

  return [
    command(
      'connect-phone',
      { en: 'Connect Phone…', zh: '连接手机…', ru: 'Подключить телефон…' },
      'Ctrl+Shift+M'
    ),
    command('restart-harness', { en: 'Restart', zh: '重启', ru: 'Перезапустить ядро' }, 'Ctrl+Shift+R'),
    command('safe-mode', {
      en: 'Restart as Safe Mode…',
      zh: '以安全模式重启…',
      ru: 'Перезапустить в безопасном режиме…'
    }),
    command('show-harness-log', {
      en: 'Show Harness Log',
      zh: '显示 Harness 日志',
      ru: 'Показать журнал'
    }),
    { type: 'separator' },
    {
      label: desktopLocaleText(locale, { en: 'View', zh: '视图', ru: 'Вид' }),
      submenu: [
        command('reload', { en: 'Reload', zh: '重新加载', ru: 'Перезагрузить страницу' }, 'Ctrl+R'),
        command(
          'toggle-devtools',
          { en: 'Developer Tools', zh: '开发者工具', ru: 'Инструменты разработчика' },
          'Ctrl+Shift+I'
        ),
        { type: 'separator' },
        command('zoom-in', { en: 'Zoom In', zh: '放大', ru: 'Увеличить' }, 'Ctrl+='),
        command('zoom-out', { en: 'Zoom Out', zh: '缩小', ru: 'Уменьшить' }, 'Ctrl+-'),
        command(
          'zoom-reset',
          {
            en: `Actual Size (now ${formatZoomPercentage(zoomFactor)})`,
            zh: `实际大小（当前 ${formatZoomPercentage(zoomFactor)}）`,
            ru: `Действительный размер (сейчас ${formatZoomPercentage(zoomFactor)})`
          },
          'Ctrl+0'
        ),
        { type: 'separator' },
        command(
          'toggle-fullscreen',
          { en: 'Toggle Full Screen', zh: '切换全屏', ru: 'Полноэкранный режим' },
          'F11'
        )
      ]
    },
    { type: 'separator' },
    command(
      'check-for-updates',
      { en: 'Check for Updates…', zh: '检查更新…', ru: 'Проверить обновления…' },
      'Ctrl+U'
    ),
    command('about', {
      en: 'About DSH Desktop',
      zh: '关于 DSH Desktop',
      ru: 'О программе DSH Desktop'
    }),
    { type: 'separator' },
    command('quit', { en: 'Exit', zh: '退出', ru: 'Выход' })
  ]
}
