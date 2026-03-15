# Live Demo: CI/CD with Vercel Preview Deployments

## Scenario
Marketing requests changing the "Vendre" button color to improve conversion.

## Demo Steps (< 3 minutes)

### 1. Show Production (30s)
- Open: https://collector-shop.vercel.app
- Show current teal button
- Sign in as seller@demo.com / demo123
- Browse items

### 2. Show GitHub Branch (30s)
- Open: https://github.com/[user]/cube3-indiv/tree/feat/ui-hotfix-demo
- Show the color change in code
- Point out the simple one-line change

### 3. Show Preview Deployment (60s)
- Open: https://collector-shop-git-feat-ui-hotfix-demo.vercel.app
- Button is now orange
- Test full flow: sign in → browse → create listing
- All functionality works on preview
- Emphasize: Isolated testing environment per branch

### 4. Merge & Deploy (60s)
- Merge PR on GitHub
- Show Vercel dashboard deploying
- Refresh production URL
- Button is now orange in production
- Point out deployment time (< 60 seconds)

## Talking Points
- **Zero downtime deployment** - Users never see the site go down
- **Isolated testing environments** - Every branch gets its own URL
- **Automatic builds** - No manual deployment steps
- **Fast deploys** - < 60 second deploy time
- **Instant rollback** - Can revert in seconds if needed
- **Preview URLs** - Share with stakeholders before merging
- **Database migrations** - Handled automatically via Prisma

## Backup Plan
If network fails:
1. Show recorded video of the demo flow
2. Show screenshots comparing preview vs production
3. Walk through the GitHub Actions workflow file
4. Show Vercel dashboard screenshots

## Technical Details to Highlight
- **App Router** - Modern Next.js architecture
- **Server Components** - Better performance, SEO
- **Prisma ORM** - Type-safe database queries
- **Auth.js** - Secure authentication
- **Vercel Postgres** - Managed database with connection pooling
- **TypeScript** - Type safety across the stack
- **Tailwind CSS** - Rapid UI development
