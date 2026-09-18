import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  catalogListLabel,
  classifyBackupPluginSpec,
  expandBackupFlavorSource,
  extractBackupPluginEntries,
  loadRegistrySnapshot,
  parseInstallerFlavor,
  parseProfileBackup,
  resolveFlavorPath,
  resolveMarketPlugin
} from '../scripts/lib/installer-flavor.mjs'
import {
  catalogOutputPaths,
  packDirectoryAsTgz,
  packPluginDirectory,
  packageEntryPaths,
  prepareInstallerCatalog,
  productionDependenciesToBundle,
  renderCatalogLabelsNsh,
  tarballContainsPath
} from '../scripts/prepare-installer-catalog.mjs'
import { projectRoot } from './patch-path'

const mixedFlavor = `
name: Acme Desktop
version: 1.0.0
sources:
  - kind: plugin
    from: git
    url: https://github.com/acme/dsh-crm-plugin.git#v2.1.0
  - kind: mcp
    from: local
    path: ./oem/mcp-intranet
    id: intranet
    transport: stdio
  - kind: plugin
    from: local
    path: ./oem/acme-internal-plugin
  - kind: plugin
    from: npm
    spec: some-private-connector@1.2.0
  - kind: plugin
    from: market
    id: dsh-mcp-connector
  - kind: plugin
    from: market
    id: 2nd1st/dsh-plugin-open-app
    version: 1.0.3
  - kind: skill
    from: git
    url: https://github.com/acme/dsh-skills.git#main
    path: invoice-review
  - kind: rules
    from: local
    path: ./oem/AGENTS.md
  - kind: payload
    from: git
    url: https://github.com/acme/rules.git#v1
    id: acme-rules
    version: 1.0.0
`

describe('installer flavor schema', () => {
  it('parses the repo installer-flavor.yml delivery sources', async () => {
    const flavor = parseInstallerFlavor(
      await readFile(join(projectRoot, 'installer-flavor.yml'), 'utf8')
    )
    expect(flavor.sources).toEqual([
      { kind: 'plugin', from: 'npm', spec: 'dshmarket@1.47.0' },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/wingsky-1/dsh-plugin-hub.git#main',
        path: 'packages/dsh-mcp-manager'
      },
      {
        kind: 'plugin',
        from: 'npm',
        spec: '@liustack/modsearch@5.10.3'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/omdsh-dev/DSH-better-sidebar.git#v0.19.1'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/zhu1090093659/dsh-web.git#main',
        path: 'packages/dsh-skill-explorer'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/tt-a1i/archify.git#main',
        path: 'integrations/deepseek-harness'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/Mempemp/DSH-1CProjectProperties.git#main',
        path: 'dsh-1c-project-properties'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/Mempemp/DSH-runner-rlm-tools-bsl.git#main',
        path: 'dsh-rlm-tools-bsl'
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'https://github.com/Mempemp/DSH-CodeEditor_BSL.git#main',
        path: 'dsh-bsl-editor'
      },
      {
        kind: 'plugin',
        from: 'npm',
        spec: '@goodandready/dsh-russian-lang@0.2.19'
      },
      {
        kind: 'plugin',
        from: 'npm',
        spec: 'dsh-univer-office@0.2.14'
      },
      {
        kind: 'mcp',
        from: 'remote',
        id: 'v8std',
        serverName: 'v8std',
        transport: 'streamable-http',
        url: 'https://ai.v8std.ru/mcp'
      },
      {
        kind: 'payload',
        from: 'git',
        url: 'https://github.com/comol/ai_rules_1c.git#488e930db61f2fd6e9a3a44f731b8ba2150dd63b',
        id: '1c-rules',
        name: '1c-rules',
        version: '2026.09.16-488e930'
      }
    ])
  })

  it('requires an id and a pinned version for a payload source', () => {
    const base = `
name: Acme Desktop
version: 1.0.0
sources:
  - kind: payload
    from: git
    url: https://github.com/acme/rules.git#v1
`
    expect(() => parseInstallerFlavor(`${base}    id: acme-rules\n    version: 1.0.0\n`)).not.toThrow()
    expect(() => parseInstallerFlavor(base)).toThrow(/sources\[0\]\.id/)
    expect(() => parseInstallerFlavor(`${base}    id: acme-rules\n`)).toThrow(/sources\[0\]\.version/)
  })

  it('requires a URL for a remote MCP server and rejects stdio there', () => {
    const base = `
name: Acme Desktop
version: 1.0.0
sources:
  - kind: mcp
    from: remote
    id: v8std
    transport: streamable-http
`
    expect(() => parseInstallerFlavor(`${base}    url: https://ai.example.test/mcp\n`)).not.toThrow()
    expect(() => parseInstallerFlavor(base)).toThrow(/sources\[0\]\.url/)
    expect(() =>
      parseInstallerFlavor(`
name: Acme Desktop
version: 1.0.0
sources:
  - kind: mcp
    from: remote
    id: v8std
    transport: stdio
    url: https://ai.example.test/mcp
`)
    ).toThrow(/from: remote needs a network transport/)
  })

  it('treats an empty sources list as vanilla DSH Desktop', () => {
    const flavor = parseInstallerFlavor(`
name: DSH Desktop
version: 0.8.0-rc.4
sources: []
`)
    expect(flavor.name).toBe('DSH Desktop')
    expect(flavor.sources).toEqual([])
    expect(renderCatalogLabelsNsh([])).toContain('"Vanilla DSH Desktop"')
  })

  it('parses mixed git, local, npm, and market sources in one file', () => {
    const flavor = parseInstallerFlavor(mixedFlavor)
    expect(flavor.name).toBe('Acme Desktop')
    expect(flavor.sources.map((source) => `${source.kind}:${source.from}`)).toEqual([
      'plugin:git',
      'mcp:local',
      'plugin:local',
      'plugin:npm',
      'plugin:market',
      'plugin:market',
      'skill:git',
      'rules:local',
      'payload:git'
    ])
    expect(flavor.sources[4]).toMatchObject({ id: 'dsh-mcp-connector' })
    expect(flavor.sources[5]).toMatchObject({
      id: '2nd1st/dsh-plugin-open-app',
      version: '1.0.3'
    })
  })

  it('prefers DSH_INSTALLER_FLAVOR over the repo installer-flavor.yml', () => {
    expect(resolveFlavorPath(projectRoot, {})).toBe(join(projectRoot, 'installer-flavor.yml'))
    expect(resolveFlavorPath(projectRoot, { DSH_INSTALLER_FLAVOR: 'oem/flavor.yml' })).toBe(
      join(projectRoot, 'oem', 'flavor.yml')
    )
  })

  it('rejects market sources that are not plugins', () => {
    expect(() =>
      parseInstallerFlavor(`
sources:
  - kind: skill
    from: market
    id: dsh-mcp-connector
`)
    ).toThrow(/from: market is only valid for kind: plugin/)
  })

  it('parses a dshmarket backup plugin source', () => {
    const flavor = parseInstallerFlavor(`
name: OEM Desktop
version: 1.0.0
sources:
  - kind: plugin
    from: backup
    path: ./examples/dsh-dshmarket-backup-20260910115528.json
`)
    expect(flavor.sources).toEqual([
      {
        kind: 'plugin',
        from: 'backup',
        path: './examples/dsh-dshmarket-backup-20260910115528.json'
      }
    ])
  })

  it('rejects backup sources that are not plugins', () => {
    expect(() =>
      parseInstallerFlavor(`
sources:
  - kind: skill
    from: backup
    path: ./backup.json
`)
    ).toThrow(/from: backup is only valid for kind: plugin/)
  })
})

