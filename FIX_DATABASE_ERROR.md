# Fix Database Connection Error

The error shows Railway can't connect to your database. Here's how to fix it:

## The Problem

Railway is trying to connect to an IPv6 address which is failing. This usually means:

1. DATABASE_HOST is set incorrectly
2. Or it's trying to use IPv6 instead of IPv4

## Solution: Fix DATABASE_HOST in Railway

### Step 1: Check Your DATABASE_HOST Variable

1. Go to Railway → Your Service → **Variables** tab
2. Find `DATABASE_HOST`
3. Check what value it has

### Step 2: Fix DATABASE_HOST

**It should be EXACTLY:**

```
db.remtuxhqoqkoutfkjizi.supabase.co
```

**NOT:**

- ❌ `https://db.remtuxhqoqkoutfkjizi.supabase.co`
- ❌ `postgresql://postgres:...@db.remtuxhqoqkoutfkjizi.supabase.co`
- ❌ Any IP address
- ❌ Any IPv6 address

### Step 3: Update DATABASE_HOST

1. In Railway → Variables tab
2. Find `DATABASE_HOST`
3. Click the edit icon (pencil)
4. Make sure the value is: `db.remtuxhqoqkoutfkjizi.supabase.co`
   - No `https://`
   - No `postgresql://`
   - No password or user in it
   - Just the hostname!
5. Click **Save**

### Step 4: Alternative - Use Connection Pooling URL

If the direct host doesn't work, try Supabase's connection pooling:

1. Go to Supabase → Settings → Database
2. Look for **"Connection pooling"** section
3. Find **"Session mode"** connection string
4. Extract the host from it (it might look like `aws-0-us-west-1.pooler.supabase.com`)
5. Use that as DATABASE_HOST instead

### Step 5: Verify All Variables

Make sure all these are set correctly:

```
DATABASE_HOST=db.remtuxhqoqkoutfkjizi.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password-here
```

### Step 6: Redeploy

After fixing DATABASE_HOST:

1. Railway will automatically redeploy
2. Wait 2-3 minutes
3. Check logs again

## Still Not Working?

If it still fails:

1. Check Supabase → Settings → Database → Network Restrictions
2. Make sure "Restrict all access" is NOT enabled
3. Or add Railway's IP range (but this is usually not needed)

Let me know what happens after you fix DATABASE_HOST!
