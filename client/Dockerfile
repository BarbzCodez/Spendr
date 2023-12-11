# Use official Node.js image
FROM node:19.4

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy local code to container
COPY . .

# Build the app for production
RUN npm run build

# Install 'serve' to serve the build
RUN npm install -g serve

# Serve the production build
CMD ["serve", "-s", "build"]