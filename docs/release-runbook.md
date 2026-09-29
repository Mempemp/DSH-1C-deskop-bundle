# Desktop release runbook

## Manual workflow dispatch

The `Release desktop installers` workflow accepts a `mode` on `workflow_dispatch`. `target` is always honored: `macos` does not start Windows jobs, and `windows` does not start macOS jobs.

- `development` (default): unsigned Dev packages, no signing, no publish.
- `signed`: production-identity signed packages only. Fill `signed_version` with a non-`v` semver such as `0.9.2-test.1`. Artifacts stay on the workflow run; GitHub Release, ModelScope, rollout, and Feishu do not run. These builds use the production app id and update feed, so an installed copy may later see the live `latest` channel.
- `prerelease`: production-identity signed packages. Fill `prerelease_tag` with a non-`v` semver such as `2.1.0-rc.1`. Publish to GitHub `--prerelease` and ModelScope `releases/prerelease/` only when `target` is `all`. A single-platform prerelease signs that platform and skips publish.

Official releases are still created by pushing a `v*` tag, not by filling the dispatch form. Do not put `v0.9.1` in `prerelease_tag` or `signed_version`.

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
3. Build the version index and publish the release with every file the updater reads:
   ```
   node scripts/build-bundle-version-index.mjs dist/versions.json
   gh release create <tag> --title "DSH Desktop v<tag>" --latest --notes-file - \
     dist/dsh-desktop-windows-x64-setup.exe \
     dist/dsh-desktop-windows-x64-setup.exe.blockmap \
     dist/latest.yml \
     dist/versions.json
   ```
   The installer alone is not enough: an installed build learns about a release from `latest.yml`,
   so a release published without it is read as "no update" by every machine that checks before it
   is repaired. The blockmap turns the next update into a differential download instead of a
   415 MB one, and `versions.json` fills the in-app version list (a release without it leaves the
   list empty, which is honest but useless). The tag is the version — it has no `v` prefix, and the
   feed builds each archive URL from it. Publish the newest version last or not at all: GitHub's
   "latest" release is the most recent by date, not by number, and a lower version published after
   a higher one would not be offered to anyone.
4. Verify the published feed: `node scripts/verify-update-feed.mjs <tag> <previous-version>`.

**Reading the gate's result.** The `<previous-version> blockmap` line is about the machine that
already runs the previous release: the updater fetches that version's blockmap to download a delta,
so a red line here means a full 415 MB download — not a broken release. Releases published before the
feed existed (0.10.0-2 and older) carry neither `latest.yml` nor a blockmap, so the first release
that follows them reports this line red once. From 0.10.0-3 on, every release carries its own
blockmap and the line stays green. Every other line has to be green before the release is announced.
