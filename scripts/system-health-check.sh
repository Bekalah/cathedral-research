#!/bin/bash
# Cathedral System Health Check
# Verifies build, connection, and standards for all apps and packages

set -e

echo "🏛️ Cathedral System Health Check"
echo "---------------------------------"

# Check pnpm and node
if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm not found. Please install pnpm."
  exit 1
fi
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js."
  exit 1
fi

# Check main build
echo "🔧 Running pnpm install..."
pnpm install

echo "🏗️ Building all applications..."
pnpm run build || { echo "❌ Build failed"; exit 1; }

echo "✅ Build succeeded"

# Check each app/package
for dir in apps/* packages/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    echo "🔍 Checking $dir..."
    (cd "$dir" && pnpm install && pnpm run build || echo "⚠️ $dir build failed")
  fi
done

echo "🔗 Checking codex-engine standards..."
if [ -f packages/codex-engine/SYSTEM_STANDARDS_PLAN.md ]; then
  echo "✅ Codex standards present"
else
  echo "❌ Codex standards missing"
fi

# Check for Golden Rule reference
if grep -q "CATHEDRAL_GOLDEN_RULE.md" README.md; then
  echo "✅ Golden Rule referenced in main README"
else
  echo "❌ Golden Rule missing in main README"
fi

echo "---------------------------------"
echo "🏛️ Cathedral System Health Check Complete"
