import { Page, expect } from '@playwright/test';

export class TestHelpers {
  /**
   * Verify page loads with expected title and navigation
   */
  static async verifyPageLoaded(page: Page, expectedTitlePattern: string | RegExp) {
    const titleRegex = typeof expectedTitlePattern === 'string' 
      ? new RegExp(expectedTitlePattern) 
      : expectedTitlePattern;
    
    await expect(page).toHaveTitle(titleRegex);
    await expect(page.locator('nav')).toBeVisible();
  }

  /**
   * Verify all navigation links are present
   */
  static async verifyNavigationLinks(page: Page, links: string[]) {
    const promises = links.map(link => 
      expect(page.getByRole('link', { name: link })).toBeVisible()
    );
    await Promise.all(promises);
  }

  /**
   * Take screenshot for debugging purposes
   */
  static async takeScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  /**
   * Verify page accessibility basics
   */
  static async verifyBasicAccessibility(page: Page) {
    // Check for main heading
    const headings = page.locator('h1');
    await expect(headings).toHaveCount(1); // Should have exactly one h1
    
    // Verify navigation has proper structure
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for footer
    await expect(page.locator('contentinfo, footer')).toBeVisible();
  }

  /**
   * Verify external links have proper attributes
   */
  static async verifyExternalLink(page: Page, linkText: string, expectedUrl: string) {
    const link = page.getByRole('link', { name: linkText }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', expectedUrl);
  }

  /**
   * Generate random email for testing
   */
  static generateTestEmail(): string {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }

  /**
   * Generate random name for testing
   */
  static generateTestName(): string {
    const names = ['John Doe', 'Jane Smith', 'Test User', 'Demo Customer'];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Verify price format
   */
  static verifyPriceFormat(priceText: string): boolean {
    const priceRegex = /^€\d+$/;
    return priceRegex.test(priceText);
  }

  /**
   * Extract numeric value from price string
   */
  static extractPriceValue(priceText: string): number {
    const match = priceText.match(/€(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Verify form field validation
   */
  static async verifyRequiredField(page: Page, fieldName: string) {
    const field = page.getByRole('textbox', { name: new RegExp(fieldName) });
    await expect(field).toBeVisible();
    
    // Check if field has required indicator
    await expect(page.getByText(`${fieldName} *`)).toBeVisible();
  }

  /**
   * Clean up cart before tests
   */
  static async clearCart(page: Page) {
    await page.goto('https://ceramicsandglass.nl/cart/');
    
    // Check if cart has items and remove them
    const removeButtons = page.locator('a[href*="remove_item"]');
    const count = await removeButtons.count();
    
    for (let i = 0; i < count; i++) {
      await removeButtons.nth(0).click();
      // Wait for the cart to update by checking the remove button disappears
      await expect(removeButtons.nth(0)).not.toBeVisible({ timeout: 10000 });
    }
  }

  /**
   * Verify product availability status
   */
  static async verifyProductAvailability(page: Page, productName: string, shouldBeAvailable: boolean) {
    const productContainer = page.locator('li').filter({ hasText: productName });
    
    if (shouldBeAvailable) {
      await expect(productContainer.getByText(/€\d+/)).toBeVisible();
      await expect(productContainer.getByRole('link', { name: /Add to cart/ })).toBeVisible();
    } else {
      await expect(productContainer.getByText('Not available')).toBeVisible();
    }
  }
}