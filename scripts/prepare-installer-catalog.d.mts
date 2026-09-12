import type { InstallerFlavor } from './lib/installer-flavor.mjs'

export interface CatalogItem {
  kind: 'plugin' | 'mcp' | 'skill' | 'rules'
  id: string
  label: string
  name?: string
  version?: string
  file?: string
  digest?: string
  path?: string
  transport?: 'stdio' | 'streamable-http'
  command?: string
  args?: string[]
  url?: string
  connector?: string
}

export interface CatalogManifest {
  name: string
  version: string
  id: string
  items: CatalogItem[]
}

export interface CatalogOutputPaths {
  catalogDir: string
  pluginsDir: string
  mcpDir: string
  skillsDir: string
  rulesDir: string
  manifestPath: string
  labelsPath: string
}

export function catalogOutputPaths(root?: string): CatalogOutputPaths
export function packDirectoryAsTgz(directory: string, destinationDir: string): string
export function packNpmSpec(spec: string, destinationDir: string): string
export function productionDependenciesToBundle(manifest: Record<string, unknown>): string[]
export function ensureBundledProductionDependencies(directory: string): string[]
export function repackTarballWithBundledDependencies(archive: string, destinationDir: string): string
export function packageMainRelativePath(manifest: Record<string, unknown>): string
export function tarballContainsPath(archive: string, relativePath: string): boolean
export function fileSha256(file: string): string
export function packPluginDirectory(
  directory: string,
  destinationDir: string,
  packSpec?: (spec: string, destinationDir: string) => string
): string
export function parseGitSourceUrl(url: string): {
  ownerRepo: string
  ref: string
  subpath: string
  archiveUrl: string
}
export function downloadFile(url: string, destination: string): Promise<void>
export function extractArchive(archive: string, destination: string): void
export function checkoutGitSource(options: {
  url: string
  path?: string
  workDir: string
  download?: (url: string, destination: string) => Promise<void>
}): Promise<string>
export function resolveSourceOrigin(
  source: InstallerFlavor['sources'][number],
  index: number | string,
  snapshot: { plugins: Array<{ name: string; owner: string; npm?: string; install?: string; url?: string }> }
): InstallerFlavor['sources'][number]
export function collectSkillRoots(directory: string): string[]
export function flavorSourceOrigins(
  flavor: InstallerFlavor,
  snapshot: { plugins: Array<{ name: string; owner: string; npm?: string; install?: string; url?: string }> },
  options?: { projectRoot?: string }
): Array<{ source: InstallerFlavor['sources'][number]; index: number | string }>
export function renderCatalogLabelsNsh(items: CatalogItem[]): string
export function emptyCatalogManifest(
  name?: string,
  version?: string,
  id?: string
): CatalogManifest
export function prepareInstallerCatalog(options?: {
  projectRoot?: string
  flavorPath?: string
  registrySnapshotPath?: string
  flavor?: InstallerFlavor
  download?: (url: string, destination: string) => Promise<void>
  packSpec?: (spec: string, destinationDir: string) => string
}): Promise<{ manifest: CatalogManifest; paths: CatalogOutputPaths }>
