# 🚀 Deployment Guide

This guide will help you deploy TaskFlow to production.

## Quick Deployment Summary

1. **Database**: Use Supabase or Neon (free PostgreSQL)
2. **Backend**: Deploy to Railway or Render
3. **Frontend**: Deploy to Vercel

## Detailed Steps

### 1. Database Setup (5 minutes)

#### Using Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Click "New Project"
4. Fill in:
   - **Name**: taskflow-db
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
5. Wait for project to be created (~2 minutes)
6. Go to **Settings** → **Database**
7. Copy the connection string (you'll need this for backend)

**Connection String Format:**

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 2. Backend Deployment (10 minutes)

#### Option A: Railway (Easiest)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. In project settings:

   - Set **Root Directory** to `backend`
   - Railway auto-detects Node.js

6. **Add Environment Variables:**
   - Click on your service → Variables tab
   - Add these (use your Supabase connection details):

```env
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-supabase-password
JWT_SECRET=generate-a-random-32-character-string-here
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=https://your-app.vercel.app
```

7. **Set Start Command:**

   - Go to Settings → Deploy
   - Start Command: `npm run start:prod`

8. Railway will deploy automatically
9. Copy your Railway URL (e.g., `https://taskflow-backend.up.railway.app`)

#### Option B: Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:

   - **Name**: taskflow-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

6. Add environment variables (same as Railway)
7. Click "Create Web Service"
8. Wait for deployment (~5 minutes)
9. Copy your Render URL

### 3. Frontend Deployment (5 minutes)

1. **Push to GitHub** (if not already):

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (auto)
     - **Output Directory**: `.next` (auto)

3. **Add Environment Variable:**

   - Go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
     ```
   - Replace with your actual backend URL

4. Click "Deploy"
5. Wait for build (~2 minutes)
6. Copy your Vercel URL (e.g., `https://taskflow.vercel.app`)

### 4. Final Configuration

1. **Update Backend CORS:**

   - Go back to Railway/Render
   - Update `FRONTEND_URL` environment variable:
     ```
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Redeploy backend (or it will auto-redeploy)

2. **Run Database Migrations:**
   - The tables should be created automatically on first connection
   - If not, you can run migrations manually (see README)

### 5. Test Everything

1. Visit your Vercel URL
2. Click "Sign In" → "Sign up"
3. Create an account
4. Test features:
   - ✅ Create a project
   - ✅ Create tasks
   - ✅ Assign tasks
   - ✅ Check notifications
   - ✅ Test role-based access

## Cost Estimate

**Free Tier (Suitable for Demo/Portfolio):**

- Vercel: Free
- Railway: $5/month credit (usually free for small projects)
- Supabase: Free (500MB database)
- **Total: $0-5/month**

## Troubleshooting

### Backend won't start

- Check all environment variables are set
- Check database connection string is correct
- Check logs in Railway/Render dashboard

### Database connection errors

- Verify database credentials
- Check if database allows external connections
- Ensure DATABASE_HOST doesn't include `postgresql://` prefix

### CORS errors

- Ensure `FRONTEND_URL` in backend matches Vercel URL exactly
- Check browser console for exact error
- Verify backend CORS settings

### WebSocket not working

- Check that WebSocket is enabled on your backend host
- Verify `FRONTEND_URL` includes `https://`
- Check browser console for WebSocket connection errors

## Production Checklist

- [ ] Database deployed and connection string saved
- [ ] Backend deployed and URL copied
- [ ] Frontend deployed and URL copied
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Tested user registration
- [ ] Tested creating projects
- [ ] Tested creating tasks
- [ ] Tested notifications
- [ ] Tested role-based permissions

## Support

If you encounter issues:

1. Check the logs in Railway/Render dashboard
2. Check Vercel build logs
3. Verify all environment variables
4. Test database connection separately
5. Check browser console for frontend errors

Good luck with your deployment! 🚀
