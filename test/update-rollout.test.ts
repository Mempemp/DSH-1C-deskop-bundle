import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({
  policy: vi.fn(), handlers: new Map<string, (...args: any[]) => void>(), appPath: { value: '' },
  updater: { setFeedURL: vi.fn(), checkForUpdates: vi.fn(), downloadUpdate: vi.fn(), quitAndInstall: vi.fn(), on: vi.fn(), autoDownload: false, allowDowngrade: false, allowPrerelease: false }
}))
vi.mock('../src/main/desktop-service', () => ({ checkDesktopUpdate: mocks.policy }))
vi.mock('electron-updater', () => ({ default: { autoUpdater: mocks.updater } }))
vi.mock('electron', () => ({ app: { isPackaged: true, getVersion: () => '0.8.0', getPath: () => '/nonexistent-desktop-test', getAppPath: () => mocks.appPath.value || '/nonexistent-desktop-test', isReady: () => true }, BrowserWindow: { getAllWindows: () => [] }, powerMonitor: { on: vi.fn(), removeListener: vi.fn() }, ipcMain: { handle: vi.fn() } }))
vi.mock('../src/main/update/update-policy', async importOriginal => ({ ...await importOriginal<object>(), supportsAutoUpdates: () => true }))
let manager: typeof import('../src/main/update/update-manager')
const temporaryRoots: string[] = []
/** A packaged app manifest on this bundle's channel, as the installer writes it. */
async function bundleAppPath(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), 'dsh-bundle-channel-'))
  temporaryRoots.push(dir)
  await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'dsh-desktop', version: '0.8.0', dshDesktopChannel: 'bundle' }), 'utf8')
  return dir
}
beforeEach(async () => {
  vi.resetModules(); vi.clearAllMocks(); mocks.handlers.clear()
  mocks.updater.on.mockImplementation((event, callback) => { mocks.handlers.set(event, callback) })
  mocks.updater.downloadUpdate.mockResolvedValue([])
  manager = await import('../src/main/update/update-manager')
  manager.startUpdateManager({ prepareToInstall: async () => {} })
})
afterEach(async () => {
  manager.stopUpdateManager(); vi.unstubAllGlobals()
  await Promise.all(temporaryRoots.splice(0).map(dir => rm(dir, { recursive: true, force: true })))
})
it('does not contact latest or download when no rule is selected, even for a manual check', async () => {
  mocks.policy.mockResolvedValue({ updateAvailable: false })
  await manager.checkForUpdates(true)
  expect(mocks.updater.checkForUpdates).not.toHaveBeenCalled()
  expect(mocks.updater.setFeedURL).not.toHaveBeenCalled()
  expect(mocks.updater.downloadUpdate).not.toHaveBeenCalled()
  expect(manager.getUpdateStatus().phase).toBe('up-to-date')
})
it('fails closed when the policy service fails', async () => {
  mocks.policy.mockRejectedValue(new Error('policy offline'))
  await manager.checkForUpdates()
  expect(manager.getUpdateStatus().phase).toBe('error')
  expect(mocks.updater.checkForUpdates).not.toHaveBeenCalled()
})
it('pins the archive, holds the existing lock, and waits for user acceptance to download', async () => {
  let resolve!: (value: unknown) => void
  mocks.policy.mockReturnValue(new Promise(r => { resolve = r }))
  mocks.updater.checkForUpdates.mockImplementation(async () => { mocks.handlers.get('update-available')!({ version: '0.9.0' }); return { updateInfo: { version: '0.9.0' } } })
  const checking = manager.checkForUpdates()
  await manager.checkForUpdates(true)
  expect(mocks.policy).toHaveBeenCalledTimes(1)
  resolve({ updateAvailable: true, version: '0.9.0', feedUrl: 'https://dshdesktop.com/updates/archive/0.9.0/' })
  await checking
  expect(mocks.updater.setFeedURL).toHaveBeenCalledWith({ provider: 'generic', url: 'https://dshdesktop.com/updates/archive/0.9.0/' })
  expect(manager.getUpdateStatus().phase).toBe('available')
  expect(mocks.updater.downloadUpdate).not.toHaveBeenCalled()
  await manager.downloadAvailableUpdate(); expect(mocks.updater.downloadUpdate).toHaveBeenCalledTimes(1)
})
it('blocks mismatched metadata before it can enter the download UI', async () => {
  mocks.policy.mockResolvedValue({ updateAvailable: true, version: '0.9.0', feedUrl: 'https://dshdesktop.com/updates/archive/0.9.0/' })
  mocks.updater.checkForUpdates.mockImplementation(async () => { mocks.handlers.get('update-available')!({ version: '0.10.0' }); expect(manager.getUpdateStatus().phase).toBe('error'); return { updateInfo: { version: '0.10.0' } } })
  await manager.checkForUpdates()
  await manager.downloadAvailableUpdate()
  expect(mocks.updater.downloadUpdate).not.toHaveBeenCalled()
})
it('preserves explicitly selected history installs and validates version input', async () => {
  mocks.updater.checkForUpdates.mockImplementation(async () => { mocks.handlers.get('update-available')!({ version: '0.7.0' }); return { updateInfo: { version: '0.7.0' } } })
  await manager.installSpecificVersion('../../unsafe')
  expect(mocks.updater.checkForUpdates).not.toHaveBeenCalled()
  await manager.installSpecificVersion('0.7.0')
  expect(mocks.policy).not.toHaveBeenCalled()
  expect(mocks.updater.downloadUpdate).toHaveBeenCalledTimes(1)
  expect(mocks.updater.setFeedURL).toHaveBeenCalledWith({ provider: 'generic', url: 'https://dshdesktop.com/updates/archive/0.7.0/' })
  expect(mocks.updater.allowDowngrade).toBe(false)
})
it('reads the offered version from its own release feed on the bundle channel', async () => {
  mocks.appPath.value = await bundleAppPath()
  vi.stubGlobal('fetch', async () => new Response('version: 0.9.0\npath: dsh-desktop-windows-x64-setup.exe\n'))
  mocks.updater.checkForUpdates.mockImplementation(async () => { mocks.handlers.get('update-available')!({ version: '0.9.0' }); return { updateInfo: { version: '0.9.0' } } })
  await manager.checkForUpdates(true)
  // The rollout service answers for upstream builds; this channel must not ask it.
  expect(mocks.policy).not.toHaveBeenCalled()
  expect(mocks.updater.setFeedURL).toHaveBeenCalledWith({ provider: 'generic', url: 'https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/download/0.9.0/' })
  expect(manager.getUpdateStatus().phase).toBe('available')
})
it('offers nothing when its own feed publishes no newer version', async () => {
  mocks.appPath.value = await bundleAppPath()
  vi.stubGlobal('fetch', async () => new Response('version: 0.8.0\n'))
  await manager.checkForUpdates(true)
  expect(mocks.policy).not.toHaveBeenCalled()
  expect(mocks.updater.checkForUpdates).not.toHaveBeenCalled()
  expect(manager.getUpdateStatus().phase).toBe('up-to-date')
})
it('reports an unreadable feed instead of claiming the build is current', async () => {
  mocks.appPath.value = await bundleAppPath()
  vi.stubGlobal('fetch', async () => new Response('missing', { status: 404 }))
  await manager.checkForUpdates(true)
  expect(manager.getUpdateStatus().phase).toBe('error')
})
