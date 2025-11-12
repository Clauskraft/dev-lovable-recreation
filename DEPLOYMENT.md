# Railway Deployment Guide

## Prerequisites

1. Railway account (https://railway.app)
2. GitHub repository connected to Railway
3. Environment variables configured

## Required Environment Variables

Set these in your Railway project settings:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

For Supabase Edge Functions, also configure:
```
OPENROUTER_API_KEY=your_openrouter_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Railway
2. Select this repository and branch
3. Railway will automatically detect the configuration files:
   - `railway.json` - Railway-specific settings
   - `nixpacks.toml` - Build configuration
   - `package.json` - Node.js project

4. Add environment variables in Railway dashboard
5. Deploy!

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

## Build Configuration

The project uses:
- **Node.js 20** for runtime
- **Vite** for building
- **Preview server** for production serving

Build command: `npm run build`
Start command: `npm run preview`

## Post-Deployment

1. Verify the application is running at your Railway URL
2. Test all functionality including:
   - Navigation between pages
   - AI chat functionality (requires Supabase setup)
   - Responsive design on different devices
3. Configure custom domain if needed

## Monitoring

- Check Railway logs for any errors
- Monitor build times and deployment status
- Set up health checks if needed

## Troubleshooting

### Build Failures
- Ensure all environment variables are set
- Check Railway logs for specific errors
- Verify package.json scripts are correct

### Runtime Errors
- Check browser console for client-side errors
- Verify Supabase connection and API keys
- Ensure CORS is properly configured

## Support

For Railway-specific issues, consult:
- Railway documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
