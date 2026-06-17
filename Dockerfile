# Use a lightweight official Node runtime environment
FROM node:18-alpine

# Set the active container working directory frame
WORKDIR /usr/src/app

# Copy dependency definition arrays first to leverage Docker layer caching
COPY package*.json ./

# Install only production-grade packages securely inside the container
RUN npm install --production

# Copy the rest of your source code into the active image container
COPY . .

# Inform Docker that the web process intends to listen to port 3000
EXPOSE 3000

# Executable boot command vector string
CMD ["node", "server.js"]