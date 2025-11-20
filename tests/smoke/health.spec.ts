import { test, expect } from '@playwright/test';

/**
 * Seed Test: Environment Verification
 * 
 * Purpose: Verify the application is in a testable state before running feature tests.
 * This test MUST pass before any other tests can run reliably.
 * 
 * Establishes baseline page state and verifies critical navigation paths exist.
 */

test.describe('Application Health', () => {
  
  test('homepage loads successfully', {
    tag: ['@smoke', '@health']
  }, async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Verify page loaded (not 404/500)
    await expect(page).toHaveURL('/');
    
    // Verify basic structure present
    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeVisible();
    
    // Verify critical navigation links exist
    const findYardLink = page.getByRole('navigation').getByRole('link', { name: 'Find a yard' });
    await expect(findYardLink).toBeVisible();
  });
  
  test('search page loads successfully', {
    tag: ['@smoke', '@health']
  }, async ({ page }) => {
    await page.goto('/search');
    
    // Verify search page loaded
    await expect(page).toHaveURL('/search');
    // Actual H1 is "Your dog adventures await" (not "Search")
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your dog adventures await');
  });
  
  test('listing page loads (ridge-creek yard)', {
    tag: ['@smoke', '@health']
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek');
    
    // Verify listing page loaded (not 404)
    await expect(page).toHaveURL('/listing/ridge-creek');
    
    // Verify yard name displayed
    await expect(page.getByRole('heading', { name: 'Ridge Creek Yard' })).toBeVisible();
  });
});
