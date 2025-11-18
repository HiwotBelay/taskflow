# Fix Railway "Script start.sh not found" Error

Railway can't find how to build your app. Here's how to fix it:

## Solution: Configure Railway Settings

### Step 1: Go to Railway Settings

1. In Railway dashboard, click on your service (the one that's failing)
2. Click **"Settings"** tab (at the top)

### Step 2: Set Root Directory

1. Find **"Root Directory"** field
2. Click in the field (or click edit icon)
3. Type: `backend`
4. Click **"Save"** or checkmark

### Step 3: Set Build Command

1. Scroll down to **"Build Command"** field
2. Click in the field
3. Type: `npm install && npm run build`
4. Click **"Save"**

### Step 4: Set Start Command

1. Find **"Start Command"** field
2. Click in the field
3. Type: `npm run start:prod`
4. Click **"Save"**

### Step 5: Redeploy

1. After saving, Railway will automatically redeploy
2. Go to **"Deployments"** tab
3. Wait for it to finish (2-3 minutes)
4. Check the logs to see if it's working

## Alternative: Use railway.json (I created this file for you)

I've created a `railway.json` file in your project root. After you push it to GitHub:

1. Railway should automatically detect it
2. It will use the settings from the file
3. Make sure Root Directory is still set to `backend` in Railway settings

## What to Check

After configuring:

- ✅ Root Directory = `backend`
- ✅ Build Command = `npm install && npm run build`
- ✅ Start Command = `npm run start:prod`

Then wait for redeployment to complete!

