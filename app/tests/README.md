# Kylakavely E2E Test Framework

This directory contains end-to-end (E2E) tests for the Kylakavely application using Playwright.

## Overview

The test framework provides comprehensive coverage for all router pages:
- **Home page** (`/`) - Destination card grid and hero section
- **Map page** (`/map`) - Leaflet interactive map with markers
- **Destination detail pages** (`/:id`) - Individual destination content and navigation
- **Error page** - Invalid routes and error handling

Tests run against all major browsers:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)

## Quick Start

### Install Dependencies
```bash
cd app
npm install
```

### Run Tests Locally
```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode (recommended for development)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/home.spec.ts

# Run tests in specific browser
npx playwright test --project=firefox

# Run tests with specific grep pattern
npx playwright test --grep "Home page"
```

## Test Structure

### Directory Layout
```
app/tests/
├── e2e/                          # E2E test files
│   ├── home.spec.ts             # Home page tests
│   ├── map.spec.ts              # Map page tests
│   ├── destination.spec.ts       # Destination detail tests
│   ├── error.spec.ts            # Error page tests
│   └── cross-browser.spec.ts    # Cross-browser compatibility tests
├── fixtures/                      # Test utilities and page objects
│   ├── page-objects/            # Page object classes
│   │   ├── BasePage.ts          # Base page object (common methods)
│   │   ├── HomePage.ts          # Home page object
│   │   ├── MapPage.ts           # Map page object
│   │   ├── DestinationPage.ts   # Destination page object
│   │   └── ErrorPage.ts         # Error page object
│   ├── mock-geolocation.ts      # Geolocation API mocking utilities
│   ├── mock-data.ts             # Test data helpers and async utilities
│   └── constants.ts             # Test constants and selectors
└── README.md                      # This file
```

## Page Object Pattern

This framework uses the **Page Object Model (POM)** pattern for maintainability and reusability.

### What is Page Object Model?

Page Object Model is a design pattern that:
1. **Encapsulates** page elements and interactions in dedicated classes
2. **Centralizes** selectors in one place (easier to maintain when UI changes)
3. **Provides** high-level methods that tests can use
4. **Reduces** code duplication across tests

### Page Object Structure

Each page object extends `BasePage` and provides:
- **Locator methods**: Get element locators (`getTitle()`, `getButtons()`)
- **Action methods**: Click, fill, navigate (`clickHomeButton()`, `navigateTo()`)
- **Assertion methods**: Verify element state (`expectUrl()`, `expectElementVisible()`)

### Example: Using HomePage Page Object

```typescript
import { HomePage } from '../fixtures/page-objects/HomePage';

test('Home page displays destinations', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // Navigate to home
  await homePage.navigateAndWait();
  
  // Verify page loaded
  await homePage.expectUrl('/#/');
  
  // Get card count
  const cardCount = await homePage.getDestinationCardCount();
  expect(cardCount).toBeGreaterThan(0);
});
```

## Available Page Objects

### BasePage
Base class providing common navigation and assertion methods.

**Methods:**
- `navigate(path)` - Navigate to path
- `navigateToHome()` - Navigate to home
- `navigateToMap()` - Navigate to map
- `navigateToDestination(id)` - Navigate to destination
- `waitForNavigation()` - Wait for animation
- `clickElement(selector)` - Click element
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check visibility
- `expectUrl(urlMatcher)` - Assert URL
- `expectElementVisible(selector)` - Assert element visible

### HomePage
Methods for home page interaction.

**Methods:**
- `getDestinationCards()` - Get all destination cards
- `getDestinationCardById(id)` - Get specific card
- `clickDestinationCard(id)` - Click destination card
- `getHeroSection()` - Get hero section
- `clickMapButton()` - Click map navigation
- `getDestinationCardCount()` - Get card count
- `waitForDestinationCardsLoaded()` - Wait for cards to load
- `navigateAndWait()` - Navigate and wait for load

### MapPage
Methods for map page interaction.

**Methods:**
- `getMapContainer()` - Get map element
- `getMarkers()` - Get all markers
- `getMarkerById(id)` - Get specific marker
- `clickMarker(id)` - Click marker
- `getUserLocationMarker()` - Get user location marker
- `clickZoomIn()` - Zoom in
- `clickZoomOut()` - Zoom out
- `clickBackButton()` - Go back to home
- `getMarkerCount()` - Get marker count
- `waitForMapLoaded()` - Wait for map load
- `navigateAndWait()` - Navigate and wait for load

