FROM node:18-alpine

WORKDIR /app

# Copy package.json
COPY package.json .

RUN npm install

ENV VITE_APP_AUTH0_DOMAIN="dev-xzd1nw16hc11vsj7.us.auth0.com"
ENV VITE_APP_AUTH0_CLIENT_ID="joqKy6suHcPTxhs2CfgWWlTwKsMMSGyQ"
ENV VITE_APP_API_SERVER_URL="http://localhost:8080/"
ENV VITE_APP_AUTH0_AUDIENCE="grupo3SIP2024"

COPY . .

# Build the project
RUN npm run build

# Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Set the command to serve the build files
CMD ["serve", "-s", "dist", "-p", "5173"]

EXPOSE 5173