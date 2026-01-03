# Vercel Deployment Guide - Mount View Hotel Skardu

## Issue Fixed ✅

**Problem**: "Warning: Failed to fetch one or more git submodules"

**Solution Applied**:
1. ✅ Removed nested `.git` folder from `Mountviewskarduzip` directory
2. ✅ Cleaned up the extracted zip folder completely
3. ✅ Updated `.gitignore` to exclude backup directories
4. ✅ Created proper `package.json` at root level
5. ✅ Created `vercel.json` configuration for proper deployment
6. ✅ Verified no git submodules exist

## Deployment Steps

### Option 1: Deploy Frontend Only (Recommended for Static Hosting)

This will deploy just the React frontend to Vercel. The backend will need to be deployed separately.

**Steps:**

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Fix submodule issue and prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - No environment variables needed for frontend-only deployment
   - Frontend is currently using localStorage for data

### Option 2: Full Stack Deployment

For a complete deployment with backend, you'll need:

**Frontend on Vercel:**
- Follow Option 1 above

**Backend Options:**
- **Railway**: Best for Node.js + PostgreSQL
- **Render**: Free tier available for Node.js
- **Heroku**: Enterprise option
- **AWS/Google Cloud**: For production scale

## Project Structure

```
/app/
├── frontend/           # React + Vite frontend
│   ├── dist/          # Build output (ignored in git)
│   ├── src/           # Source code
│   ├── package.json   # Frontend dependencies
│   └── vite.config.ts # Vite configuration
├── backend/           # Node.js + Express backend
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API routes
│   └── package.json   # Backend dependencies
├── package.json       # Root package.json
├── vercel.json        # Vercel configuration
└── .gitignore         # Git ignore rules

```

## Vercel Configuration Details

The `vercel.json` file includes:
- **Build Command**: `cd frontend && yarn install && yarn build`
- **Output Directory**: `frontend/dist`
- **Rewrites**: SPA routing support (all routes → index.html)
- **Security Headers**: XSS protection, nosniff, frame denial

## Build Settings in Vercel Dashboard

If auto-detection doesn't work, manually configure:

- **Framework Preset**: Other
- **Root Directory**: (leave empty or `/`)
- **Build Command**: `cd frontend && yarn install && yarn build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `yarn install`
- **Node Version**: 20.x

## Post-Deployment

After successful deployment:

1. **Update API URLs**: 
   - The frontend currently points to the Emergent preview URL
   - Update `/app/frontend/.env` with your backend URL (if deploying backend separately)
   - Rebuild and redeploy

2. **Test Features**:
   - Public pages (Home, Rooms, Restaurant, etc.)
   - Employee login
   - Front desk operations
   - Booking system

## Common Issues & Solutions

### Issue: Build fails with "command not found"
**Solution**: Ensure `yarn` is available. Update vercel.json to use `npm` instead:
```json
"buildCommand": "cd frontend && npm install && npm run build"
```

### Issue: Routes not working (404 on refresh)
**Solution**: The `vercel.json` includes rewrite rules for SPA routing. If still failing, add:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Issue: Assets not loading
**Solution**: Check that `frontend/public/attached_assets/` is committed to git and not ignored.

### Issue: Environment variables not working
**Solution**: 
- In Vercel dashboard, go to Settings → Environment Variables
- Add `VITE_API_URL` with your backend URL
- Redeploy

## Backup & Rollback

Vercel automatically keeps deployment history:
- Go to Deployments tab
- Click on any previous deployment
- Click "Promote to Production" to rollback

## Support

For issues:
1. Check Vercel deployment logs
2. Verify all files are committed to git
3. Ensure no `.git` folders in subdirectories
4. Check that `.gitignore` is properly configured

## Files Changed
- ✅ Removed: `Mountviewskarduzip/.git`
- ✅ Created: `/app/package.json`
- ✅ Created: `/app/vercel.json`
- ✅ Updated: `/app/.gitignore`
- ✅ Cleaned: Backup directories excluded

## Ready to Deploy!

Your repository is now clean and ready for Vercel deployment without submodule errors.
