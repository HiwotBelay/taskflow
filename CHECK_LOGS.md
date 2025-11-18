# Check Railway Logs - Find the Error

## Step 1: View Logs

1. In Railway, click on your **service**
2. Click **"Deployments"** tab
3. Click on the **latest deployment** (the one that says "Deployment successful")
4. Click **"View Logs"** or scroll down to see logs
5. **Scroll to the BOTTOM** of the logs - that's where the error will be

## What to Look For

The logs will show you the actual error. Common errors:

### Error 1: Database Connection Failed

```
ERROR [TypeOrmModule] Unable to connect to the database
```

**Fix:** Check DATABASE_HOST in Variables tab

### Error 2: Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Fix:** Change PORT to a different number

### Error 3: Missing Environment Variables

```
Error: DATABASE_HOST is required
```

**Fix:** Add missing variables

### Error 4: Application Started But Wrong Port

```
🚀 Backend server running on http://localhost:3001/api
```

**This is OK** - but Railway might need PORT=0 or different config

## What to Do

1. **Copy the LAST 20-30 lines of logs** (the error messages)
2. **Share them with me** - I'll tell you exactly what to fix

## Quick Check First

Before checking logs, verify in Railway → Variables tab:

- [ ] DATABASE_HOST = `db.remtuxhqoqkoutfkjizi.supabase.co` (no https://)
- [ ] DATABASE_PORT = `5432`
- [ ] DATABASE_NAME = `postgres`
- [ ] DATABASE_USER = `postgres`
- [ ] DATABASE_PASSWORD = (your password)
- [ ] JWT_SECRET = (long random string)
- [ ] JWT_EXPIRES_IN = `7d`
- [ ] PORT = `3001`
- [ ] FRONTEND_URL = `http://localhost:3000`

**Go check the logs now and share the error message!**
