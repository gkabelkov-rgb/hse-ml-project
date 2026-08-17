#!/usr/bin/env bash
# Заливка прототипов на VPS одной командой (запускать НА СВОЁМ компьютере).
#
#   ./deploy.sh root@203.0.113.10
#   ./deploy.sh root@203.0.113.10 /var/www/wb-proto
#
# Первый аргумент — пользователь и адрес сервера, второй (необязательно) —
# папка на сервере, по умолчанию /var/www/wb-proto.

set -euo pipefail

SERVER="${1:-}"
TARGET="${2:-/var/www/wb-proto}"

if [ -z "$SERVER" ]; then
  echo "Укажите сервер: ./deploy.sh root@IP-адрес [папка]" >&2
  exit 1
fi

HERE="$(cd "$(dirname "$0")" && pwd)"

echo "→ Создаю папку $TARGET на сервере"
ssh "$SERVER" "mkdir -p '$TARGET'"

echo "→ Копирую файлы"
if command -v rsync >/dev/null 2>&1; then
  rsync -az --delete --exclude '.DS_Store' "$HERE/www/" "$SERVER:$TARGET/"
else
  scp -r "$HERE/www/." "$SERVER:$TARGET/"
fi

echo "→ Выставляю права"
ssh "$SERVER" "chown -R www-data:www-data '$TARGET' 2>/dev/null || true; chmod -R a+rX '$TARGET'"

echo "✓ Готово. Проверьте сайт в браузере."
