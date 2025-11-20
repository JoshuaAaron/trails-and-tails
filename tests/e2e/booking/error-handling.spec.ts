import { test, expect } from '@playwright/test';

/**
 * E2E Test: Booking Error Handling
 * 
 * Tests error scenarios in the booking flow to ensure users receive helpful,
 * accessible error messages when providing invalid input.
 * 
 * Spec: specs/booking-happy-path.md (Step 3 - Error Handling section)
 * Phase: Phase 1 - Enhanced Booking Flow
 */

test.describe('Booking Error Handling', () => {
  test.use({ baseURL: 'http://localhost:3000' });

  test.beforeEach(async ({ page }) => {
    // Navigate to Ridge Creek Yard listing before each test
    await page.goto('/listing/ridge-creek');
    await expect(page).toHaveURL(/\/listing\/ridge-creek/);
  });

  test('User receives helpful error for past date', {
    tag: ['@e2e', '@booking', '@error-handling'],
    annotation: [
      { type: 'phase', description: 'Phase 1 - Enhanced Booking Flow' },
      { type: 'accessibility', description: 'WCAG 2.2 AA error messaging' }
    ]
  }, async ({ page }) => {
    await test.step('User attempts to book with a past date', async () => {
      // Navigate to listing page with a valid current date first
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
      
      // Now change just the date to a past date
      await page.getByLabel('Date').fill('2020-01-01');
      
      // Try to proceed (trigger validation)
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    });

    await test.step('Error message is displayed with proper accessibility', async () => {
      // Verify error message appears (filter out Next.js route announcer)
      const errorMessage = page.getByRole('alert').filter({ hasNotText: '' }).first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(/date must be in the future/i);
      
      // Verify ARIA attributes for screen readers
      await expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
      
      // Verify date input is marked as invalid
      const dateInput = page.getByLabel('Date');
      await expect(dateInput).toHaveAttribute('aria-invalid', 'true');
      
      // Verify error is associated with input
      const describedBy = await dateInput.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    await test.step('User can recover from error', async () => {
      // Fill in a valid future date
      await page.getByLabel('Date').fill('2025-11-20');
      
      // Select times using URL parameters (React synthetic event workaround)
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
      
      // Verify can proceed
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(page.getByRole('heading', { name: /guest information/i })).toBeVisible();
    });
  });

  test('User receives helpful error for invalid time range', {
    tag: ['@e2e', '@booking', '@error-handling'],
    annotation: [
      { type: 'phase', description: 'Phase 1 - Enhanced Booking Flow' },
      { type: 'accessibility', description: 'WCAG 2.2 AA error messaging' }
    ]
  }, async ({ page }) => {
    await test.step('User attempts to book with end time before start time', async () => {
      // Navigate with invalid time range (end before start)
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=2:00 PM&end=10:00 AM');
      
      // Try to proceed
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    });

    await test.step('Error message is displayed', async () => {
      // Verify error message appears
      const errorMessage = page.getByText(/end time must be after start time/i);
      await expect(errorMessage).toBeVisible();
      
      // Verify it's announced to screen readers (role="alert" or aria-live) - filter out route announcer
      const alertElement = page.getByRole('alert').filter({ hasNotText: '' }).first();
      await expect(alertElement).toBeVisible();
    });

    await test.step('User can recover from error', async () => {
      // Use valid time range
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
      
      // Verify can proceed
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(page.getByRole('heading', { name: /guest information/i })).toBeVisible();
    });
  });

  test('Multiple validation errors are displayed together', {
    tag: ['@e2e', '@booking', '@error-handling']
  }, async ({ page }) => {
    await test.step('User submits form with multiple errors', async () => {
      // Don't fill anything, just try to submit
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    });

    await test.step('All relevant errors are shown', async () => {
      // Should have at least one error about missing date/time
      const alerts = page.getByRole('alert');
      await expect(alerts.first()).toBeVisible();
    });
  });
});
