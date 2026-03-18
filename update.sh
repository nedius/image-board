#!/bin/bash

set -e

echo "🔍 Checking for repository updates..."
git fetch

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✔ No updates available."
elif [ "$LOCAL" = "$BASE" ]; then
    echo "⬇ Updates found — pulling..."
    git pull
elif [ "$REMOTE" = "$BASE" ]; then
    echo "⚠ Local branch is ahead of remote. Push or resolve manually."
    exit 1
else
    echo "❗ Branches have diverged — manual merge required."
    exit 1
fi

echo "📦 Checking if npm install is needed..."
if [ ! -d "node_modules" ] || [ package.json -nt node_modules ]; then
    echo "📥 Installing npm dependencies..."
    npm install
else
    echo "✔ Dependencies already installed."
fi

echo "🏗 Building project..."
npm run build

echo "🎉 Done!"
