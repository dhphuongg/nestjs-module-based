#!/bin/bash

# Pull latest changes
git pull origin main

# Build and restart containers
docker-compose build --no-cache
docker-compose up -d

# Clean up unused images
docker image prune -f
