# Vercel Configuration Guide

## ⚠️ CRITICAL: Do NOT use vercel.json for build commands

Vercel's auto-detection works better than manual configuration.

## ✅ CORRECT Setup Method

### Step 1: Set Root Directory in Vercel Dashboard

**This is the ONLY setting you need to change:**

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → General
4. Find "Root Directory"
5. Click Edit
6. Enter: `frontend`
7. Save

### Step 2: Let Vercel Auto-Detect Everything Else

Once Root Directory is set to `frontend`, Vercel will:
- ✅ Auto-detect Vite framework
- ✅ Use correct build command: `npm run build`
- ✅ Use correct output directory: `dist`
- ✅ Install dependencies automatically

### Step 3: Deploy

Go to Deployments → Redeploy

## 🎯 Manual Configuration (Only if auto-detect fails)

If you must configure manually:

**Settings → Build & Development Settings:**

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

## ❌ Common Mistakes to Avoid

1. ❌ Don't use custom build scripts (build.sh)
2. ❌ Don't use complex vercel.json configurations
3. ❌ Don't leave Root Directory blank
4. ❌ Don't use yarn workspaces
5. ❌ Don't cache old settings

## 🔧 If It Still Fails

### Option 1: Delete Project & Reimport
1. Settings → Advanced → Delete Project
2. Import fresh from GitHub
3. Set Root Directory to `frontend` immediately
4. Deploy

### Option 2: Use Netlify
1. Go to https://app.netlify.com
2. New site from Git
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `frontend/dist`

## ✅ This WILL Work

Setting Root Directory to `frontend` is the solution. Nothing else needed.
