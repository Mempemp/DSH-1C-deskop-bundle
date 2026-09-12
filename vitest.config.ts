import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.{test,spec}.{ts,js,mjs}'],
    // Native Intel runners contend for CPU and disk while integration suites
    // unpack archives and launch subprocesses. Keep every test, but serialize files.
    fileParallelism: !(process.env.CI && process.platform === 'darwin' && process.arch === 'x64')
  }
})
