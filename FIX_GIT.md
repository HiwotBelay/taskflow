# Fix Git Push Error - Quick Steps

The error is because the `.next` folder` is locked (probably your dev server is running).

## Quick Fix:

### Step 1: Stop Any Running Servers

1. If you have the frontend running (npm run dev), press `Ctrl+C` to stop it
2. Close any terminals running the backend or frontend

### Step 2: Fix Git (Run these commands one by one)

Open PowerShell in your project folder and run:

```powershell
# Remove .next from git tracking
git rm -r --cached frontend/.next

# Add the updated .gitignore
git add .gitignore

# Add all other files
git add .

# Commit
git commit -m "Initial commit - TaskFlow project"

# Push to GitHub
git push -u origin main
```

### If you get "Permission denied" error:

1. Close VS Code/Cursor
2. Close any terminals
3. Wait 10 seconds
4. Try the commands again

### If you still get errors:

Run this to skip the problematic file:

```powershell
git add --ignore-errors .
git commit -m "Initial commit"
git push -u origin main
```
