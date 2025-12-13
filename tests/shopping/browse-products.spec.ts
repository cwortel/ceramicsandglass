// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { StockPage } from '../pages/StockPage';
import { ProductCategoryPage } from '../pages/ProductCategoryPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Product Catalog and Shopping', () => {
  test('should browse product categories and view items', async ({ page }) => {
    const homePage = new HomePage(page);
    const stockPage = new StockPage(page);
    const categoryPage = new ProductCategoryPage(page);
    
    // 1. Navigate to Stock page
    await homePage.navigateToHomepage();
    await homePage.navigateToStock();
    
    // 2. Verify multiple product categories are displayed
    await stockPage.verifyPageContent();
    await stockPage.verifyProductCategories();
    
    // Verify category count is 18+
    const categoryCount = await stockPage.countCategories();
    expect(categoryCount).toBeGreaterThanOrEqual(18);
    
    // 3. Click on 'ON THE WHEEL 1965-1985' category
    await stockPage.navigateToOnTheWheelCategory();
    
    // 4. Verify category page displays individual items
    await categoryPage.verifyPageContent();
    
    // 5. Check that items show images, titles, and availability status
    await categoryPage.verifyProductsDisplay();
    
    // 6. Verify some items display prices and 'Add to cart' buttons
    await expect(page.getByText(TestData.products.objectsItem.price)).toBeVisible();
    await expect(page.getByText(TestData.products.twoObjectsItem.price)).toBeVisible();
    // Add to cart buttons may be hidden on hover - verify they exist instead
    await expect(page.getByRole('link', { name: /Add to cart/ }).first()).toBeAttached();
    
    // 7. Verify some items show 'Not available' status
    await expect(page.getByText('Not available').first()).toBeVisible();
    
    // Additional verifications
    await categoryPage.verifyResultsCount(TestData.categoryExpectedCounts['ON THE WHEEL 1965-1985']);
    
    // Count available vs unavailable products
    const availableCount = await categoryPage.countAvailableProducts();
    const unavailableCount = await categoryPage.countUnavailableProducts();
    
    expect(availableCount).toBeGreaterThan(0);
    expect(unavailableCount).toBeGreaterThan(0);
    expect(availableCount + unavailableCount).toBeLessThanOrEqual(12);
  });
});