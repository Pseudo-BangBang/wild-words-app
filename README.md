# Wild Words Demo

A full-stack demo application showcasing modern web and mobile development practices. Features a React frontend with Tailwind CSS, Apollo GraphQL backend, and cross-platform mobile support with Capacitor.

## 🚀 Features

### Backend (Apollo Server + Knex + TypeScript)

- **GraphQL API** with Apollo Server 4
- **JWT Authentication** with secure token management
- **Database Management** with Knex.js and MySQL
- **Type Safety** with TypeScript throughout
- **Database Migrations** and seeders
- **Error Handling** with custom error classes
- **Repository Pattern** for data access
- **Input Validation** and sanitization
- **CORS Configuration** for cross-origin requests

### Frontend (React + Tailwind CSS + Apollo Client)

- **Modern React 18** with hooks and functional components
- **Tailwind CSS v4** with custom design system
- **Apollo Client** for GraphQL integration
- **TypeScript** for type safety
- **Responsive Design** with mobile-first approach
- **Authentication System** with login/register forms
- **Error Boundaries** for graceful error handling
- **Loading States** and user feedback
- **Custom Hooks** for data management
- **Parallax Effects** and smooth animations

### Mobile (Capacitor + iOS/Android)

- **Cross-platform** iOS and Android support
- **Native Performance** with Capacitor
- **Responsive Mobile UI** optimized for touch
- **Offline Capability** with local storage

## 🏗️ Architecture

```
wild-words-app/
├── server/                  # Apollo Server backend
│   ├── src/
│   │   ├── database/        # Database layer
│   │   │   ├── migrations/  # Database migrations
│   │   │   ├── seeds/       # Database seeders
│   │   │   └── repositories/ # Data access layer
│   │   ├── schema/          # GraphQL schema
│   │   ├── middleware/      # Authentication middleware
│   │   ├── resolvers/       # GraphQL resolvers
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── dist/                # Compiled JavaScript
│   ├── Dockerfile           # Production Docker image
│   ├── Dockerfile.dev       # Development Docker image
│   ├── knexfile.js          # Database configuration
│   ├── package.json
│   └── tsconfig.json
├── client/                  # React frontend + Mobile
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── graphql/         # GraphQL queries/mutations
│   │   └── types/           # TypeScript types
│   ├── ios/                 # iOS native project
│   ├── android/             # Android native project
│   ├── public/              # Static assets
│   │   └── .well-known/     # Deep link association files
│   ├── dist/                # Built web assets
│   ├── capacitor.config.ts  # Capacitor configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── vite.config.ts       # Vite configuration
│   ├── vite-env.d.ts        # Vite TypeScript definitions
│   ├── Dockerfile           # Production Docker image
│   ├── Dockerfile.capacitor # Capacitor Docker image
│   ├── Dockerfile.dev       # Development Docker image
│   ├── nginx.conf           # Nginx configuration
│   ├── package.json
│   └── tsconfig.json
├── docker/                  # Docker configurations
│   ├── mysql/               # MySQL configuration
│   └── nginx/               # Nginx configuration
├── scripts/                 # Build and deployment scripts
│   ├── docker-dev.sh        # Development Docker script
│   ├── docker-prod.sh       # Production Docker script
│   └── docker-clean.sh      # Docker cleanup script
├── docker-compose.yml       # Main Docker Compose
├── docker-compose.override.yml # Development overrides
├── docker-compose.prod.yml  # Production configuration
├── env.example              # Environment variables template
└── package.json             # Root package.json
```

## 📋 Prerequisites

### For Web Development

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **pnpm** (recommended) or **npm**

### For Mobile Development

- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)
- **Java Development Kit (JDK)** (for Android)

