import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { app } from 'electron'

/**
 * The language chosen in the harness settings, read for every shell surface at
 * once: the harness subprocess and the shell's own UI must not disagree about
 * which preference applies. Missing or unreadable settings mean "no preference".
 */
export function readLocalePreference(): unknown {
  try {
    const settings = parse(
      readFileSync(join(app.getPath('userData'), 'harness', 'settings.yaml'), 'utf8')
    ) as { locale?: { preference?: unknown } }
    return settings.locale?.preference
  } catch {
    return undefined
  }
}
