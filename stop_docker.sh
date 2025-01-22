#!/bin/bash

# Stop and remove containers
echo "Stopping and removing containers..."
docker-compose down

# Remove unused Docker resources
echo "Removing unused Docker resources..."
docker system prune -f

echo "Cleanup complete!"
