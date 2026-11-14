import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { projectRoot } from './patch-path'

/**
 * Служба `mcpManager` в локальной редакции `@wingsky-1/dsh-mcp-manager` 0.2.14.
 *
 * С ядра 0.2.2-rc.3 хост сам регистрирует службу `mcpManager` (свой менеджер MCP:
 * `list`/`register`/`restart`/`probe`/`watch`). Наш пакет объявлял ту же службу
 * через `ctx.provide`, а cordis на второе `provide` одного имени бросает
 * `service "mcpManager" has been registered at <...>`: `apply` падал целиком,
 * ни одной HTTP-маршруты не появлялось, и панель получала `HTTP 404` на каждый
 * запрос (`GET /api/dsh-mcp/servers` и остальные).
 *
 * Тест гоняет **код из собранного бандла**: функция вырезается из `lib/index.js`
 * и вызывается с подменённым контекстом, поэтому проверка говорит о том, что
 * поедет в установщике, а не о копии логики рядом.
 */
const bundlePath = path.join(projectRoot, 'packages', 'dsh-mcp-manager', 'lib', 'index.js')

/** Старый (наш) API службы: его ждут сторонние плагины (`registerServer`, `getStatus`, `reconnect`). */
const LEGACY_METHODS = [
  'registerServer',
  'unregisterServer',
  'connect',
  'disconnect',
  'reconnect',
  'getStatus',
  'getTools'
] as const

/** API службы на ядре rc.3: наши правки не должны его подменять. */
type Provide = (ctx: unknown, manager: unknown) => void

type GetCall = { name: string; strict: boolean | undefined }

type FakeCtx = {
  ctx: Record<string, unknown>
  /** Сообщения логгера: правка обязана сказать вслух, что имя занято ядром. */
  log: string[]
  /** Что плагин положил в `provide` (пусто, если имя уже было занято). */
  provided: () => Record<string, unknown> | undefined
  /** Аргументы `ctx.get`: службу в чужом fiber надо читать нестрого. */
  getCalls: GetCall[]
  disposeAll: () => void
}

/** Контекст-двойник: только те вызовы cordis, которыми пользуется функция. */
function makeCtx(existing?: Record<string, unknown>): FakeCtx {
  const log: string[] = []
  const getCalls: GetCall[] = []
  const disposers: Array<() => void> = []
  let provided: Record<string, unknown> | undefined
  const ctx = {
    logger: {
      warn: (message: string) => log.push(`warn: ${message}`),
      info: (message: string) => log.push(`info: ${message}`)
    },
    get: (name: string, strict?: boolean) => {
      getCalls.push({ name, strict })
      return name === 'mcpManager' ? existing : undefined
    },
    provide: (name: string, value: unknown) => {
      if (existing !== undefined) {
        throw new Error(`service "${name}" has been registered at <core-mcp-manager>`)
      }
      provided = value as Record<string, unknown>
      return () => {
        provided = undefined
      }
    },
    effect: (fn: () => () => void) => {
      const dispose = fn()
      disposers.push(dispose)
      return dispose
    }
  }
  return {
    ctx,
    log,
    provided: () => provided,
    getCalls,
    disposeAll: () => {
      for (const dispose of disposers.splice(0)) dispose()
    }
  }
}

/** Менеджер-двойник: старый API должен уходить именно в него. */
function makeManager(calls: string[]) {
  return {
    summary: () => ({ servers: [{ name: 'v8std', status: 'connected' }] }),
    registeredToolsFor: (name: string) => {
      calls.push(`getTools:${name}`)
      return [`${name}/tool`]
    },
    registerServer: async (server: { name: string }) => {
      calls.push(`registerServer:${server.name}`)
      return server.name
    },
    unregisterServer: async (name: string) => {
      calls.push(`unregisterServer:${name}`)
    },
    connect: async (name: string) => {
      calls.push(`connect:${name}`)
    },
    disconnect: async (name: string) => {
      calls.push(`disconnect:${name}`)
    },
    reconnect: async (name: string) => {
      calls.push(`reconnect:${name}`)
    }
  }
}

