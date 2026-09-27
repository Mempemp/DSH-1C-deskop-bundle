import { join } from 'node:path'

export function runtimePackageRoot(appPath: string, isPackaged: boolean): string {
  // External Node processes and OS executable lookup require physical paths.
  return isPackaged && appPath.endsWith('.asar') ? `${appPath}.unpacked` : appPath
}

/**
 * The `node_modules` tree the install carries, as physical paths.
 *
 * A catalog install copies a plugin's production dependencies out of this tree
 * with `fs.cp`, which walks real directories: pointed inside `app.asar`, that
 * walk fails with `ENOENT ... not found in <archive>` and the seed aborts after
 * the first plugin that needs a host dependency.
 */
export function hostNodeModulesRoot(appPath: string, isPackaged: boolean): string {
  return join(runtimePackageRoot(appPath, isPackaged), 'node_modules')
}
