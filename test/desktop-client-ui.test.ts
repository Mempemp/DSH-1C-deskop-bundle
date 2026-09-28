import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const projectRoot = path.resolve(import.meta.dirname, '..')

interface Registration {
  config: { name: string; id?: string; order?: number }
  component: (props: Record<string, unknown>) => unknown
}

describe('DSH Desktop client slot occupants', () => {
  it('registers one occupant per brand seat and keeps the official name mark-free', async () => {
    const source = await readFile(
      path.join(projectRoot, 'packages', 'dsh-desktop-client-ui', 'client.js'),
      'utf8'
    )
    let definition: {
      factory: (require: (id: string) => unknown) => {
        apply: (ctx: unknown) => void
        inject: string[]
      }
    } | undefined
    const appended: Array<{ textContent?: string }> = []
    const removeStyle = vi.fn()
    const disposers: Array<(() => void) | undefined> = []
    const document = {
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({ id: '', dataset: {}, textContent: '', remove: removeStyle })),
      head: { appendChild: (node: { textContent?: string }) => appended.push(node) },
      documentElement: { classList: { toggle: vi.fn(), remove: vi.fn() } },
      body: { hasAttribute: () => false }
    }
    vm.runInNewContext(source, {
      document,
      navigator: { language: 'en-US' },
      MutationObserver: class {
        observe(): void {}
        disconnect(): void {}
      },
      window: {
        __ModuleLoader__: {
          load: (value: typeof definition) => {
            definition = value
          }
        }
      }
    })

    expect(definition).toBeDefined()
    const createElement = (
      type: unknown,
      props: Record<string, unknown> | null,
      ...children: unknown[]
    ): { type: unknown; props: Record<string, unknown> } => ({
      type,
      props: { ...props, children }
    })
    const BrandWordmark = vi.fn()
    const FishLogo = vi.fn()
    const plugin = definition!.factory((id) => {
      if (id === 'react') {
        return {
          createElement,
          useEffect: (effect: () => void | (() => void)) => effect(),
          useState: (initial: unknown) => [initial, vi.fn()]
        }
      }
      if (id === '@deepseek-ai/dsh-client-ui-primitives') {
        return { BrandWordmark, FishLogo }
      }
      throw new Error(`Unexpected client dependency: ${id}`)
    })

    const registrations: Registration[] = []
    const slots = {
      inject: (_name: string, callback: () => unknown): unknown => {
        const result = callback()
        if (result && typeof result === 'object' && Symbol.iterator in result) {
          for (const _entry of result as Iterable<unknown>) void _entry
        }
        return result
      },
      register: (
        config: Registration['config'],
        component: Registration['component']
      ): (() => void) => {
        registrations.push({ config, component })
        return () => undefined
      }
    }
    plugin.apply({ slots, effect: (setup: () => (() => void) | undefined) => { disposers.push(setup()) } })

    expect(plugin.inject).toEqual(['slots', 'remote.session', 'sessions', 'uiWorkspace'])
    expect(registrations.map(({ config }) => config.name)).toEqual([
      'sidebar.brand.mark',
      'sidebar.brand.name',
      'conversation.hero.brand.mark',
      'sidebar.right.tab.document.unpreviewable',
      'sidebar.workspaces.session.menu.item',
      'sidebar.workspaces.session.menu.item',
      'sidebar.workspaces.session.menu.item'
    ])
    // Desktop toolbar styles have an owned lifetime; branding stays in currentColor.
    expect(appended).toHaveLength(1)
    expect(appended[0]?.textContent).toContain("[data-dsh-preset-search]")
    // Стилевой эффект объявлен первым.
    disposers[0]?.()
    expect(removeStyle).toHaveBeenCalledOnce()

    const sidebarName = registrations.find(
      ({ config }) => config.name === 'sidebar.brand.name'
    )!.component({}) as { type: unknown; props: Record<string, unknown> }
    expect(sidebarName.type).toBe(BrandWordmark)
    expect(sidebarName.props.includeMark).toBe(false)

    const sidebarMark = registrations.find(
      ({ config }) => config.name === 'sidebar.brand.mark'
    )!.component({ size: 24 }) as { type: unknown; props: Record<string, unknown> }
    expect(sidebarMark.type).toBe('svg')
    expect(sidebarMark.props.height).toBe(17)
    const [markPath] = sidebarMark.props.children as Array<{ type: unknown; props: Record<string, unknown> }>
    if (!markPath) throw new Error('Expected the sidebar brand SVG path')
    expect(markPath.type).toBe('path')
    expect(markPath.props.fill).toBe('currentColor')

    const heroMark = registrations.find(
      ({ config }) => config.name === 'conversation.hero.brand.mark'
    )!.component({ size: 48 }) as { type: unknown; props: Record<string, unknown> }
    expect(heroMark.type).toBe(FishLogo)
    expect(heroMark.props.size).toBe(48)
  })

  // Тёмная тема хоста помечается атрибутом `body[data-ds-dark-theme]`, а
  // сторонние плагины (менеджер MCP) ищут привычные маркеры — `html.dark` и
  // прочие. Без дублирующего класса их панели остаются светлыми при тёмной
  // теме: тёмные переменные плагина не включаются, а текст берётся из токенов
  // хоста. Тест держит шов: класс следует за атрибутом и снимается при выгрузке.
  it('mirrors the host dark marker into the conventional class third-party plugins read', async () => {
    const source = await readFile(
      path.join(projectRoot, 'packages', 'dsh-desktop-client-ui', 'client.js'),
      'utf8'
    )
    let definition: {
      factory: (require: (id: string) => unknown) => { apply: (ctx: unknown) => void }
    } | undefined

    const classes = new Set<string>()
    const attributes = new Set<string>()
    let fireMutation: (() => void) | undefined
    let disconnected = false
    const document = {
      getElementById: () => null,
      createElement: () => ({ id: '', dataset: {}, textContent: '', remove: () => undefined }),
      head: { appendChild: () => undefined },
      documentElement: {
        classList: {
          toggle: (name: string, on?: boolean) => {
            if (on) classes.add(name)
            else classes.delete(name)
          },
          remove: (name: string) => classes.delete(name)
        }
      },
      body: {
        hasAttribute: (name: string) => attributes.has(name)
      }
    }
    vm.runInNewContext(source, {
      document,
      navigator: { language: 'en-US' },
      MutationObserver: class {
        constructor(callback: () => void) {
          fireMutation = callback
        }
        observe(): void {}
        disconnect(): void {
          disconnected = true
        }
      },
      window: { __ModuleLoader__: { load: (value: typeof definition) => { definition = value } } }
    })

    const cleanups: Array<(() => void) | undefined> = []
    const plugin = definition!.factory((id) => {
      if (id === 'react') {
        return {
          createElement: () => null,
          useEffect: () => undefined,
          useState: (initial: unknown) => [initial, () => undefined]
        }
      }
      if (id === '@deepseek-ai/dsh-client-ui-primitives') {
        return { BrandWordmark: () => null, FishLogo: () => null }
      }
      throw new Error(`Unexpected client dependency: ${id}`)
    })
    plugin.apply({
      slots: { inject: (_name: string, callback: () => unknown) => callback(), register: () => () => undefined },
      effect: (setup: () => (() => void) | undefined) => cleanups.push(setup())
    })

    // Светлая тема хоста: маркера нет — класса быть не должно.
    expect([...classes]).toEqual([])

    // Хост переключился в тёмную тему: атрибут появился, класс догнал.
    attributes.add('data-ds-dark-theme')
    fireMutation?.()
    expect([...classes]).toEqual(['dark'])

    // Возврат в светлую тему снимает класс.
    attributes.delete('data-ds-dark-theme')
    fireMutation?.()
    expect([...classes]).toEqual([])

    // Выгрузка плагина отписывает наблюдателя и снимает класс.
    attributes.add('data-ds-dark-theme')
    fireMutation?.()
    expect([...classes]).toEqual(['dark'])
    for (const cleanup of cleanups) cleanup?.()
    expect(disconnected).toBe(true)
    expect([...classes]).toEqual([])
  })
})
