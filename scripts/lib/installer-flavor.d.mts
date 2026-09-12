export const FLAVOR_KINDS: readonly string[]
export const FLAVOR_FROMS: readonly string[]
export const MCP_TRANSPORTS: readonly string[]
export const PROFILE_BACKUP_FORMAT: 'dsh-profile-backup'
export const PROFILE_BACKUP_VERSION: 0.2

export interface FlavorSource {
  kind: 'plugin' | 'mcp' | 'skill' | 'rules' | 'catalog'
  from: 'git' | 'local' | 'npm' | 'market' | 'backup'
  url?: string
  path?: string
  spec?: string
  id?: string
  version?: string
  transport?: 'stdio' | 'streamable-http'
  command?: string
  args?: string[]
  connector?: string
  name?: string
  fromBackup?: boolean
  fromMarket?: boolean
}

export interface ProfileBackup {
  format: typeof PROFILE_BACKUP_FORMAT
  version: 0.2
  createdAt?: string
  profile?: string
  files: Array<
    | { path: 'package.json'; json: Record<string, unknown> }
    | { path: string; lines: string[] }
  >
}

export interface InstallerFlavor {
  name: string
  version: string
  id?: string
  sources: FlavorSource[]
  filePath?: string
}

export interface RegistryPlugin {
  name: string
  owner: string
  npm?: string
  install?: string
  url?: string
  tarball?: string
}

export interface RegistrySnapshot {
  plugins: RegistryPlugin[]
}

export function resolveFlavorPath(
  projectRoot: string,
  env?: NodeJS.ProcessEnv
): string
export function validateFlavorSource(source: unknown, index: number): FlavorSource
export function parseInstallerFlavor(
  text: string,
  options?: { filePath?: string }
): InstallerFlavor
export function loadInstallerFlavor(filePath: string): InstallerFlavor
export function slugify(name: string): string
export function resolveFlavorLocalPath(
  relativePath: string,
  flavorFilePath?: string,
  projectRoot?: string
): string
export function loadRegistrySnapshot(filePath: string): RegistrySnapshot
export function extractInstallTarget(install: string): string | undefined
export function classifyInstallTarget(
  target: string
): { kind: 'git' | 'npm'; spec: string } | undefined
export function parseProfileBackup(value: unknown, label?: string): ProfileBackup
export function loadProfileBackup(filePath: string): ProfileBackup
export function backupManifest(backup: ProfileBackup): Record<string, unknown>
export function isInstallerInboxPackage(name: string): boolean
export function isUnresolvableBackupSpec(spec: string): boolean
export function classifyBackupPluginSpec(
  name: string,
  spec: string
): { from: 'npm'; spec: string } | { from: 'git'; url: string }
export function extractBackupPluginEntries(
  backup: ProfileBackup,
  label?: string
): Array<{ name: string; spec: string }>
export function expandBackupFlavorSource(
  source: FlavorSource,
  index: number | string,
  options?: { flavorFilePath?: string; projectRoot?: string }
): FlavorSource[]
export function resolveMarketPlugin(
  source: { id: string; version?: string },
  snapshot: RegistrySnapshot
): { from: 'npm' | 'git'; spec: string; plugin: RegistryPlugin }
export function catalogListLabel(kind: string, title: string): string
export function escapeNsisString(value: string): string
