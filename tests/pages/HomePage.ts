import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;
  readonly subtitle: Locator;
  readonly workInStockLink: Locator;
  readonly welcomeMessage: Locator;
  readonly getInTouchHeading: Locator;
  readonly contactForm: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = page.getByRole('heading', { name: 'Anne van der Waerden' });
    this.subtitle = page.getByText('Ceramics and Glass');
    this.workInStockLink = page.getByRole('link', { name: 'work in stock' });
    this.welcomeMessage = page.getByText('Welcome to this visual introduction of my work.');
    this.getInTouchHeading = page.getByRole('heading', { name: 'Get in Touch' });
    this.contactForm = page.locator('form');
  }

  async verifyPageElements() {
    await expect(this.page).toHaveTitle(/Anne van der Waerden.*Ceramics and Glass/);
    await expect(this.mainHeading).toBeVisible();
    await expect(this.subtitle).toBeVisible();
    await expect(this.workInStockLink).toBeVisible();
    await expect(this.introductionLink).toBeVisible();
  }

  async verifyNavigationMenu() {
    await expect(this.introductionLink).toBeVisible();
    await expect(this.aboutWorkLink).toBeVisible();
    await expect(this.overviewLink).toBeVisible();
    await expect(this.cvLink).toBeVisible();
    await expect(this.stockLink).toBeVisible();
    await expect(this.contactLink).toBeVisible();
  }

  async verifyArtworkContent() {
    await expect(this.welcomeMessage).toBeVisible();
    // Verify specific artwork items are displayed
    await expect(this.page.getByText('Integration')).toBeVisible();
    await expect(this.page.getByText('height: 33 cm')).toBeVisible();
    // Verify the first artwork piece with 1977 date
    await expect(this.page.locator('figure').filter({ hasText: 'Integration' }).getByText('1977')).toBeVisible();
  }
}