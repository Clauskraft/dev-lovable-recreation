# TDC Erhverv AI Platform

## Project Overview

Modern AI-powered platform built with enterprise-grade technologies for TDC Erhverv.

## Getting Started

### Prerequisites

- Node.js 18+ installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn package manager

### Local Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technologies

This project is built with:

- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **React 18** - Modern UI framework
- **shadcn-ui** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend and authentication
- **React Query** - Data fetching and caching

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

This application is configured for deployment on Railway. See deployment documentation for specific instructions.

## Architecture

- **Frontend**: React SPA with TypeScript
- **Styling**: Tailwind CSS with custom TDC theme
- **State Management**: React Query
- **Routing**: React Router v6
- **AI Integration**: Multiple LLM models via Supabase Edge Functions