function splitNpmSpec(spec: string): { name: string; version: string } {
  if (spec.startsWith('@')) {
    const at = spec.indexOf('@', spec.indexOf('/'))
    if (at === -1) return { name: spec, version: '0.0.0' }
    return { name: spec.slice(0, at), version: spec.slice(at + 1) || '0.0.0' }
  }
  const at = spec.indexOf('@')
  if (at === -1) return { name: spec, version: '0.0.0' }
  return { name: spec.slice(0, at), version: spec.slice(at + 1) || '0.0.0' }
}

function packMiniNpmSpec(root: string, spec: string, destinationDir: string): string {
  const { name, version } = splitNpmSpec(spec)
  const slot = join(root, 'pack-src', name.replaceAll('/', '-'))
  mkdirSync(slot, { recursive: true })
  writeFileSync(join(slot, 'package.json'), JSON.stringify({ name, version, main: 'index.js' }))
  writeFileSync(join(slot, 'index.js'), 'module.exports = {}\n')
  return packDirectoryAsTgz(slot, destinationDir)
}

function writeTarTree(destination: string, innerName: string, files: Record<string, string>): void {
  const staging = `${destination}-src`
  const inner = join(staging, innerName)
  mkdirSync(inner, { recursive: true })
  for (const [relativePath, content] of Object.entries(files)) {
    const target = join(inner, relativePath)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, content)
  }
  const result = spawnSync('tar', ['-cf', destination, '-C', staging, innerName], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(result.stderr || `tar -cf failed for ${destination}`)
  }
}

function profileBackup(dependencies: Record<string, unknown>, bundles: string[] = Object.keys(dependencies)) {
  return {
    format: 'dsh-profile-backup' as const,
    version: 0.2 as const,
    createdAt: '2026-09-10T04:55:28.185Z',
    profile: 'web',
    files: [
      {
        path: 'package.json' as const,
        json: {
          name: 'dsh-profile-web',
          dependencies,
          dsh: { profile: { bundles } }
        }
      }
    ]
  }
}

