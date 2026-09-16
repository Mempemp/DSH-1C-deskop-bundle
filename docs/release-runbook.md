# Desktop release runbook

## Local Windows UKey signing runner

Windows packaging and signing run as separate jobs. The GitHub-hosted Windows runner builds an unsigned NSIS installer and uploads a short-lived workflow artifact. A local macOS ARM64 runner downloads it, signs the installer with Jsign and the SafeNet UKey, regenerates the blockmap and `latest.yml`, and uploads the signed release set. The GitHub Release job cannot start unless signing succeeds.

Prepare the local runner once:

1. Register it with the `self-hosted`, `macOS`, and `ARM64` labels.
2. Install SafeNet Authentication Client and confirm `/usr/local/lib/libeTPkcs11.dylib` is readable.
3. Connect the UKey before pushing a release tag.
4. In the GitHub repository, open **Settings → Secrets and variables → Actions** and create a repository secret named `DESKTOP_WINDOWS_SIGNING_PIN` containing the UKey PIN. For stronger release controls, use an environment secret and add the matching `environment` to the `sign-windows` job.
5. Restrict release tag creation and workflow changes to trusted maintainers. A self-hosted runner can access any secret injected into its job.

The workflow pins Jsign 7.5 by SHA-256 and uses the SafeNet `ETOKEN` store, SHA-256 signing, and a DigiCert RFC 3161 timestamp. GitHub injects the PIN only into the signing step. The step copies it to a mode-`600` temporary file, removes it from the shell environment, and deletes the file when the step exits. The workflow never prints the PIN or passes it as a command-line argument.

After a tag release succeeds, verify that the Windows installer shows the expected publisher and a valid RFC 3161 timestamp in its Digital Signatures properties. Never reuse a published tag; fix the issue and release a new version.

## This repository: manual Windows releases

This fork has no signing runner and no Apple credentials, so the tag pipeline above cannot
publish anything here yet. Releases are published by hand:

1. Stamp the version: `npm version <version> --no-git-tag-version`, set the same value in
   `installer-flavor.yml`, and run `npm run package:win` so the catalog manifest follows.
2. Commit, push `main`, then tag that commit **without the `v` prefix** (`0.9.0-1`, not
   `v0.9.0-1`). The `v*` trigger above would otherwise start the upstream pipeline, whose
   macOS jobs and UKey signing step are not available here.
3. `gh release create <tag> --title "DSH Desktop v<tag>" --latest --notes-file - dist/dsh-desktop-windows-x64-setup.exe`

Attach the installer alone. The `.blockmap` and `latest.yml` belong to the updater set, and the
bundled app carries a channel of its own that points at no feed — a differential update has
nothing to read until this product has an update feed of its own.
