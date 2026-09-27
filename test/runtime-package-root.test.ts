import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { hostNodeModulesRoot, runtimePackageRoot } from '../src/main/runtime-package-root'

describe('packaged runtime package root', () => {
  it('resolves external Node dependencies to physical unpacked files', () => {
    expect(runtimePackageRoot('/Applications/DSH Desktop.app/Contents/Resources/app.asar', true))
      .toBe('/Applications/DSH Desktop.app/Contents/Resources/app.asar.unpacked')
    expect(runtimePackageRoot('C:\\Program Files\\DSH Desktop\\resources\\app.asar', true))
      .toBe('C:\\Program Files\\DSH Desktop\\resources\\app.asar.unpacked')
  })

  it('keeps development and legacy unarchived paths intact', () => {
    expect(runtimePackageRoot('/repo/dsh-desktop', false)).toBe('/repo/dsh-desktop')
    expect(runtimePackageRoot('/app/resources/app', true)).toBe('/app/resources/app')
  })

  it('points host dependencies at physical files, not inside the archive', () => {
    // A catalog install copies host production dependencies with `fs.cp`; a
    // path inside app.asar makes that walk fail and aborts the whole seed.
    expect(hostNodeModulesRoot('C:\\Program Files\\DSH Desktop\
esources\\app.asar', true))
      .toBe(join('C:\\Program Files\\DSH Desktop\
esources\\app.asar.unpacked', 'node_modules'))
    expect(hostNodeModulesRoot('/repo/dsh-desktop', false)).toBe(join('/repo/dsh-desktop', 'node_modules'))
  })
})