describe('dshmarket backup flavor source', () => {
  const fixtureBackup = join(projectRoot, 'test', 'fixtures', 'installer-flavor', 'dsh-profile-backup.json')
  const exampleBackup = join(
    projectRoot,
    'test',
    'fixtures',
    'installer-flavor',
    'dsh-dshmarket-backup-example.json'
  )

  it('expands a valid backup into npm and git plugin sources', () => {
    const expanded = expandBackupFlavorSource(
      { kind: 'plugin', from: 'backup', path: fixtureBackup },
      0,
      { projectRoot }
    )
    expect(expanded).toEqual([
      {
        kind: 'plugin',
        from: 'npm',
        spec: 'dsh-better-sidebar@0.18.1',
        id: 'dsh-better-sidebar',
        name: 'dsh-better-sidebar',
        fromBackup: true
      },
      {
        kind: 'plugin',
        from: 'npm',
        spec: '@liustack/modsearch@5.10.2',
        id: '@liustack/modsearch',
        name: '@liustack/modsearch',
        fromBackup: true
      },
      {
        kind: 'plugin',
        from: 'git',
        url: 'github:acme/dsh-crm-plugin#v2.1.0',
        id: 'acme-git-plugin',
        name: 'acme-git-plugin',
        fromBackup: true
      }
    ])
  })

  it('expands the example dshmarket backup into its community plugins', () => {
    const expanded = expandBackupFlavorSource(
      { kind: 'plugin', from: 'backup', path: exampleBackup },
      0,
      { projectRoot }
    )
    expect(expanded.map((source) => `${source.from}:${source.id}:${source.spec ?? source.url}`)).toEqual([
      'npm:dsh-better-sidebar:dsh-better-sidebar@0.18.1',
      'npm:@liustack/modsearch:@liustack/modsearch@5.10.2',
      'npm:@wingsky-1/dsh-mcp-manager:@wingsky-1/dsh-mcp-manager@0.2.3'
    ])
  })

  it('classifies recorded npm, git, and market-style install specs', () => {
    expect(classifyBackupPluginSpec('dsh-better-sidebar', '0.18.1')).toEqual({
      from: 'npm',
      spec: 'dsh-better-sidebar@0.18.1'
    })
    expect(classifyBackupPluginSpec('acme-git-plugin', 'github:acme/dsh-crm-plugin#v2.1.0')).toEqual({
      from: 'git',
      url: 'github:acme/dsh-crm-plugin#v2.1.0'
    })
    expect(classifyBackupPluginSpec('dsh-mcp-connector', 'npm:dsh-mcp-connector@1.2.0')).toEqual({
      from: 'npm',
      spec: 'dsh-mcp-connector@1.2.0'
    })
  })

  it('fails on an unknown or unresolvable backup entry', () => {
    expect(() => parseProfileBackup({ format: 'nope', version: 1, files: [] })).toThrow(
      /unsupported format/
    )
    expect(() =>
      extractBackupPluginEntries(
        profileBackup({ 'broken-plugin': { version: '1.0.0' } }),
        'sources[0] backup'
      )
    ).toThrow(/broken-plugin has no string install spec/)
    expect(() =>
      extractBackupPluginEntries(
        profileBackup(
          { 'ok-plugin': '1.0.0' },
          ['ok-plugin', 'ghost-bundle']
        ),
        'sources[0] backup'
      )
    ).toThrow(/bundle ghost-bundle has no dependency spec/)
    expect(() => classifyBackupPluginSpec('local-only', 'link:C:\\Users\\me\\plugin')).toThrow(
      /unresolvable local spec/
    )
    expect(() => classifyBackupPluginSpec('local-only', 'file:/home/me/plugin')).toThrow(
      /unresolvable local spec/
    )
  })

  it('rejects a backup whose community plugin list is empty', () => {
    expect(() => extractBackupPluginEntries(profileBackup({ dshmarket: '^1.45.1' }))).toThrow(
      /has no community plugins/
    )
  })
})

describe('market plugin resolution', () => {
  const snapshot = loadRegistrySnapshot(
    join(projectRoot, 'test', 'fixtures', 'installer-flavor', 'registry-snapshot.json')
  )

  it('resolves a unique catalog name from the vendored snapshot', () => {
    const resolved = resolveMarketPlugin({ id: 'dsh-mcp-connector' }, snapshot)
    expect(resolved.from).toBe('npm')
    expect(resolved.spec).toBe('dsh-mcp-connector')
    expect(resolved.plugin.owner).toBe('duhu2000')
  })

  it('resolves owner/name and an optional version pin', () => {
    const resolved = resolveMarketPlugin(
      { id: '2nd1st/dsh-plugin-open-app', version: '1.0.3' },
      snapshot
    )
    expect(resolved.from).toBe('npm')
    expect(resolved.spec).toBe('@2nd1st/dsh-plugin-open-app@1.0.3')
  })

  it('fails on an unknown market id', () => {
    expect(() => resolveMarketPlugin({ id: 'definitely-not-in-the-catalog' }, snapshot)).toThrow(
      /unknown market plugin id/
    )
  })

  it('fails on an ambiguous catalog name', () => {
    expect(() =>
      resolveMarketPlugin(
        { id: 'shared-name' },
        {
          plugins: [
            { name: 'shared-name', owner: 'alpha', install: 'dsh plugin --profile web add alpha-pkg' },
            { name: 'shared-name', owner: 'beta', install: 'dsh plugin --profile web add beta-pkg' }
          ]
        }
      )
    ).toThrow(/ambiguous market plugin id: shared-name/)
  })
})

