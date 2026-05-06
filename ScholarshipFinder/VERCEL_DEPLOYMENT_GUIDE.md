# Vercel Deployment Guide for Scholarship Finder

## Pre-Deployment Checklist

- [ ] Node.js and npm installed
- [ ] Git repository initialized and ready
- [ ] All code committed to Git
- [ ] Vercel account created at https://vercel.com

## Step 1: Prepare Your Project

### 1.1 Verify Backend Configuration
Your backend is configured correctly with:
- Express.js API server
- Mock scholarship database (no MongoDB required currently)
- CORS enabled for frontend communication

### 1.2 Verify Frontend Configuration
The frontend uses Create React App and connects to the backend via proxy.

## Step 2: Create Git Repository (if not already)

```bash
cd ScholarshipFinder
git init
git add .
git commit -m "Initial commit"
```

## Step 3: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new)
2. Link your local repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/scholarship-finder.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd ScholarshipFinder
   vercel
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Select project root: `./`
   - Override settings: Use defaults

### Option 2: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Other (since it's a monorepo)
   - Root Directory: `./`
   - Environment Variables: (see Step 5)

## Step 5: Set Environment Variables in Vercel

### For Production:
In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
MONGODB_URI: mongodb+srv://Manjarika_db_user:Manju@2004@cluster0.bodaabt.mongodb.net/?appName=Cluster0
NODE_ENV: production
```

**WARNING:** Never commit `.env` files to GitHub. The MongoDB URI should only be in Vercel's secure environment variables.

## Step 6: Update Frontend API Configuration

The frontend proxy needs to be updated for production. The `vercel.json` file routes `/api/*` requests to your backend.

Update your frontend API calls from:
```javascript
fetch('/api/scholarships')
```

This automatically routes to the backend in production.

## Step 7: Build Configuration

The `vercel.json` file includes:
- Backend build using @vercel/node
- Frontend build using @vercel/static-build
- Route configuration to serve both

## Deployment Process

After setting up:

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically:
1. Detect changes
2. Build your project
3. Run tests (if configured)
4. Deploy to production

## Expected URLs After Deployment

- Frontend: `https://scholarship-finder-xyz.vercel.app`
- Backend API: `https://scholarship-finder-xyz.vercel.app/api`
- Scholarships endpoint: `https://scholarship-finder-xyz.vercel.app/api/scholarships`

## Troubleshooting

### 1. Build Fails

Check the build logs in Vercel dashboard:
1. Go to Deployments tab
2. Click failed deployment
3. Check build output for errors

### 2. Environment Variables Not Working

- Verify variables are set in Vercel Settings
- Redeploy after adding variables: `vercel --prod`

### 3. API Not Found (404)

- Ensure routes in `vercel.json` are correct
- Check backend `server.js` is listening on `process.env.PORT`

### 4. CORS Issues

CORS is already enabled in your backend. If issues persist:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
```

### 5. MongoDB Connection Issues

- Verify MongoDB URI is correct in environment variables
- Check MongoDB Atlas IP whitelist includes Vercel IPs (usually allow all 0.0.0.0/0)
- Test connection locally first

## Monitoring

After deployment:
1. Go to Vercel Dashboard
2. Monitor deployments and function invocations
3. Check Real-time Logs for errors
4. Enable Analytics for performance metrics

## Next Steps

1. Deploy the project
2. Test all API endpoints
3. Monitor logs for issues
4. Set up CI/CD for automatic deployments on Git push
5. Configure custom domain (optional)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Support](https://vercel.com/docs/runtimes/nodejs)
- [MongoDB Atlas IP Whitelist](https://docs.mongodb.com/manual/reference/security-clients/)
