import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse, stringify } from 'yaml'

/**
 * The bundled Harness UI shows a welcome notice once and waits for the user to
 * acknowledge it. A bundle that ships a prepared environment has no reason to
 * make the user click through it: recording the acknowledgement before Harness
 * boots leaves exactly the state a previously used install is in.
 *
 * The value mirrors `WELCOME_NOTICE_VERSION` in
 * `@deepseek-ai/dsh-client-ui-settings-models`. `test/onboarding-seed.test.ts`
 * asserts the two stay equal, so a Harness bump that changes the notice makes the
 * test fail instead of silently writing a stale acknowledgement.
 */
export const WELCOME_NOTICE_VERSION = '2026-08-13.1'

/** Durable settings namespace the Harness UI keeps product onboarding facts in. */
const WELCOME_NOTICE_NAMESPACE = 'ui-onboarding'

/** Field holding the last welcome notice version the user acknowledged. */
const WELCOME_NOTICE_ACK_FIELD = 'welcomeNoticeVersion'

export function settingsYamlPath(dshHome: string): string {
  return join(dshHome, 'settings.yaml')
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

/**
 * Acknowledge the bundled welcome notice in DSH settings. Keeps every other
 * setting untouched and reports rather than throws, so a launch never depends on
 * it — the caller decides whether to surface the failure.
 * @returns whether settings.yaml had to be written.
 */
export function ensureWelcomeNoticeAcknowledged(options: {
  dshHome: string
  note: (line: string) => void
}): boolean {
  const file = settingsYamlPath(options.dshHome)
  let document: Record<string, unknown> = {}

  if (existsSync(file)) {
    let parsed: unknown
    try {
      parsed = parse(readFileSync(file, 'utf8'))
    } catch {
      // A file the Harness itself cannot parse: leave it to its own recovery
      // rather than replacing whatever the user had.
      options.note('[onboarding] settings.yaml is unreadable; leaving it untouched')
      return false
    }
    const record = asRecord(parsed)
    if (record === undefined) {
      if (parsed !== null && parsed !== undefined) {
        options.note('[onboarding] settings.yaml is not a mapping; leaving it untouched')
        return false
      }
      document = {}
    } else {
      document = record
    }
  }

  const section = { ...(asRecord(document[WELCOME_NOTICE_NAMESPACE]) ?? {}) }
  if (section[WELCOME_NOTICE_ACK_FIELD] === WELCOME_NOTICE_VERSION) return false

  section[WELCOME_NOTICE_ACK_FIELD] = WELCOME_NOTICE_VERSION
  document[WELCOME_NOTICE_NAMESPACE] = section
  writeFileSync(file, stringify(document), 'utf8')
  options.note(`[onboarding] acknowledged the welcome notice ${WELCOME_NOTICE_VERSION}`)
  return true
}
