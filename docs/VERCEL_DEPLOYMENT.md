# Vercel Deployment Guide

## Quick Start

### Option 1: Frontend Only on Vercel (Recommended for MVP)

If you want to deploy just the frontend to Vercel and host the backend separately:

#### 1. Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend only
cd frontend
vercel
```

**During deployment, Vercel will ask:**
- Framework: Select "Create React App"
- Root directory: `.` (current directory)
- Build command: `npm run build`
- Output directory: `build`

#### 2. Set Environment Variables in Vercel Dashboard

After deployment:
1. Go to your project settings in Vercel dashboard
2. Click "Environment Variables"
3. Add:
   ```
   REACT_APP_API_URL = https://your-backend-api.com
   ```

#### 3. Deploy Backend Separately

For the Node.js backend, use one of these services:

**Option A: Railway.app (Recommended)**
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

**Option B: Render.com**
1. Connect your GitHub repo
2. Create new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`

**Option C: Heroku** (free tier no longer available, but still supported)
```bash
heroku login
heroku create your-app-name
git push heroku main
```

---

### Option 2: Full Stack on Vercel (Using Serverless Functions)

To deploy the entire app on Vercel, we need to convert the Express backend to serverless functions:

#### Step 1: Create API Route Structure

```bash
mkdir api
```

#### Step 2: Convert Express Routes to Vercel Functions

Each API endpoint becomes a serverless function in `api/` folder. Example:

```javascript
// api/auth/register.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    // Handle registration
    return res.status(200).json({ token: '...' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
```

#### Step 3: Update vercel.json

Already configured in the root `vercel.json`

#### Step 4: Update Frontend API URL

In `frontend/src/api.js` or where you make API calls:

```javascript
const API_BASE = process.env.REACT_APP_API_URL || '/api';
```

---

## Environment Variables

Set these in Vercel Dashboard under Project Settings > Environment Variables:

```
REACT_APP_API_URL=https://your-api.vercel.app
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/educonnect
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
```

---

## Deployment Checklist

### Before Deploying

- [ ] All environment variables are set in Vercel dashboard
- [ ] Backend API URL is correct in frontend `.env`
- [ ] MongoDB Atlas cluster is created and IP whitelist is updated
- [ ] OpenAI API key is valid
- [ ] Frontend build succeeds locally: `npm run build`
- [ ] No hardcoded secrets in code

### Frontend Checklist

- [ ] `REACT_APP_*` environment variables are set
- [ ] API calls use `process.env.REACT_APP_API_URL`
- [ ] No console errors in production build
- [ ] Asset paths are correct (no absolute paths)

### Backend Checklist

- [ ] All dependencies in `package.json`
- [ ] `.env` variables properly configured
- [ ] MongoDB connection string is valid
- [ ] Server starts with `npm start`
- [ ] Health check endpoint works: `/health`

---

## Deployment Steps

### 1. Connect GitHub to Vercel

```bash
# From your project root
vercel
# Or via GitHub:
# Go to vercel.com, click "New Project", select your repo
```

### 2. Configure Build Settings

- **Framework**: Detect automatically (should find Next.js/React)
- **Build Command**: `npm run build`
- **Output Directory**: `build` or `dist`

### 3. Add Environment Variables

In Vercel Dashboard:
1. Project Settings
2. Environment Variables
3. Add each variable from `.env.example`

### 4. Deploy

Push to GitHub and Vercel will auto-deploy:

```bash
git push origin main
```

Or manually trigger:

```bash
vercel --prod
```

---

## Domains & Custom DNS

### Add Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Enter your domain
3. Follow DNS configuration instructions
4. Update domain registrar nameservers (if needed)

---

## Monitoring & Logs

### View Logs

```bash
vercel logs
```

### Check Deployment Status

In Vercel Dashboard:
- Click on latest deployment
- View build logs, function logs, and deployments

---

## Common Issues & Solutions

### Issue: 404 on Frontend Routes
**Solution**: Vercel automatically handles SPA routing. Ensure you're using `React Router` or similar.

### Issue: API Calls Failing
**Solution**: 
1. Check CORS headers in backend
2. Verify API URL in frontend `.env`
3. Check backend is running (if deployed separately)

### Issue: Environment Variables Not Working
**Solution**:
1. Redeploy after adding variables
2. Use `vercel env list` to verify
3. Prefix frontend vars with `REACT_APP_`

### Issue: MongoDB Connection Timeout
**Solution**:
1. Add Vercel IPs to MongoDB whitelist
2. Use connection pooling
3. Check MongoDB Atlas quota

### Issue: Build Fails
**Solution**:
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Ensure all dependencies are in `package.json`

---

## Performance Optimization

### Frontend Optimization

- Code splitting with React.lazy()
- Image optimization
- CSS minification (Tailwind handles this)
- Bundle analysis: `npm install -g webpack-bundle-analyzer`

### Backend Optimization (if serverless)

- Cold start optimization
- Response caching
- Database connection pooling
- Optimize MongoDB queries

---

## Security

1. **Never commit `.env`** - use `.env.example`
2. **Rotate JWT secrets** periodically
3. **Use HTTPS only** - Vercel provides free SSL
4. **CORS configuration** - whitelist only your domain
5. **Rate limiting** - implement on backend

---

## Rollback Deployment

If something breaks:

```bash
# View all deployments
vercel list

# Rollback to previous
vercel rollback <deployment-url>
```

Or in Vercel Dashboard:
1. Deployments tab
2. Click three dots on previous deployment
3. Select "Promote to Production"

---

## Next Steps

1. ✅ Configure `vercel.json`
2. ✅ Add `.vercelignore`
3. 📝 Create Vercel account at vercel.com
4. 🔗 Connect GitHub repo to Vercel
5. 🔑 Add environment variables
6. 🚀 Deploy!

```bash
vercel --prod
```

Happy deploying! 🎉