describe('package entry packing', () => {
  it('collects every entry a package declares, not just the one it imports first', () => {
    expect(packageEntryPaths({ main: './lib/index.js' })).toEqual(['lib/index.js'])
    expect(packageEntryPaths({ exports: { '.': { default: './lib/index.js' } } })).toEqual([
      'lib/index.js'
    ])
    expect(packageEntryPaths({})).toEqual(['index.js'])
    // The host executes `bin`: a plugin is not packable just because `.` resolves.
    expect(
      packageEntryPaths({ bin: { modsearch: './dist/main.js' }, exports: { '.': './dsh/index.js' } })
    ).toEqual(['dist/main.js', 'dsh/index.js'])
  })

  it('does not bundle host singleton production dependencies into catalog tarballs', () => {
    expect(
      productionDependenciesToBundle({
        dependencies: {
          'js-yaml': '^4.1.0',
          react: '^18.2.0',
          '@deepseek-ai/cordis': '^4.0.1'
        }
      })
    ).toEqual(['js-yaml'])
  })

  it('falls back to a published tarball when the git tree has no main entry', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-pack-plugin-'))
    const tree = join(root, 'checkout')
    const dest = join(root, 'out')
    mkdirSync(tree, { recursive: true })
    mkdirSync(dest, { recursive: true })
    writeFileSync(
      join(tree, 'package.json'),
      JSON.stringify({
        name: '@wingsky-1/dsh-mcp-manager',
        version: '0.2.3',
        main: 'lib/index.js'
      })
    )
    writeFileSync(join(tree, 'src.ts'), 'export {}\n')

    const packed = packPluginDirectory(tree, dest, (spec, destinationDir) => {
      expect(spec).toBe('@wingsky-1/dsh-mcp-manager@0.2.3')
      const slot = join(root, 'published')
      mkdirSync(join(slot, 'lib'), { recursive: true })
      writeFileSync(
        join(slot, 'package.json'),
        JSON.stringify({ name: '@wingsky-1/dsh-mcp-manager', version: '0.2.3', main: 'lib/index.js' })
      )
      writeFileSync(join(slot, 'lib', 'index.js'), 'module.exports = {}\n')
      return packDirectoryAsTgz(slot, destinationDir)
    })

    expect(tarballContainsPath(packed, 'lib/index.js')).toBe(true)
    await rm(root, { recursive: true, force: true })
  })

  it('falls back to the published tarball when only the bin entry is missing', async () => {
    // modsearch 5.10.3: `exports["."]` (`dsh/index.js`) is in the git tree, the
    // `bin` the host executes (`dist/main.js`) is a build artifact, so packing
    // the checkout produced a plugin that started and died with MODULE_NOT_FOUND.
    const root = await mkdtemp(join(tmpdir(), 'dsh-pack-bin-'))
    const tree = join(root, 'checkout')
    const dest = join(root, 'out')
    mkdirSync(join(tree, 'dsh'), { recursive: true })
    mkdirSync(dest, { recursive: true })
    writeFileSync(
      join(tree, 'package.json'),
      JSON.stringify({
        name: '@liustack/modsearch',
        version: '5.10.3',
        bin: { modsearch: './dist/main.js' },
        exports: { '.': './dsh/index.js' }
      })
    )
    writeFileSync(join(tree, 'dsh', 'index.js'), 'export {}\n')

    const packed = packPluginDirectory(tree, dest, (spec, destinationDir) => {
      expect(spec).toBe('@liustack/modsearch@5.10.3')
      const slot = join(root, 'published')
      mkdirSync(join(slot, 'dist'), { recursive: true })
      mkdirSync(join(slot, 'dsh'), { recursive: true })
      writeFileSync(
        join(slot, 'package.json'),
        JSON.stringify({
          name: '@liustack/modsearch',
          version: '5.10.3',
          bin: { modsearch: './dist/main.js' },
          exports: { '.': './dsh/index.js' }
        })
      )
      writeFileSync(join(slot, 'dist', 'main.js'), '#!/usr/bin/env node\n')
      writeFileSync(join(slot, 'dsh', 'index.js'), 'export {}\n')
      return packDirectoryAsTgz(slot, destinationDir)
    })

    expect(tarballContainsPath(packed, 'dist/main.js')).toBe(true)
    expect(tarballContainsPath(packed, 'dsh/index.js')).toBe(true)
    await rm(root, { recursive: true, force: true })
  })

  it('packs the checkout when the entry file is already present', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-pack-present-'))
    const tree = join(root, 'checkout')
    const dest = join(root, 'out')
    mkdirSync(tree, { recursive: true })
    mkdirSync(dest, { recursive: true })
    writeFileSync(
      join(tree, 'package.json'),
      JSON.stringify({ name: 'acme-plugin', version: '1.0.0', main: 'index.js' })
    )
    writeFileSync(join(tree, 'index.js'), 'module.exports = {}\n')

    const packed = packPluginDirectory(tree, dest, () => {
      throw new Error('must not pack npm when the git entry exists')
    })
    expect(tarballContainsPath(packed, 'index.js')).toBe(true)
    await rm(root, { recursive: true, force: true })
  })

  it('embeds non-host production dependencies so a file: catalog install stays offline', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-pack-bundle-'))
    const dep = join(root, 'tiny-dep')
    const plugin = join(root, 'plugin')
    const dest = join(root, 'out')
    mkdirSync(dep, { recursive: true })
    mkdirSync(plugin, { recursive: true })
    mkdirSync(dest, { recursive: true })
    writeFileSync(
      join(dep, 'package.json'),
      JSON.stringify({ name: 'tiny-dep', version: '1.0.0', main: 'index.js' })
    )
    writeFileSync(join(dep, 'index.js'), 'module.exports = 1\n')
    writeFileSync(
      join(plugin, 'package.json'),
      JSON.stringify({
        name: 'needs-tiny',
        version: '1.0.0',
        main: 'index.js',
        dependencies: {
          'tiny-dep': 'file:../tiny-dep',
          '@deepseek-ai/cordis': '^4.0.1'
        }
      })
    )
    writeFileSync(join(plugin, 'index.js'), 'module.exports = require("tiny-dep")\n')

    const packed = packPluginDirectory(plugin, dest, () => {
      throw new Error('must not pack npm when the git entry exists')
    })
    expect(tarballContainsPath(packed, 'node_modules/tiny-dep/index.js')).toBe(true)
    expect(tarballContainsPath(packed, 'node_modules/@deepseek-ai/cordis/package.json')).toBe(false)
    const packedManifest = JSON.parse(
      await readFile(join(plugin, 'package.json'), 'utf8')
    ) as { bundleDependencies?: string[]; dependencies?: Record<string, string> }
    expect(packedManifest.bundleDependencies).toEqual(['tiny-dep'])
    expect(packedManifest.dependencies?.['@deepseek-ai/cordis']).toBe('^4.0.1')
    await rm(root, { recursive: true, force: true })
  })
})

