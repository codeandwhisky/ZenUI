Release helper scripts

Usage

From the repo root run:

# Release package 'theme' with patch bump
./scripts/release.sh theme patch

# Release package 'ui' with specific version (dry-run)
./scripts/release.sh ui 1.2.0 --dry-run

# Force publish without prompt
./scripts/release.sh theme minor --yes

Notes
- The script runs `npm version` (without creating a git tag), runs `npm run build` in the package, then publishes to npm.
- For scoped packages npm publish requires `--access public`; the script sets that automatically for package names starting with `@`.
- For CI usage set NPM_TOKEN in environment and run with `--yes` to skip confirmation.
