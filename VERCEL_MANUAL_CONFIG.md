# VERCEL DEPLOYMENT - MANUAL CONFIGURATION REQUIRED

## ⚠️ IMPORTANT: Clear Vercel Cache First

The error persists because Vercel is using cached settings. Follow these steps:

### Step 1: Delete Project from Vercel (If Exists)

If you already tried deploying:
1. Go to your Vercel dashboard
2. Select your project
3. Settings → Advanced
4. Scroll to "Delete Project"
5. Delete it completely

### Step 2: Fresh Import with Manual Configuration

**Option A: Use Vercel Dashboard (Recommended)**

1. **Go to Vercel**: https://vercel.com/new

2. **Import Project**:
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

3. **CRITICAL: Configure Build Settings Manually**:

   ```
   Framework Preset: Other
   
   Root Directory: (leave blank or type "/")
   
   Build Command: bash build.sh
   
   Output Directory: frontend/dist
   
   Install Command: (leave blank)
   
   Development Command: (leave blank)
   ```

4. **Click Deploy**

**Option B: Override in Project Settings**

If project already exists:

1. Go to project Settings → General
2. Scroll to "Build & Development Settings"
3. **Override** and set:
   - Build Command: `bash build.sh`
   - Output Directory: `frontend/dist`
   - Install Command: Leave empty

4. Go to Deployments
5. Click "..." on latest deployment
6. Click "Redeploy"

### Step 3: Alternative - Use Root Directory Method

**Simplest Solution:**

1. In Vercel Project Settings
2. Set **Root Directory**: `frontend`
3. Set **Build Command**: `yarn build`
4. Set **Output Directory**: `dist`
5. Set **Install Command**: `yarn install`

This makes Vercel treat `frontend/` as the entire project.

## Files in This Repository

**For Manual Build (Current Setup):**
- ✅ `build.sh` - Simple build script
- ✅ `vercel.json` - Points to build.sh
- ✅ `.vercelignore` - Excludes backend

**Configuration in vercel.json:**
```json
{
  "buildCommand": "bash build.sh",
  "outputDirectory": "frontend/dist",
  "installCommand": "echo 'Using build.sh for installation'",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Why This Works

The `build.sh` script:
1. Changes to frontend directory
2. Installs dependencies with yarn
3. Runs build command
4. All in one simple script

## Testing Locally

```bash
cd /app
./build.sh

# Should output:
# ✓ built in 6-8s
# Build complete!
```

## If Still Getting Error

### Check 1: Vercel Build Logs

Look for the exact command Vercel is running:
```
> Building...
> Running: [command here]
```

If it shows: `cd frontend && yarn install && yarn build`
→ Vercel is using OLD cached settings

**Solution**: Delete and re-import project OR use Root Directory method

### Check 2: Node Version

Ensure Node 20.x is used:
1. Vercel Dashboard → Project Settings
2. Environment Variables
3. Add: `NODE_VERSION` = `20`

### Check 3: Yarn Version

If using Yarn 2+ causes issues:
1. Add to vercel.json:
   ```json
   "installCommand": "npm install -g yarn@1.22.22"
   ```

## Complete Vercel Dashboard Configuration

Copy these exact settings:

**General Settings:**
- Root Directory: (blank)

**Build & Development Settings:**
- Framework Preset: Other
- Build Command: `bash build.sh`
- Output Directory: `frontend/dist`  
- Install Command: (blank)
- Development Command: (blank)

**Environment Variables:**
- (none needed for now)

## Alternative Solution: Netlify

If Vercel continues to fail, try Netlify:

1. Go to https://app.netlify.com
2. New site from Git
3. Configure:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/dist`
4. Deploy

## Quick Fix Commands

Run these before pushing:

```bash
cd /app

# Ensure build.sh is executable
chmod +x build.sh

# Test build
./build.sh

# Commit everything
git add .
git commit -m "Add build.sh for Vercel deployment"
git push origin main
```

## Summary

**The error occurs because:**
1. Vercel caches build settings
2. Old command `cd frontend && yarn install && yarn build` is cached
3. Need to either delete project or override settings

**Solutions (try in order):**

1. ✅ **Best**: Delete Vercel project, re-import with manual config
2. ✅ **Good**: Override build settings in project settings
3. ✅ **Easiest**: Set Root Directory to `frontend`
4. ✅ **Alternative**: Deploy to Netlify instead

Choose the method that works best for you!
