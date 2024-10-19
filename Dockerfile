# Use an official Node.js image from the Docker library
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Set the environment variable for the port
ENV PORT=5000

# Expose the port the app will run on
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "run", "dev" ]
