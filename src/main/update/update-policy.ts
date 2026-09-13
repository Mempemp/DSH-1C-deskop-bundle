export const UPDATE_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1_000
export const UPDATE_STARTUP_DELAY_MS = 15_000
export const UPDATE_STARTUP_JITTER_MS = 15_000
export const AUTO_INSTALL_ON_APP_QUIT = false

export function supportsAutoUpdates(isPackaged: boolean, platform: NodeJS.Platform): boolean {
  return isPackaged && (platform === 'darwin' || platform === 'win32')
}

/**
 * Channels that take updates from the feed this build points at. A bundle that
 * ships its own feed names that channel here; a bundle that ships none must not
 * follow the upstream feed, because those builds carry no 1C layer and taking
 * one would replace this product with plain DSH Desktop.
 */
const UPDATE_CHANNELS = new Set(['production'])

/**
 * Whether a build on `channel` may take updates at all. Upstream builds and
 * unpackaged runs carry no marker and keep their behavior.
 * @param channel - marker recorded in the app manifest, if any.
 */
export function updateChannelEnabled(channel: string | undefined): boolean {
  return channel === undefined || UPDATE_CHANNELS.has(channel)
}

export function shouldCheckAfterResume(lastCheckedAt: number, now = Date.now()): boolean {
  return now - lastCheckedAt >= UPDATE_CHECK_INTERVAL_MS
}
