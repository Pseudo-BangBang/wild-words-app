#!/bin/bash

# Production Docker Script
echo "🚀 Starting Wild Words - Production Mode"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if environment file exists
if [ ! -f ".env" ]; then
    echo "❌ Environment file not found. Please create .env file with production settings."
    echo "   You can copy env.docker as a starting point: cp env.docker .env"
    exit 1
fi

# Validate required environment variables
required_vars=("MYSQL_ROOT_PASSWORD" "MYSQL_PASSWORD" "JWT_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set in .env file"
        exit 1
    fi
done

# Build production images
echo "🔨 Building production images..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start production services
echo "🐳 Starting production services..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🔍 Checking service health..."

# Check MySQL
if docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec mysql mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD} --silent; then
    echo "✅ MySQL is ready"
else
    echo "❌ MySQL is not ready"
fi

# Check Backend
if curl -f http://localhost:4000/health > /dev/null 2>&1; then
    echo "✅ Backend is ready"
else
    echo "❌ Backend is not ready"
fi

# Check Frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not ready"
fi

# Check Nginx
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Nginx is ready"
else
    echo "❌ Nginx is not ready"
fi

echo ""
echo "🎉 Production environment is ready!"
echo ""
echo "🌐 Application: http://localhost"
echo "🔧 API: http://localhost/graphql"
echo "💊 Health Check: http://localhost/health"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f"
echo "  Stop services: docker-compose -f docker-compose.yml -f docker-compose.prod.yml down"
echo "  Restart services: docker-compose -f docker-compose.yml -f docker-compose.prod.yml restart"
echo "  Scale backend: docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --scale backend=3"
echo ""
