# TODO – Collector.shop POC

> Demo-oriented implementation. Focus on showing the full workflow, not production-readiness.

---

## 1. Project Scaffold

- [x] Initialize the repo with a `README.md` and `.gitignore`
- [x] Create the folder structure:
  ```
  /backend
  /frontend
  /infra
  /load-tests
  .github/workflows/
  ```
- [x] Add a `docker-compose.yml` at the root (backend + PostgreSQL)

---

## 2. Backend (Node.js / Express) – ✅ Fixed

- [x] `npm init` inside `/backend`, install `express`, `pg`, `dotenv`
- [x] Connect to PostgreSQL using a `DATABASE_URL` env variable
- [x] Create the `items` table migration (title, description, price, category, photo_url, status)
- [x] Implement `POST /api/items`
  - [x] Validate required fields (title, description, price, category, photo_url)
  - [x] Set default status to `"En attente de contrôle"`
  - [x] Return `201` with the created item
- [x] Implement `GET /api/items` (list all items, for the frontend & load test)
- [x] Implement `GET /health` → `{ status: "ok" }`
- [x] Implement `GET /metrics` → basic stats (item count, uptime)
- [x] Write unit tests (Jest or Mocha) – aim for >80% coverage
  - [x] Test `POST /api/items` validation (missing fields, missing photo_url)
  - [x] Test `GET /health` response

---

## 3. Frontend (Minimal – Vanilla JS)

- [x] Single page with two sections:
  - **Item listing:** fetch and display `GET /api/items`
  - **Submit form:** fields for title, description, price, category, photo_url → calls `POST /api/items`
- [x] Show a success/error message after form submission
- [x] Serve static files from Express (or a separate nginx container)

---

## 4. Docker & Infrastructure

- [x] Write a `Dockerfile` for the backend (multi-stage is a plus)
- [x] Configure `docker-compose.yml`:
  - `db` service (postgres:15, with init SQL or volume for migrations)
  - `backend` service (depends on `db`, exposes port 3000)
  - (Optional) `frontend` service (nginx serving the static SPA)
- [x] Add a `.env.example` with required variables (`DATABASE_URL`, `PORT`)

---

## 5. CI/CD Pipeline (GitHub Actions)

File: `.github/workflows/main.yml`

- [x] **Job 1 – Lint & Test**
  - [x] Checkout code
  - [x] Install dependencies (`npm ci`)
  - [x] Run linter (`eslint`)
  - [x] Run tests with coverage report (`npm test -- --coverage`)
  - [x] Fail if coverage < 80%
- [x] **Job 2 – Security Scan** (depends on Job 1)
  - [x] Run `npm audit --audit-level=high`
- [x] **Job 3 – Build Docker Image** (depends on Job 2)
  - [x] `docker build -t collector-backend:${{ github.sha }} .`
- [x] **Job 4 – Mock Deploy** (depends on Job 3)
  - [x] Echo a simulated deployment message to staging
  - [x] (Optional) Push image to GitHub Container Registry

---

## 6. Load Testing (JMeter)

File: `load-tests/test-plan.jmx`

- [x] Create a JMeter test plan with two Thread Groups:
  - **Browse catalog:** 50 concurrent users → `GET /api/items` (loop 10x)
  - **Post items:** 10 concurrent users → `POST /api/items` with sample JSON body
- [x] Add listeners: Summary Report, Response Time Graph
- [x] Configure a JMeter HTML Report output (`-e -o ./report`)
- [x] Add a CI step (or `npm script`) to run JMeter headless and publish the HTML report as a pipeline artifact

---

## 7. Observability (Basic)

- [ ] `/health` endpoint (see Backend section)
- [ ] `/metrics` endpoint returning JSON with:
  - `uptime_seconds`
  - `total_items`
  - `db_status`
- [ ] (Optional) Add a `docker-compose.monitoring.yml` with InfluxDB + Grafana
  - [ ] Configure JMeter Backend Listener to push results to InfluxDB
  - [ ] Import a Grafana dashboard for P95 / error rate visualization

---

## 8. Demo Checklist (before presenting)

- [ ] `docker-compose up` starts everything cleanly from scratch
- [ ] Can submit an item via the frontend form → appears in the list
- [ ] CI pipeline passes on `main` branch (green badge)
- [ ] JMeter HTML report is generated and readable
- [ ] `/health` and `/metrics` return valid JSON
