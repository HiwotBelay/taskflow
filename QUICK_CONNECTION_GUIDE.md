# 🔍 Quick Guide: Finding Supabase Connection Details

If you can't find the connection string, here's how to get what you need:

## Method 1: Get Host from Project URL (Easiest!)

1. In Supabase, go to **Settings** → **API** (not Database)
2. Look for **Project URL** - it will look like:
   ```
   https://abcdefghijklmnop.supabase.co
   ```
3. Your **Database Host** is: `db.abcdefghijklmnop.supabase.co`
   - Just replace `https://` with `db.`
   - Remove the trailing `/` if any

**Example:**

- Project URL: `https://xyzabc123.supabase.co`
- Database Host: `db.xyzabc123.supabase.co`

## Method 2: Connection Pooling Section

1. Go to **Settings** → **Database**
2. Look for **"Connection pooling configuration"** section (you mentioned seeing this)
3. Click on **"Shared Pooler"** or look for connection details there
4. Sometimes the connection string is shown in this section

## Method 3: Construct It Yourself

You need these 5 pieces of information:

1. **Host**: Get from Project URL (Method 1 above)

   - Format: `db.xxxxx.supabase.co`

2. **Port**: Always `5432`

3. **Database**: Always `postgres`

4. **User**: Always `postgres`

5. **Password**: The password you created when setting up the project
   - If you forgot it: Go to **Settings** → **Database** → Click **"Reset database password"**

## What to Use in Railway

Once you have the above, in Railway you'll add:

```
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password-here
```

## Still Can't Find It?

Try this:

1. Go to **SQL Editor** in left sidebar
2. Create a new query
3. Sometimes connection info is shown in the SQL editor interface
4. Or check the browser's developer console (F12) - sometimes connection details are in network requests

## Quick Test

Once you have the host, you can verify it's correct:

- Host should look like: `db.xxxxx.supabase.co` or `aws-0-us-west-1.pooler.supabase.com`
- It should NOT have `https://` or `http://` in front
- It should NOT have `/` at the end