describe('prepare-installer-catalog', () => {
  const roots: string[] = []

  afterEach(async () => {
    await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })))
    roots.length = 0
  })

  it('vendors a local mixed flavor into the installer catalog and labels', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-catalog-'))
    roots.push(root)
    const flavorPath = join(projectRoot, 'test', 'fixtures', 'installer-flavor', 'flavor.yml')

    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath
    })

    expect(prepared.manifest.name).toBe('Fixture Desktop')
    expect(prepared.manifest.items.map((item) => item.kind)).toEqual([
      'plugin',
      'mcp',
      'skill',
      'rules',
      'payload'
    ])
    expect(prepared.manifest.items[0]).toMatchObject({
      kind: 'plugin',
      name: 'acme-internal-plugin',
      label: catalogListLabel('plugin', 'acme-internal-plugin')
    })
    expect(prepared.manifest.items[1]).toMatchObject({
      kind: 'mcp',
      id: 'intranet',
      label: catalogListLabel('mcp', 'intranet')
    })

    const labels = await readFile(prepared.paths.labelsPath, 'utf8')
    expect(labels).toContain('Plugin: acme-internal-plugin')
    expect(labels).toContain('MCP: intranet')
    expect(labels).toContain('Skill: invoice-review')
    expect(labels).toContain('Rules: AGENTS.md')
    expect(labels).toContain('Payload: acme-rules')
    expect(labels).toContain('!macro DshFillCatalogList HWND')

    const pluginTarball = join(prepared.paths.catalogDir, prepared.manifest.items[0]!.file!)
    await expect(readFile(pluginTarball)).resolves.toBeTruthy()
    await expect(
      readFile(join(prepared.paths.catalogDir, 'skills', 'invoice-review', 'SKILL.md'), 'utf8')
    ).resolves.toContain('invoice-review')
    await expect(
      readFile(join(prepared.paths.catalogDir, 'rules', 'AGENTS.md'), 'utf8')
    ).resolves.toContain('OEM rules')
  })

  it('vendors a payload tree whole, with a content digest that tracks its files', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-payload-'))
    roots.push(root)
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Payload Desktop',
        'version: 1.0.0',
        'sources:',
        '  - kind: payload',
        '    from: local',
        '    path: ./tree',
        '    id: 1c-rules',
        '    version: 2026.01.01-abc1234',
        ''
      ].join('\n')
    )
    await mkdir(join(root, 'tree', 'content', 'rules'), { recursive: true })
    await mkdir(join(root, 'tree', 'content', 'skills', 'demo'), { recursive: true })
    await mkdir(join(root, 'tree', 'tools'), { recursive: true })
    await writeFile(join(root, 'tree', 'AGENTS.md'), '# entry\n')
    await writeFile(join(root, 'tree', 'content', 'rules', 'demo.md'), 'rule body\n')
    await writeFile(join(root, 'tree', 'content', 'skills', 'demo', 'SKILL.md'), '---\nname: demo\n---\n')
    await writeFile(join(root, 'tree', 'tools', 'dev-only.ps1'), 'dev tooling\n')
    await writeFile(join(root, 'tree', 'install.ps1'), 'installer\n')

    const prepared = await prepareInstallerCatalog({ projectRoot: root, flavorPath })
    const item = prepared.manifest.items[0]!
    expect(item).toMatchObject({
      kind: 'payload',
      id: '1c-rules',
      name: '1c-rules',
      version: '2026.01.01-abc1234',
      label: 'Payload: 1c-rules',
      path: 'payload/1c-rules'
    })
    expect(item.digest).toMatch(/^[0-9a-f]{64}$/u)

    const copied = item.path!
    await expect(readFile(join(prepared.paths.catalogDir, copied, 'AGENTS.md'), 'utf8')).resolves
      .toContain('# entry')
    await expect(
      readFile(join(prepared.paths.catalogDir, copied, 'content', 'rules', 'demo.md'), 'utf8')
    ).resolves.toContain('rule body')
    // Source-repository tooling is not part of the delivered ruleset.
    expect(existsSync(join(prepared.paths.catalogDir, copied, 'tools'))).toBe(false)
    expect(existsSync(join(prepared.paths.catalogDir, copied, 'install.ps1'))).toBe(false)

    // A content-only change must move the digest: the catalog fingerprint is
    // the only thing that decides whether an existing install re-seeds.
    await writeFile(join(root, 'tree', 'content', 'rules', 'demo.md'), 'changed body\n')
    const reprepared = await prepareInstallerCatalog({ projectRoot: root, flavorPath })
    expect(reprepared.manifest.items[0]!.digest).not.toBe(item.digest)
  })

  it('records a digest for every skill so a content change re-seeds them', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-skill-digest-'))
    roots.push(root)
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Skill Digest Desktop',
        'version: 1.0.0',
        'sources:',
        '  - kind: skill',
        '    from: local',
        '    path: ./skills/demo',
        ''
      ].join('\n')
    )
    await mkdir(join(root, 'skills', 'demo'), { recursive: true })
    await writeFile(join(root, 'skills', 'demo', 'SKILL.md'), '---\nname: demo\n---\nfirst\n')

    const first = await prepareInstallerCatalog({ projectRoot: root, flavorPath })
    const skill = first.manifest.items.find((entry) => entry.kind === 'skill')!
    expect(skill.digest).toMatch(/^[0-9a-f]{64}$/u)

    await writeFile(join(root, 'skills', 'demo', 'SKILL.md'), '---\nname: demo\n---\nsecond\n')
    const second = await prepareInstallerCatalog({ projectRoot: root, flavorPath })
    expect(second.manifest.items.find((entry) => entry.kind === 'skill')!.digest).not.toBe(skill.digest)
  })

  it('downloads backup plugins and packs them into the installer catalog', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-backup-'))
    roots.push(root)
    const backupPath = join(root, 'backup.json')
    await writeFile(
      backupPath,
      JSON.stringify(
        profileBackup({
          dshmarket: '^1.45.1',
          'fixture-sidebar': '1.2.0',
          '@acme/modsearch': '3.4.5'
        })
      )
    )
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      'name: Backup Desktop\nversion: 2.0.0\nsources:\n  - kind: plugin\n    from: backup\n    path: ./backup.json\n'
    )

    const packedSpecs: string[] = []
    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath,
      packSpec: (spec, destinationDir) => {
        packedSpecs.push(spec)
        return packMiniNpmSpec(root, spec, destinationDir)
      }
    })

    expect(packedSpecs).toEqual(['fixture-sidebar@1.2.0', '@acme/modsearch@3.4.5'])
    expect(prepared.manifest.items.map((item) => ({ name: item.name, file: item.file }))).toEqual([
      { name: 'fixture-sidebar', file: expect.stringMatching(/^plugins\/.+\.tgz$/u) },
      { name: '@acme/modsearch', file: expect.stringMatching(/^plugins\/.+\.tgz$/u) }
    ])
    for (const item of prepared.manifest.items) {
      await expect(readFile(join(prepared.paths.catalogDir, item.file!))).resolves.toBeTruthy()
    }
    expect(await readFile(prepared.paths.labelsPath, 'utf8')).toContain('Plugin: fixture-sidebar')
  })

  it('fails the installer build when a backup plugin cannot be packed', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-backup-fail-'))
    roots.push(root)
    await writeFile(join(root, 'backup.json'), JSON.stringify(profileBackup({ 'missing-plugin': '9.9.9' })))
    await writeFile(
      join(root, 'flavor.yml'),
      'name: Broken Backup\nversion: 1.0.0\nsources:\n  - kind: plugin\n    from: backup\n    path: ./backup.json\n'
    )

    await expect(
      prepareInstallerCatalog({
        projectRoot: root,
        flavorPath: join(root, 'flavor.yml'),
        packSpec: () => {
          throw new Error('npm pack missing-plugin@9.9.9 failed')
        }
      })
    ).rejects.toThrow(/backup plugin missing-plugin could not be downloaded or packed/)
  })

  it('writes a vanilla catalog when sources are empty', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-vanilla-'))
    roots.push(root)
    const flavorPath = join(root, 'installer-flavor.yml')
    await writeFile(flavorPath, 'name: DSH Desktop\nversion: 0.8.0-rc.4\nsources: []\n')

    const prepared = await prepareInstallerCatalog({ projectRoot: root, flavorPath })
    expect(prepared.manifest.items).toEqual([])
    expect(await readFile(catalogOutputPaths(root).labelsPath, 'utf8')).toContain(
      'Vanilla DSH Desktop'
    )
  })

  it('vendors git, npm, and market plugins as packed catalog files, not leftover specs', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-remote-'))
    roots.push(root)
    const snapshotPath = join(root, 'registry-snapshot.json')
    await writeFile(
      snapshotPath,
      JSON.stringify({
        plugins: [
          { name: 'fixture-market-plugin', owner: 'acme', npm: 'fixture-market-plugin' },
          {
            name: 'fixture-git-market',
            owner: 'acme',
            install: 'dsh plugin --profile web add github:acme/dsh-git-market#v1.0.0'
          }
        ]
      })
    )
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Remote Desktop',
        'version: 3.0.0',
        'sources:',
        '  - kind: plugin',
        '    from: git',
        '    url: https://github.com/acme/dsh-crm-plugin.git#v2.1.0',
        '  - kind: plugin',
        '    from: npm',
        '    spec: some-private-connector@1.2.0',
        '  - kind: plugin',
        '    from: market',
        '    id: fixture-market-plugin',
        '    version: 4.5.6',
        '  - kind: plugin',
        '    from: market',
        '    id: acme/fixture-git-market',
        '  - kind: skill',
        '    from: git',
        '    url: https://github.com/acme/dsh-skills.git#main',
        '    path: invoice-review',
        ''
      ].join('\n')
    )

    const downloaded: string[] = []
    const packedSpecs: string[] = []
    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath,
      registrySnapshotPath: snapshotPath,
      download: async (url, destination) => {
        downloaded.push(url)
        if (url.includes('acme/dsh-crm-plugin')) {
          writeTarTree(destination, 'acme-dsh-crm-plugin-v2.1.0', {
            'package.json': JSON.stringify({ name: 'dsh-crm-plugin', version: '2.1.0', main: 'index.js' }),
            'index.js': 'module.exports = {}\n'
          })
          return
        }
        if (url.includes('acme/dsh-git-market')) {
          writeTarTree(destination, 'acme-dsh-git-market-v1.0.0', {
            'package.json': JSON.stringify({ name: 'fixture-git-market', version: '1.0.0', main: 'index.js' }),
            'index.js': 'module.exports = {}\n'
          })
          return
        }
        if (url.includes('acme/dsh-skills')) {
          writeTarTree(destination, 'acme-dsh-skills-main', {
            'invoice-review/SKILL.md': '---\nname: invoice-review\n---\nRemote skill.\n'
          })
          return
        }
        throw new Error(`unexpected git download: ${url}`)
      },
      packSpec: (spec, destinationDir) => {
        packedSpecs.push(spec)
        return packMiniNpmSpec(root, spec, destinationDir)
      }
    })

    expect(downloaded.some((url) => url.includes('acme/dsh-crm-plugin'))).toBe(true)
    expect(downloaded.some((url) => url.includes('acme/dsh-git-market'))).toBe(true)
    expect(downloaded.some((url) => url.includes('acme/dsh-skills'))).toBe(true)
    expect(packedSpecs).toEqual(['some-private-connector@1.2.0', 'fixture-market-plugin@4.5.6'])

    const plugins = prepared.manifest.items.filter((item) => item.kind === 'plugin')
    expect(plugins.map((item) => item.name)).toEqual([
      'dsh-crm-plugin',
      'some-private-connector',
      'fixture-market-plugin',
      'fixture-git-market'
    ])
    for (const item of plugins) {
      expect(item.file).toMatch(/^plugins\/.+\.tgz$/u)
      expect(item).not.toHaveProperty('url')
      expect(item).not.toHaveProperty('spec')
      const bytes = await readFile(join(prepared.paths.catalogDir, item.file!))
      expect(bytes.byteLength).toBeGreaterThan(0)
    }

    const skill = prepared.manifest.items.find((item) => item.kind === 'skill')
    expect(skill?.path).toMatch(/^skills\//u)
    await expect(
      readFile(join(prepared.paths.catalogDir, skill!.path!, 'SKILL.md'), 'utf8')
    ).resolves.toContain('Remote skill.')
  }, 30_000)

  it('vendors every SKILL.md folder from a git skill tree', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-skill-tree-'))
    roots.push(root)
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Skill Tree Desktop',
        'version: 1.0.0',
        'sources:',
        '  - kind: skill',
        '    from: git',
        '    url: https://github.com/acme/dsh-skills.git#main',
        '    path: .claude/skills',
        ''
      ].join('\n')
    )

    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath,
      download: async (url, destination) => {
        if (!url.includes('acme/dsh-skills')) throw new Error(`unexpected git download: ${url}`)
        writeTarTree(destination, 'acme-dsh-skills-main', {
          '.claude/skills/epf-init/SKILL.md': '---\nname: epf-init\n---\nInit.\n',
          '.claude/skills/epf-build/SKILL.md': '---\nname: epf-build\n---\nBuild.\n',
          '.claude/skills/.gitignore': '*\n'
        })
      }
    })

    const skills = prepared.manifest.items.filter((item) => item.kind === 'skill')
    expect(skills.map((item) => item.id).sort()).toEqual(['epf-build', 'epf-init'])
    await expect(
      readFile(join(prepared.paths.catalogDir, 'skills', 'epf-init', 'SKILL.md'), 'utf8')
    ).resolves.toContain('Init.')
    await expect(
      readFile(join(prepared.paths.catalogDir, 'skills', 'epf-build', 'SKILL.md'), 'utf8')
    ).resolves.toContain('Build.')
  })

  it('packs a git plugin from a monorepo subdirectory', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-mono-'))
    roots.push(root)
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Mono Desktop',
        'version: 1.0.0',
        'sources:',
        '  - kind: plugin',
        '    from: git',
        '    url: https://github.com/acme/plugin-hub.git#main',
        '    path: packages/dsh-mcp-manager',
        ''
      ].join('\n')
    )

    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath,
      download: async (url, destination) => {
        if (!url.includes('acme/plugin-hub')) throw new Error(`unexpected git download: ${url}`)
        writeTarTree(destination, 'acme-plugin-hub-main', {
          'packages/dsh-mcp-manager/package.json': JSON.stringify({
            name: '@wingsky-1/dsh-mcp-manager',
            version: '0.2.3',
            main: 'index.js'
          }),
          'packages/dsh-mcp-manager/index.js': 'module.exports = {}\n',
          'packages/other/package.json': JSON.stringify({ name: 'other', version: '1.0.0' })
        })
      }
    })

    expect(prepared.manifest.items).toEqual([
      expect.objectContaining({
        kind: 'plugin',
        id: '@wingsky-1/dsh-mcp-manager',
        name: '@wingsky-1/dsh-mcp-manager',
        version: '0.2.3',
        file: expect.stringMatching(/^plugins\/.+\.tgz$/u),
        digest: expect.stringMatching(/^[a-f0-9]{64}$/u)
      })
    ])
  })

  it('vendors a published npm tarball when a git plugin checkout has no lib entry', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-git-nolib-'))
    roots.push(root)
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      [
        'name: Git Lib Desktop',
        'version: 1.0.0',
        'sources:',
        '  - kind: plugin',
        '    from: git',
        '    url: https://github.com/acme/plugin-hub.git#main',
        '    path: packages/dsh-mcp-manager',
        ''
      ].join('\n')
    )

    const packedSpecs: string[] = []
    const prepared = await prepareInstallerCatalog({
      projectRoot: root,
      flavorPath,
      download: async (url, destination) => {
        if (!url.includes('acme/plugin-hub')) throw new Error(`unexpected git download: ${url}`)
        writeTarTree(destination, 'acme-plugin-hub-main', {
          'packages/dsh-mcp-manager/package.json': JSON.stringify({
            name: '@wingsky-1/dsh-mcp-manager',
            version: '0.2.3',
            main: 'lib/index.js',
            files: ['lib']
          }),
          'packages/dsh-mcp-manager/src/index.ts': 'export {}\n'
        })
      },
      packSpec: (spec, destinationDir) => {
        packedSpecs.push(spec)
        const { name, version } = splitNpmSpec(spec)
        const slot = join(root, 'published', name.replaceAll('/', '-'))
        mkdirSync(join(slot, 'lib'), { recursive: true })
        writeFileSync(
          join(slot, 'package.json'),
          JSON.stringify({ name, version, main: 'lib/index.js' })
        )
        writeFileSync(join(slot, 'lib', 'index.js'), 'module.exports = { ok: true }\n')
        return packDirectoryAsTgz(slot, destinationDir)
      }
    })

    expect(packedSpecs[0]).toBe('@wingsky-1/dsh-mcp-manager@0.2.3')
    const file = prepared.manifest.items[0]!.file!
    expect(tarballContainsPath(join(prepared.paths.catalogDir, file), 'lib/index.js')).toBe(true)
  })

  it('fails the installer build when a git source cannot be downloaded', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-git-fail-'))
    roots.push(root)
    await writeFile(
      join(root, 'flavor.yml'),
      'name: Broken Git\nversion: 1.0.0\nsources:\n  - kind: plugin\n    from: git\n    url: https://github.com/acme/missing.git#main\n'
    )

    await expect(
      prepareInstallerCatalog({
        projectRoot: root,
        flavorPath: join(root, 'flavor.yml'),
        download: async () => {
          throw new Error('download failed (404)')
        }
      })
    ).rejects.toThrow(/git plugin .* could not be downloaded or packed/)
  })

  it('fails the installer build when an npm source cannot be packed', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-npm-fail-'))
    roots.push(root)
    await writeFile(
      join(root, 'flavor.yml'),
      'name: Broken Npm\nversion: 1.0.0\nsources:\n  - kind: plugin\n    from: npm\n    spec: missing-connector@9.9.9\n'
    )

    await expect(
      prepareInstallerCatalog({
        projectRoot: root,
        flavorPath: join(root, 'flavor.yml'),
        packSpec: () => {
          throw new Error('npm pack missing-connector@9.9.9 failed')
        }
      })
    ).rejects.toThrow(/npm plugin missing-connector@9.9.9 could not be downloaded or packed/)
  })

  it('fails the installer build when a market plugin cannot be packed', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-market-pack-fail-'))
    roots.push(root)
    const snapshotPath = join(root, 'registry-snapshot.json')
    await writeFile(
      snapshotPath,
      JSON.stringify({ plugins: [{ name: 'fixture-market-plugin', owner: 'acme', npm: 'fixture-market-plugin' }] })
    )
    await writeFile(
      join(root, 'flavor.yml'),
      'name: Broken Market\nversion: 1.0.0\nsources:\n  - kind: plugin\n    from: market\n    id: fixture-market-plugin\n'
    )

    await expect(
      prepareInstallerCatalog({
        projectRoot: root,
        flavorPath: join(root, 'flavor.yml'),
        registrySnapshotPath: snapshotPath,
        packSpec: () => {
          throw new Error('npm pack fixture-market-plugin failed')
        }
      })
    ).rejects.toThrow(/market plugin fixture-market-plugin could not be downloaded or packed/)
  })

  it('does not accept a market id that is missing from the snapshot while preparing', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-prepare-market-'))
    roots.push(root)
    await mkdir(join(root, 'data'), { recursive: true })
    const snapshotPath = join(root, 'data', 'registry-snapshot.json')
    await writeFile(snapshotPath, JSON.stringify({ plugins: [] }))
    const flavorPath = join(root, 'flavor.yml')
    await writeFile(
      flavorPath,
      'name: Broken\nversion: 1.0.0\nsources:\n  - kind: plugin\n    from: market\n    id: missing-plugin\n'
    )

    await expect(
      prepareInstallerCatalog({ projectRoot: root, flavorPath, registrySnapshotPath: snapshotPath })
    ).rejects.toThrow(/unknown market plugin id/)
  })
})
