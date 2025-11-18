# 🚨 FIX: Use Supabase Connection Pooling (IPv4)

## The Problem

Your hostname `db.remtuxhqoqkoutfkjizi.supabase.co` resolves to IPv6, which Railway can't connect to.

## Solution: Use Connection Pooling (IPv4)

### Step 1: Get Connection Pooling URL from Supabase

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Click your project
3. Go to **Settings** (gear icon) → **Database**
4. Scroll down to **"Connection pooling"** section
5. You'll see two modes:

   - **Session mode** (recommended)
   - **Transaction mode**

6. Under **"Session mode"**, you'll see a connection string like:

   ```
   postgresql://postgres.remtuxhqoqkoutfkjizi:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

7. **Extract these values:**
   - **HOST**: `aws-0-us-west-1.pooler.supabase.com` (or similar - will have "pooler" in it)
   - **PORT**: `6543` (NOT 5432!)
   - **USER**: `postgres.remtuxhqoqkoutfkjizi` (note the project ID after the dot)

### Step 2: Update Railway Variables

In Railway → Your Service → **Variables** tab:

1. **DATABASE_HOST** = `aws-0-us-west-1.pooler.supabase.com` (the pooler hostname you found)
2. **DATABASE_PORT** = `6543` (change from 5432 to 6543!)
3. **DATABASE_USER** = `postgres.remtuxhqoqkoutfkjizi` (make sure it has the project ID)
4. Keep **DATABASE_PASSWORD** the same
5. Keep **DATABASE_NAME** = `postgres`

### Step 3: Save and Wait

1. Click **Save** on each variable
2. Railway will redeploy automatically
3. Wait 2-3 minutes
4. Check logs

---

## What to Look For in Supabase

In Supabase → Settings → Database → Connection pooling:

**Session mode connection string:**

```
postgresql://postgres.remtuxhqoqkoutfkjizi:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Extract:**

- Host: `aws-0-us-west-1.pooler.supabase.com`
- Port: `6543`
- User: `postgres.remtuxhqoqkoutfkjizi`

---

## Quick Checklist

- [ ] Found connection pooling section in Supabase
- [ ] Copied the pooler hostname (has "pooler" in it)
- [ ] Updated DATABASE_HOST in Railway
- [ ] Changed DATABASE_PORT to 6543
- [ ] Updated DATABASE_USER to include project ID (postgres.remtuxhqoqkoutfkjizi)
- [ ] Saved all variables
- [ ] Waited for redeploy
- [ ] Checked logs

---

**Tell me:**

1. What hostname do you see in Supabase's connection pooling? (should have "pooler" in it)
2. What port does it show? (should be 6543)
