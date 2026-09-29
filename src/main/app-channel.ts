import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Channel the development packaging config records in the app manifest. */
export const DEVELOPMENT_CHANNEL = 'development'

/**
 * Channel this bundle records in the app manifest.
 *
 * The marker keeps a packaged build off the upstream rollout service, which
 * only ever offers upstream builds: accepting one would replace this bundle
 * with plain DSH Desktop and drop the prepared catalog, the installer patches
 * and every desktop patch this repository carries. On this channel the update
 * manager reads this repository's own releases instead.
 */
export const BUNDLE_CHANNEL = 'bundle'

/**
 * Read the channel a packaged build recorded in its own manifest. Unpackaged
 * runs and upstream builds carry no marker, and an unreadable manifest answers
 * the same way rather than failing a launch over a label.
 * @param appPath - `app.getAppPath()`
 */
export function readAppChannel(appPath: string): string | undefined {
  try {
    const metadata = JSON.parse(readFileSync(join(appPath, 'package.json'), 'utf8')) as {
      dshDesktopChannel?: unknown
    }
    return typeof metadata.dshDesktopChannel === 'string' ? metadata.dshDesktopChannel : undefined
  } catch {
    return undefined
  }
}
