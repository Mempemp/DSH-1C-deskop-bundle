import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  renderInstallerLogo,
  renderInstallerSidebar,
  writeBmpFile
} from './lib/write-bmp.mjs'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const buildDirectory = path.join(projectRoot, 'build')

await mkdir(buildDirectory, { recursive: true })

const sidebar = path.join(buildDirectory, 'installer-sidebar.bmp')
const logo = path.join(buildDirectory, 'installer-logo.bmp')
writeBmpFile(sidebar, renderInstallerSidebar())
writeBmpFile(logo, renderInstallerLogo())

console.log(`Wrote ${path.relative(projectRoot, sidebar)} and ${path.relative(projectRoot, logo)}.`)
