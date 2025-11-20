import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Trails & Tails
 * 
 * Standards per Main QA Chatmode:
 * - Browser matrix: Chromium, Firefox, WebKit
 * - Trace/screenshot on failure for debugging
 * - Accessibility-first (axe-core integration)
 * - Test organization: tests/e2e/, tests/integration/, tests/accessibility/, tests/visual/, tests/performance/
 * - Parallel execution safe (isolated storage per test)
 * - WCAG 2.2 AA compliance required
 */

export default defineConfig({
  // Test directory structure per main chatmode
  testDir: './tests',
  
  // Fail fast in CI, run all in local
  fullyParallel: true,
  
  // Forbid test.only in CI
  forbidOnly: !!process.env.CI,
  
  // Retry once on CI, none locally (prefer Healer agent for auto-repair)
  retries: process.env.CI ? 1 : 0,
  
  // Parallel workers: CI = 1, local = half of logical CPUs
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list']
  ],
  
  // Global settings for all tests
  use: {
    // Base URL for navigation (works with page.goto('/search'))
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    // Capture trace on first retry (for Healer agent analysis)
    trace: 'on-first-retry',
    
    // Screenshot on failure (for debugging)
    screenshot: 'only-on-failure',
    
    // Video on failure (for complex flow debugging)
    video: 'retain-on-failure',
    
    // Timeout for each action (click, fill, etc.)
    actionTimeout: 10000,
    
    // Timeout for navigation
    navigationTimeout: 30000,
  },
  
  // Performance budget: global timeout per test
  timeout: 60000,
  
  // Expect timeout for assertions (web-first auto-retry)
  expect: {
    timeout: 10000,
  },
  
  // Browser projects (cross-browser testing per main chatmode)
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Enable accessibility tree for semantic locators
        contextOptions: {
          strictSelectors: true, // Enforce unique locators
        },
      },
    },
    
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        contextOptions: {
          strictSelectors: true,
        },
      },
    },
    
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        contextOptions: {
          strictSelectors: true,
        },
      },
    },
    
    // Mobile emulation (Phase 3+: Flutter web integration)
    // Uncomment when testing mobile-specific features
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['iPhone 13 Pro'] },
    // },
    // {
    //   name: 'mobile-safari',
    //   use: { ...devices['iPhone 13 Pro'] },
    // },
  ],
  
  // Development server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
