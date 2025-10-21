#!/bin/bash
set -euo pipefail

usage(){
  cat <<USAGE
Usage: $0 [--target <site>] [--message <text>] [--preview]
  --target <site>   Firebase Hosting site to deploy (defaults per branch)
  --message <text>  Custom banner message to inject before </body>
  --preview         Build files only, skip firebase deploy
USAGE
  exit 1
}

TARGET_OVERRIDE=""
BANNER_OVERRIDE=""
PREVIEW=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET_OVERRIDE="${2:-}" || usage
      shift 2
      ;;
    --message)
      BANNER_OVERRIDE="${2:-}"
      shift 2
      ;;
    --preview)
      PREVIEW=true
      shift
      ;;
    --help|-h)
      usage
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      ;;
  esac
done

branch="$(git rev-parse --abbrev-ref HEAD)"
public_dir="dist"
commit_hash="$(git rev-parse --short HEAD 2>/dev/null || echo "nogit")"
version_tag="${commit_hash}-$(date -u +%Y%m%d%H%M%S)"

mkdir -p "$public_dir"

declare FIREBASE_SITE=""
declare BADGE_HTML=""

echo "Current branch: $branch"
case "$branch" in
  main)
    FIREBASE_SITE="idswift"
    BADGE_HTML=""
    ;;
  develop)
    FIREBASE_SITE="idswift-develop"
    BADGE_HTML='<div style="position:fixed;top:0;left:0;width:100%;background:#f2c94c;padding:8px;text-align:center;font-family:Montserrat,sans-serif;font-weight:600;letter-spacing:.4px;z-index:999">DEV ENVIRONMENT</div>'
    ;;
  *)
    FIREBASE_SITE="idswift-feature"
    BADGE_HTML="<div style=\"position:fixed;top:0;left:0;width:100%;background:#c4473d;color:#fff;padding:8px;text-align:center;font-family:Montserrat,sans-serif;font-weight:600;letter-spacing:.4px;z-index:999\">BRANCH ${branch}</div>"
    ;;
esac

if [[ -n "$TARGET_OVERRIDE" ]]; then
  FIREBASE_SITE="$TARGET_OVERRIDE"
fi

if [[ -n "$BANNER_OVERRIDE" ]]; then
  BADGE_HTML="$BANNER_OVERRIDE"
fi

echo "Firebase site: $FIREBASE_SITE"
echo "Preview only: $PREVIEW"

copy_site(){
  rm -rf "$public_dir"/*
  cp index.html "$public_dir/index.html"
  cp -r assets "$public_dir/"
  cp services.html "$public_dir/services.html"
  cp clients.html "$public_dir/clients.html"
  cp contact.html "$public_dir/contact.html"
  cp privacy.html "$public_dir/privacy.html"
}

inject_badge(){
  local file="$1"
  if [[ -z "$BADGE_HTML" ]]; then
    return
  fi
  tmp="${file}.tmp"
  awk -v banner="$BADGE_HTML" '
    BEGIN{added=0}
    /<\/body>/ {
      if(!added){print banner;added=1}
    }
    {print}
    END{
      if(!added){print banner}
    }
  ' "$file" > "$tmp"
  mv "$tmp" "$file"
}

ensure_python(){
  if ! command -v python3 >/dev/null 2>&1; then
    echo "python3 is required to run cache busting tasks" >&2
    exit 1
  fi
}

cache_bust_assets(){
  local file="$1"
  ensure_python
  python3 - "$file" "$version_tag" <<'PY'
import pathlib
import re
import sys

html_path = pathlib.Path(sys.argv[1])
version = sys.argv[2]
content = html_path.read_text(encoding="utf-8")

assets_pattern = re.compile(r'=(["\'])(\.?/)?assets/([^"\']+?)(?:\?v=[^"\']*)?\1')
favicon_pattern = re.compile(r'=(["\'])(favicon\.ico)(?:\?v=[^"\']*)?\1')

def replace_assets(match: re.Match) -> str:
    quote = match.group(1)
    prefix = match.group(2) or ""
    path = match.group(3)
    return f'={quote}{prefix}assets/{path}?v={version}{quote}'

def replace_favicon(match: re.Match) -> str:
    quote = match.group(1)
    path = match.group(2)
    return f'={quote}{path}?v={version}{quote}'

content = assets_pattern.sub(replace_assets, content)
content = favicon_pattern.sub(replace_favicon, content)

html_path.write_text(content, encoding="utf-8")
PY
}

copy_site

echo "Cache buster token: $version_tag"

for page in "$public_dir"/*.html; do
  inject_badge "$page"
  cache_bust_assets "$page"
  if command -v sha256sum >/dev/null 2>&1; then
    echo "Hash for ${page}:"
    sha256sum "$page"
  fi
  echo

done

if [[ "$PREVIEW" == "true" ]]; then
  echo "Preview mode enabled - skipping firebase deploy"
  exit 0
fi

if ! command -v firebase >/dev/null 2>&1; then
  echo "Firebase CLI not found. Install with 'npm install -g firebase-tools'" >&2
  exit 1
fi

echo "firebase deploy --only hosting:${FIREBASE_SITE}"
firebase deploy --only hosting:"${FIREBASE_SITE}"
