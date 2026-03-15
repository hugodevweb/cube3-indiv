# 🚀 Migration Plan: Collector.shop (Demo Version)

This document tracks the transition from a complex architecture to a 100% Vercel-native solution to demonstrate a fluid CI/CD pipeline during the final presentation.

---

## 📊 Overall Progress

**Completed Phases:** 3/6 (Phases 1, 2, 3)
**In Progress:** Phase 4 (CI/CD Pipeline)
**Not Started:** Phases 5, 6 + Frontend Migration

### ✅ What's Working Now:
- Next.js 14 App Router with TypeScript
- All API routes functional (/api/items, /api/health, /api/metrics, /api/user/profile)
- Neon Postgres database connected and seeded with demo data
- Auth.js authentication configured with 2 demo users
- Local development server running on http://localhost:3001
- GitHub Actions workflow updated
- Vercel project linked

### 🚧 Major Work Remaining:
1. ~~**Frontend Migration** (6-8 hours)~~ ✅ COMPLETED - All React components built and tested
2. **Vercel Deployment** (1-2 hours) - Deploy to production and configure environment variables
3. **Demo Preparation** (2-3 hours) - Create demo branch and practice presentation

---

## 🏗️ Phase 1: Backend Migration (Serverless) ✅ COMPLETE
- [x] Initialize the **Next.js** project (Next.js 14 with App Router, TypeScript, Tailwind).
- [x] Map and create the `/app/api/` route structure:
    - [x] `GET /api/items` (Catalog/Marketplace) - Returns 10 seeded items.
    - [x] `POST /api/items` (Item listing - Key User Story) - With Zod validation.
    - [x] `GET /api/user/profile` (Personal PII data) - Protected route.
    - [x] `GET /api/health` (Health check with DB connection test).
    - [x] `GET /api/metrics` (Item and user count statistics).
- [x] Port business logic from old microservices to these functions.
- [x] Implement validation middlewares (e.g., **Zod**) for API payloads.

## 🗄️ Phase 2: Persistence & Data (Neon Postgres) ✅ COMPLETE
- [x] Activate **Neon Postgres** (Vercel's official partner, EU-West region).
- [x] Configure the ORM (**Prisma**):
    - [x] Install dependencies (@prisma/client, prisma).
    - [x] Create the core schema (Users, Items, Accounts, Sessions, VerificationToken).
    - [x] Run the initial migration: `npx prisma db push`.
- [x] Create a **Seed script** (`prisma/seed.ts`):
    - [x] Inject 10 collector items (Jordans, Pokémon cards, Rolex, Supreme, Batman comics, etc.).
    - [x] Create 2 demo users: seller@demo.com & buyer@demo.com (password: demo123).
- [x] Test database connection and API endpoints successfully.

## 🔐 Phase 3: Authentication (Auth.js / NextAuth) ✅ COMPLETE
- [x] Install and configure **Auth.js v5** (next-auth@beta).
- [x] Setup the `CredentialsProvider` with bcrypt password hashing.
- [x] Create two test profiles in seed script:
    - [x] `seller@demo.com` / demo123
    - [x] `buyer@demo.com` / demo123
- [x] Create sign-in page at `/auth/signin`.
- [x] Secure the "List an Item" API routes with session checks (POST /api/items protected).
- [x] Configure JWT strategy with user ID in session.
- [x] Generate NEXTAUTH_SECRET for session encryption.

## 🌐 Phase 4: CI/CD Pipeline & Environments 🚧 IN PROGRESS
- [x] Connect the GitHub repository to Vercel (linked: hugos-projects-6ba4b23b/cube3-indiv).
- [x] Project linked via Vercel CLI (`vercel link`).
- [x] GitHub Actions workflow updated with Next.js build job.
- [ ] Configure **Environment Variables** on the Vercel Dashboard:
    - [ ] `POSTGRES_PRISMA_URL` (from Neon - needs to be added to Vercel).
    - [ ] `POSTGRES_URL_NON_POOLING` (from Neon - needs to be added to Vercel).
    - [ ] `NEXTAUTH_SECRET` (generate new one for production).
    - [ ] `NEXTAUTH_URL` (production domain URL).
- [ ] Deploy to production: `vercel --prod`.
- [ ] Verify **Preview Deployments**:
    - [ ] Push a small change to a `dev` or feature branch.
    - [ ] Ensure a unique Preview URL is successfully generated.
    - [ ] Test all API endpoints on preview environment.

## 🎭 Phase 5: Demo Script Preparation (Live) 🚧 IN PROGRESS
- [x] Demo documentation created (DEMO.md with detailed script).
- [x] **Build frontend components first** (required before demo):
    - [x] Migrate frontend/index.html to React components.
    - [x] Create ItemCard, ItemGrid, Navigation, SellModal components.
    - [x] Implement client-side interactivity (search, filters, favorites).
- [ ] Select a visible UI change for the live demo (e.g., updating the "Vendre" button color from teal to orange).
- [ ] Prepare the Git branch `feat/ui-hotfix-demo`.
- [ ] Practice the full flow:
    - Login -> Browse items -> Create a listing on the **Preview URL** -> Merge -> Show **Production** updated.
- [ ] Prepare fallback materials (screenshots, video recording) in case of network issues.

## 📊 Phase 6: Bonus Observability (Slide 12) ⏳ NOT STARTED
- [ ] Install analytics packages:
    - [ ] `npm install @vercel/analytics @vercel/speed-insights`
- [ ] Update `app/layout.tsx` to include Analytics and SpeedInsights components.
- [ ] Enable **Vercel Analytics** in Vercel Dashboard to display Core Web Vitals.
- [ ] Enable **Speed Insights** in Vercel Dashboard.
- [ ] Ensure **Runtime Logs** are easily accessible to show the jury how you monitor errors in real-time.
- [ ] Prepare screenshot of analytics dashboard for presentation.