#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Stop and remove existing containers
echo "Stopping and removing existing containers..."
docker-compose down

# Build and start containers
echo "Building and starting containers..."
docker-compose up --build

# Check if the application is running
if [ $? -eq 0 ]; then
    echo "Application is running at http://localhost:5000"
else
    echo "Failed to start the application."
fi
