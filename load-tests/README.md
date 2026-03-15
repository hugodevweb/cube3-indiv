# Load Testing with Apache JMeter

This directory contains JMeter load tests for the Collector.shop application running on Vercel.

## Prerequisites

- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) 5.6+ installed
- Access to the deployed application on Vercel

## Test Configuration

The load test is configured with three thread groups:

1. **Browse Catalog** (GET /api/items)
   - 500 concurrent users
   - 35 loops per user
   - Tests the item catalog API endpoint

2. **Post Items** (POST /api/items)
   - 50 concurrent users
   - 5 loops per user
   - Tests item creation functionality

3. **Browse via Frontend** (GET /)
   - 200 concurrent users
   - 20 loops per user
   - Tests the Next.js frontend page + API calls

## Running the Load Test

### Against Vercel Production

```bash
jmeter -n -t test-plan.jmx -l results.jtl -e -o report
```

This will test against the default production URL: `https://cube3-indiv.vercel.app`

### Against a Specific Vercel URL (e.g., Preview Deployment)

```bash
jmeter -n -t test-plan.jmx -JHOST=cube3-indiv-git-test-preview-deployment-hugos-projects-6ba4b23b.vercel.app -l results.jtl -e -o report
```

### Against Local Development Server

```bash
jmeter -n -t test-plan.jmx -JHOST=localhost:3001 -JPROTOCOL=http -l results.jtl -e -o report
```

## Command Options Explained

- `-n` : Run in non-GUI mode
- `-t test-plan.jmx` : Test plan file
- `-l results.jtl` : Output file for results
- `-e` : Generate report dashboard
- `-o report` : Output folder for HTML report
- `-JHOST=<url>` : Override the target host (without protocol)
- `-JPROTOCOL=<http|https>` : Override protocol (default: https)

## Viewing Results

After the test completes, open the HTML report:

```bash
# Windows
start report/index.html

# macOS
open report/index.html

# Linux
xdg-open report/index.html
```

Or open `report/index.html` in your browser.

## Important Notes

### Vercel Protection

If your Vercel deployment has **Vercel Protection** enabled (authentication required), the load test will receive 401/403 responses. To run load tests:

1. Disable Vercel Protection in your project settings:
   - Go to: https://vercel.com/hugos-projects-6ba4b23b/cube3-indiv/settings/deployment-protection
   - Temporarily disable protection during testing
   - Re-enable after testing

2. Or use a local development server for load testing

### Serverless Limitations

Vercel serverless functions have limitations:
- **Execution timeout**: 10 seconds (Hobby), 60 seconds (Pro)
- **Payload size**: 4.5 MB request/response
- **Cold starts**: First requests may be slower

Be mindful of these limits when interpreting results.

### Database Connection Pooling

The application uses Neon Postgres with connection pooling. Monitor your Neon dashboard during load tests to ensure you're not hitting connection limits.

## Interpreting Results

Key metrics to monitor:
- **Throughput** (requests/second)
- **Response Time** (avg, median, 90th percentile, 95th percentile)
- **Error Rate** (% of failed requests)
- **Latency Distribution**

Expected behavior:
- GET /api/items should be fast (~100-500ms)
- POST /api/items may be slower due to database writes (~200-1000ms)
- Cold starts can add 1-3 seconds to initial requests

## Sample Output

```
summary =  17500 in 00:01:23 = 211.0/s Avg:   236 Min:    45 Max:  3421 Err:     0 (0.00%)
```

This means:
- 17,500 requests completed in 1 minute 23 seconds
- 211 requests per second
- Average response time: 236ms
- 0% error rate
