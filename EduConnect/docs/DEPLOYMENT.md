# Deployment Guide

## Prerequisites
- Node.js 16+
- Docker
- Azure/AWS account (optional for cloud deployment)
- MongoDB Atlas (cloud database)

## Local Deployment

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run build
npm start
```

## Docker Deployment

### Build Backend Image
```bash
cd backend
docker build -t educonnect-backend .
docker run -p 5000:5000 -e MONGODB_URI=mongodb://host.docker.internal:27017/educonnect educonnect-backend
```

### Build Frontend Image
```bash
cd frontend
docker build -t educonnect-frontend .
docker run -p 3000:3000 educonnect-frontend
```

## Cloud Deployment

### Azure App Service
```bash
# Install Azure CLI
az login
az webapp create --resource-group myResourceGroup --plan myServicePlan --name educonnect-backend
az webapp deployment source config-zip --name educonnect-backend --zip-file backend.zip
```

### Environment Variables (Production)
- `NODE_ENV=production`
- `MONGODB_URI=<your_mongodb_atlas_uri>`
- `JWT_SECRET=<secure_random_string>`
- `OPENAI_API_KEY=<your_api_key>`

## Database Setup
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

## Monitoring
- Use Azure Monitor or CloudWatch
- Set up error tracking (Sentry, DataDog)
- Monitor API response times
- Track user analytics

## Scaling
- Use CDN for static assets
- Implement caching (Redis)
- Load balance API servers
- Use auto-scaling groups

## Security Checklist
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Regular backups configured
- [ ] Security headers set