### DestinationPage
Methods for destination detail page interaction.

**Methods:**
- `getTitle()` - Get title element
- `getContent()` - Get content container
- `getContentBlocks()` - Get content blocks
- `getImages()` - Get images
- `getPrevButton()` - Get previous button
- `getNextButton()` - Get next button
- `getHomeButton()` - Get home button
- `clickPrevButton()` - Click previous
- `clickNextButton()` - Click next
- `clickHomeButton()` - Click home
- `getTitleText()` - Get title text
- `isTitleVisible()` - Check title visible
- `isPrevButtonDisabled()` - Check prev disabled
- `isNextButtonDisabled()` - Check next disabled
- `getContentBlockCount()` - Count content blocks
- `allImagesHaveSrc()` - Verify all images have src
- `navigateAndWait(id)` - Navigate and wait

### ErrorPage
Methods for error page interaction.

**Methods:**
- `getErrorPage()` - Get error page element
- `getErrorMessage()` - Get error message
- `getErrorMessageText()` - Get error text
- `isErrorPageVisible()` - Check error visible
- `navigateToInvalidRoute(path)` - Navigate to invalid
- `navigateToInvalidAndWait(path)` - Navigate and wait

## Test Utilities

### Mock Data Utilities (`mock-data.ts`)

```typescript
import {
  waitForAnimation,
  delay,
  getDestinationIds,
  getFirstDestinationId,
  getLastDestinationId,
  waitForNetworkIdle,
  waitForDomStable,
  waitForPageFullyLoaded,
  takeScreenshot,
} from '../fixtures/mock-data';

// Wait for Material-UI animation to complete
await waitForAnimation(page);

// Get all destination IDs from page
const ids = await getDestinationIds(page);

// Get first destination for testing
const firstId = await getFirstDestinationId(page);

// Wait for all network requests to complete
await waitForNetworkIdle(page);

// Take screenshot for debugging
await takeScreenshot(page, 'home-page-loaded');
```

### Geolocation Mocking (`mock-geolocation.ts`)

```typescript
import {
  mockGeolocation,
  clearMockedGeolocation,
  mockGeolocationWithDelay,
  denyGeolocation,
} from '../fixtures/mock-geolocation';

// Mock geolocation to specific coordinates
await mockGeolocation(page, 61.5, 24.1); // Haviseva, Finland

// Clear mocked geolocation
await clearMockedGeolocation(page);

// Mock with simulated network delay
await mockGeolocationWithDelay(page, 61.5, 24.1, 500);

// Deny geolocation permission
await denyGeolocation(page);
```

### Constants (`constants.ts`)

```typescript
import {
  TEST_TIMEOUT,
  ANIMATION_DELAY,
  BASE_ROUTES,
  SELECTORS,
  TEST_VIEWPORT,
  TEST_GEOLOCATION,
} from '../fixtures/constants';

// Constants available:
// - TEST_TIMEOUT: 30 seconds per test
// - ANIMATION_DELAY: 300ms (Material-UI transition)
// - BASE_ROUTES: { HOME, MAP, DESTINATION(id) }
// - SELECTORS: Element selectors (organized by page)
// - TEST_VIEWPORT: { DESKTOP, MOBILE, TABLET }
// - TEST_GEOLOCATION: { HAVISEVA, FAR_AWAY }
```

## Selectors & Test IDs

Tests use `data-testid` attributes for element selection (more stable than CSS selectors).

### Required data-testid Attributes

For full test functionality, components should have these `data-testid` attributes:

**Home Page:**
```html
<div data-testid="hero-section">...</div>
<div data-testid="destination-grid">...</div>
<div data-testid="destination-card-0">...</div>
<div data-testid="destination-card-1">...</div>
<button data-testid="map-button">...</button>
```

**Map Page:**
```html
<div data-testid="map-container">...</div>
<div id="map">...</div>
<div data-testid="map-marker-1">...</div>
<div data-testid="user-location-marker">...</div>
<button data-testid="back-button">...</button>
```

**Destination Page:**
```html
<h1 data-testid="destination-title">...</h1>
<div data-testid="destination-content">...</div>
<div data-testid="content-block">...</div>
<img data-testid="content-image" />
<button data-testid="prev-button">...</button>
<button data-testid="next-button">...</button>
<button data-testid="home-button">...</button>
```

