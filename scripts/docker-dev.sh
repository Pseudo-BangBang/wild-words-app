#!/bin/bash

# Development Docker Script
echo "🚀 Starting Wild Words - Development Mode"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp env.docker .env
    echo "✅ Environment file created. Please update .env with your settings."
fi

# Start development services
echo "🐳 Starting Docker services..."
docker-compose --profile dev --profile capacitor up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."

# Function to check if a service is ready
check_service() {
    local service_name=$1
    local check_command=$2
    local max_attempts=30
    local attempt=1
    
    echo "🔍 Checking $service_name..."
    
    while [ $attempt -le $max_attempts ]; do
        if eval "$check_command" > /dev/null 2>&1; then
            echo "✅ $service_name is ready"
            return 0
        else
            echo "⏳ Waiting for $service_name to be ready..."
            sleep 2
            attempt=$((attempt + 1))
        fi
    done
    
    echo "❌ $service_name failed to start after $max_attempts attempts"
    return 1
}

# Check MySQL
check_service "MySQL" "docker-compose exec mysql mysqladmin ping -h localhost -u root -prootpassword --silent"

# Check Backend
check_service "Backend" "curl -f http://localhost:4000/health"

# Check Frontend
check_service "Frontend" "curl -f http://localhost:3000"

# If any service failed, exit
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Some services failed to start. Please check the logs:"
    echo "   docker-compose logs"
    echo ""
    echo "🛑 Exiting..."
    exit 1
fi

echo ""
echo "🎉 Development environment is ready!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "📱 Mobile Development: Use 'pnpm run cap:run:android' or 'pnpm run cap:run:ios' for mobile development"
echo "🔧 Backend API: http://localhost:4000/graphql"
echo "🗄️  phpMyAdmin: http://localhost:8080"
echo "💊 Health Check: http://localhost:4000/health"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart services: docker-compose restart"
echo "  Enter frontend container: docker-compose exec frontend sh"
echo "  Sync Capacitor: docker-compose exec frontend pnpm run cap:sync"
echo "  Open Android Studio: docker-compose exec frontend pnpm run cap:android"
echo "  Open Xcode: docker-compose exec frontend pnpm run cap:ios"
echo ""
echo "📊 Starting live logs..."
echo "Press Ctrl+C to stop viewing logs (services will continue running)"
echo ""
docker-compose logs -f
