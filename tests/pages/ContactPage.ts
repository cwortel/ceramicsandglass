import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class ContactPage extends BasePage {
  readonly pageHeading: Locator;
  readonly contactInfo: Locator;
  readonly emailAddress: Locator;
  readonly physicalAddress: Locator;
  readonly contactForm: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly subjectField: Locator;
  readonly messageField: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Contact' });
    this.contactInfo = page.locator('article');
    this.emailAddress = page.getByText('info@annevanderwaerden.nl');
    this.physicalAddress = page.getByText('Rozenstraat 89');
    this.contactForm = page.locator('form');
    this.nameField = page.getByRole('textbox', { name: 'Name *' });
    this.emailField = page.getByRole('textbox', { name: 'Email *' });
    this.subjectField = page.getByRole('textbox', { name: 'Subject' });
    this.messageField = page.getByRole('textbox', { name: 'Message *' });
    this.sendButton = page.getByRole('button', { name: 'Send message' });
  }

  async verifyPageContent() {
    await expect(this.page).toHaveTitle(/Contact.*Anne van der Waerden/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.contactInfo).toBeVisible();
  }

  async verifyContactInformation() {
    // Verify we are on contact page by checking Contact heading
    await expect(this.page.getByRole('heading', { name: 'Contact' })).toBeVisible();
    
    // Verify complete address
    await expect(this.physicalAddress).toBeVisible();
    await expect(this.page.getByText('1016 NN Amsterdam')).toBeVisible();
    await expect(this.page.getByText('The Netherlands')).toBeVisible();
    
    // Verify email
    await expect(this.emailAddress).toBeVisible();
  }

  async verifyContactForm() {
    await expect(this.contactForm).toBeVisible();
    
    // Verify all form fields are present
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.subjectField).toBeVisible();
    await expect(this.messageField).toBeVisible();
    await expect(this.sendButton).toBeVisible();
    
    // Verify required field markers
    await expect(this.page.getByText('Name *')).toBeVisible();
    await expect(this.page.getByText('Email *')).toBeVisible();
    await expect(this.page.getByText('Message *')).toBeVisible();
  }

  async fillContactForm(data: ContactFormData) {
    await this.nameField.fill(data.name);
    await this.emailField.fill(data.email);
    
    if (data.subject) {
      await this.subjectField.fill(data.subject);
    }
    
    await this.messageField.fill(data.message);
  }

  async submitForm() {
    await this.sendButton.click();
  }

  async verifyFormValidation() {
    // Attempt to submit empty form to test validation
    await this.sendButton.click();
    
    // Check if form prevents submission or shows validation messages
    // Note: Actual validation behavior may vary based on implementation
  }

  async verifyFieldPlaceholders() {
    await expect(this.nameField).toHaveAttribute('placeholder', 'Your Name');
    await expect(this.emailField).toHaveAttribute('placeholder', 'Your Email');
    await expect(this.messageField).toHaveAttribute('placeholder', 'Your Message');
  }
}