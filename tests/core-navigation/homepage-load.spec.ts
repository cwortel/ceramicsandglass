// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Core Website Navigation', () => {
  test('should load homepage and display main elements', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateToHomepage();
    
    // Verify page loads correctly with all elements in parallel
    await Promise.all([
      TestHelpers.verifyPageLoaded(page, TestData.pageTitles.homepage),
      expect(homePage.mainHeading).toBeVisible(),
      expect(homePage.subtitle).toBeVisible(),
      expect(homePage.workInStockLink).toBeVisible(),
      homePage.verifyNavigationMenu(),
      TestHelpers.verifyBasicAccessibility(page)
    ]);
    
    await homePage.verifyArtworkContent();
  });
});