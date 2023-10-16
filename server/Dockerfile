# Use official Node.js image
FROM node:19.4

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Start the app
CMD ["./entrypoint.sh"]
