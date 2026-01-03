#!/bin/bash
echo "🔍 Vercel Deployment Verification"
echo "=================================="
echo ""

# Check for nested .git folders
echo "✓ Checking for nested .git folders..."
GIT_COUNT=$(find . -name ".git" -type d | wc -l)
if [ "$GIT_COUNT" -eq 1 ]; then
    echo "  ✅ Only 1 .git folder found (correct)"
else
    echo "  ❌ Found $GIT_COUNT .git folders (should be 1)"
    find . -name ".git" -type d
fi
echo ""

# Check for .gitmodules
echo "✓ Checking for git submodules..."
if [ -f ".gitmodules" ]; then
    echo "  ❌ .gitmodules file exists"
    cat .gitmodules
else
    echo "  ✅ No .gitmodules file (correct)"
fi
echo ""

# Check for required files
echo "✓ Checking required files..."
for file in "package.json" "vercel.json" ".gitignore" "frontend/package.json" "backend/package.json"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file exists"
    else
        echo "  ❌ $file missing"
    fi
done
echo ""

# Check frontend build
echo "✓ Checking frontend build..."
if [ -d "frontend/dist" ]; then
    echo "  ✅ Frontend build exists"
    echo "  📦 Size: $(du -sh frontend/dist | cut -f1)"
else
    echo "  ⚠️  Frontend not built (run: cd frontend && yarn build)"
fi
echo ""

# Check git status
echo "✓ Git status..."
git status --short
echo ""

echo "=================================="
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. Commit any changes: git add . && git commit -m 'Prepare for Vercel'"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy on Vercel: https://vercel.com"
