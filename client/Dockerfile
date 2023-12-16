# Use official Node.js image
FROM node:19.4

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy local code to container
COPY . .

# Set environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_EDENAI_API_KEY

RUN echo $REACT_APP_API_URL
RUN echo $REACT_APP_EDENAI_API_KEY

# Build the app for production
RUN npm run build

# Install 'serve' to serve the build
RUN npm install -g --ignore-scripts serve

# Serve the production build
CMD ["serve", "-s", "build"]