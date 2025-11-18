# 🚨 URGENT FIX - Database Connection Error

## The Problem

Railway is trying to connect to an IPv6 address which is failing. Your `DATABASE_HOST` is set incorrectly.

## Fix This RIGHT NOW (2 minutes)

### Step 1: Go to Railway Variables

1. Railway → Your Service → **Variables** tab
2. Find `DATABASE_HOST`
3. **What does it show right now?** (Copy the exact value)

### Step 2: Fix DATABASE_HOST

**It MUST be exactly this:**

```
db.remtuxhqoqkoutfkjizi.supabase.co
```

**NOT:**

- ❌ Any IP address (like `2a05:d016:...`)
- ❌ `https://db.remtuxhqoqkoutfkjizi.supabase.co`
- ❌ `postgresql://postgres:...@...`
- ❌ Any IPv6 address

### Step 3: Update It

1. Click the edit icon (pencil) next to `DATABASE_HOST`
2. Delete everything in the value field
3. Type exactly: `db.remtuxhqoqkoutfkjizi.supabase.co`
4. Click **Save**

### Step 4: Alternative - Use Connection Pooling

If the direct host doesn't work, try Supabase's connection pooling:

1. Go to Supabase → Settings → Database
2. Scroll to **"Connection pooling"** section
3. Find **"Session mode"** - copy the connection string
4. Extract the host (it might be like `aws-0-us-west-1.pooler.supabase.com`)
5. Use that as DATABASE_HOST instead

### Step 5: Wait for Redeploy

1. Railway will automatically redeploy
2. Wait 2-3 minutes
3. Check logs again

## What Your DATABASE_HOST Should Look Like

✅ **CORRECT:**

```
db.remtuxhqoqkoutfkjizi.supabase.co
```

❌ **WRONG:**

```
2a05:d016:571:a412:e98b:6570:93ab:2f04
https://db.remtuxhqoqkoutfkjizi.supabase.co
postgresql://postgres:pass@db.remtuxhqoqkoutfkjizi.supabase.co:5432/postgres
```

## Do This Now

1. Go to Railway → Variables
2. Check what `DATABASE_HOST` shows
3. Change it to: `db.remtuxhqoqkoutfkjizi.supabase.co`
4. Save
5. Wait for redeploy
6. Check logs

**Tell me what DATABASE_HOST shows right now in Railway!**
