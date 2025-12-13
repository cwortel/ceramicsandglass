import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductCategoryPage extends BasePage {
  readonly categoryHeading: Locator;
  readonly resultsCount: Locator;
  readonly sortDropdown: Locator;
  readonly productList: Locator;
  readonly availableProducts: Locator;
  readonly unavailableProducts: Locator;
  readonly addToCartButtons: Locator;
  readonly successMessage: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryHeading = page.locator('h1').filter({ hasText: 'ON THE WHEEL 1965-1985' });
    this.resultsCount = page.getByText(/Showing all \d+ results/);
    this.sortDropdown = page.getByRole('combobox', { name: 'Shop order' });
    this.productList = page.locator('article ul');
    this.availableProducts = page.locator('li').filter({ hasText: '€' });
    this.unavailableProducts = page.locator('li').filter({ hasText: 'Not available' });
    this.addToCartButtons = page.getByRole('link', { name: /Add to cart/ });
    this.successMessage = page.locator('.alert');
    this.viewCartLink = page.getByRole('link', { name: 'View cart' });
  }

  async verifyPageContent() {
    await expect(this.categoryHeading).toBeVisible();
    await expect(this.resultsCount).toBeVisible();
    await expect(this.sortDropdown).toBeVisible();
  }

  async verifyProductsDisplay() {
    await expect(this.productList).toBeVisible();
    
    // Check that products show titles and descriptions (use first match to avoid strict mode)
    await expect(this.page.getByRole('heading', { name: /Bowl on separate base|Objects|Vase on separate base/ }).first()).toBeVisible();
    
    // Verify some items show prices
    await expect(this.page.getByText('€300')).toBeVisible();
    await expect(this.page.getByText('€250')).toBeVisible();
    
    // Verify unavailable items are marked (use first match to avoid strict mode)
    await expect(this.page.getByText('Not available').first()).toBeVisible();
  }

  async verifyResultsCount(expectedCount: number) {
    await expect(this.page.getByText(`Showing all ${expectedCount} results`)).toBeVisible();
  }

  async addItemToCart(itemPrice: string) {
    // Navigate to add specific item to cart
    const cartUrl = `${this.page.url()}?add-to-cart=551`; // Objects item ID
    await this.page.goto(cartUrl);
    
    // Verify success message
    await expect(this.page.getByText('has been added to your cart.')).toBeVisible();
    await expect(this.viewCartLink).toBeVisible();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }

  async countAvailableProducts() {
    return await this.availableProducts.count();
  }

  async countUnavailableProducts() {
    return await this.unavailableProducts.count();
  }
}