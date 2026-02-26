# Specification: Collector.shop POC – Load Testing & CI/CD

## 1. Project Context

**Collector.shop** is a C2C (consumer-to-consumer) marketplace for collectibles.  
This Proof of Concept (POC) demonstrates a robust development workflow, with a focus on performance validation and automated deployment.

---

## 2. Technical Stack (Simplified)

- **Backend:** Node.js with Express providing a REST API.
- **Database:** PostgreSQL
- **Frontend:** Single-page app (React or Vanilla JS) for item listing and viewing
- **Infrastructure:** Docker & Docker-compose for local orchestration
- **CI/CD:** GitHub Actions
- **Load Testing:** JMeter

---

## 3. Core Feature: Item Listing

**User Story:**  
Allow users to list collectible items for sale.

- **Endpoint:** `POST /api/items`
- **Fields:**  
  - Title  
  - Description  
  - Price  
  - Category (e.g., "Baskets", "Vintage")
- **Validation:**  
  - *Must include a photo URL* (simplified)
- **Initial Status:**  
  - `En attente de contrôle` (Pending Review)

---

## 4. CI/CD Pipeline Requirements

Create a `.github/workflows/main.yml` implementing a shift-left approach:

1. **Lint & Test:** Run unit tests and check code coverage (Goal: >80%)
2. **Security Scan:** Integrate a basic SAST tool (`npm audit`)
3. **Containerization:** Build a Docker image for the backend
4. **Mock Deployment:** Simulate a deployment step to a staging environment

---

## 5. Load Testing & Performance

- **Provide:** A JMeter script (`test-plan.jmx`) to simulate:
  - 50 concurrent users browsing the catalog
  - 10 users posting new items
- **Objective:** Identify bottlenecks in PostgreSQL connections as the catalog grows
- **Metrics to Track:**  
  - P95 response time  
  - Error rate  

---

## 6. Observability (Basic)

- Implement `/health` and `/metrics` endpoints for the backend
- Monitoring & Observability DashboardsTo ensure the Maintien en Condition Opérationnelle (MCO) and visualize the results of the load tests, the POC must include the following dashboarding capabilities:A. Performance & Load Test Visualization (JMeter + Grafana)Goal: Visualize the "goulot d'étranglement" (bottleneck) on the database during traffic peaks.Tooling: * JMeter HTML Report: Configure the pipeline to generate a static dashboard after each test run.Real-time Dashboard: (Optional) Use a JMeter Backend Listener to stream results to InfluxDB, visualized in Grafana to monitor P95 response times live.
