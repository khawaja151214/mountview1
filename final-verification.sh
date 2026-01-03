#!/bin/bash
echo "🔧 Final Vercel Deployment Check"
echo "=================================="
echo ""

# Check vercel.json
echo "✓ Checking vercel.json..."
if [ -f "vercel.json" ]; then
    echo "  ✅ vercel.json exists"
    echo "  Content:"
    cat vercel.json | head -15
else
    echo "  ❌ vercel.json missing"
fi
echo ""

# Check .vercelignore
echo "✓ Checking .vercelignore..."
if [ -f ".vercelignore" ]; then
    echo "  ✅ .vercelignore exists"
else
    echo "  ❌ .vercelignore missing"
fi
echo ""

# Check frontend package.json
echo "✓ Checking frontend/package.json scripts..."
if grep -q "vercel-build" frontend/package.json; then
    echo "  ✅ vercel-build script found"
else
    echo "  ❌ vercel-build script missing"
fi
echo ""

# Test build
echo "✓ Testing build command..."
cd frontend
if yarn vercel-build > /tmp/build.log 2>&1; then
    echo "  ✅ Build successful"
    echo "  📦 Output size: $(du -sh dist 2>/dev/null | cut -f1)"
else
    echo "  ❌ Build failed"
    echo "  Error:"
    tail -10 /tmp/build.log
fi
cd ..
echo ""

echo "=================================="
echo "✅ Verification complete!"
echo ""
echo "Ready to deploy to Vercel!"
