@echo off
REM JMeter Load Test Runner for Collector.shop
REM Automatically cleans up previous results before running

echo ========================================
echo Collector.shop Load Test Runner
echo ========================================
echo.

REM Clean previous results
echo Cleaning previous results...
if exist report rmdir /s /q report
if exist results.jtl del /q results.jtl
echo Done!
echo.

REM Run the test
echo Starting JMeter load test...
echo Target: %1
echo.

if "%1"=="" (
    echo Running test against Vercel production...
    jmeter.bat -n -t test-plan.jmx -l results.jtl -e -o report
) else if "%1"=="local" (
    echo Running smoke test against local server...
    jmeter.bat -n -t test-plan-smoke.jmx -JHOST=127.0.0.1 -JPORT=3001 -JPROTOCOL=http -l results.jtl -e -o report
) else if "%1"=="smoke" (
    echo Running smoke test against Vercel production...
    jmeter.bat -n -t test-plan-smoke.jmx -l results.jtl -e -o report
) else (
    echo Running test against custom host: %1
    jmeter.bat -n -t test-plan.jmx -JHOST=%1 -l results.jtl -e -o report
)

echo.
echo ========================================
echo Test completed!
echo Opening report...
echo ========================================
start report\index.html