/** Функция из бандла: срез от её объявления до следующей функции верхнего уровня. */
function makeProvide(): Provide {
  const source = readFileSync(bundlePath, 'utf8')
  const start = source.indexOf('function provideMcpManagerService(ctx, manager) {')
  const end = source.indexOf('function collectCallTimeoutSources', start)
  expect(start, 'в бандле нет provideMcpManagerService').toBeGreaterThan(-1)
  expect(end, 'не найден конец блока provideMcpManagerService').toBeGreaterThan(start)
  const slice = source.slice(start, end)
  const factory = new Function('msgOf', `${slice}\nreturn { provideMcpManagerService };`) as (
    msgOf: (error: unknown) => string
  ) => { provideMcpManagerService: Provide }
  return factory((error) => (error instanceof Error ? error.message : String(error))).provideMcpManagerService
}

describe('служба mcpManager: ядро rc.3 уже держит это имя', () => {
  it('не падает и дописывает старые методы вместо повторного provide', () => {
    const core: Record<string, unknown> = { list: () => ['core'], register: () => () => {} }
    const fake = makeCtx(core)
    const calls: string[] = []
    const provide = makeProvide()

    expect(() => provide(fake.ctx, makeManager(calls))).not.toThrow()

    expect(fake.provided(), 'имя занято ядром — свой provide ставить нельзя').toBeUndefined()
    for (const method of LEGACY_METHODS) {
      expect(typeof core[method], `на службе ядра нет ${method}`).toBe('function')
    }
    expect(fake.log.some((line) => line.startsWith('info:'))).toBe(true)
  })

  it('не подменяет методы ядра и не выдумывает остальные его методы', () => {
    const list = () => ['core']
    const register = () => () => {}
    const core: Record<string, unknown> = { list, register }

    makeProvide()(makeCtx(core).ctx, makeManager([]))

    expect(core.list, 'list ядра должен остаться своим').toBe(list)
    expect(core.register, 'register ядра должен остаться своим').toBe(register)
    for (const method of ['restart', 'probe', 'watch'] as const) {
      expect(core[method], `метода ядра ${method} у нас быть не должно`).toBeUndefined()
    }
  })

  it('прокидывает старый API в наш менеджер', async () => {
    const core: Record<string, unknown> = { list: () => [] }
    const fake = makeCtx(core)
    const calls: string[] = []

    makeProvide()(fake.ctx, makeManager(calls))

    const service = core as Record<string, (...args: unknown[]) => unknown>
    await service.registerServer({ name: 'v8std' })
    await service.reconnect('v8std')
    expect(service.getStatus('v8std')).toEqual({ name: 'v8std', status: 'connected' })
    expect(service.getStatus('нет-такого')).toBeUndefined()
    expect(service.getTools('v8std')).toEqual(['v8std/tool'])
    expect(calls).toEqual([
      'registerServer:v8std',
      'reconnect:v8std',
      'getTools:v8std'
    ])
  })

  it('снимает дописанные методы при выгрузке плагина', () => {
    const core: Record<string, unknown> = { list: () => [] }
    const fake = makeCtx(core)

    makeProvide()(fake.ctx, makeManager([]))
    expect(typeof core.registerServer).toBe('function')

    fake.disposeAll()
    for (const method of LEGACY_METHODS) {
      expect(core[method], `${method} должен уйти со службы ядра`).toBeUndefined()
    }
    expect(typeof core.list, 'метод ядра при выгрузке не трогаем').toBe('function')
  })

  it('читает занятое имя нестрого: служба ядра может быть ещё не активна', () => {
    const core: Record<string, unknown> = { list: () => [] }
    const fake = makeCtx(core)

    makeProvide()(fake.ctx, makeManager([]))

    expect(fake.getCalls).toEqual([{ name: 'mcpManager', strict: false }])
  })
})

describe('служба mcpManager: имя свободно (ядро до rc.3)', () => {
  it('регистрирует старый API сам', async () => {
    const fake = makeCtx()
    const calls: string[] = []

    makeProvide()(fake.ctx, makeManager(calls))

    const provided = fake.provided()
    expect(provided, 'свободное имя занимает сам плагин').toBeDefined()
    for (const method of LEGACY_METHODS) {
      expect(typeof provided?.[method], `в службе плагина нет ${method}`).toBe('function')
    }
    const service = provided as Record<string, (...args: unknown[]) => unknown>
    await service.registerServer({ name: 'v8std' })
    expect(service.getStatus('v8std')).toEqual({ name: 'v8std', status: 'connected' })
    expect(calls).toEqual(['registerServer:v8std'])
  })
})
