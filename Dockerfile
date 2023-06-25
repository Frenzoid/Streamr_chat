FROM node:18.3.0-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "deploy-docker" ]