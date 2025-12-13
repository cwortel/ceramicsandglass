import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StockPage extends BasePage {
  readonly pageHeading: Locator;
  readonly breadcrumb: Locator;
  readonly productCategories: Locator;
  readonly onTheWheelCategory: Locator;
  readonly earlyHandmadeCategory: Locator;
  readonly handmadeFromCategory: Locator;
  readonly glassObjectsCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Stock' });
    this.breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
    this.productCategories = page.locator('article ul');
    this.onTheWheelCategory = page.getByRole('link', { name: 'Visit product category ON THE' });
    this.earlyHandmadeCategory = page.getByRole('link', { name: 'Visit product category EARLY HANDMADE' });
    this.handmadeFromCategory = page.getByRole('link', { name: 'Visit product category HANDMADE FROM' });
    this.glassObjectsCategory = page.getByRole('link', { name: 'Visit product category GLASS OBJECTS' });
  }

  async verifyPageContent() {
    await expect(this.page).toHaveTitle(/Stock.*Anne van der Waerden/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.breadcrumb).toBeVisible();
  }

  async verifyProductCategories() {
    await expect(this.productCategories).toBeVisible();
    
    // Verify specific categories with item counts
    await expect(this.page.getByText('ON THE WHEEL 1965-1985 (12)')).toBeVisible();
    await expect(this.page.getByText('EARLY HANDMADE 1965-1980 (15)')).toBeVisible();
    await expect(this.page.getByText('HANDMADE FROM 1980 (9)')).toBeVisible();
    await expect(this.page.getByText('IN COOPERATION WITH KEES HOOGENDAM (47)')).toBeVisible();
  }

  async navigateToOnTheWheelCategory() {
    await this.onTheWheelCategory.click();
  }

  async countCategories() {
    const categories = await this.productCategories.locator('li').count();
    expect(categories).toBeGreaterThanOrEqual(18);
    return categories;
  }
}