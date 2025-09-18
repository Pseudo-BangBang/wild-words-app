#!/bin/bash

# Docker Cleanup Script
echo "🧹 Cleaning up Docker resources for Wild Words"

# Function to confirm action
confirm() {
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Operation cancelled"
        exit 1
    fi
}

# Function to stop all compose files
stop_all_compose() {
    echo "🛑 Stopping all Docker Compose services..."
    docker-compose -f docker-compose.yml down --remove-orphans 2>/dev/null || true
    docker-compose -f docker-compose.yml -f docker-compose.override.yml down --remove-orphans 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
}

# Function to remove all project-specific resources
remove_project_resources() {
    echo "🗑️  Removing project-specific resources..."
    
    # Remove containers
    docker ps -a --filter "name=wildwords" --format "table {{.Names}}" | tail -n +2 | xargs -r docker rm -f 2>/dev/null || true
    
    # Remove volumes
    docker volume ls --filter "name=wildwords" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
    docker volume ls --filter "name=mysql_data" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
    docker volume ls --filter "name=mysql_prod_data" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
    
    # Remove networks
    docker network ls --filter "name=wildwords" --format "{{.Name}}" | xargs -r docker network rm 2>/dev/null || true
    
    # Remove images
    docker images --filter "reference=*wildwords*" --format "{{.Repository}}:{{.Tag}}" | xargs -r docker rmi -f 2>/dev/null || true
}

echo "This script will clean up Docker resources. Choose an option:"
echo "1) Stop and remove containers only"
echo "2) Stop, remove containers and networks"
echo "3) Stop, remove containers, networks and volumes (WARNING: deletes all data)"
echo "4) Remove everything including images (WARNING: deletes all data and images)"
echo "5) Reset database only"
echo "6) View current resources"
echo "7) Complete cleanup (recommended for full reset)"

read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        echo "🛑 Stopping and removing containers..."
        stop_all_compose
        echo "✅ Containers stopped and removed"
        ;;
    2)
        echo "🛑 Stopping and removing containers and networks..."
        stop_all_compose
        docker network ls --filter "name=wildwords" --format "{{.Name}}" | xargs -r docker network rm 2>/dev/null || true
        echo "✅ Containers and networks removed"
        ;;
    3)
        confirm
        echo "🛑 Stopping and removing containers, networks, and volumes..."
        stop_all_compose
        docker volume ls --filter "name=mysql_data" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
        docker volume ls --filter "name=mysql_prod_data" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
        docker network ls --filter "name=wildwords" --format "{{.Name}}" | xargs -r docker network rm 2>/dev/null || true
        echo "✅ Containers, networks, and volumes removed"
        echo "⚠️  All database data has been deleted"
        ;;
    4)
        confirm
        echo "🛑 Removing everything including images..."
        stop_all_compose
        remove_project_resources
        echo "✅ Everything removed including images"
        echo "⚠️  All data and images have been deleted"
        ;;
    5)
        echo "🔄 Resetting database..."
        # Try to reset database in any running container
        docker ps --filter "name=wildwords" --format "{{.Names}}" | grep backend | head -1 | xargs -I {} docker exec {} pnpm run db:reset 2>/dev/null || echo "⚠️  No running backend container found"
        echo "✅ Database reset complete"
        ;;
    6)
        echo "📊 Current Docker resources:"
        echo ""
        echo "🐳 Containers:"
        docker ps -a --filter "name=wildwords" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        echo "💾 Volumes:"
        docker volume ls --filter "name=wildwords" --format "table {{.Name}}\t{{.Driver}}"
        docker volume ls --filter "name=mysql_data" --format "table {{.Name}}\t{{.Driver}}"
        docker volume ls --filter "name=mysql_prod_data" --format "table {{.Name}}\t{{.Driver}}"
        echo ""
        echo "🌐 Networks:"
        docker network ls --filter "name=wildwords" --format "table {{.Name}}\t{{.Driver}}\t{{.Scope}}"
        echo ""
        echo "🖼️  Images:"
        docker images --filter "reference=*wildwords*" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
        ;;
    7)
        confirm
        echo "🧹 Performing complete cleanup..."
        stop_all_compose
        remove_project_resources
        echo "✅ Complete cleanup finished"
        echo "⚠️  All project data, containers, images, volumes, and networks have been removed"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1-7."
        exit 1
        ;;
esac

echo ""
echo "🎉 Cleanup complete!"
