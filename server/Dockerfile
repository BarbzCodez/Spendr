# Use official Node.js image
FROM node:19.4

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy local code to container
COPY . .

RUN npx prisma generate

# Start the app
CMD npm run build && npm start
