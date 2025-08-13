#!/usr/bin/env bash
set -euo pipefail

echo "🔎 Looking for lexicon files in lexicons/v1/ ..."
shopt -s nullglob
files=(lexicons/v1/*.json)
shopt -u nullglob

if (( ${#files[@]} == 0 )); then
  echo "⚠️  No JSON files found in lexicons/v1/. Did you run this from the repo root?"
  exit 1
fi

echo "📄 Files to validate:"
for f in "${files[@]}"; do
  echo "  - $f"
done
echo

# Use npx so we don't need a global install
echo "🧪 Running jsonlint via npx ..."
npx --yes jsonlint -q "${files[@]}"

echo
echo "✅ All lexicons are valid JSON!"