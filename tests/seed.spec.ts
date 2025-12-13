import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { TestData } from './data/testData';

test.describe('Ceramics and Glass - Setup', () => {
  test('seed', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Basic setup - navigate to homepage and verify it loads
    await homePage.navigateToHomepage();
    await expect(page).toHaveTitle(TestData.pageTitles.homepage);
    await expect(homePage.mainHeading).toBeVisible();
  });
});