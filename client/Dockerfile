# Use official Node.js image
FROM node:19.4

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy local code to container
COPY . .

# Start the app
CMD ["npm", "start"]
