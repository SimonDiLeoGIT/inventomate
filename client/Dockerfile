FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Build the project
RUN npm run build

# Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Set the command to serve the build files
CMD ["serve", "-s", "dist"]

EXPOSE 5173