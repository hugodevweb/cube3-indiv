# Collector.shop – POC

A C2C marketplace for collectibles demonstrating a robust development workflow with load testing and CI/CD automation.

## Stack (Migrated to Vercel)

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Backend | Next.js API Routes (Serverless) |
| Database | Neon Postgres (Serverless) |
| Frontend | React + TypeScript + Tailwind CSS |
| ORM | Prisma |
| Authentication | Auth.js (NextAuth v5) |
| CI/CD | GitHub Actions + Vercel |
| Load Testing | Apache JMeter |

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- Node.js 20+ (for local development without Docker)

### Run with Docker Compose

```bash
cp .env.example .env
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

### Run locally

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/items` | Create a new item listing |
| `GET` | `/api/items` | List all items |
| `GET` | `/health` | Health check |
| `GET` | `/metrics` | Basic stats (uptime, item count, db status) |

## Project Structure

```
/backend          – Express REST API
/frontend         – Static single-page application
/infra            – Additional infrastructure config (monitoring, etc.)
/load-tests       – JMeter test plans
.github/workflows – CI/CD pipeline definitions
```

## Running Tests

```bash
cd backend
npm test
npm test -- --coverage
```

## Load Testing

```bash
# Run JMeter headless (requires JMeter installed)
jmeter -n -t load-tests/test-plan.jmx -e -o load-tests/report
```

## Environment Variables

See `.env.example` for all required variables.
