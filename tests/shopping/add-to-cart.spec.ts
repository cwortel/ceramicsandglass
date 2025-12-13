// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { StockPage } from '../pages/StockPage';
import { ProductCategoryPage } from '../pages/ProductCategoryPage';
import { CartPage } from '../pages/CartPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Product Catalog and Shopping', () => {
  test('should add item to cart and proceed to checkout', async ({ page }) => {
    // Clear cart at start of test
    await TestHelpers.clearCart(page);
    const homePage = new HomePage(page);
    const stockPage = new StockPage(page);
    const categoryPage = new ProductCategoryPage(page);
    const cartPage = new CartPage(page);
    
    // 1. Navigate to ON THE WHEEL 1965-1985 category
    await homePage.navigateToHomepage();
    await homePage.navigateToStock();
    await stockPage.navigateToOnTheWheelCategory();
    
    // 2. Find an available item with 'Add to cart' button (e.g., 'Objects' for €300)
    await categoryPage.verifyPageContent();
    await expect(page.getByText(TestData.products.objectsItem.name, { exact: true })).toBeVisible();
    await expect(page.getByText(TestData.products.objectsItem.price)).toBeVisible();
    
    // 3. Click 'Add to cart' button
    await categoryPage.addItemToCart(TestData.products.objectsItem.price);
    
    // 4. Verify success message appears
    await expect(page.getByText('has been added to your cart.')).toBeVisible();
    
    // 5. Click 'View cart' link from success message
    await categoryPage.viewCart();
    
    // 6. Verify cart page shows added item
    await cartPage.verifyPageContent();
    
    // 7. Check cart displays correct item name, price, and quantity
    await cartPage.verifyCartContents(
      TestData.products.objectsItem.name,
      TestData.products.objectsItem.price,
      '1'
    );
    
    // 8. Verify cart totals are calculated correctly
    await cartPage.verifyCartTotals(
      TestData.products.objectsItem.price,
      TestData.products.objectsItem.price
    );
    
    // 9. Verify 'Proceed to checkout' button is present
    await cartPage.verifyCheckoutButton();
    
    // Additional verifications
    await cartPage.verifyShippingOptions();
    
    // Verify shipping shows 'Pickup appointment' option
    await expect(page.getByText('Pickup appointment')).toBeVisible();
    
    // Verify cart page is titled 'Reservations'
    await expect(page).toHaveTitle(TestData.pageTitles.cart);
    
    // Verify quantity can be modified
    await expect(cartPage.quantity).toBeEditable();
    
    // Verify remove item functionality is available
    await expect(cartPage.removeItemLink).toBeVisible();
  });
});