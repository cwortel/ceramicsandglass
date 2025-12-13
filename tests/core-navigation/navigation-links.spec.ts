// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { StockPage } from '../pages/StockPage';
import { ContactPage } from '../pages/ContactPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Core Website Navigation', () => {
  test('should navigate to all main pages successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateToHomepage();
    await TestHelpers.verifyPageLoaded(page, TestData.pageTitles.homepage);
    
    // 2. Click on 'About my work' link
    await homePage.navigateToAboutWork();
    
    // 3. Verify About page loads with autobiographical content
    const aboutPage = new AboutPage(page);
    await aboutPage.verifyPageContent();
    await aboutPage.verifyBiographicalContent();
    
    // Navigate to Overview page
    await aboutPage.navigateToOverview();
    await expect(page.getByRole('heading', { name: /Overview|Introduction/ })).toBeVisible();
    
    // Navigate to CV page
    await homePage.navigateToCV();
    await expect(page.getByRole('heading', { name: /CV|Curriculum/ })).toBeVisible();
    
    // 8. Navigate to 'Stock' page
    await homePage.navigateToStock();
    
    // 9. Verify Stock page shows product categories
    const stockPage = new StockPage(page);
    await stockPage.verifyPageContent();
    await stockPage.verifyProductCategories();
    
    // 10. Navigate to 'Contact' page
    await stockPage.navigateToContact();
    
    // 11. Verify Contact page shows contact information and form
    const contactPage = new ContactPage(page);
    await contactPage.verifyPageContent();
    await contactPage.verifyContactInformation();
    await contactPage.verifyContactForm();
  });
});