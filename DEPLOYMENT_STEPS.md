# 🚀 Step-by-Step Deployment Guide

Follow these steps in order to deploy your TaskFlow application.

---

## Step 1: Set Up Database (Supabase) - 5 minutes

### 1.1 Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (easiest option)
4. Verify your email if needed

### 1.2 Create New Project

1. Click "New Project" button
2. Fill in:
   - **Name**: `taskflow-db` (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you (e.g., "West US" or "East US")
3. Click "Create new project"
4. Wait 2-3 minutes for project to be created

### 1.3 Get Database Connection Details

**Method 1: Connection String (Easiest)**

1. Once project is ready, go to **Settings** (gear icon in left sidebar)
2. Click **Database** in the settings menu
3. Look for **Connection string** section (scroll down if needed)
4. You'll see tabs like "URI", "JDBC", "Golang", etc.
5. Click on **URI** tab
6. Copy the connection string - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

**Method 2: Individual Settings (If connection string is not visible)**

1. Go to **Settings** → **Database**
2. Look for **Connection info** or **Database settings** section
3. You'll see individual fields:
   - **Host**: `db.xxxxx.supabase.co` (or similar, like `aws-0-us-west-1.pooler.supabase.com`)
   - **Port**: `5432`
   - **Database name**: `postgres`
   - **User**: `postgres`
   - **Password**: (the one you created during project setup - if you forgot it, you'll need to reset it)

**Method 3: Project Settings → API**

1. Go to **Settings** → **API**
2. Look for **Project URL** - this gives you the project reference
3. Your host will be: `db.[PROJECT-REF].supabase.co`
4. You can also find connection info here sometimes

**Method 4: SQL Editor**

1. Click **SQL Editor** in the left sidebar
2. Sometimes connection info is shown at the top
3. Or create a new query and check the connection details

### 1.4 Extract Connection Details

**If you have the connection string:**
From the connection string `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`, extract:

- **Host**: The part after `@` and before `:5432` (e.g., `db.xxxxx.supabase.co`)
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: The part in brackets `[PASSWORD]` (the password you created)

**If you have individual settings:**

- Just copy each value directly:
  - **Host**: Copy from Supabase (usually `db.xxxxx.supabase.co`)
  - **Port**: `5432`
  - **Database**: `postgres`
  - **User**: `postgres`
  - **Password**: The password you created during project setup

**If you forgot your password:**

1. Go to **Settings** → **Database**
2. Look for **Database password** section
3. Click "Reset database password"
4. Save the new password!

**Important Notes:**

- The **Host** might look like: `db.xxxxx.supabase.co` or `aws-0-us-west-1.pooler.supabase.com`
- If you see a "Connection pooling" URL, you can use that too (it works the same)
- **Save these details - you'll need them in Step 2!**

**Quick Check - What you need:**

- ✅ Host (something like `db.xxxxx.supabase.co`)
- ✅ Port (`5432`)
- ✅ Database (`postgres`)
- ✅ User (`postgres`)
- ✅ Password (the one you created)

---

## Step 2: Deploy Backend (Railway) - 10 minutes

### 2.1 Create Railway Account

1. Go to [https://railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub
4. Authorize Railway to access your GitHub

### 2.2 Deploy Your Repository

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. If prompted, authorize Railway to access your repositories
4. Find and select your **Vintage** repository
5. Click "Deploy Now"

### 2.3 Configure Backend Settings

1. Railway will start deploying automatically
2. Click on the service that was created
3. Go to **Settings** tab
4. Set **Root Directory** to: `backend`
5. Scroll down to find **Start Command**
6. Set Start Command to: `npm run start:prod`
7. Click "Save"

### 2.4 Add Environment Variables

1. Still in the service, go to **Variables** tab
2. Click "New Variable" for each of these:

**Add these variables one by one:**

```
DATABASE_HOST=db.xxxxx.supabase.co
```

(Replace with your Supabase host from Step 1.4)

```
DATABASE_PORT=5432
```

```
DATABASE_NAME=postgres
```

```
DATABASE_USER=postgres
```

```
DATABASE_PASSWORD=your-supabase-password
```

(Replace with your Supabase password)

```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

(Generate a random string - you can use: https://randomkeygen.com/)

```
JWT_EXPIRES_IN=7d
```

```
PORT=3001
```

```
FRONTEND_URL=https://your-app.vercel.app
```

(We'll update this after deploying frontend - for now use: `http://localhost:3000`)

3. After adding all variables, Railway will automatically redeploy

### 2.5 Get Your Backend URL

1. Wait for deployment to complete (check the **Deployments** tab)
2. Once deployed, go to **Settings** tab
3. Scroll to **Domains** section
4. Click "Generate Domain" if no domain exists
5. Copy your Railway URL (e.g., `https://taskflow-backend.up.railway.app`)
6. **Save this URL - you'll need it for Step 3!**

**Test your backend:**

- Visit: `https://your-railway-url.railway.app/api`
- You should see a response (might be an error, but that's okay - it means it's running)

---

## Step 3: Deploy Frontend (Vercel) - 5 minutes

### 3.1 Push Code to GitHub (if not already)

1. Open terminal in your project folder
2. Run these commands:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3.2 Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel to access your repositories

### 3.3 Deploy Frontend

1. Click "Add New Project"
2. Find and select your **Vintage** repository
3. Click "Import"

### 3.4 Configure Frontend

1. In project settings:

   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

2. Click "Environment Variables"
3. Click "Add" and add:

   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-url.railway.app/api`
     (Replace with your actual Railway URL from Step 2.5)

4. Click "Save"
5. Click "Deploy"

### 3.5 Get Your Frontend URL

1. Wait for build to complete (~2-3 minutes)
2. Once deployed, you'll see "Congratulations!"
3. Copy your Vercel URL (e.g., `https://taskflow.vercel.app`)
4. **Save this URL!**

---

## Step 4: Connect Everything Together - 2 minutes

### 4.1 Update Backend CORS

1. Go back to Railway dashboard
2. Go to your backend service → **Variables** tab
3. Find `FRONTEND_URL` variable
4. Click the edit icon (pencil)
5. Update value to your Vercel URL: `https://your-app.vercel.app`
6. Click "Save"
7. Railway will automatically redeploy

### 4.2 Wait for Redeploy

- Wait 1-2 minutes for Railway to redeploy with new CORS settings

---

## Step 5: Test Everything - 5 minutes

### 5.1 Test Frontend

1. Visit your Vercel URL
2. You should see the landing page

### 5.2 Test Registration

1. Click "Sign In" → "Sign up" (or go to `/register`)
2. Create a test account:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Role: Manager (to get full access)
3. Click "Create Account"
4. You should be redirected to dashboard

### 5.3 Test Features

1. **Create a Project:**

   - Click "New Project"
   - Fill in name and description
   - Click "Create"
   - ✅ Should work!

2. **Create a Task:**

   - Click on the project you created
   - Click "New Task"
   - Fill in task details
   - Click "Create"
   - ✅ Should work!

3. **Test Notifications:**
   - Assign a task to yourself
   - Check notifications icon
   - ✅ Should receive notification!

### 5.4 If Something Doesn't Work

- Check browser console (F12) for errors
- Check Railway logs (Deployments tab → View Logs)
- Check Vercel build logs
- Verify all environment variables are set correctly

---

## Step 6: Take Screenshots/Video - 10 minutes

### 6.1 Screenshots to Take

1. Landing page
2. Login page
3. Dashboard (with projects)
4. Project view (with tasks)
5. Task creation form
6. Notifications view
7. Team members view
8. Role-based access (show different views for Admin vs Team Member)

### 6.2 Create Demo Video (Optional but Recommended)

1. Use screen recording (Windows: Win+G, Mac: Cmd+Shift+5)
2. Record:
   - Landing page walkthrough
   - Registration process
   - Creating a project
   - Creating and assigning tasks
   - Testing notifications
   - Showing role-based features
3. Keep it under 3 minutes
4. Upload to YouTube (unlisted) or include in GitHub repo

---

## Step 7: Prepare Your Submission - 5 minutes

### 7.1 Update README

1. Add your deployed URLs to README.md:

   ```markdown
   ## 🌐 Live Demo

   - Frontend: https://your-app.vercel.app
   - Backend API: https://your-backend.railway.app/api
   ```

### 7.2 Add Screenshots to GitHub

1. Create a `screenshots` folder in your repo
2. Add all screenshots
3. Update README to link to screenshots

### 7.3 Ensure GitHub Repo is Public

1. Go to your GitHub repository
2. Settings → Scroll to bottom
3. Under "Danger Zone" → "Change repository visibility"
4. Make sure it's set to "Public"

### 7.4 Create Submission Email

```
Subject: Task Management System Submission - Hiwot

Hi Sosh,

Thank you for the opportunity! I've completed the Task Management System challenge.

Here's what I've delivered:

1. **Live Demo**: [Your Vercel URL]
   - Fully functional and ready to test
   - Please register an account to explore all features

2. **Source Code**: [Your GitHub Repository URL]
   - Public repository with complete source code
   - Well-documented and organized

3. **Documentation**:
   - Complete setup instructions in README.md
   - API documentation included
   - Deployment guide provided

4. **Features Implemented**:
   ✅ All 7 required features
   ✅ Role-based access control (Admin/Manager vs Team Members)
   ✅ Real-time notifications via WebSocket
   ✅ Modern, responsive UI with dark mode
   ✅ Additional features: Issue tracking, progress visualization

5. **Screenshots/Demo**: Available in the repository

I've also included a detailed deployment guide if you'd like to run it locally.

Looking forward to your feedback!

Best regards,
Hiwot
```

---

## ✅ Final Checklist

Before submitting, verify:

- [ ] Database is set up and running
- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Can register a new account
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Can assign tasks
- [ ] Notifications work
- [ ] Role-based access works
- [ ] GitHub repo is public
- [ ] README is complete
- [ ] Screenshots are added
- [ ] All environment variables are set
- [ ] CORS is configured correctly

---

## 🆘 Troubleshooting

### Backend won't connect to database

- Double-check all database credentials in Railway
- Make sure DATABASE_HOST doesn't include `postgresql://` prefix
- Verify Supabase project is active

### CORS errors

- Ensure FRONTEND_URL in Railway matches your Vercel URL exactly
- Check that URL includes `https://`
- Wait for Railway to redeploy after changing variables

### Frontend can't connect to backend

- Verify NEXT_PUBLIC_API_URL in Vercel is correct
- Check that backend URL ends with `/api`
- Test backend URL directly in browser

### Build fails

- Check build logs in Vercel/Railway
- Ensure all dependencies are in package.json
- Check for TypeScript errors

---

## 🎉 You're Done!

Once everything is working:

1. Test thoroughly
2. Take screenshots
3. Update README
4. Send submission email
5. Celebrate! 🎊

Good luck! 🚀
