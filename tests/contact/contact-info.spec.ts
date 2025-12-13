// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Contact and Communication', () => {
  test('should display contact information correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);
    
    // 1. Navigate to Contact page
    await homePage.navigateToHomepage();
    await homePage.navigateToContact();
    
    // 2. Verify page title shows 'Contact'
    await contactPage.verifyPageContent();
    
    // 3. Check contact details are displayed
    await contactPage.verifyContactInformation();
    
    // 4. Verify email address is provided
    await expect(contactPage.emailAddress).toBeVisible();
    await expect(contactPage.emailAddress).toContainText(TestData.artistInfo.email);
    
    // 5. Verify physical address is complete
    await expect(contactPage.physicalAddress).toBeVisible();
    await expect(page.getByText(TestData.artistInfo.address.street)).toBeVisible();
    await expect(page.getByText(TestData.artistInfo.address.city)).toBeVisible();
    await expect(page.getByText(TestData.artistInfo.address.country)).toBeVisible();
    
    // 6. Check contact form is present with all required fields
    await contactPage.verifyContactForm();
    
    // Additional verifications
    // Shows Anne van der Waerden's name prominently (use first match to avoid strict mode)
    await expect(page.getByText(TestData.artistInfo.name).first()).toBeVisible();
    
    // Contact form includes Name, Email, Subject, and Message fields
    await TestHelpers.verifyRequiredField(page, 'Name');
    await TestHelpers.verifyRequiredField(page, 'Email');
    await expect(contactPage.subjectField).toBeVisible();
    await TestHelpers.verifyRequiredField(page, 'Message');
    
    // Required fields are marked with asterisks (*)
    await expect(page.getByText('Name *')).toBeVisible();
    await expect(page.getByText('Email *')).toBeVisible();
    await expect(page.getByText('Message *')).toBeVisible();
    
    // Verify field placeholders
    await contactPage.verifyFieldPlaceholders();
    
    // Verify page accessibility
    await TestHelpers.verifyBasicAccessibility(page);
  });
});