#!/bin/sh
set -euo pipefail

APP_DIR="/app"
SCRIPTS_DIR="${APP_DIR}/scripts"

echo "==> Entrypoint"

# Load .env if exists
if [ -f "${APP_DIR}/.env" ]; then
  echo "==> Load environment variables from .env"
  set -a
  # shellcheck disable=SC1090
  . "${APP_DIR}/.env"
  set +a
fi

# Add project root to PYTHONPATH
export PYTHONPATH="${APP_DIR}:${PYTHONPATH:-}"

# ---- Run migrations ----
if [ "${RUN_MIGRATE:-false}" = "true" ]; then
  echo "----> Run migrations"
  python manage.py migrate --noinput
fi

# ---- Load mock data ----
if [ "${LOAD_MOCK_DATA:-false}" = "true" ]; then
  echo "----> Load mock data"
  python "${SCRIPTS_DIR}/load_mock_data.py"
fi

# ---- Create admin user using manage.py createsuperuser ----
if [ "${CREATE_ADMIN:-false}" = "true" ]; then
  echo "----> Creating/updating admin user"

  # Export environment variables to be used by createsuperuser
  export DJANGO_SUPERUSER_USERNAME="admin"
  export DJANGO_SUPERUSER_EMAIL="admin@example.com"

  # Generate a random password
  export DJANGO_SUPERUSER_PASSWORD=$(
    python -c 'import secrets; print(secrets.token_urlsafe(16))'
  )

  # Run createsuperuser with no input
  python manage.py createsuperuser --noinput || true

  echo "----> Admin credentials:"
  echo "       username: ${DJANGO_SUPERUSER_USERNAME}"
  echo "       password: ${DJANGO_SUPERUSER_PASSWORD}"
fi

# ---- Skip server start if requested ----
if [ "${SKIP_SERVER:-false}" = "true" ]; then
  echo "==> SKIP_SERVER=true — exit after setup tasks"
  exit 0
fi

# ---- Start main process ----
echo "==> Execute command: $@"
exec "$@"
