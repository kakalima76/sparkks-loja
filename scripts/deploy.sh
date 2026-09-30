#!/bin/bash

set -euo pipefail

BASE="/var/www/sparkks"
RELEASES="$BASE/releases"

TIMESTAMP=$(date +%Y%m%d%H%M%S)
RELEASE="$RELEASES/$TIMESTAMP"
TEMP_LINK="$BASE/.current-$TIMESTAMP"

echo "==> Criando release: $TIMESTAMP"

mkdir -p "$RELEASES"
mkdir -p "$RELEASE"

echo "==> Copiando build..."

cp -a dist/. "$RELEASE/"

echo "==> Validando release..."

if [ ! -f "$RELEASE/index.html" ]; then
    echo "ERRO: index.html não encontrado"
    rm -rf "$RELEASE"
    exit 1
fi

echo "==> Ativando release..."

ln -s "$RELEASE" "$TEMP_LINK"
mv -Tf "$TEMP_LINK" "$BASE/current"

echo "==> Limpando releases antigas..."

CURRENT=$(readlink -f "$BASE/current")

find "$RELEASES" \
    -mindepth 1 \
    -maxdepth 1 \
    -type d \
    -print0 |
    while IFS= read -r -d '' DIR; do
        if [ "$(readlink -f "$DIR")" != "$CURRENT" ]; then
            echo "$DIR"
        fi
    done |
    sort -r |
    tail -n +2 |
    xargs -r rm -rf

echo "==> Release publicada: $TIMESTAMP"
echo "==> Deploy concluído."