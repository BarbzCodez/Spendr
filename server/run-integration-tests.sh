#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"

# Set test environment variables
export DATABASE_URL="postgresql://test_admin:test_admin@localhost:5433/spendr_test_database"
export NODE_ENV="integration"
export JWT_SECRET="test"

# Start the test database container
docker-compose -f $DIR/docker-compose.test.yml up -d
echo 'Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo 'Test database is ready!'

# Run prisma migrations
npx prisma migrate dev --name init

# Run the integration tests
echo 'Running integration tests...'
npx jest -i $DIR/src/test/integration

# Stop the test database container
docker-compose -f $DIR/docker-compose.test.yml down