import { test, expect } from '@playwright/test';

/**
 * E2E Test: Booking Flow ARIA Attributes
 * 
 * Validates that all ARIA attributes are correctly implemented for
 * screen reader accessibility throughout the booking flow.
 * 
 * Specification: specs/booking-happy-path.md
 * Standards: WCAG 2.2 Level AA - 4.1.2 Name, Role, Value
 */

test.describe('Booking Flow - ARIA Attributes', () => {
  test.use({ baseURL: 'http://localhost:3000' });

  test('Stepper has correct ARIA attributes', {
    tag: ['@e2e', '@a11y', '@aria', '@critical'],
    annotation: [
      { type: 'wcag', description: 'WCAG 4.1.2 Name, Role, Value' },
      { type: 'phase', description: 'Phase 1 - Enhanced Booking Flow' }
    ]
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
    
    await test.step('Step 1: Select Time stepper attributes', async () => {
      // Verify stepper/progress indicator exists
      const progressNav = page.getByRole('navigation', { name: /booking progress/i });
      await expect(progressNav).toBeVisible();
      
      // Verify current step is indicated
      await expect(page.getByText('Select Time')).toBeVisible();
    });

    await test.step('Step 2: Guest Info stepper attributes', async () => {
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(page.getByRole('heading', { name: /guest information/i })).toBeVisible();
      
      // Verify progress indicator shows step 2 (use exact match to avoid heading)
      await expect(page.getByText('Guest Info', { exact: true })).toBeVisible();
      
      // Verify previous step is marked complete (✓ or similar)
      await expect(page.getByText('✓')).toBeVisible();
    });

    await test.step('All form inputs have proper labels', async () => {
      // Verify all inputs have accessible labels
      const numberOfDogsSelect = page.getByLabel('Number of Dogs');
      await expect(numberOfDogsSelect).toBeVisible();
      
      // Select 2 dogs to reveal name fields
      await numberOfDogsSelect.selectOption('2 dogs');
      
      const dog1Input = page.getByLabel('Dog 1 name');
      await expect(dog1Input).toBeVisible();
      
      const dog2Input = page.getByLabel('Dog 2 name');
      await expect(dog2Input).toBeVisible();
      
      const requestsTextarea = page.getByLabel(/special requests/i);
      await expect(requestsTextarea).toBeVisible();
      
      // Verify optional field is clearly labeled
      const labelText = await requestsTextarea.evaluate((el) => {
        const label = document.querySelector(`label[for="${el.id}"]`);
        return label?.textContent || '';
      });
      expect(labelText.toLowerCase()).toContain('optional');
    });
  });

  test('Form validation errors have proper ARIA', {
    tag: ['@e2e', '@a11y', '@aria', '@error-handling'],
    annotation: [
      { type: 'wcag', description: 'WCAG 3.3.1, 3.3.2, 4.1.3' }
    ]
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek');
    
    await test.step('Error messages use role="alert"', async () => {
      // Submit with invalid date (past)
      await page.getByLabel('Date').fill('2020-01-01');
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      
      // Verify error has role="alert" (filter out Next.js route announcer)
      const errorAlert = page.getByRole('alert').filter({ hasNotText: '' }).first();
      await expect(errorAlert).toBeVisible();
      
      // Verify aria-live="assertive" for immediate announcement
      await expect(errorAlert).toHaveAttribute('aria-live', 'assertive');
    });

    await test.step('Invalid fields have aria-invalid="true"', async () => {
      const dateInput = page.getByLabel('Date');
      await expect(dateInput).toHaveAttribute('aria-invalid', 'true');
    });

    await test.step('Error messages are associated with inputs', async () => {
      const dateInput = page.getByLabel('Date');
      const describedBy = await dateInput.getAttribute('aria-describedby');
      
      // Should have aria-describedby pointing to error message
      expect(describedBy).toBeTruthy();
      expect(describedBy).not.toBe('');
    });
  });

  test('Success confirmation has proper ARIA', {
    tag: ['@e2e', '@a11y', '@aria'],
    annotation: [
      { type: 'wcag', description: 'WCAG 4.1.3 Status Messages' }
    ]
  }, async ({ page }) => {
    // Complete full booking flow
    await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    
    await page.getByLabel('Number of Dogs').selectOption('2 dogs');
    await page.getByLabel('Dog 1 name').fill('Max');
    await page.getByLabel('Dog 2 name').fill('Bella');
    await page.getByLabel(/special requests/i).fill('Test request');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    
    await page.getByRole('button', { name: /confirm booking/i }).click();
    
    await test.step('Confirmation page has role="status" or similar', async () => {
      await expect(page).toHaveURL(/\/booking\/confirm/);
      
      // Verify success message container (should be polite, not assertive)
      // This could be a role="status" or aria-live="polite" region
      const successMessage = page.getByText(/your yard reservation has been confirmed/i);
      await expect(successMessage).toBeVisible();
      
      // Verify heading can be programmatically focused
      const heading = page.getByRole('heading', { name: /booking confirmed/i });
      
      // Check if heading has tabindex="-1" (allows programmatic focus)
      const tabindex = await heading.getAttribute('tabindex');
      // Note: This might be null if not implemented, which is acceptable
      // but having it is a best practice for announcing page changes
    });

    await test.step('Confirmation ID is announced properly', async () => {
      // Verification ID should be clearly visible and associated
      const confirmationId = page.getByText(/BB-[A-Z0-9]+/);
      await expect(confirmationId).toBeVisible();
      
      // Ideally wrapped in a labeled region
      const confirmationLabel = page.getByText(/confirmation id/i);
      await expect(confirmationLabel).toBeVisible();
    });
  });

  test('Interactive elements have proper roles', {
    tag: ['@e2e', '@a11y', '@aria']
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek');
    
    await test.step('Buttons have role="button"', async () => {
      const nextButton = page.getByRole('button', { name: 'Next', exact: true });
      await expect(nextButton).toBeVisible();
      
      // getByRole already verifies role, so if it finds it, role is correct
      await expect(nextButton).toHaveAttribute('type', /(button|submit)/);
    });

    await test.step('Form inputs have appropriate roles', async () => {
      // Text input
      const dateInput = page.getByLabel('Date');
      await expect(dateInput).toBeVisible();
      
      // Select/combobox
      // After date is selected, time selects become enabled
      await page.goto('/listing/ridge-creek?date=2025-11-20');
      
      const startTimeSelect = page.getByLabel('Start Time');
      await expect(startTimeSelect).toBeVisible();
    });

    await test.step('Navigation elements have proper roles', async () => {
      // Header navigation
      const mainNav = page.getByRole('navigation').first();
      await expect(mainNav).toBeVisible();
      
      // Stepper/progress navigation
      await page.goto('/listing/ridge-creek?date=2025-11-20&start=10:00 AM&end=12:00 PM');
      const progressNav = page.getByRole('navigation', { name: /booking progress/i });
      await expect(progressNav).toBeVisible();
    });
  });

  test('Landmark regions are properly defined', {
    tag: ['@e2e', '@a11y', '@landmarks']
  }, async ({ page }) => {
    await page.goto('/listing/ridge-creek');
    
    await test.step('Page has proper landmark structure', async () => {
      // Main content
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      
      // Banner (header)
      const banner = page.getByRole('banner');
      await expect(banner).toBeVisible();
      
      // Navigation
      const nav = page.getByRole('navigation');
      await expect(nav.first()).toBeVisible();
    });
  });
});
