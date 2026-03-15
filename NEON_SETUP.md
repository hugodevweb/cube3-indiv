# Neon Postgres Setup Guide

## Why Neon?
- Official Vercel partner (replaced Vercel Postgres)
- Serverless Postgres with auto-scaling
- Generous free tier (0.5GB storage, unlimited databases)
- Built-in connection pooling
- Perfect for Prisma

## Step-by-Step Setup

### 1. Create Neon Account

Go to: **https://neon.tech/**

- Click **"Sign Up"**
- Use GitHub login (recommended) or email
- Verify your email if needed

### 2. Create a New Project

After signing in:

1. Click **"Create a project"** or **"New Project"**
2. Configure:
   - **Project name**: `collector-shop`
   - **Postgres version**: 16 (latest, default)
   - **Region**: Choose closest to you (e.g., `US East (Ohio)` or `Europe (Frankfurt)`)
3. Click **"Create Project"**

### 3. Get Connection Strings

After project creation, you'll see the **Connection Details** page with:

- **Database**: `neondb` (default)
- **Role**: `neondb_owner` (default)
- **Connection string** with a dropdown

**Important**: You need TWO connection strings:

#### A. Pooled Connection (for Prisma queries)
1. In the connection string dropdown, select **"Pooled connection"**
2. Copy the connection string (looks like):
   ```
   postgres://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15&pool_timeout=15&socket_timeout=15
   ```
3. **Add `?pgbouncer=true` to the end** (or replace existing query params):
   ```
   postgres://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15
   ```
   This is for `POSTGRES_PRISMA_URL`

#### B. Direct Connection (for migrations)
1. In the connection string dropdown, select **"Direct connection"** or **"Connection string"**
2. Copy the connection string (looks like):
   ```
   postgres://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   This is for `POSTGRES_URL_NON_POOLING`

### 4. Connection String Format

Your `.env.local` should have:

```env
# Neon Postgres - Pooled connection (for queries)
POSTGRES_PRISMA_URL="postgres://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"

# Neon Postgres - Direct connection (for migrations)
POSTGRES_URL_NON_POOLING="postgres://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Auth.js
NEXTAUTH_SECRET="7V5chL4mYICTbdemjkkcXs3X38fse3fSzyRYuCpK62c="
NEXTAUTH_URL="http://localhost:3001"
```

**Note**: Both URLs point to the same database, just different connection methods.

### 5. Find Connection Strings Later

If you need to find the connection strings again:
1. Go to https://console.neon.tech/
2. Click on your project (`collector-shop`)
3. Go to **Dashboard** tab
4. Scroll to **Connection Details**
5. Toggle between "Pooled connection" and "Direct connection"

## Next Steps

After getting your connection strings:
1. ✅ Update `.env.local` with both connection strings
2. ✅ Run `npx prisma generate`
3. ✅ Run `npx prisma db push` (creates tables)
4. ✅ Run `npx prisma db seed` (adds demo data)
5. ✅ Test with `npm run dev`

## Troubleshooting

### Error: "Can't reach database server"
- Check that `sslmode=require` is in your connection string
- Verify the connection string is correct (no extra spaces)
- Try adding `&connect_timeout=30` for slower connections

### Error: "Connection timeout"
- Neon databases auto-suspend after inactivity
- First connection may take 3-5 seconds to wake up
- This is normal and only happens on first request

### View Database in Neon Console
1. Go to https://console.neon.tech/
2. Click your project
3. Go to **Tables** tab
4. You'll see your `items`, `users`, etc. tables after pushing schema

## Free Tier Limits

Neon Free Tier includes:
- ✅ 0.5 GB storage per project
- ✅ Unlimited databases
- ✅ 10 projects
- ✅ Auto-suspend after 5 minutes of inactivity
- ✅ Unlimited data transfer

Perfect for development and small production apps!
