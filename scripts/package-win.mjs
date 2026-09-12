import { spawn } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)
const projectRoot = resolve(dirname(scriptPath), '..')
const LOG_PREFIX = '[package:win]'

/**
 * Live terminal logs. stdout/stderr of children are inherited — never captured.
 * @param {...unknown} args
 */
function log(...args) {
  console.log(LOG_PREFIX, ...args)
}

/**
 * @param {string} stage
 * @param {string} detail
 */
function banner(stage, detail) {
  const rule = '============================================================'
  console.log('')
  console.log(LOG_PREFIX, rule)
  console.log(LOG_PREFIX, `stage: ${stage}`)
  console.log(LOG_PREFIX, detail)
  console.log(LOG_PREFIX, rule)
  console.log('')
}

/**
 * Run a child and stream its stdout/stderr to this terminal as they arrive.
 * Do not capture child output (pipe/buffer until exit) — that would hide progress.

 * @param {string} command
 * @param {string[]} args
 * @param {string} stage
 * @param {{ shell?: boolean }} [options]
 */
function runLive(command, args, stage, options = {}) {
  return new Promise((resolvePromise, reject) => {
    banner(stage, `${command} ${args.join(' ')}`)
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: process.env,
      stdio: 'inherit',
      windowsHide: false,
      shell: options.shell === true
    })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`${stage} terminated by signal ${signal}`))
        return
      }
      if (code !== 0) {
        const error = new Error(`${stage} exited with code ${code ?? 1}`)
        /** @type {Error & { exitCode?: number }} */
        const withCode = error
        withCode.exitCode = code ?? 1
        reject(withCode)
        return
      }
      log(`${stage} finished`)
      resolvePromise()
    })
  })
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const electronBuilderCli = join(projectRoot, 'node_modules', 'electron-builder', 'cli.js')

try {
  log('CLI start — all child output is streamed live to this terminal')
  await runLive(
    process.execPath,
    [join(projectRoot, 'scripts', 'verify-target.mjs'), 'win32', 'x64'],
    'verify-target'
  )
  await runLive(npm, ['run', 'build'], 'build', { shell: process.platform === 'win32' })
  await runLive(
    process.execPath,
    [join(projectRoot, 'scripts', 'prepare-installer-catalog.mjs')],
    'prepare-installer-catalog'
  )
  await runLive(
    process.execPath,
    [electronBuilderCli, '--win', '--x64', '--publish', 'never'],
    'electron-builder'
  )
  log('all stages finished')
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(LOG_PREFIX, message)
  const exitCode =
    error && typeof error === 'object' && 'exitCode' in error && typeof error.exitCode === 'number'
      ? error.exitCode
      : 1
  process.exit(exitCode)
}