**Error Page:**
```html
<div data-testid="error-page">...</div>
<p data-testid="error-message">...</p>
```

## Debugging Tests

### View Test Report

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Run in UI Mode (Recommended)

Run tests with interactive UI for debugging:
```bash
npm run test:e2e:ui
```

Features:
- Visual test player
- Step-by-step execution
- DOM/Network inspection
- Screenshots and traces

### Run in Debug Mode

Step through tests with debugger:
```bash
npm run test:e2e:debug
```

### Generate Traces

Tests automatically generate traces on failure (`trace: 'on-first-retry'`).

View trace:
```bash
npx playwright show-trace path/to/trace.zip
```

### Take Screenshots

Tests automatically capture screenshots on failure.

Manually capture:
```typescript
await page.screenshot({ path: 'screenshot.png' });
```

## Configuration

### playwright.config.ts

Key configuration options:

```typescript
// Test timeout per test
timeout: 30 * 1000

// Global timeout for all tests
globalTimeout: 3 * 60 * 1000 // 3 minutes

// Base URL for navigation
baseURL: 'http://localhost:5173/kylakavely'

// Web server configuration
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:5173',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}

// Browsers to test
projects: [
  { name: 'chromium', ... },
  { name: 'firefox', ... },
  { name: 'webkit', ... },
]

// Reporting
reporter: [
  ['html', { open: 'never' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['list'],
]
```

## CI/CD Integration

Tests run automatically on GitHub Actions for each push and pull request.

### GitHub Actions Workflow

See `.github/workflows/e2e-tests.yml`

**Triggers:**
- On push to main
- On pull request to main

**Steps:**
1. Install dependencies
2. Run Playwright tests
3. Upload artifacts (reports, screenshots)

**Artifacts:**
- `playwright-report/` - HTML test report
- `test-results/` - JSON and screenshot files

## Common Issues & Solutions

### Port Already in Use

If port 5173 is already in use:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or configure different port in playwright.config.ts
baseURL: 'http://localhost:5174/kylakavely'
```

### Tests Timeout

Increase timeout in playwright.config.ts:
```typescript
timeout: 60 * 1000 // 60 seconds
```

### Flaky Tests

- Use `waitForPageLoad()` after navigation
- Use explicit wait conditions instead of arbitrary delays
- Check for animations with `waitForAnimation()`
- Verify data-testid attributes exist in components

### Geolocation Tests Fail

Ensure geolocation mocking is used:
```typescript
import { mockGeolocation } from '../fixtures/mock-geolocation';

test('...', async ({ page }) => {
  await mockGeolocation(page, 61.5, 24.1);
  // Test code...
});
```

## Best Practices

1. **Use Page Objects**: Access elements through page object methods
2. **Wait Properly**: Use explicit waits (`waitForElementVisible`, `waitForPageLoad`)
3. **Single Assertion**: Keep assertions focused and specific
4. **Descriptive Names**: Test names should describe user workflows
5. **DRY Code**: Extract common patterns into fixtures
6. **Handle Waits**: Account for animations (300ms Material-UI transition)
7. **Clean Selectors**: Prefer `data-testid` over CSS/XPath
8. **Error Handling**: Catch exceptions for optional UI elements
9. **Before/After**: Clean up state in beforeEach/afterEach
10. **Screenshots**: Take screenshots for visual debugging

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../fixtures/page-objects/HomePage';

test.describe('Feature Name', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateAndWait();
  });

  test('should describe user workflow', async () => {
    // Arrange: Set up initial state
    
    // Act: Perform user action
    await homePage.clickDestinationCard(1);
    
    // Assert: Verify result
    await homePage.expectUrl('/#/1');
  });
});
```

### Steps

1. Create test file in `tests/e2e/` with `.spec.ts` suffix
2. Import page objects as needed
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for common setup
5. Write tests following AAA pattern (Arrange, Act, Assert)
6. Use page object methods for interactions
7. Use `expect()` for assertions
8. Run tests: `npm run test:e2e`

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Guide](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Configuration Reference](https://playwright.dev/docs/test-configuration)

## Support

For questions or issues, refer to:
1. Playwright documentation: https://playwright.dev
2. Test fixtures documentation: `tests/fixtures/`
3. Existing tests: `tests/e2e/`

