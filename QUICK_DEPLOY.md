# Quick Deployment Checklist

## ✅ Before You Deploy

### Code Readiness
- [ ] Run `npm run build` successfully in frontend
- [ ] Run `npm start` successfully in backend
- [ ] No hardcoded secrets or API keys in code
- [ ] Git repository is clean and up-to-date

### Environment Variables
- [ ] `.env.example` has all required variables documented
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] Understand which vars are frontend (`REACT_APP_*`) vs backend

### Testing
- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend starts without errors: `npm start`
- [ ] Health check endpoint works: `curl http://localhost:5000/health`
- [ ] No console errors or warnings

---

## 🚀 Deploy to Vercel (Frontend)

### Step 1: Prepare GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up (use GitHub for easier setup)
3. Create new project from your GitHub repository

### Step 3: Configure Build Settings
- **Framework**: React (auto-detected)
- **Root Directory**: `EduConnect/frontend/`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Step 4: Set Environment Variables
In Vercel Dashboard:
```
REACT_APP_API_URL = https://your-backend-api-url.com
```

### Step 5: Deploy
Click "Deploy" button - Vercel will automatically build and deploy!

---

## 🔙 Deploy Backend (Choose One)

### Option A: Railway (Recommended - Easiest)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select your repository
4. Create service from `EduConnect/backend`
5. Add environment variables
6. Railway auto-deploys on push!

```bash
# Or use Railway CLI:
npm i -g @railway/cli
railway login
cd backend
railway init
railway up
```

### Option B: Render.com
1. Go to [render.com](https://render.com)
2. Create Web Service
3. Connect GitHub repository
4. Select `EduConnect/backend`
5. Set:
   - Build: `npm install`
   - Start: `npm start`
6. Add environment variables
7. Deploy!

### Option C: AWS
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📝 Update Frontend After Backend Deployment

After backend is deployed, update frontend environment:

### In Vercel Dashboard:
1. Project Settings → Environment Variables
2. Update `REACT_APP_API_URL` to your backend URL
3. Redeploy frontend

```
# Railway backend example:
REACT_APP_API_URL = https://your-app.up.railway.app/api

# Render backend example:
REACT_APP_API_URL = https://your-app.onrender.com/api
```

---

## 🔗 Connect Services

### Frontend ↔ Backend Communication
```javascript
// Frontend code automatically uses:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Enable CORS
Backend already configured to accept requests from `REACT_APP_API_URL`

---

## ✨ Post-Deployment

### Test Your Deployment
1. Visit frontend URL in browser
2. Check that pages load
3. Try authentication endpoints
4. Verify API calls work
5. Check browser console for errors

### Monitor Deployments
- **Vercel**: Dashboard → Deployments → View logs
- **Railway**: Dashboard → View logs in real-time
- **Render**: Dashboard → Events log

### Set Custom Domain (Optional)
1. **Vercel**: Settings → Domains → Add custom domain
2. **Railway**: Settings → Custom Domain
3. Update DNS records at your registrar

---

## 🐛 Troubleshooting

### Frontend loads but API calls fail
- Check `REACT_APP_API_URL` is correct
- Verify backend is deployed and running
- Check CORS settings in backend
- Review network tab in browser DevTools

### Build fails on deployment
- Run `npm run build` locally to reproduce
- Check all dependencies are in `package.json`
- Verify no hardcoded paths or environment variables

### MongoDB connection timeout
- Add deployment service IP to MongoDB Atlas whitelist
- For Vercel functions: whitelist `0.0.0.0/0` (temporary)
- Use connection pooling for production

### Environment variables not working
- Redeploy after adding variables
- Ensure variable names are correct
- Frontend vars must start with `REACT_APP_`

---

## 📊 Monitoring & Logs

### View Vercel Logs
```bash
vercel logs [deployment-url]
```

### View Backend Logs
- **Railway**: Dashboard → View logs
- **Render**: Dashboard → Events → View logs

### Monitor Performance
- Vercel: Analytics → Overview
- Add third-party monitoring (Sentry, DataDog)

---

## 🔐 Security Checklist

- [ ] No `.env` files committed
- [ ] All secrets in environment variables
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS properly configured
- [ ] Rate limiting enabled on backend
- [ ] Database credentials in environment

---

## 🎯 Common Deployment URLs

After deployment, you'll have:

```
Frontend:  https://your-project.vercel.app
Backend:   https://your-api.up.railway.app  (or similar)
Database:  mongodb+srv://user:pass@cluster.mongodb.net/educonnect
```

Use these URLs to:
1. Test your application
2. Configure CORS and API endpoints
3. Share with team/users

---

## 📚 More Help

- [Full Vercel Guide](VERCEL_DEPLOYMENT.md)
- [Deployment Options](DEPLOYMENT.md)
- [API Documentation](API.md)
- [Contributing Guide](CONTRIBUTING.md)

---

**Need help?** See the full guides in `/docs/` directory!
