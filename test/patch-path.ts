import path from 'node:path'

/** Корень репозитория: от него тесты находят маршруты поставки. */
export const projectRoot = path.resolve(import.meta.dirname, '..')