> **Note**: This project uses pnpm for package management. Install pnpm globally with:
>
> ```bash
> npm install -g pnpm
> ```
>
> Or visit [pnpm.io](https://pnpm.io/installation) for other installation methods.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20.x)
- **pnpm** package manager
- **Docker** (for containerized development)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

### Option 1: Docker Development (Recommended)

```bash
git clone <repository-url>
cd wild-words-app

# Copy environment configuration
cp env.example .env

# Start development environment with Docker
pnpm run dev:up

# Stop and clean up Docker resources
pnpm run dev:down
```

### Option 2: Local Development

```bash
git clone <repository-url>
cd wild-words-app

# Install dependencies
pnpm run install:all

# Copy environment configuration
cp env.example .env
```

### Environment Configuration

1. **Root Environment File** (`.env`):

```bash
# Copy the example environment file
cp env.example .env
```

2. **For iOS Simulator Testing**, update `.env`:

```env
# Use your local machine's IP address for iOS simulator
VITE_API_URL=http://192.168.1.100:4000/graphql
```

> **💡 Finding Your IP Address:**
>
> - **macOS/Linux**: `ifconfig | grep "inet " | grep -v 127.0.0.1`
> - **Windows**: `ipconfig | findstr "IPv4"`

> **📝 Note**: The project uses a single `.env` file at the root level. Vite automatically loads `VITE_*` variables for the frontend, while the backend uses standard `process.env` variables.

### Database Setup (Local Development)

1. Create a MySQL database:

```sql
CREATE DATABASE wildwords_app;
```

2. Update `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=wildwords_app
```

3. Run migrations and seed data:

```bash
pnpm run db:migrate
pnpm run db:seed
```

### Start Development Servers

```bash
# Start both backend and frontend
pnpm run dev

# Or start them separately
pnpm run dev:backend   # Server on http://localhost:4000
pnpm run dev:frontend  # Client on http://localhost:3000
```

## 📱 Mobile Development

### iOS Development

```bash
# 1. Start your backend server
pnpm run dev:backend

# 2. Update VITE_API_URL in .env with your local IP
# VITE_API_URL=http://192.168.1.100:4000/graphql

# 3. Build and sync for iOS
pnpm run cap:build

# 4. Run on iOS simulator
pnpm run cap:run:ios
```

### Android Development

```bash
# 1. Build frontend and sync to native platforms
pnpm run cap:build

# 2. Open in Android Studio (optional - for advanced configuration)
pnpm run cap:android

# 3. Run on Android device/emulator
pnpm run cap:run:android
```

### Mobile Development Notes

- **iOS**: Requires Xcode and iOS Simulator
- **Android**: Requires Android Studio and Android SDK
- **Development Server**: Make sure your backend server is running on `http://localhost:4000`
- **Network Access**:
  - iOS simulator can access `localhost` for basic testing
  - For full testing (including deep links), use your local machine's IP address
- **Deep Link Testing**: Use the Deep Link Demo page in the app to test deep linking functionality

## 🐳 Docker Setup

This project includes Docker support for both development and production environments.

### Quick Docker Commands

```bash
# Development (includes phpMyAdmin)
./scripts/docker-dev.sh

# Production
./scripts/docker-prod.sh

# Cleanup
./scripts/docker-clean.sh
```

### Docker Services

- **Frontend**: React app with Vite (port 3000)
- **Backend**: Apollo Server GraphQL API (port 4000)
- **MySQL**: Database with automatic migrations and seeding (port 3306)
- **phpMyAdmin**: Database management (port 8080, development only)
- **Nginx**: Reverse proxy (production only)

### Docker Features

- ✅ **Automatic database setup** with migrations and seed data
- ✅ **Hot reload** for development
- ✅ **Health checks** for all services
- ✅ **Volume persistence** for database data
- ✅ **Environment variable** configuration
- ✅ **Multi-stage builds** for optimized images

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Posts Table

```sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔧 Available Scripts

### Root Level

- `pnpm run dev` - Start both backend and frontend
- `pnpm run dev:up` - Start development with Docker
- `pnpm run dev:down` - Clean up Docker resources
- `pnpm run dev:backend` - Start backend only
- `pnpm run dev:frontend` - Start frontend only
- `pnpm run build` - Build both applications
- `pnpm run build:backend` - Build backend only
- `pnpm run build:frontend` - Build frontend and sync to native platforms
- `pnpm run install:all` - Install all dependencies
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:seed` - Seed database with sample data
- `pnpm run db:reset` - Reset database (rollback + migrate + seed)

### Backend (server/)

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build TypeScript
- `pnpm run start` - Start production server
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:rollback` - Rollback last migration
- `pnpm run db:seed` - Seed database with sample data
- `pnpm run db:reset` - Reset database (rollback + migrate + seed)

### Frontend (client/)

- `pnpm run dev` - Start Vite development server
- `pnpm run build` - Build for production and sync to native platforms
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run cap:android` - Open Android project in Android Studio
- `pnpm run cap:ios` - Open iOS project in Xcode
- `pnpm run cap:sync` - Sync web assets to native platforms
- `pnpm run cap:run:android` - Build and run on Android device/emulator
- `pnpm run cap:run:ios` - Build and run on iOS simulator
- `pnpm run cap:serve` - Serve app for Capacitor development

### Mobile (Capacitor)

- `pnpm run cap:sync` - Sync web assets to native platforms
- `pnpm run cap:ios` - Open iOS project in Xcode
- `pnpm run cap:android` - Open Android project in Android Studio
- `pnpm run cap:build` - Build frontend and sync to native platforms
- `pnpm run cap:run:ios` - Build and run on iOS simulator
- `pnpm run cap:run:android` - Build and run on Android device/emulator
- `pnpm run cap:add` - Add a new Capacitor plugin
- `pnpm run cap:copy` - Copy web assets to native platforms
- `pnpm run cap:update` - Update Capacitor and native dependencies

## 🎯 Best Practices Demonstrated

### Backend Best Practices

1. **Repository Pattern**

   - Clean separation of data access logic
   - Consistent error handling
   - Type-safe database operations

2. **Error Handling**

   - Custom error classes with proper HTTP status codes
   - Centralized error handling in Apollo Server
   - Detailed error messages for development

3. **Database Management**

   - Migrations for schema versioning
   - Seeders for development data
   - Proper indexing for performance

4. **Type Safety**
   - Shared types between client and server
   - Strict TypeScript configuration
   - Input validation and sanitization

### Frontend Best Practices

1. **Component Architecture**

   - Reusable, composable components
   - Proper separation of concerns
   - Error boundaries for graceful failures

2. **State Management**

   - Custom hooks for data fetching
   - Apollo Client cache management
   - Optimistic updates

3. **User Experience**

   - Loading states and error handling
   - Responsive design
   - Accessible form controls

4. **Performance**
   - Code splitting with React Router
   - Efficient re-renders
   - Optimized GraphQL queries

## 🔍 GraphQL API

### Queries

- `users` - Get all users
- `user(id: ID!)` - Get user by ID
- `posts(pagination: PaginationArgs)` - Get all posts with pagination
- `post(id: ID!)` - Get post by ID
- `publishedPosts(pagination: PaginationArgs)` - Get published posts
- `postsByAuthor(authorId: ID!, pagination: PaginationArgs)` - Get posts by author

### Mutations

- `register(input: RegisterInput!)` - Register new user
- `login(input: LoginInput!)` - User login
- `createPost(input: CreatePostInput!)` - Create new post
- `updatePost(input: UpdatePostInput!)` - Update post
- `deletePost(id: ID!)` - Delete post

### Authentication

- **JWT Tokens** - Secure authentication
- **Password Hashing** - bcrypt for password security
- **Protected Routes** - Authentication required for certain operations
- **Context-based Auth** - User context available in GraphQL resolvers

## 🎨 Design System

### Tailwind CSS v4 Theme Variables

This project uses Tailwind CSS v4 with a comprehensive custom theme system built on the OKLCH color space for better color consistency and accessibility.

#### Color Palette

The theme defines a semantic color system with the following variables:

```css
@theme {
  /* Core Colors */
  --color-background: oklch(0.93 0.03 94.7); /* Light background */
  --color-foreground: oklch(0.25 0.06 115); /* Dark text */
  --color-card: oklch(0.93 0.03 94.7); /* Card backgrounds */
  --color-card-foreground: oklch(0.25 0.06 115); /* Card text */

  /* Brand Colors */
  --color-primary: oklch(0.5221 0.0803 111.52); /* Main brand color */
  --color-primary-foreground: oklch(0.97 0.02 95); /* Text on primary */
  --color-secondary: oklch(0.6 0.05 115); /* Secondary elements */
  --color-secondary-foreground: oklch(0.25 0.06 115); /* Text on secondary */

  /* UI States */
  --color-muted: oklch(0.88 0.02 95); /* Muted backgrounds */
  --color-muted-foreground: oklch(0.4 0.04 115); /* Muted text */
  --color-accent: oklch(0.65 0.12 80); /* Accent highlights */
  --color-accent-foreground: oklch(0.15 0.05 115); /* Text on accent */

  /* Status Colors */
  --color-destructive: oklch(0.5 0.15 30); /* Error/danger states */
  --color-destructive-foreground: oklch(0.98 0.01 95); /* Text on destructive */

  /* Interactive Elements */
  --color-border: oklch(0.3 0.05 115); /* Borders and dividers */
  --color-input: oklch(0.3 0.05 115); /* Input borders */
  --color-input-background: oklch(0.93 0.03 94.7); /* Input backgrounds */
  --color-ring: oklch(0.4 0.08 115); /* Focus rings */

  /* Border Radius */
  --radius: 0.5rem; /* Consistent border radius */
}
```

#### Usage Examples

**Background Colors:**

```jsx
<div className="bg-background">Main background</div>
<div className="bg-card">Card background</div>
<div className="bg-muted">Muted background</div>
```

**Text Colors:**

```jsx
<h1 className="text-foreground">Primary text</h1>
<p className="text-muted-foreground">Secondary text</p>
<span className="text-primary">Brand text</span>
```

**Interactive Elements:**

```jsx
<button className="bg-primary text-primary-foreground hover:bg-accent">
  Primary Button
</button>
<input className="border-input bg-input-background" />
```

**Status Indicators:**

```jsx
<div className="bg-destructive text-destructive-foreground">Error message</div>
```

#### Custom Styling Features

- **OKLCH Color Space**: Better color consistency across different displays
- **Semantic Naming**: Colors are named by purpose, not appearance
- **Accessibility**: High contrast ratios for better readability
- **Custom Scrollbars**: Styled using theme colors
- **Custom Checkboxes**: Enhanced form controls with theme integration
