FROM node:16-slim
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

EXPOSE 5000

# Start the Node.js application
CMD ["npm", "run", "start:prod"]
