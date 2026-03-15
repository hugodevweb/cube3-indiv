# JMeter Load Test Runner for Collector.shop
# PowerShell version - Automatically cleans up previous results

param(
    [string]$Target = "production"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Collector.shop Load Test Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clean previous results
Write-Host "Cleaning previous results..." -ForegroundColor Yellow
if (Test-Path "report") { Remove-Item -Recurse -Force "report" }
if (Test-Path "results.jtl") { Remove-Item -Force "results.jtl" }
Write-Host "Done!" -ForegroundColor Green
Write-Host ""

# Run the test
Write-Host "Starting JMeter load test..." -ForegroundColor Yellow
Write-Host "Target: $Target" -ForegroundColor Cyan
Write-Host ""

switch ($Target) {
    "production" {
        Write-Host "Running full test against Vercel production..." -ForegroundColor Green
        jmeter.bat -n -t test-plan.jmx -l results.jtl -e -o report
    }
    "local" {
        Write-Host "Running smoke test against local server (127.0.0.1:3001)..." -ForegroundColor Green
        jmeter.bat -n -t test-plan-smoke.jmx -JHOST=127.0.0.1 -JPORT=3001 -JPROTOCOL=http -l results.jtl -e -o report
    }
    "smoke" {
        Write-Host "Running smoke test against Vercel production..." -ForegroundColor Green
        jmeter.bat -n -t test-plan-smoke.jmx -l results.jtl -e -o report
    }
    default {
        Write-Host "Running test against custom host: $Target" -ForegroundColor Green
        jmeter.bat -n -t test-plan.jmx -JHOST=$Target -l results.jtl -e -o report
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test completed!" -ForegroundColor Green
Write-Host "Opening report..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

Start-Process "report\index.html"
