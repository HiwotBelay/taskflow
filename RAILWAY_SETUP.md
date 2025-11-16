# 🚂 Railway Setup - Step by Step (For Beginners)

## Step 1: Create Railway Account

1. Go to [https://railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Click **"Sign up with GitHub"**
4. Authorize Railway to access your GitHub account
5. You're now logged in!

## Step 2: Deploy Your Repository

1. On Railway dashboard, click **"New Project"** (big button)
2. Select **"Deploy from GitHub repo"**
3. If asked, click **"Configure GitHub App"** and authorize
4. You'll see a list of your GitHub repositories
5. Find and click on your **"Vintage"** repository (or whatever you named it)
6. Click **"Deploy Now"**

**Wait:** Railway will start deploying automatically (this takes 1-2 minutes)

## Step 3: Configure Backend Settings

1. After deployment starts, you'll see a service card appear
2. **Click on the service** (it might be named "Vintage" or similar)
3. You'll see tabs at the top: **Deployments**, **Metrics**, **Settings**, **Variables**, **Logs**
4. Click on **"Settings"** tab
5. Scroll down and find **"Root Directory"**
6. Click the edit icon (pencil) or click in the field
7. Type: `backend`
8. Scroll down to **"Start Command"**
9. Click in that field
10. Type: `npm run start:prod`
11. Click **"Save"** or the checkmark

## Step 4: Add Environment Variables (THIS IS WHERE YOU PUT THE DATABASE DETAILS!)

1. Still in your service, click on **"Variables"** tab (at the top)
2. You'll see a section that says **"Variables"** with a button **"New Variable"**
3. Click **"New Variable"** button

### Add Variable 1: DATABASE_HOST

1. In the **"Name"** field, type: `DATABASE_HOST`
2. In the **"Value"** field, type: `db.remtuxhqoqkoutfkjizi.supabase.co`
3. Click **"Add"** or press Enter

### Add Variable 2: DATABASE_PORT

1. Click **"New Variable"** again
2. **Name**: `DATABASE_PORT`
3. **Value**: `5432`
4. Click **"Add"**

### Add Variable 3: DATABASE_NAME

1. Click **"New Variable"** again
2. **Name**: `DATABASE_NAME`
3. **Value**: `postgres`
4. Click **"Add"**

### Add Variable 4: DATABASE_USER

1. Click **"New Variable"** again
2. **Name**: `DATABASE_USER`
3. **Value**: `postgres`
4. Click **"Add"**

### Add Variable 5: DATABASE_PASSWORD

1. Click **"New Variable"** again
2. **Name**: `DATABASE_PASSWORD`
3. **Value**: (Type your Supabase password here - the one you created when setting up Supabase)
4. Click **"Add"**

### Add Variable 6: JWT_SECRET

1. Click **"New Variable"** again
2. **Name**: `JWT_SECRET`
3. **Value**: (Generate a random string - go to https://randomkeygen.com/ and copy a "CodeIgniter Encryption Keys" - it should be at least 32 characters)
4. Click **"Add"**

### Add Variable 7: JWT_EXPIRES_IN

1. Click **"New Variable"** again
2. **Name**: `JWT_EXPIRES_IN`
3. **Value**: `7d`
4. Click **"Add"**

### Add Variable 8: PORT

1. Click **"New Variable"** again
2. **Name**: `PORT`
3. **Value**: `3001`
4. Click **"Add"**

### Add Variable 9: FRONTEND_URL (Temporary)

1. Click **"New Variable"** again
2. **Name**: `FRONTEND_URL`
3. **Value**: `http://localhost:3000` (we'll update this later after deploying frontend)
4. Click **"Add"**

## Step 5: Wait for Deployment

1. After adding all variables, Railway will automatically start redeploying
2. Go to **"Deployments"** tab to watch the progress
3. Wait for it to finish (usually 2-3 minutes)
4. You'll see "Build successful" when done

## Step 6: Get Your Backend URL

1. Go to **"Settings"** tab
2. Scroll down to **"Domains"** section
3. If you see a domain like `xxxxx.up.railway.app`, that's your backend URL!
4. If you don't see one, click **"Generate Domain"**
5. **Copy this URL** - it looks like: `https://taskflow-backend.up.railway.app`
6. **SAVE THIS URL** - you'll need it for Vercel!

## Step 7: Test Your Backend

1. Open a new browser tab
2. Go to: `https://your-railway-url.railway.app/api`
3. You might see an error page, but that's OK - it means your backend is running!
4. If you see "Cannot GET /api", that's actually good - it means the server is working!

## ✅ Checklist - Did you add all 9 variables?

- [ ] DATABASE_HOST = `db.remtuxhqoqkoutfkjizi.supabase.co`
- [ ] DATABASE_PORT = `5432`
- [ ] DATABASE_NAME = `postgres`
- [ ] DATABASE_USER = `postgres`
- [ ] DATABASE_PASSWORD = (your Supabase password)
- [ ] JWT_SECRET = (random 32+ character string)
- [ ] JWT_EXPIRES_IN = `7d`
- [ ] PORT = `3001`
- [ ] FRONTEND_URL = `http://localhost:3000` (temporary)

## 🆘 Troubleshooting

**If deployment fails:**

- Check the **"Logs"** tab to see error messages
- Make sure Root Directory is set to `backend`
- Make sure Start Command is `npm run start:prod`
- Verify all environment variables are spelled correctly

**If you see database connection errors:**

- Double-check DATABASE_HOST (should be `db.remtuxhqoqkoutfkjizi.supabase.co`)
- Make sure DATABASE_PASSWORD is correct
- Check that your Supabase project is active

## Next Steps

Once your backend is deployed and you have the Railway URL:

1. Proceed to Step 3: Deploy Frontend to Vercel
2. Use your Railway URL in Vercel's environment variables

Good luck! 🚀
