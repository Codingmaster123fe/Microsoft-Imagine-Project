#!/bin/bash

# Vercel Deployment Readiness Check
# This script verifies your project is ready for Vercel deployment

echo "🔍 EduConnect Vercel Deployment Readiness Check"
echo "=================================================="
echo ""

errors=0
warnings=0

# Check Node version
echo "📌 Checking Node.js version..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "   ✅ Node.js $node_version"
else
    echo "   ❌ Node.js not found. Install from nodejs.org"
    ((errors++))
fi

echo ""
echo "📌 Checking Frontend..."

# Check frontend package.json
if [ -f "EduConnect/frontend/package.json" ]; then
    echo "   ✅ package.json exists"
else
    echo "   ❌ package.json not found in frontend"
    ((errors++))
fi

# Check frontend build script
if grep -q '"build"' "EduConnect/frontend/package.json"; then
    echo "   ✅ Build script configured"
else
    echo "   ⚠️  Build script not found"
    ((warnings++))
fi

# Check for hardcoded API URLs
if grep -r "localhost:5000" "EduConnect/frontend/src/" 2>/dev/null; then
    echo "   ⚠️  Found hardcoded localhost URLs - use env vars instead"
    ((warnings++))
else
    echo "   ✅ No hardcoded localhost URLs"
fi

# Check .gitignore in frontend
if [ -f "EduConnect/frontend/.gitignore" ]; then
    if grep -q ".env.local" "EduConnect/frontend/.gitignore"; then
        echo "   ✅ .env.local is gitignored"
    else
        echo "   ⚠️  .env.local should be in .gitignore"
        ((warnings++))
    fi
else
    echo "   ⚠️  .gitignore not found"
    ((warnings++))
fi

echo ""
echo "📌 Checking Backend..."

# Check backend package.json
if [ -f "EduConnect/backend/package.json" ]; then
    echo "   ✅ package.json exists"
else
    echo "   ❌ package.json not found in backend"
    ((errors++))
fi

# Check for .env.example
if [ -f "EduConnect/backend/.env.example" ]; then
    echo "   ✅ .env.example exists"
else
    echo "   ⚠️  .env.example not found"
    ((warnings++))
fi

# Check for hardcoded secrets
if grep -r "sk-" "EduConnect/backend/" 2>/dev/null | grep -v ".example"; then
    echo "   ❌ Found hardcoded API keys - REMOVE IMMEDIATELY"
    ((errors++))
else
    echo "   ✅ No hardcoded secrets found"
fi

# Check .gitignore in backend
if [ -f "EduConnect/backend/.gitignore" ]; then
    if grep -q ".env" "EduConnect/backend/.gitignore"; then
        echo "   ✅ .env is gitignored"
    else
        echo "   ⚠️  .env should be in .gitignore"
        ((warnings++))
    fi
else
    echo "   ⚠️  .gitignore not found"
    ((warnings++))
fi

echo ""
echo "📌 Checking Git Repository..."

# Check if it's a git repo
if [ -d ".git" ]; then
    echo "   ✅ Git repository detected"
else
    echo "   ⚠️  Not a git repository"
    ((warnings++))
fi

# Check for uncommitted changes
if [ -d ".git" ]; then
    if git status --short | grep -q "^??"; then
        echo "   ⚠️  Untracked files found"
        echo "      Run 'git add .' and 'git commit' to commit changes"
        ((warnings++))
    else
        echo "   ✅ No untracked files"
    fi
fi

echo ""
echo "📌 Checking Docker Configuration..."

# Check docker-compose.yml
if [ -f "EduConnect/docker-compose.yml" ]; then
    echo "   ✅ docker-compose.yml exists (for local dev)"
else
    echo "   ⚠️  docker-compose.yml not found"
    ((warnings++))
fi

echo ""
echo "📌 Checking Deployment Configuration..."

# Check vercel.json
if [ -f "vercel.json" ]; then
    echo "   ✅ vercel.json exists"
else
    echo "   ⚠️  vercel.json not configured"
    ((warnings++))
fi

# Check deployment docs
if [ -f "docs/VERCEL_DEPLOYMENT.md" ]; then
    echo "   ✅ Deployment docs exist"
else
    echo "   ⚠️  Deployment docs not found"
    ((warnings++))
fi

echo ""
echo "=================================================="
echo ""

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo "✅ All checks passed! Your project is ready for Vercel deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Go to vercel.com and create new project"
    echo "3. Connect your GitHub repository"
    echo "4. Set environment variables in Vercel dashboard"
    echo "5. Click Deploy!"
    echo ""
    exit 0
elif [ $errors -eq 0 ]; then
    echo "⚠️  $warnings warnings found. Your project can be deployed but fix warnings for safety."
    echo ""
    exit 0
else
    echo "❌ $errors critical errors found. Please fix before deploying:"
    echo ""
    echo "See QUICK_DEPLOY.md for detailed instructions."
    echo ""
    exit 1
fi
