# Fix Railway Build Error - Step by Step

## The Error

"Script start.sh not found" means Railway doesn't know how to build your app.

## Fix This Now (5 minutes)

### Step 1: Go to Railway Settings

1. In Railway dashboard, click on your **service** (the one showing the error)
2. Click **"Settings"** tab at the top

### Step 2: Set These 3 Things (VERY IMPORTANT!)

**1. Root Directory:**

- Find **"Root Directory"** field
- Click in the field (or edit icon)
- Type: `backend`
- Press Enter or click Save

**2. Build Command:**

- Find **"Build Command"** field
- Click in the field
- Type: `npm install && npm run build`
- Press Enter or click Save

**3. Start Command:**

- Find **"Start Command"** field
- Click in the field
- Type: `npm run start:prod`
- Press Enter or click Save

### Step 3: Verify

After setting all 3, check:

- ✅ Root Directory = `backend`
- ✅ Build Command = `npm install && npm run build`
- ✅ Start Command = `npm run start:prod`

### Step 4: Wait for Redeploy

1. Railway will automatically start redeploying
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Watch the logs - you should see:
   - "Installing dependencies..."
   - "Building..."
   - "Starting..."

### Step 5: Check for Success

After 2-3 minutes, check logs:

- ✅ If you see "🚀 Backend server running on..." = SUCCESS!
- ❌ If you see database errors = We'll fix DATABASE_HOST next

## Visual Guide

```
Railway Dashboard
  └─ Your Service (click this)
      └─ Settings Tab ← CLICK HERE!
          ├─ Root Directory: backend ← SET THIS!
          ├─ Build Command: npm install && npm run build ← SET THIS!
          └─ Start Command: npm run start:prod ← SET THIS!
```

## After Setting These

1. Railway will automatically redeploy
2. Wait 2-3 minutes
3. Check the Deployments tab
4. Tell me what you see in the logs!

---

**Do this now and tell me when you've set all 3 values!**
