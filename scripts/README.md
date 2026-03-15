# Code Quality Pipeline

Automated code quality checks with coverage analysis and HTML reports.

## 🎯 What It Does

The code quality pipeline runs:

1. **TypeScript Type Checking** - Ensures type safety across the codebase
2. **ESLint Analysis** - Identifies code quality issues and potential bugs
3. **Unit Tests** - Runs Jest test suite
4. **Code Coverage** - Measures test coverage with thresholds

## 🚀 Usage

### Run Full Quality Check

```bash
npm run quality
```

This will:
- ✅ Run all quality checks
- 📊 Generate HTML reports
- 🎨 Create a beautiful summary dashboard
- ❌ Exit with error if any check fails

### Run Individual Checks

```bash
# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Tests only
npm run test

# Tests with coverage
npm run test:coverage

# Tests in watch mode (for development)
npm run test:watch
```

## 📊 Reports Generated

After running `npm run quality`, you'll find reports in:

### 1. **Quality Summary Dashboard**
```
quality-reports/index.html
```
Beautiful summary showing:
- Code coverage percentages
- Quality check statuses
- Links to detailed reports

### 2. **Coverage Report**
```
coverage/index.html
```
Detailed code coverage analysis:
- Line-by-line coverage
- Branch coverage
- Function coverage
- Uncovered code highlighting

## 🔧 Configuration

### Jest Configuration
Edit `jest.config.js` to customize:
- Coverage thresholds (currently 50%)
- Test file patterns
- Module mappings

### Coverage Thresholds
Current thresholds (in `jest.config.js`):
```javascript
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50,
  },
}
```

## 🎭 For Your Demo

### Show Code Quality in CI/CD

1. **Trigger the pipeline**:
   ```bash
   git push origin master
   ```

2. **View in GitHub Actions**:
   - Go to Actions tab
   - See "Code Quality & Coverage" job running
   - Download artifacts after completion

3. **Show the reports**:
   - Download "quality-report" artifact
   - Download "coverage-report" artifact
   - Open `index.html` files to show metrics

### Local Demo

```bash
# Run quality check
npm run quality

# Open the summary dashboard
start quality-reports/index.html  # Windows
open quality-reports/index.html   # macOS
```

## 📈 Metrics Explained

### Coverage Percentages
- **Lines**: % of code lines executed during tests
- **Statements**: % of statements executed
- **Functions**: % of functions called
- **Branches**: % of if/else branches taken

### Quality Checks
- **TypeScript**: No type errors ✅
- **ESLint**: No linting errors ✅
- **Tests**: All tests passing ✅
- **Coverage**: Meets threshold ✅

## 🐛 Troubleshooting

### "Coverage threshold not met"
- Write more tests to cover uncovered code
- Or adjust thresholds in `jest.config.js`

### "TypeScript errors"
- Run `npm run type-check` to see specific errors
- Fix type issues in your code

### "ESLint errors"
- Run `npm run lint` to see specific issues
- Fix or configure ESLint rules in `.eslintrc.js`

## 🔗 CI/CD Integration

This script is integrated into `.github/workflows/main.yml`:

```yaml
- name: Run Code Quality Pipeline
  run: npm run quality

- name: Upload Coverage Report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

Artifacts are automatically uploaded to GitHub Actions for download and review.
