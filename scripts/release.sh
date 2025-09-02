#!/usr/bin/env bash
set -euo pipefail

# Release helper for monorepo packages
# Usage:
#   ./scripts/release.sh <package-dir> [patch|minor|major|<version>] [--dry-run] [--yes]
# Examples:
#   ./scripts/release.sh theme patch
#   ./scripts/release.sh theme 1.2.0 --dry-run
# Notes:
# - package-dir is the directory name under ./packages (e.g. theme, ui)
# - This script runs npm version (updates package.json), builds the package, then publishes.
# - By default npm version will not create a git tag (uses --no-git-tag-version).

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <package-dir> [patch|minor|major|<version>] [--dry-run] [--yes]"
  exit 2
fi

PKG_DIR="$1"
BUMP="${2:-patch}"
DRY_RUN=false
ASSUME_YES=false
if [ "${3:-}" = "--dry-run" ] || [ "${2:-}" = "--dry-run" ]; then
  DRY_RUN=true
  # shift bump if dry-run was passed as second arg
  if [ "${2:-}" = "--dry-run" ]; then
    BUMP="patch"
  fi
fi
if [ "${3:-}" = "--yes" ] || [ "${4:-}" = "--yes" ] || [ "${2:-}" = "--yes" ]; then
  ASSUME_YES=true
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PKG_PATH="$ROOT_DIR/packages/$PKG_DIR"

if [ ! -d "$PKG_PATH" ]; then
  echo "Package path not found: $PKG_PATH"
  exit 3
fi

echo "Releasing package in $PKG_PATH"
cd "$PKG_PATH"

# Read current package name and version
PKG_NAME=$(node -e "console.log(require('./package.json').name)")
CUR_VER=$(node -e "console.log(require('./package.json').version)")

# Determine publish access flag (scoped packages need --access public)
PUBLISH_ACCESS=""
if [[ "$PKG_NAME" == @* ]]; then
  PUBLISH_ACCESS="--access public"
fi

if [ "$DRY_RUN" = true ]; then
  echo "DRY RUN: No changes will be published. Running build and npm pack only."
fi

# Bump version (without creating git tag)
if [ "$DRY_RUN" = false ]; then
  echo "Bumping version: $BUMP"
  npm version "$BUMP" --no-git-tag-version
else
  echo "(dry) Would run: npm version $BUMP --no-git-tag-version"
fi

NEW_VER=$(node -e "console.log(require('./package.json').version)")

# Build
if npm run build --silent; then
  echo "Build succeeded for $PKG_NAME@$NEW_VER"
else
  echo "Build failed for $PKG_NAME@$NEW_VER" >&2
  exit 4
fi

# Pack or Publish
if [ "$DRY_RUN" = true ]; then
  echo "Packing package (dry-run)"
  npm pack
  echo "Pack complete: check the generated .tgz"
  exit 0
fi

# Confirm publish
if [ "$ASSUME_YES" = false ]; then
  read -p "Publish $PKG_NAME@$NEW_VER to npm? (y/N) " -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting publish"
    exit 0
  fi
fi

# Publish
echo "Publishing $PKG_NAME@$NEW_VER to npm..."
if [ -n "$PUBLISH_ACCESS" ]; then
  if npm publish $PUBLISH_ACCESS; then
    echo "Published $PKG_NAME@$NEW_VER"
    echo "Done."
  else
    echo "Publish failed." >&2
    exit 5
  fi
else
  if npm publish; then
    echo "Published $PKG_NAME@$NEW_VER"
    echo "Done."
  else
    echo "Publish failed." >&2
    exit 5
  fi
fi
