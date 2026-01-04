#!/bin/bash

# EduConnect Vercel Deployment Helper Script
# This script helps you deploy EduConnect to Vercel

set -e

echo "🚀 EduConnect Vercel Deployment Helper"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "Choose deployment option:"
echo "1) Deploy Frontend Only (Recommended for MVP)"
echo "2) Deploy Full Stack with Serverless Backend"
echo "3) Just Setup (No deployment)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📱 Deploying Frontend to Vercel..."
        cd EduConnect/frontend
        vercel
        echo ""
        echo "✅ Frontend deployed!"
        echo ""
        echo "⚠️  Remember to:"
        echo "   1. Deploy backend separately (Railway, Render, Heroku, etc.)"
        echo "   2. Set REACT_APP_API_URL in Vercel dashboard"
        echo "   3. Update your backend API URL in environment variables"
        ;;
    2)
        echo ""
        echo "⚙️  Setting up full stack deployment..."
        echo "This requires converting Express to Vercel Serverless Functions"
        echo ""
        echo "📖 See docs/VERCEL_DEPLOYMENT.md for detailed instructions"
        echo ""
        echo "Quick start:"
        echo "1. Create api/ folder with serverless functions"
        echo "2. Update frontend .env with /api endpoints"
        echo "3. Run: vercel --prod"
        ;;
    3)
        echo ""
        echo "✅ Setup only - no deployment performed"
        echo ""
        echo "📋 Next steps:"
        echo "1. Read: docs/VERCEL_DEPLOYMENT.md"
        echo "2. Configure environment variables"
        echo "3. Run this script again to deploy"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "For more help, see docs/VERCEL_DEPLOYMENT.md"
echo ""
