# # Use the official Node.js image
# FROM node:latest

# # Set the working directory
# WORKDIR /user-flask

# # Copy package.json and package-lock.json (if applicable)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app
# COPY . .

# # Expose a port (if your app uses one)
# EXPOSE 3000

# # Command to run your app
# CMD ["npm", "start"]

# Use an official Node runtime as base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all local files to the container
COPY . .

# Build the app
RUN npm run build

# Expose a port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
