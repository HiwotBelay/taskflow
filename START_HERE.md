# 🚀 Complete Deployment Guide - Start Here!

Follow these steps **IN ORDER**. Don't skip any step!

---

## STEP 0: Push Your Code to GitHub (5 minutes)

### 0.1 Check if you have a GitHub repository

**If you DON'T have a GitHub repo yet:**

1. Go to [https://github.com](https://github.com)
2. Sign up or log in
3. Click the **"+"** icon (top right) → **"New repository"**
4. Fill in:
   - **Repository name**: `taskflow` (or any name)
   - **Description**: Task Management System
   - **Visibility**: Choose **Public** (important!)
   - **DO NOT** check "Initialize with README" (you already have code)
5. Click **"Create repository"**

### 0.2 Push your code to GitHub

1. Open **PowerShell** or **Command Prompt** on your computer
2. Navigate to your project folder:
   ```bash
   cd C:\Users\HP\Desktop\Vintage
   ```
3. Check if git is initialized:
   ```bash
   git status
   ```
   - If it says "not a git repository", run: `git init`
4. Add all files:
   ```bash
   git add .
   ```
5. Commit:
   ```bash
   git commit -m "Initial commit - TaskFlow project"
   ```
6. Connect to GitHub (replace YOUR-USERNAME and YOUR-REPO-NAME):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```
   Example: `git remote add origin https://github.com/hiwot/taskflow.git`
7. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```
8. If asked for username/password, use your GitHub username and a **Personal Access Token** (not password)
   - To create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

**✅ Check:** Go to your GitHub repository - you should see all your files!

---

## STEP 1: Set Up Database (Supabase) - 10 minutes

### 1.1 Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Click **"Sign up with GitHub"** (easiest)
4. Authorize Supabase to access your GitHub
5. You're now logged in!

### 1.2 Create New Project

1. Click **"New Project"** button (big green button)
2. Fill in the form:
   - **Name**: `taskflow-db` (or any name you like)
   - **Database Password**:
     - Create a STRONG password (SAVE THIS! Write it down!)
     - Example: `MySecurePass123!@#`
     - **IMPORTANT: Save this password - you'll need it!**
   - **Region**: Choose closest to you (e.g., "West US (California)")
3. Click **"Create new project"**
4. **Wait 2-3 minutes** for project to be created (you'll see a loading screen)

### 1.3 Get Database Connection Details

1. Once project is ready, you'll see the dashboard
2. Click **"Settings"** (gear icon) in the left sidebar (at the bottom)
3. Click **"API"** in the settings menu (on the left)
4. Find **"Project URL"** - it looks like:
   ```
   https://remtuxhqoqkoutfkjizi.supabase.co
   ```
5. **Copy this URL** - you'll need it!

6. Now, your **Database Host** is: `db.remtuxhqoqkoutfkjizi.supabase.co`
   - Just replace `https://` with `db.`
   - Remove any `/` at the end

**✅ Write down these details:**

- Database Host: `db.xxxxx.supabase.co` (from Project URL)
- Port: `5432`
- Database Name: `postgres`
- User: `postgres`
- Password: (the one you created in step 1.2)

---

## STEP 2: Deploy Backend (Railway) - 15 minutes

### 2.1 Create Railway Account

1. Go to [https://railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Click **"Sign up with GitHub"**
4. Authorize Railway to access your GitHub
5. You're logged in!

### 2.2 Deploy Your Code

1. On Railway dashboard, click **"New Project"** (big button)
2. Select **"Deploy from GitHub repo"**
3. If asked, click **"Configure GitHub App"** and authorize
4. You'll see a list of your GitHub repositories
5. Find and click on your repository (the one you created in Step 0)
6. Click **"Deploy Now"**
7. **Wait 1-2 minutes** - Railway will start deploying

### 2.3 Configure Backend

1. After deployment starts, you'll see a service card appear
2. **Click on the service** (it might show an error - that's OK!)
3. You'll see tabs: **Deployments**, **Metrics**, **Settings**, **Variables**, **Logs**
4. Click **"Settings"** tab
5. Find **"Root Directory"** - click in the field
6. Type: `backend`
7. Find **"Start Command"** - click in the field
8. Type: `npm run start:prod`
9. Click **"Save"** or checkmark

### 2.4 Add Environment Variables

1. Click **"Variables"** tab (at the top)
2. You'll see **"New Variable"** button - click it
3. Add these **ONE BY ONE** (click "New Variable" for each):

**Variable 1:**

- Name: `DATABASE_HOST`
- Value: `db.remtuxhqoqkoutfkjizi.supabase.co` (use YOUR host from Step 1.3)
- Click **"Add"**

**Variable 2:**

- Name: `DATABASE_PORT`
- Value: `5432`
- Click **"Add"**

**Variable 3:**

- Name: `DATABASE_NAME`
- Value: `postgres`
- Click **"Add"**

**Variable 4:**

- Name: `DATABASE_USER`
- Value: `postgres`
- Click **"Add"**

**Variable 5:**

- Name: `DATABASE_PASSWORD`
- Value: (paste your Supabase password from Step 1.2)
- Click **"Add"**

**Variable 6:**

- Name: `JWT_SECRET`
- Value: (go to https://randomkeygen.com/ and copy a "CodeIgniter Encryption Keys" - should be long, like 32+ characters)
- Click **"Add"**

**Variable 7:**

- Name: `JWT_EXPIRES_IN`
- Value: `7d`
- Click **"Add"**

**Variable 8:**

- Name: `PORT`
- Value: `3001`
- Click **"Add"**

**Variable 9:**

- Name: `FRONTEND_URL`
- Value: `http://localhost:3000` (we'll update this later)
- Click **"Add"**

### 2.5 Get Your Backend URL

1. After adding all variables, Railway will automatically redeploy
2. Go to **"Deployments"** tab and wait for it to finish (2-3 minutes)
3. Go to **"Settings"** tab
4. Scroll to **"Domains"** section
5. If you see a URL like `xxxxx.up.railway.app`, that's your backend URL!
6. If not, click **"Generate Domain"**
7. **Copy this URL** - it looks like: `https://taskflow-backend.up.railway.app`
8. **SAVE THIS URL!**

---

## STEP 3: Deploy Frontend (Vercel) - 10 minutes

### 3.1 Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub
5. You're logged in!

### 3.2 Deploy Frontend

1. Click **"Add New Project"** button
2. Find and select your repository (the same one from Step 0)
3. Click **"Import"**

### 3.3 Configure Frontend

1. In the project settings:

   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: Click **"Edit"** → Type: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

2. Click **"Environment Variables"** section
3. Click **"Add"** button
4. Add this variable:

   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-url.railway.app/api`
     - Replace `your-railway-url.railway.app` with YOUR actual Railway URL from Step 2.5
   - Click **"Save"**

5. Click **"Deploy"** button
6. **Wait 2-3 minutes** for build to complete

### 3.4 Get Your Frontend URL

1. Once deployment finishes, you'll see "Congratulations!"
2. Your site URL will be shown - it looks like: `https://taskflow.vercel.app`
3. **Copy this URL!**
4. **SAVE THIS URL!**

---

## STEP 4: Connect Everything - 2 minutes

### 4.1 Update Backend CORS

1. Go back to **Railway** dashboard
2. Click on your backend service
3. Go to **"Variables"** tab
4. Find `FRONTEND_URL` variable
5. Click the edit icon (pencil)
6. Change value to your Vercel URL: `https://your-app.vercel.app`
   - Use the URL from Step 3.4
7. Click **"Save"**
8. Railway will automatically redeploy (wait 1-2 minutes)

---

## STEP 5: Test Everything - 5 minutes

### 5.1 Test Your Site

1. Open your Vercel URL in a browser
2. You should see the landing page!

### 5.2 Test Registration

1. Click **"Sign In"** → **"Sign up"** (or go to `/register`)
2. Create an account:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Role: **Manager** (to get full access)
3. Click **"Create Account"**
4. You should be redirected to dashboard!

### 5.3 Test Features

1. **Create a Project:**

   - Click "New Project"
   - Fill in name and description
   - Click "Create"
   - ✅ Should work!

2. **Create a Task:**
   - Click on the project
   - Click "New Task"
   - Fill in details
   - Click "Create"
   - ✅ Should work!

---

## ✅ Checklist

Before submitting, make sure:

- [ ] Code is pushed to GitHub (public repository)
- [ ] Supabase database is set up
- [ ] Backend is deployed on Railway
- [ ] Frontend is deployed on Vercel
- [ ] Can register a new account
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Everything works!

---

## 🆘 If Something Doesn't Work

**Backend won't start:**

- Check Railway logs (Deployments tab → View Logs)
- Verify all 9 environment variables are added correctly
- Check that Root Directory is `backend`
- Check that Start Command is `npm run start:prod`

**Frontend won't build:**

- Check Vercel build logs
- Verify Root Directory is `frontend`
- Check that NEXT_PUBLIC_API_URL is correct

**Can't connect to database:**

- Double-check DATABASE_HOST (should be `db.xxxxx.supabase.co`)
- Verify DATABASE_PASSWORD is correct
- Make sure Supabase project is active

**CORS errors:**

- Make sure FRONTEND_URL in Railway matches your Vercel URL exactly
- Wait for Railway to redeploy after changing variables

---

## 🎉 You're Done!

Once everything works:

1. Test all features
2. Take screenshots
3. Send submission email with your Vercel URL!

Good luck! 🚀
