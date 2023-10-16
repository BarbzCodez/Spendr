#!/bin/sh

# Wait for the PostgreSQL database to be ready
./wait-for-it.sh db:5432 --timeout=30

# Run Prisma migrations to update the database schema
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Check if the migrations ran successfully
if [ $? -eq 0 ]; then
    echo "Migrations ran successfully. Starting the server..."
    
    # Build and start the Express server
    npm run build && npm start
else
    echo "Error running migrations."
    exit 1
fi
