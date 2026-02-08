import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// changes in this file are recent edits, do not suggest code that has been deleted
export class AboutPage extends BasePage {
  readonly pageHeading: Locator;
  readonly autobiographicalSection: Locator;
  readonly myWorkSection: Locator;
  readonly ceramicsSection: Locator;
  readonly glassSection: Locator;
  readonly keesHoogendamLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'About my work' });
    this.autobiographicalSection = page.getByText('Autobiographical sketch');
    this.myWorkSection = page.getByText('My work');
    this.ceramicsSection = page.getByRole('strong').filter({ hasText: 'Ceramics' });
    this.glassSection = page.getByRole('strong').filter({ hasText: 'Glass' });
    this.keesHoogendamLink = page.getByRole('link', { name: 'Kees Hoogendam' }).first();
  }

  async verifyPageContent() {
    await expect(this.page).toHaveTitle(/About my work.*Anne van der Waerden/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.autobiographicalSection).toBeVisible();
  }

  async verifyBiographicalContent() {
    await expect(this.page.getByText('My fascination for pottery began in Amsterdam in 1952')).toBeVisible();
    await expect(this.page.getByText('At the age of twelve I convinced my mother')).toBeVisible();
  }

  async verifyExternalLinks() {
    await expect(this.keesHoogendamLink).toBeVisible();
    await expect(this.keesHoogendamLink).toHaveAttribute('href', 'https://www.keeshoogendampottenbakker.nl/');
  }

  async verifyWorkPhilosophy() {
    await expect(this.ceramicsSection).toBeVisible();
    await expect(this.glassSection).toBeVisible();
    await expect(this.page.getByText('For me ceramics is a skin that spans a mysterious inner space')).toBeVisible();
  }
}