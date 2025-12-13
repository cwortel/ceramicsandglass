import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly logoLink: Locator;
  readonly introductionLink: Locator;
  readonly aboutWorkLink: Locator;
  readonly overviewLink: Locator;
  readonly cvLink: Locator;
  readonly stockLink: Locator;
  readonly contactLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use the main navigation menu ID to avoid footer duplicates
    this.navigation = page.locator('#menu-menu-1');
    this.logoLink = page.getByRole('link', { name: 'Anne van der Waerden' });
    this.introductionLink = this.navigation.getByRole('link', { name: 'Introduction' });
    this.aboutWorkLink = this.navigation.getByRole('link', { name: 'About my work' });
    this.overviewLink = this.navigation.getByRole('link', { name: 'Overview' });
    this.cvLink = this.navigation.getByRole('link', { name: 'CV' });
    this.stockLink = this.navigation.getByRole('link', { name: 'Stock' });
    this.contactLink = this.navigation.getByRole('link', { name: 'Contact' });
    this.footer = page.locator('contentinfo');
  }

  async navigateToHomepage() {
    const response = await this.page.goto('https://ceramicsandglass.nl/', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    // Surface CI-only navigation issues (e.g., 403/empty body) in logs
    const status = response?.status();
    if (!status || status >= 400) {
      const bodySnippet = response ? (await response.text()).slice(0, 1000) : 'no response';
      console.log('[nav debug] homepage status', status, 'url', response?.url());
      console.log('[nav debug] homepage body', bodySnippet);
    }
  }

  async navigateToAboutWork() {
    await this.aboutWorkLink.click();
  }

  async navigateToStock() {
    await this.stockLink.click();
  }

  async navigateToContact() {
    await this.contactLink.click();
  }

  async navigateToOverview() {
    await this.overviewLink.click();
  }

  async navigateToCV() {
    await this.cvLink.click();
  }
}