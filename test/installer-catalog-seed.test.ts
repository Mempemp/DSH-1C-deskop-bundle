import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parse } from 'yaml'
import { afterEach, describe, expect, it } from 'vitest'
import {
  ensureRegistryDirectories,
  registryLayout,
  readDesired,
  writeDesired,
  writeGenerationMeta
} from '../packages/dsh-desktop-market-installer/generations/registry'
import { prepareGenerationsForLaunch } from '../src/main/state/generation-launch'
import {
  applyInstallerCatalogSeed,
  catalogFingerprint,
  catalogStampPath,
  CATALOG_STAMP_NAME,
  MCP_MANAGER_STORE_NAME,
  mergeMcpServerIntoManagerStore,
  mcpPatchEntryId,
  removeMcpRowsFromPatch,
  PAYLOAD_HOME_DIR,
  PAYLOAD_MANIFEST_NAME,
  readCatalogManifest
} from '../src/main/state/installer-catalog-seed'

describe('first-run installer catalog seed', () => {
  const homes: string[] = []
  const silent = (): void => undefined

  async function freshHome(): Promise<string> {
    const home = await mkdtemp(join(tmpdir(), 'dsh-catalog-seed-'))
    homes.push(home)
    await mkdir(join(home, 'profiles', 'web'), { recursive: true })
    await writeFile(
      join(home, 'profiles', 'web', 'package.json'),
      JSON.stringify({
        name: 'dsh-profile-web',
        private: true,
        dependencies: {},
        dsh: { profile: { bundles: ['@deepseek-ai/dsh-base'] } }
      })
    )
    await writeFile(join(home, 'profiles', 'web', 'cordis.patch.yml'), '[]\n')
    return home
  }

  async function fixtureCatalog(): Promise<string> {
    const root = await mkdtemp(join(tmpdir(), 'dsh-catalog-root-'))
    homes.push(root)
    await mkdir(join(root, 'plugins'), { recursive: true })
    await mkdir(join(root, 'skills', 'invoice-review'), { recursive: true })
    await mkdir(join(root, 'rules'), { recursive: true })
    await mkdir(join(root, 'payload', '1c-rules', 'content', 'rules'), { recursive: true })
    await mkdir(join(root, 'mcp'), { recursive: true })
    await writeFile(join(root, 'plugins', 'fixture-plugin-1.0.0.tgz'), 'tarball')
    await writeFile(
      join(root, 'skills', 'invoice-review', 'SKILL.md'),
      '---\nname: invoice-review\n---\nReview invoices.\n'
    )
    await writeFile(join(root, 'rules', 'AGENTS.md'), '# seeded rules\n')
    await writeFile(join(root, 'payload', '1c-rules', 'AGENTS.md'), '# payload entry\n')
    await writeFile(
      join(root, 'payload', '1c-rules', 'content', 'rules', 'demo.md'),
      'payload rule body\n'
    )
    await writeFile(
      join(root, 'manifest.json'),
      JSON.stringify({
        name: 'Fixture Desktop',
        version: '1.0.0',
        id: 'fixture-desktop',
        items: [
          {
            kind: 'plugin',
            id: 'fixture-plugin',
            name: 'fixture-plugin',
            version: '1.0.0',
            label: 'Plugin: fixture-plugin',
            file: 'plugins/fixture-plugin-1.0.0.tgz'
          },
          {
            kind: 'mcp',
            id: 'intranet',
            label: 'MCP: intranet',
            transport: 'stdio',
            command: 'node',
            args: ['intranet.js']
          },
          {
            kind: 'skill',
            id: 'invoice-review',
            label: 'Skill: invoice-review',
            path: 'skills/invoice-review'
          },
          {
            kind: 'rules',
            id: 'AGENTS.md',
            label: 'Rules: AGENTS.md',
            path: 'rules/AGENTS.md'
          },
          {
            kind: 'payload',
            id: '1c-rules',
            name: '1c-rules',
            version: '2026.01.01-abc1234',
            label: 'Payload: 1c-rules',
            path: 'payload/1c-rules',
            digest: 'b'.repeat(64)
          }
        ]
      })
    )
    return root
  }

  async function fakeGeneration(
    home: string,
    id: string,
    pluginName: string,
    version = '1.0.0'
  ): Promise<void> {
    await ensureRegistryDirectories(home)
    const dir = join(registryLayout(home).generations, id)
    const pkg = join(dir, 'node_modules', pluginName)
    await mkdir(pkg, { recursive: true })
    await writeFile(
      join(pkg, 'package.json'),
      JSON.stringify({ name: pluginName, version, dsh: { bundle: { patch: 'p.yml' } } })
    )
    await writeGenerationMeta(dir, { pluginName, version })
  }

  afterEach(async () => {
    await Promise.all(homes.map((home) => rm(home, { recursive: true, force: true })))
    homes.length = 0
  })

  it('seeds every kind when the catalog stamp is absent', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    const installs: string[] = []

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ pluginSpec }) => {
        installs.push(pluginSpec)
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    expect(installs).toEqual([`file:${join(catalogRoot, 'plugins', 'fixture-plugin-1.0.0.tgz')}`])
    expect(await readFile(join(home, CATALOG_STAMP_NAME), 'utf8')).toBe(
      catalogFingerprint(readCatalogManifest(catalogRoot)!)
    )
    expect(await readFile(join(home, 'skills', 'invoice-review', 'SKILL.md'), 'utf8')).toContain(
      'Review invoices'
    )
    expect(await readFile(join(home, 'AGENTS.md'), 'utf8')).toContain('seeded rules')
    // The server lands in the MCP manager's store — the list its panel shows
    // and its switches act on — and nowhere else: one serverName has one home.
    expect(JSON.parse(await readFile(join(home, MCP_MANAGER_STORE_NAME), 'utf8'))).toEqual({
      version: 1,
      servers: [
        {
          name: 'intranet',
          transport: 'stdio',
          command: 'node',
          args: ['intranet.js'],
          enabled: true
        }
      ]
    })
    expect(existsSync(join(home, 'cordis.patch.yml'))).toBe(false)
    expect(await readFile(join(home, 'profiles', 'web', 'cordis.patch.yml'), 'utf8')).toBe('[]\n')
    // The payload lands beside the skills, whole, with a manifest naming the
    // revision a consumer (a project-scoped plugin) deployed.
    expect(await readFile(join(home, PAYLOAD_HOME_DIR, 'AGENTS.md'), 'utf8')).toContain(
      'payload entry'
    )
    expect(
      await readFile(join(home, PAYLOAD_HOME_DIR, 'content', 'rules', 'demo.md'), 'utf8')
    ).toContain('payload rule body')
    const payloadManifest = JSON.parse(
      await readFile(join(home, PAYLOAD_HOME_DIR, PAYLOAD_MANIFEST_NAME), 'utf8')
    )
    expect(payloadManifest).toMatchObject({
      format: 'dsh-desktop-payload',
      formatVersion: 1,
      id: '1c-rules',
      name: '1c-rules',
      version: '2026.01.01-abc1234',
      digest: 'b'.repeat(64),
      catalog: { id: 'fixture-desktop', version: '1.0.0' }
    })
  })

  it('replaces a seeded payload wholesale when the catalog content changes', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await mkdir(join(home, PAYLOAD_HOME_DIR, 'content', 'rules'), { recursive: true })
    await writeFile(join(home, PAYLOAD_HOME_DIR, 'content', 'rules', 'stale.md'), 'stale rule\n')

    await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      installSharedTreeMarket: async () => undefined,
      note: silent
    })

    expect(existsSync(join(home, PAYLOAD_HOME_DIR, 'content', 'rules', 'stale.md'))).toBe(false)
    expect(
      await readFile(join(home, PAYLOAD_HOME_DIR, 'content', 'rules', 'demo.md'), 'utf8')
    ).toContain('payload rule body')
  })

  it('is a no-op when the catalog stamp matches the current fingerprint', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await writeFile(catalogStampPath(home), catalogFingerprint(readCatalogManifest(catalogRoot)!))
    let installs = 0

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        installs += 1
        return { ok: false, detail: 'should not run' }
      },
      note: silent
    })

    expect(outcome).toBe('skipped')
    expect(installs).toBe(0)
    expect(existsSync(join(home, 'skills'))).toBe(false)
    expect(existsSync(join(home, 'AGENTS.md'))).toBe(false)
  })

  it('changes fingerprint when a packed plugin digest changes', () => {
    const base = {
      name: 'Fixture Desktop',
      version: '1.0.0',
      id: 'fixture-desktop',
      items: [
        {
          kind: 'plugin' as const,
          id: 'fixture-plugin',
          label: 'Plugin: fixture-plugin',
          version: '1.0.0',
          file: 'plugins/fixture-plugin-1.0.0.tgz',
          digest: 'aaa'
        }
      ]
    }
    expect(catalogFingerprint(base)).not.toBe(
      catalogFingerprint({
        ...base,
        items: [{ ...base.items[0]!, digest: 'bbb' }]
      })
    )
    expect(catalogFingerprint(base, '0.1.0')).not.toBe(catalogFingerprint(base, '0.1.1'))
    expect(catalogFingerprint(base, '0.1.1')).toBe(`0.1.1|${catalogFingerprint(base)}`)
  })

  it('seeds the market into the shared tree instead of a generation', async () => {
    const home = await freshHome()
    const catalogRoot = await mkdtemp(join(tmpdir(), 'dsh-catalog-market-'))
    homes.push(catalogRoot)
    await mkdir(join(catalogRoot, 'plugins'), { recursive: true })
    await writeFile(join(catalogRoot, 'plugins', 'dshmarket-1.40.0.tgz'), 'tarball')
    await writeFile(
      join(catalogRoot, 'manifest.json'),
      JSON.stringify({
        name: 'Market Desktop',
        version: '1.0.0',
        id: 'market-desktop',
        items: [
          {
            kind: 'plugin',
            id: 'dshmarket',
            name: 'dshmarket',
            version: '1.40.0',
            label: 'Plugin: dshmarket',
            file: 'plugins/dshmarket-1.40.0.tgz'
          }
        ]
      })
    )
    const generations: string[] = []
    const sharedTree: string[] = []

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ expectedPluginName }) => {
        generations.push(expectedPluginName ?? '')
        throw new Error('the market must never be installed as a generation')
      },
      installSharedTreeMarket: async ({ item, tarball, version }) => {
        sharedTree.push(`${item.id}:${version}:${tarball}`)
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    expect(generations).toEqual([])
    expect(sharedTree).toEqual([
      `dshmarket:1.40.0:${join(catalogRoot, 'plugins', 'dshmarket-1.40.0.tgz')}`
    ])
    expect(existsSync(catalogStampPath(home))).toBe(true)
  })

  it('leaves the stamp unwritten when the market cannot reach the shared tree', async () => {
    const home = await freshHome()
    const catalogRoot = await mkdtemp(join(tmpdir(), 'dsh-catalog-market-fail-'))
    homes.push(catalogRoot)
    await mkdir(join(catalogRoot, 'plugins'), { recursive: true })
    await writeFile(join(catalogRoot, 'plugins', 'dshmarket-1.40.0.tgz'), 'tarball')
    await writeFile(
      join(catalogRoot, 'manifest.json'),
      JSON.stringify({
        name: 'Market Desktop',
        version: '1.0.0',
        id: 'market-desktop',
        items: [
          {
            kind: 'plugin',
            id: 'dshmarket',
            name: 'dshmarket',
            version: '1.40.0',
            label: 'Plugin: dshmarket',
            file: 'plugins/dshmarket-1.40.0.tgz'
          }
        ]
      })
    )
    const notes: string[] = []

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        throw new Error('the market must never be installed as a generation')
      },
      installSharedTreeMarket: async () => {
        throw new Error('the profile is busy')
      },
      note: (line) => notes.push(line)
    })

    // No stamp: the next launch applies the whole catalog again, which is how the
    // market gets another chance to land.
    expect(outcome).toBe('deferred')
    expect(existsSync(catalogStampPath(home))).toBe(false)
    expect(notes.some((line) => line.includes('the profile is busy'))).toBe(true)
  })

  it('upgrades catalog plugins and skills when the installer catalog is newer', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await mkdir(join(home, 'skills', 'invoice-review'), { recursive: true })
    await writeFile(join(home, 'skills', 'invoice-review', 'SKILL.md'), 'old skill\n')
    await writeFile(join(home, 'AGENTS.md'), 'user rules\n')
    await fakeGeneration(home, 'fixture-plugin+1.0.0+user', 'fixture-plugin')
    await writeDesired(home, ['fixture-plugin+1.0.0+user'])
    await writeFile(catalogStampPath(home), 'fixture-desktop@0.9.0|plugin:fixture-plugin:0.9.0:old.tgz\n')
    const installs: string[] = []

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ pluginSpec }) => {
        installs.push(pluginSpec)
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    expect(installs).toEqual([`file:${join(catalogRoot, 'plugins', 'fixture-plugin-1.0.0.tgz')}`])
    expect(await readFile(join(home, 'skills', 'invoice-review', 'SKILL.md'), 'utf8')).toContain(
      'Review invoices'
    )
    expect(await readFile(join(home, 'AGENTS.md'), 'utf8')).toContain('seeded rules')
    expect(await readFile(catalogStampPath(home), 'utf8')).toBe(
      catalogFingerprint(readCatalogManifest(catalogRoot)!)
    )
  })

  it('installs catalog plugins over an existing unstamped profile', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await mkdir(join(home, 'skills', 'invoice-review'), { recursive: true })
    await writeFile(join(home, 'skills', 'invoice-review', 'SKILL.md'), 'user skill\n')
    await writeFile(join(home, 'AGENTS.md'), 'user rules\n')
    await fakeGeneration(home, 'fixture-plugin+1.0.0+user', 'fixture-plugin')
    await writeDesired(home, ['fixture-plugin+1.0.0+user'])
    const installs: string[] = []

    await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ pluginSpec }) => {
        installs.push(pluginSpec)
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })

    expect(installs).toHaveLength(1)
    expect(await readFile(join(home, 'skills', 'invoice-review', 'SKILL.md'), 'utf8')).toContain(
      'Review invoices'
    )
    expect(await readFile(join(home, 'AGENTS.md'), 'utf8')).toContain('seeded rules')
  })

  it('replaces a newer catalog plugin with the bundled tarball and keeps user plugins', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await fakeGeneration(home, 'fixture-plugin+0.19.0+market', 'fixture-plugin', '0.19.0')
    await fakeGeneration(home, 'user-plugin+2.0.0+market', 'user-plugin', '2.0.0')
    await writeDesired(home, [
      'fixture-plugin+0.19.0+market',
      'user-plugin+2.0.0+market'
    ])
    await writeFile(catalogStampPath(home), 'fixture-desktop@0.9.0|plugin:fixture-plugin:0.9.0:old.tgz\n')
    await mkdir(join(home, 'skills', 'user-skill'), { recursive: true })
    await writeFile(join(home, 'skills', 'user-skill', 'SKILL.md'), 'my skill\n')
    await writeFile(
      join(home, 'cordis.patch.yml'),
      [
        '# Written by DSH Desktop: the loader patch layer applied to every profile',
        "# after the profile bundle layers and the profile's own cordis.patch.yml.",
        '#',
        '# a comment the desktop must not eat',
        '- insert:',
        `    - id: ${mcpPatchEntryId('intranet')}`,
        "      name: '@deepseek-ai/dsh-mcp-client'",
        '      config:',
        '        serverName: intranet',
        '        transport: stdio',
        '        command: old-intranet',
        '    - id: mcp-mine',
        "      name: '@deepseek-ai/dsh-mcp-client'",
        '      config:',
        '        serverName: mine',
        '        transport: stdio',
        "        command: !!js dshHomePath('bin/mine')",
        ''
      ].join('\n')
    )

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ pluginSpec, expectedPluginName }) => {
        expect(expectedPluginName).toBe('fixture-plugin')
        expect(pluginSpec).toBe(`file:${join(catalogRoot, 'plugins', 'fixture-plugin-1.0.0.tgz')}`)
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin', '1.0.0')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    const desired = await readDesired(home)
    expect(desired).toContain('fixture-plugin+1.0.0+seed')
    expect(desired).toContain('user-plugin+2.0.0+market')
    expect(desired).not.toContain('fixture-plugin+0.19.0+market')
    expect(await readFile(join(home, 'skills', 'user-skill', 'SKILL.md'), 'utf8')).toBe('my skill\n')
    const patch = await readFile(join(home, 'cordis.patch.yml'), 'utf8')
    // The catalog's own row is gone — the manager mounts that server now — and
    // the row the user wrote survives with its comment and its expression.
    expect(patch).not.toContain(mcpPatchEntryId('intranet'))
    expect(patch).not.toContain('old-intranet')
    expect(patch).toContain('mcp-mine')
    expect(patch).toContain("!!js dshHomePath('bin/mine')")
    expect(patch).toContain('# a comment the desktop must not eat')
    const rows = parse(patch) as Array<{ insert?: Array<{ id?: string }> }>
    expect(rows.flatMap((row) => row.insert ?? []).map((entry) => entry.id)).toEqual(['mcp-mine'])
    const store = JSON.parse(await readFile(join(home, MCP_MANAGER_STORE_NAME), 'utf8')) as {
      servers: unknown[]
    }
    expect(store.servers).toEqual([
      { name: 'intranet', transport: 'stdio', command: 'node', args: ['intranet.js'], enabled: true }
    ])
  })

  it('drops the home patch layer once the catalog rows that were its only content are gone', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    await writeFile(
      join(home, 'cordis.patch.yml'),
      [
        '# Written by DSH Desktop: the loader patch layer applied to every profile',
        '# after the profile bundle layers and the profile\'s own cordis.patch.yml.',
        '',
        '- insert:',
        `    - id: ${mcpPatchEntryId('intranet')}`,
        "      name: '@deepseek-ai/dsh-mcp-client'",
        '      config:',
        '        serverName: intranet',
        '        transport: stdio',
        '        command: node',
        '        args: [intranet.js]',
        ''
      ].join('\n')
    )

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin', '1.0.0')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    expect(existsSync(join(home, 'cordis.patch.yml'))).toBe(false)
    expect(JSON.parse(await readFile(join(home, MCP_MANAGER_STORE_NAME), 'utf8'))).toMatchObject({
      servers: [{ name: 'intranet' }]
    })
  })

  it('re-applies the catalog when the desktop app version changes', async () => {
    const home = await freshHome()
    const catalogRoot = await fixtureCatalog()
    const manifest = readCatalogManifest(catalogRoot)!
    await writeFile(catalogStampPath(home), catalogFingerprint(manifest, '0.1.0'))
    let installs = 0

    const skipped = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      appVersion: '0.1.0',
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        installs += 1
        return { ok: false, detail: 'should not run' }
      },
      note: silent
    })
    expect(skipped).toBe('skipped')
    expect(installs).toBe(0)

    const applied = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      appVersion: '0.1.1',
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        installs += 1
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      },
      note: silent
    })
    expect(applied).toBe('applied')
    expect(installs).toBe(1)
    expect(await readFile(catalogStampPath(home), 'utf8')).toBe(catalogFingerprint(manifest, '0.1.1'))
  })

  it('applies the seed from prepareGenerationsForLaunch only after initProfile', async () => {
    const home = await mkdtemp(join(tmpdir(), 'dsh-catalog-launch-'))
    homes.push(home)
    const catalogRoot = await fixtureCatalog()

    await prepareGenerationsForLaunch(home, silent, {
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async () => {
        await fakeGeneration(home, 'fixture-plugin+1.0.0+seed', 'fixture-plugin')
        return {
          ok: true,
          generation: {
            id: 'fixture-plugin+1.0.0+seed',
            pluginName: 'fixture-plugin',
            version: '1.0.0',
            directory: join(home, 'profiles', '.generations', 'live', 'fixture-plugin+1.0.0+seed')
          }
        }
      }
    })

    expect(existsSync(join(home, 'profiles', 'web', 'package.json'))).toBe(true)
    expect(existsSync(catalogStampPath(home))).toBe(true)
    expect(existsSync(join(home, 'skills', 'invoice-review', 'SKILL.md'))).toBe(true)
  })

  it('wires first-run seed through the packaged installer-catalog resource', async () => {
    const main = await readFile(join(process.cwd(), 'src', 'main', 'index.ts'), 'utf8')
    expect(main).toContain("desktopResourcePath('installer-catalog')")
    expect(main).toContain('prepareGenerationsForLaunch(dshHome, (line) => runtime.note(line), {')
    expect(main).toContain('appVersion: app.getVersion()')
    expect(main).toContain("hostNodeModulesPath: join(app.getAppPath(), 'node_modules')")
  })

  it('installs catalog file: plugins with offline generation install', async () => {
    const seed = await readFile(join(process.cwd(), 'src', 'main', 'state', 'installer-catalog-seed.ts'), 'utf8')
    expect(seed).toContain('offline: true')
    const installer = await readFile(
      join(process.cwd(), 'packages', 'dsh-desktop-market-installer', 'generations', 'installer.mjs'),
      'utf8'
    )
    expect(installer).toContain('isFilePluginSpec(installSpec)')
    expect(installer).toContain('materializeFilePlugin')
    expect(installer).toContain('auto-install-peers=false')
  })

  it('keeps the core Profile launchable when catalog plugin install cannot reach the registry', async () => {
    const home = await mkdtemp(join(tmpdir(), 'dsh-catalog-offline-'))
    homes.push(home)
    const catalogRoot = await fixtureCatalog()
    const notes: string[] = []

    await expect(
      prepareGenerationsForLaunch(home, (line) => notes.push(line), {
        catalogRoot,
        nodeExecutablePath: 'node',
        pnpmEntryPath: 'pnpm',
        installPlugin: async () => {
          throw new Error(
            'WARN  GET https://registry.npmjs.org/micromark-util-character/-/micromark-util-character-2.1.1.tgz error (ECONNRESET). Will retry in 1 minute. 1 retries left.'
          )
        }
      })
    ).resolves.toBeUndefined()

    expect(existsSync(join(home, 'profiles', 'web', 'package.json'))).toBe(true)
    expect(existsSync(catalogStampPath(home))).toBe(false)
    expect(notes.some((line) => line.includes('seed will retry on a later start'))).toBe(true)
    expect(notes.some((line) => line.includes('registry.npmjs.org/micromark-util-character'))).toBe(
      true
    )
  })

  it('adds an MCP server to the manager store and then updates only that server', () => {
    const entry = {
      name: 'v8std',
      transport: 'streamable-http' as const,
      url: 'https://ai.v8std.ru/mcp'
    }

    const first = mergeMcpServerIntoManagerStore(undefined, entry)
    expect(first.added).toBe(true)
    expect(first.changed).toBe(true)
    expect(first.skipped).toBe(false)
    expect(JSON.parse(first.text)).toEqual({
      version: 1,
      servers: [
        { name: 'v8std', transport: 'streamable-http', url: 'https://ai.v8std.ru/mcp', enabled: true }
      ]
    })

    // Re-seeding an identical catalog is a no-op, not a second server.
    const again = mergeMcpServerIntoManagerStore(first.text, entry)
    expect(again.added).toBe(false)
    expect(again.changed).toBe(false)
    expect(again.text).toBe(first.text)

    // A moved URL rewrites our server in place.
    const moved = mergeMcpServerIntoManagerStore(first.text, {
      ...entry,
      url: 'https://ai.example.test/mcp'
    })
    expect(moved.added).toBe(false)
    expect(moved.changed).toBe(true)
    expect(moved.text).toContain('https://ai.example.test/mcp')
    expect(moved.text).not.toContain('ai.v8std.ru')
    expect(moved.text.match(/v8std/g)).toHaveLength(1)
  })

  it('keeps the manager store in shape: other servers, user switches, unreadable file', () => {
    const store = JSON.stringify({
      version: 1,
      servers: [
        { name: 'rlm', transport: 'streamable-http', url: 'http://127.0.0.1:9330/mcp', enabled: true },
        {
          name: 'v8std',
          transport: 'streamable-http',
          url: 'https://ai.v8std.ru/mcp',
          enabled: false,
          toolCallTimeoutMs: 90000
        }
      ]
    })
    const entry = {
      name: 'v8std',
      transport: 'streamable-http' as const,
      url: 'https://ai.v8std.ru/mcp'
    }

    // Identical delivery: nothing to write.
    expect(mergeMcpServerIntoManagerStore(store, entry).changed).toBe(false)

    // A changed URL is written, but the switch the user flipped and the timeout
    // they raised are theirs and stay.
    const updated = mergeMcpServerIntoManagerStore(store, {
      ...entry,
      url: 'https://ai.example.test/mcp'
    })
    expect(updated.changed).toBe(true)
    const servers = (JSON.parse(updated.text) as { servers: Array<Record<string, unknown>> })
      .servers
    expect(servers).toHaveLength(2)
    expect(servers[0]).toMatchObject({ name: 'rlm', url: 'http://127.0.0.1:9330/mcp' })
    expect(servers[1]).toMatchObject({
      name: 'v8std',
      url: 'https://ai.example.test/mcp',
      enabled: false,
      toolCallTimeoutMs: 90000
    })

    // A store the manager could not read is left exactly as it was.
    const broken = '{ "servers": [ }'
    const untouched = mergeMcpServerIntoManagerStore(broken, entry)
    expect(untouched.skipped).toBe(true)
    expect(untouched.changed).toBe(false)
    expect(untouched.text).toBe(broken)
  })

  it('removes only the catalog rows from a patch layer the user also writes to', () => {
    const text = [
      '# user comment',
      '- insert:',
      `    - id: ${mcpPatchEntryId('v8std')}`,
      "      name: '@deepseek-ai/dsh-mcp-client'",
      '      config:',
      '        serverName: v8std',
      '    - id: mcp-mine',
      '      name: something-else',
      ''
    ].join('\n')

    const cleared = removeMcpRowsFromPatch(text, [mcpPatchEntryId('v8std')])
    expect(cleared.removed).toBe(1)
    expect(cleared.skipped).toBe(false)
    expect(cleared.empty).toBe(false)
    expect(cleared.text).toContain('mcp-mine')
    expect(cleared.text).toContain('# user comment')
    expect(cleared.text).not.toContain('mcp-v8std')

    // A file the desktop cannot parse is not a place to guess.
    const broken = '- insert: [unclosed\n'
    expect(removeMcpRowsFromPatch(broken, ['mcp-v8std'])).toMatchObject({
      text: broken,
      removed: 0,
      skipped: true
    })
  })
})
