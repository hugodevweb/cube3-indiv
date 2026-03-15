# Vercel Postgres Setup Guide

## Step 1: Install Vercel CLI

First, let's install the Vercel CLI globally:

```bash
npm install -g vercel
```

Then login to Vercel:

```bash
vercel login
```

This will open your browser to authenticate. If you don't have a Vercel account yet, create one (it's free).

## Step 2: Link Your Project

Run this command in your project directory:

```bash
vercel link
```

You'll be asked:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No (since this is new)
4. **What's your project's name?** → `collector-shop` (or any name you prefer)
5. **In which directory is your code located?** → `./` (current directory)

This creates a `.vercel` folder with your project configuration.

## Step 3: Create Vercel Postgres Database

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click on your project (`collector-shop`)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a database name (e.g., `collector-db`)
7. Select a region close to you (e.g., `Washington, D.C., USA (iad1)`)
8. Click **Create**

### Option B: Using Vercel CLI

```bash
vercel env pull .env.local
```

This will pull environment variables if any exist. Then:

```bash
# This command helps you create a Postgres database
vercel storage create postgres collector-db
```

## Step 4: Get Connection Strings

After creating the database:

1. In the Vercel Dashboard → Your Project → Storage → Your Postgres Database
2. Go to the **`.env.local`** tab or **Quickstart** section
3. You'll see two important connection strings:
   - `POSTGRES_PRISMA_URL` (for Prisma - uses connection pooling)
   - `POSTGRES_URL_NON_POOLING` (for direct connections, used for migrations)

Copy these values!

## Step 5: Update Local Environment Variables

Your `.env.local` file should look like this:

```env
# Vercel Postgres - Pooled connection (for queries)
POSTGRES_PRISMA_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"

# Vercel Postgres - Direct connection (for migrations)
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?connect_timeout=15"

# Auth.js (already set)
NEXTAUTH_SECRET="7V5chL4mYICTbdemjkkcXs3X38fse3fSzyRYuCpK62c="
NEXTAUTH_URL="http://localhost:3001"
```

Replace the placeholder URLs with your actual connection strings from Vercel.

## Step 6: Push Database Schema

Now that we have a database, let's create the tables:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push
```

You should see output like:
```
🚀  Your database is now in sync with your Prisma schema.
```

## Step 7: Seed the Database

Populate with demo data:

```bash
npx prisma db seed
```

You should see:
```
✅ Seeded 2 users and 10 items
```

## Step 8: Verify with Prisma Studio

Open Prisma Studio to view your data:

```bash
npx prisma studio
```

This opens a browser at `http://localhost:5555` where you can:
- See your `users` table (2 demo users)
- See your `items` table (10 collectible items)
- Browse and edit data visually

## Step 9: Test Locally

Start your Next.js dev server:

```bash
npm run dev
```

Visit these URLs to test:

1. **Health Check**: http://localhost:3001/api/health
   - Should return: `{"status":"ok","timestamp":"...","database":"connected"}`

2. **Items API**: http://localhost:3001/api/items
   - Should return: Array of 10 items

3. **Metrics API**: http://localhost:3001/api/metrics
   - Should return: `{"items":10,"users":2,"timestamp":"..."}`

4. **Sign In Page**: http://localhost:3001/auth/signin
   - Try logging in with: `seller@demo.com` / `demo123`

5. **User Profile** (after signing in): http://localhost:3001/api/user/profile
   - Should return your user data

## Step 10: Configure Environment Variables in Vercel

For production deployments, add the environment variables to Vercel:

### Using Vercel Dashboard:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add these variables for **Production**, **Preview**, and **Development**:
   - `POSTGRES_PRISMA_URL` → (copy from your database settings)
   - `POSTGRES_URL_NON_POOLING` → (copy from your database settings)
   - `NEXTAUTH_SECRET` → Generate a new one for production:
     ```bash
     openssl rand -base64 32
     ```
   - `NEXTAUTH_URL` → Your production domain (e.g., `https://collector-shop.vercel.app`)

### Using Vercel CLI:

```bash
# Set production environment variables
vercel env add NEXTAUTH_SECRET production
# Paste your production secret when prompted

vercel env add NEXTAUTH_URL production
# Enter: https://your-domain.vercel.app
```

**Note**: `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` are automatically added when you create the Postgres database in Vercel.

## Step 11: Deploy to Production

Deploy your app:

```bash
vercel --prod
```

This will:
1. Build your Next.js app
2. Run Prisma generate
3. Deploy to production
4. Give you a production URL (e.g., `https://collector-shop.vercel.app`)

After deployment, the database schema will already exist (you pushed it in step 6), but you may need to seed the production database:

### Seed Production Database

You can create a one-time seed API route:

Create `app/api/seed/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  // Add authentication check here in production!
  try {
    // Check if already seeded
    const existingUsers = await prisma.user.count()
    if (existingUsers > 0) {
      return NextResponse.json({ message: 'Database already seeded' })
    }

    // Run seed logic here (copy from prisma/seed.ts)
    // ... seeding code ...

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
```

Then call it once after deployment:
```bash
curl -X POST https://your-domain.vercel.app/api/seed
```

## Troubleshooting

### Error: "Can't reach database server"

- Check that your connection strings are correct
- Ensure you're using the pooled URL (`POSTGRES_PRISMA_URL`) for queries
- Verify your IP isn't blocked (Vercel Postgres allows all IPs by default)

### Error: "Prisma schema not in sync"

```bash
npx prisma db push --force-reset
```

### Error: "Module not found: Can't resolve '@prisma/client'"

```bash
npx prisma generate
```

### View Database Logs

In Vercel Dashboard → Storage → Your Database → Logs

## Summary Checklist

- [ ] Install Vercel CLI (`npm i -g vercel`)
- [ ] Login to Vercel (`vercel login`)
- [ ] Link project (`vercel link`)
- [ ] Create Postgres database in Vercel Dashboard
- [ ] Copy connection strings to `.env.local`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `npx prisma db seed`
- [ ] Test locally with `npm run dev`
- [ ] Configure production environment variables in Vercel
- [ ] Deploy with `vercel --prod`
- [ ] Seed production database

## Next Steps

After setup is complete:
1. ✅ Test all API endpoints
2. ✅ Test authentication flow
3. 🚧 Build frontend components
4. 🚧 Prepare demo branch with UI change
5. 🚧 Test preview deployments
