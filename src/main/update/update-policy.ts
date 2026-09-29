import { BUNDLE_CHANNEL } from '../app-channel'

export const UPDATE_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1_000
export const UPDATE_STARTUP_DELAY_MS = 15_000
export const UPDATE_STARTUP_JITTER_MS = 15_000
export const AUTO_INSTALL_ON_APP_QUIT = false

export function supportsAutoUpdates(isPackaged: boolean, platform: NodeJS.Platform): boolean {
  return isPackaged && (platform === 'darwin' || platform === 'win32')
}

/**
 * Channels that take updates at all. Upstream builds (`production`) read the
 * feed their publish config names; this bundle (`bundle`) reads the releases of
 * its own repository. A build with no marker keeps upstream behavior, and a
 * development build ships no feed, so it must follow neither.
 */
const UPDATE_CHANNELS = new Set(['production', BUNDLE_CHANNEL])

/**
 * Whether a build on `channel` may take updates at all. Upstream builds and
 * unpackaged runs carry no marker and keep their behavior.
 * @param channel - marker recorded in the app manifest, if any.
 */
export function updateChannelEnabled(channel: string | undefined): boolean {
  return channel === undefined || UPDATE_CHANNELS.has(channel)
}

/**
 * Whether a build reads this project's release feed rather than the upstream
 * rollout service. The service offers upstream builds only, and installing one
 * would replace this product — the bundled catalog included — with plain DSH
 * Desktop.
 * @param channel - marker recorded in the app manifest, if any.
 */
export function usesBundleFeed(channel: string | undefined): boolean {
  return channel === BUNDLE_CHANNEL
}

export function shouldCheckAfterResume(lastCheckedAt: number, now = Date.now()): boolean {
  return now - lastCheckedAt >= UPDATE_CHECK_INTERVAL_MS
}
