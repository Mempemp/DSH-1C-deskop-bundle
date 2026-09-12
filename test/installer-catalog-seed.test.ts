import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
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
  mergeMcpServerIntoPatch,
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
    await mkdir(join(root, 'mcp'), { recursive: true })
    await writeFile(join(root, 'plugins', 'fixture-plugin-1.0.0.tgz'), 'tarball')
    await writeFile(
      join(root, 'skills', 'invoice-review', 'SKILL.md'),
      '---\nname: invoice-review\n---\nReview invoices.\n'
    )
    await writeFile(join(root, 'rules', 'AGENTS.md'), '# seeded rules\n')
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
    expect(await readFile(join(home, 'cordis.patch.yml'), 'utf8')).toContain('intranet')
    expect(await readFile(join(home, 'profiles', 'web', 'cordis.patch.yml'), 'utf8')).toContain(
      '@deepseek-ai/dsh-mcp-client'
    )
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

  it('installs an explicit dshmarket catalog plugin instead of skipping the host package', async () => {
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
    const installs: string[] = []

    const outcome = await applyInstallerCatalogSeed({
      dshHome: home,
      catalogRoot,
      nodeExecutablePath: 'node',
      pnpmEntryPath: 'pnpm',
      installPlugin: async ({ pluginSpec, expectedPluginName }) => {
        installs.push(`${expectedPluginName}:${pluginSpec}`)
        await fakeGeneration(home, 'dshmarket+1.40.0+seed', 'dshmarket')
        return {
          ok: true,
          generation: {
            id: 'dshmarket+1.40.0+seed',
            pluginName: 'dshmarket',
            version: '1.40.0',
            directory: join(home, 'profiles', '.generations', 'live', 'dshmarket+1.40.0+seed')
          }
        }
      },
      note: silent
    })

    expect(outcome).toBe('applied')
    expect(installs).toEqual([`dshmarket:file:${join(catalogRoot, 'plugins', 'dshmarket-1.40.0.tgz')}`])
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
      mergeMcpServerIntoPatch(
        mergeMcpServerIntoPatch('[]\n', 'intranet', {
          transport: 'stdio',
          command: 'old-intranet'
        }).text,
        'user-mcp',
        { transport: 'stdio', command: 'user-server' }
      ).text
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
    expect(patch).toContain('intranet')
    expect(patch).toContain('node')
    expect(patch).not.toContain('old-intranet')
    expect(patch).toContain('user-mcp')
    expect(patch).toContain('user-server')
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

  it('merges an MCP server without replacing an existing one', () => {
    const first = mergeMcpServerIntoPatch('[]\n', 'intranet', {
      transport: 'stdio',
      command: 'node'
    })
    expect(first.added).toBe(true)
    const second = mergeMcpServerIntoPatch(first.text, 'intranet', {
      transport: 'stdio',
      command: 'other'
    })
    expect(second.added).toBe(false)
    expect(second.changed).toBe(false)
    expect(second.text).toBe(first.text)
    const replaced = mergeMcpServerIntoPatch(first.text, 'intranet', {
      transport: 'stdio',
      command: 'other'
    }, { replace: true })
    expect(replaced.changed).toBe(true)
    expect(replaced.text).toContain('other')
  })
})
