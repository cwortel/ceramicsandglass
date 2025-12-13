// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage, ContactFormData } from '../pages/ContactPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Contact and Communication', () => {
  test('should validate contact form fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);
    
    // 1. Navigate to Contact page
    await homePage.navigateToHomepage();
    await homePage.navigateToContact();
    await contactPage.verifyPageContent();
    
    // 2. Attempt to submit empty form
    await contactPage.verifyFormValidation();
    
    // Fill form fields sequentially and verify
    await contactPage.nameField.fill(TestData.contactForm.validUser.name);
    await expect(contactPage.nameField).toHaveValue(TestData.contactForm.validUser.name);
    
    await contactPage.emailField.fill(TestData.contactForm.validUser.email);
    await expect(contactPage.emailField).toHaveValue(TestData.contactForm.validUser.email);
    
    await contactPage.subjectField.fill(TestData.contactForm.validUser.subject!);
    await expect(contactPage.subjectField).toHaveValue(TestData.contactForm.validUser.subject!);
    
    await contactPage.messageField.fill(TestData.contactForm.validUser.message);
    await expect(contactPage.messageField).toHaveValue(TestData.contactForm.validUser.message);
    
    // 7. Click 'Send message' button
    await expect(contactPage.sendButton).toBeEnabled();
    
    // 8. Verify form submission behavior
    // Note: We don't actually submit to avoid sending test emails
    // but we verify the button is clickable when form is properly filled
    await expect(contactPage.sendButton).toBeVisible();
    
    // Additional validations
    // Test with complete form data using helper method
    const validFormData: ContactFormData = {
      name: TestHelpers.generateTestName(),
      email: TestHelpers.generateTestEmail(),
      subject: 'Automated Test Subject',
      message: 'This is an automated test message to verify form functionality.'
    };
    
    // Clear form and fill with generated data
    await contactPage.nameField.clear();
    await contactPage.emailField.clear();
    await contactPage.subjectField.clear();
    await contactPage.messageField.clear();
    
    await contactPage.fillContactForm(validFormData);
    
    // Verify all fields are filled correctly
    await expect(contactPage.nameField).toHaveValue(validFormData.name);
    await expect(contactPage.emailField).toHaveValue(validFormData.email);
    await expect(contactPage.subjectField).toHaveValue(validFormData.subject!);
    await expect(contactPage.messageField).toHaveValue(validFormData.message);
    
    // Verify form accepts text input in all fields
    // Name field accepts text input
    await expect(contactPage.nameField).toBeEditable();
    
    // Email field validates email format (browser validation)
    await expect(contactPage.emailField).toHaveAttribute('type', 'email');
    
    // Subject field accepts optional text
    await expect(contactPage.subjectField).toBeEditable();
    
    // Message field accepts longer text content
    await expect(contactPage.messageField).toBeEditable();
    
    // Send button is clickable when form is properly filled
    await expect(contactPage.sendButton).toBeEnabled();
  });
});