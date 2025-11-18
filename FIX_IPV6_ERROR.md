# Fix IPv6 Connection Error - Use Connection Pooling

## The Problem

Even though `DATABASE_HOST` is correct, Supabase is resolving to IPv6, which Railway can't reach.

## Solution: Use Supabase Connection Pooling (IPv4)

### Step 1: Get Connection Pooling URL from Supabase

1. Go to **Supabase Dashboard**
2. Click your project
3. Go to **Settings** → **Database**
4. Scroll down to **"Connection pooling"** section
5. Find **"Session mode"** or **"Transaction mode"**
6. You'll see a connection string like:
   ```
   postgresql://postgres.remtuxhqoqkoutfkjizi:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. **Extract the HOST** from this URL:
   - It will be something like: `aws-0-us-west-1.pooler.supabase.com`
   - Or: `pooler.supabase.com` with a region

### Step 2: Update Railway Variables

In Railway → Variables tab, update:

1. **DATABASE_HOST** = `aws-0-us-west-1.pooler.supabase.com` (or whatever pooler host you got)
2. **DATABASE_PORT** = `6543` (NOT 5432 - pooling uses port 6543)
3. Keep all other variables the same

### Step 3: Alternative - Direct IPv4 Connection

If you can't find connection pooling, try this:

1. In Supabase → Settings → Database
2. Look for **"Connection string"** (not pooling)
3. Copy the connection string
4. The host might be different - use that hostname

### Step 4: Wait for Redeploy

Railway will redeploy automatically. Check logs after 2-3 minutes.

---

## Quick Check

**What to look for in Supabase:**

- Connection pooling section
- Port should be **6543** (not 5432)
- Host will have "pooler" in the name

**Tell me:**

1. What hostname do you see in Supabase's connection pooling section?
2. What port does it show? (should be 6543)
