#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Running migrations..."
pnpm db:migrate

echo "Starting application..."
exec "$@" 