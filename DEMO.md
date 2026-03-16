# Live Demo: CI/CD with Vercel Preview Deployments

## Scenario
Marketing requests changing the "Vendre" button color to improve conversion.

## Pre-Demo Preparation

### Before the Presentation:

1. **Disable Vercel Protection** (if enabled)
   - Go to: https://vercel.com/hugos-projects-6ba4b23b/cube3-indiv/settings/deployment-protection
   - Temporarily disable authentication for public demo access

2. **Run a Load Test** (to have fresh results ready)
   ```bash
   cd load-tests
   .\run-test.ps1 -Target smoke
   ```
   - This generates `report/index.html` with current performance metrics
   - Takes ~20 seconds to complete
   - Keep the report open in a browser tab

3. **Prepare Browser Tabs**
   - Production: https://cube3-indiv.vercel.app
   - GitHub repo: https://github.com/hugodevweb/cube3-indiv
   - Vercel dashboard: https://vercel.com/hugos-projects-6ba4b23b/cube3-indiv
   - JMeter report: `file:///C:/VS_code/CESI/cube3-indiv/load-tests/report/index.html`

4. **Test Login Credentials**
   - Verify `seller@demo.com / demo123` works on production

## Demo Steps (< 4 minutes)

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

### 5. Load Testing & Performance (60s) 🚀
**Demonstrate serverless scalability with Apache JMeter**

**Option A: Show Pre-generated Report** (30s)
- Open: `load-tests/report/index.html`
- Highlight key metrics:
  - **750+ concurrent users** handled successfully
  - **Response times**: ~100-500ms average
  - **0% error rate** - All requests succeeded
  - **Environment info**: Shows exact URL tested
- Emphasize: "Serverless architecture automatically scales to handle traffic spikes"

**Option B: Run Live Test** (60s) - If time permits
```bash
cd load-tests
.\run-test.ps1 -Target smoke
```
- Show test running in real-time
- Point out: "Testing against production right now"
- Report auto-opens showing:
  - Throughput (requests/sec)
  - Response time distribution
  - Success rate
- Emphasize: "No server provisioning needed - Vercel scales automatically"

## Talking Points
- **Zero downtime deployment** - Users never see the site go down
- **Isolated testing environments** - Every branch gets its own URL
- **Automatic builds** - No manual deployment steps
- **Fast deploys** - < 60 second deploy time
- **Instant rollback** - Can revert in seconds if needed
- **Preview URLs** - Share with stakeholders before merging
- **Database migrations** - Handled automatically via Prisma
- **Serverless auto-scaling** - Handles traffic spikes without manual intervention
- **Load tested** - Validated with Apache JMeter (750+ concurrent users)
- **Performance monitoring** - Sub-second response times in production

## Backup Plan
If network fails:
1. Show recorded video of the demo flow
2. Show screenshots comparing preview vs production
3. Walk through the GitHub Actions workflow file
4. Show Vercel dashboard screenshots
5. **Show pre-generated JMeter report** - `load-tests/report/index.html` (always available offline)

## CI/CD Pipeline Walkthrough

The pipeline runs on every push/PR to `master` and chains **7 jobs** sequentially — each one must pass before the next starts.

### Job 1 — Lint & Test (backend)
- Runs inside the `backend/` folder on Node.js 20
- **`npm run lint`** — ESLint checks code style and catches obvious errors
- **`npm test -- --coverage`** — Jest runs all unit tests and produces a coverage report
- Blocks the entire pipeline if linting or any test fails

### Job 2 — Security Scan (needs: Job 1)
- **`npm audit --audit-level=high`** — scans all backend npm dependencies for known vulnerabilities
- Only HIGH and CRITICAL severity issues cause the job to fail
- Ensures no dangerous packages ship to production

### Job 3 — Build Docker Image (needs: Job 2)
- Builds the backend Docker image using `backend/Dockerfile`
- Tags the image with the Git commit SHA (`collector-backend:<sha>`) for full traceability
- Verifies the image actually compiles and assembles correctly

### Job 4 — Mock Deploy (needs: Job 3)
- Simulates a deployment to a staging environment by printing the image tag, branch, and actor
- Acts as a gate: in a real setup this step would push the image to a registry (GHCR config is commented in the file) and trigger a staging deploy
- Keeps the pipeline structure ready for a real deploy without additional changes

### Job 5 — Build & Test Next.js (needs: Job 4)
- Works on the **frontend** (root `package.json`)
- **`npx prisma generate`** — generates the typed Prisma client so TypeScript is happy
- **`npm run build`** — full Next.js production build; catches type errors and missing imports
- **`npm run lint`** — ESLint pass on the frontend code

### Job 6 — Code Quality & Coverage (needs: Job 5)
- **`npm run quality`** — runs the full quality pipeline (tests + coverage thresholds + reporters)
- Uploads two artifacts for later inspection:
  - `coverage-report/` — HTML/LCOV coverage data
  - `quality-report/` — additional quality metrics
- The `if: always()` flag means reports are uploaded even when the job fails, so you can diagnose issues

### Job 7 — Load Test / JMeter (needs: Job 6)
- Spins up the full backend stack with **`docker compose up -d --wait`**
- Downloads Apache JMeter 5.6.3 and adds it to `PATH`
- Runs the JMX test plan headlessly against `localhost:3000` (backend) and `localhost:8080` (frontend)
- Produces a full HTML report (`load-tests/report/`) uploaded as an artifact
- Validates that the application can handle real traffic before the pipeline is considered green

---

## Technical Details to Highlight

### Architecture & Framework
- **Next.js 14 App Router** - Modern React framework with server-side rendering
- **Server Components** - Better performance, automatic code splitting, SEO optimization
- **TypeScript** - Full type safety across frontend and backend
- **Tailwind CSS** - Utility-first CSS for rapid, consistent UI development

### Backend & Data
- **Serverless API Routes** - Auto-scaling Next.js API endpoints
- **Prisma ORM** - Type-safe database queries with automatic migrations
- **Neon Postgres** - Serverless PostgreSQL with connection pooling
- **Auth.js (NextAuth v5)** - Production-ready authentication system

### DevOps & Quality Assurance
- **GitHub Actions** - Automated CI pipeline with build validation
- **Vercel Deployment** - Edge network with automatic HTTPS, CDN
- **Preview Deployments** - Isolated environment per branch
- **Apache JMeter** - Load testing with 750+ concurrent user simulation
- **Environment tracking** - Test reports include target URL for traceability
