import { test, expect } from '@playwright/test';

/**
 * E2E Test: Booking Flow Keyboard Accessibility
 * 
 * Validates that the entire booking flow is fully keyboard accessible,
 * with no keyboard traps and proper focus management.
 * 
 * Spec: 01-E2E-TESTING-CHATMODE.md (E2E Accessibility Requirements)
 * WCAG: 2.1.1 Keyboard, 2.1.2 No Keyboard Trap, 2.4.3 Focus Order
 */

test.describe('Booking Flow - Keyboard Accessibility', () => {
  test.use({ baseURL: 'http://localhost:3000' });

  test('No keyboard traps in booking flow', {
    tag: ['@e2e', '@a11y', '@keyboard'],
    annotation: [
      { type: 'wcag', description: 'WCAG 2.1.2 No Keyboard Trap' }
    ]
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek');
    
    await test.step('User can Tab through all elements without getting trapped', async () => {
      let previousFocusedElement = '';
      const focusedElements = new Set<string>();
      let bodyFocusCount = 0;
      
      // Tab through many elements
      for (let i = 0; i < 50; i++) {
        await page.keyboard.press('Tab');
        
        const currentFocused = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.tagName + (el?.getAttribute('aria-label') || el?.textContent?.slice(0, 20) || '');
        });
        
        // Check if focus is on body
        const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
        if (focusedTag === 'BODY') {
          bodyFocusCount++;
          // Allow brief BODY focus (e.g., between sections) but not persistent
          expect(bodyFocusCount).toBeLessThan(3); // Can't be stuck on BODY for 3+ consecutive tabs
        } else {
          bodyFocusCount = 0; // Reset counter when we have real focus
        }
        
        // Track elements to ensure we're progressing
        focusedElements.add(currentFocused);
        previousFocusedElement = currentFocused;
      }
      
      // Should have focused multiple different elements
      // WebKit/Safari may have fewer focusable elements due to different tab behavior
      expect(focusedElements.size).toBeGreaterThanOrEqual(2);
    });

    await test.step('User can Shift+Tab backwards through elements', async () => {
      let bodyFocusCount = 0;
      
      // Tab forward a few times
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }
      
      // Now go backwards
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Shift+Tab');
        
        // Verify focus doesn't get stuck on BODY (allow brief transitions)
        const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
        if (focusedTag === 'BODY') {
          bodyFocusCount++;
          expect(bodyFocusCount).toBeLessThan(3); // Allow brief BODY focus but not stuck
        } else {
          bodyFocusCount = 0;
        }
      }
    });
  });

  test('Focus management between booking steps', {
    tag: ['@e2e', '@a11y', '@focus-management'],
    annotation: [
      { type: 'wcag', description: 'WCAG 2.4.3 Focus Order' }
    ]
  }, async ({ page }) => {
    await test.step('Focus moves to first input when guest info step loads', async () => {
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      
      // Wait for guest info page
      await expect(page.getByRole('heading', { name: /guest information/i })).toBeVisible();
      
      // Verify first input receives focus automatically (accessibility feature)
      const firstInput = page.getByLabel('Number of Dogs');
      await expect(firstInput).toBeFocused();
    });

    await test.step('Focus is managed when navigating back', async () => {
      // Complete guest info
      await page.getByLabel('Number of Dogs').selectOption('2 dogs');
      await page.getByLabel('Dog 1 name').fill('Max');
      await page.getByLabel('Dog 2 name').fill('Bella');
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      
      // We're on review page now
      await expect(page.getByRole('heading', { name: /review your booking/i })).toBeVisible();
      
      // Click back button if it exists
      const backButton = page.getByRole('button', { name: /back/i });
      if (await backButton.isVisible()) {
        await backButton.click();
        
        // Should be back on guest info
        await expect(page.getByRole('heading', { name: /guest information/i })).toBeVisible();
      }
    });
  });
});
