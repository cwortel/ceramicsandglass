// spec: specs/ceramics-and-glass-smoke-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { TestData } from '../data/testData';
import { TestHelpers } from '../utils/helpers';

test.describe.configure({ mode: 'parallel' });
test.describe('Content and Media Display', () => {
  test('should display artwork images and descriptions', async ({ page }) => {
    const homePage = new HomePage(page);
    const aboutPage = new AboutPage(page);
    
    // 1. Navigate to homepage
    await homePage.navigateToHomepage();
    
    // 2. Verify artwork images are loaded and visible
    await homePage.verifyArtworkContent();
    
    // 3. Check that artwork descriptions include titles and dates
    // Verify 'Integration' artwork details within its specific figure container
    const integrationFigure = page.locator('figure').filter({ hasText: 'Integration' });
    await expect(integrationFigure.getByText(TestData.artworkSamples.integration.title)).toBeVisible();
    await expect(integrationFigure.getByText(TestData.artworkSamples.integration.height)).toBeVisible();
    await expect(integrationFigure.getByText(TestData.artworkSamples.integration.year)).toBeVisible();
    await expect(integrationFigure.getByText(TestData.artworkSamples.integration.technique)).toBeVisible();
    await expect(integrationFigure.getByText(TestData.artworkSamples.integration.collection)).toBeVisible();
    
    // Verify 'Massive object' artwork details
    await expect(page.getByText(TestData.artworkSamples.massiveObject.title)).toBeVisible();
    await expect(page.getByText(TestData.artworkSamples.massiveObject.height)).toBeVisible();
    await expect(page.getByText(TestData.artworkSamples.massiveObject.year)).toBeVisible();
    await expect(page.getByText(TestData.artworkSamples.massiveObject.location)).toBeVisible();
    
    // Verify additional artwork samples
    await expect(page.getByText('No title')).toBeVisible();
    await expect(page.getByText('height: 39 cm')).toBeVisible();
    // Check for museum collection (just verify one part exists)
    await expect(page.getByText("Collection Museum")).toBeVisible();
    
    // 4. Navigate to About my work page
    await homePage.navigateToAboutWork();
    
    // 5. Verify biographical content and work philosophy is displayed
    await aboutPage.verifyPageContent();
    await aboutPage.verifyBiographicalContent();
    await aboutPage.verifyWorkPhilosophy();
    
    // 6. Check that embedded artwork images load properly
    // Verify images are present (check for figure elements which contain images)
    const figures = page.locator('figure');
    const figureCount = await figures.count();
    expect(figureCount).toBeGreaterThan(0);
    
    // 7. Verify links to external sites (Kees Hoogendam) work correctly
    await aboutPage.verifyExternalLinks();
    await TestHelpers.verifyExternalLink(
      page, 
      'Kees Hoogendam', 
      'https://www.keeshoogendampottenbakker.nl/'
    );
    
    // Additional content verification
    // Homepage displays multiple artwork images with proper descriptions
    await homePage.navigateToHomepage();
    await expect(page.getByText('Welcome to this visual introduction of my work.')).toBeVisible();
    
    // Artwork titles, dimensions, years, and collection info are shown
    await expect(page.getByText('height: 33 cm')).toBeVisible();
    await expect(page.getByText('height: 28 cm')).toBeVisible();
    await expect(page.getByText('height: 29 cm')).toBeVisible();
    
    // About page contains comprehensive biographical content
    await homePage.navigateToAboutWork();
    await expect(page.getByText('My fascination for pottery began in Amsterdam in 1952')).toBeVisible();
    await expect(page.getByText('At the age of twelve I convinced my mother')).toBeVisible();
    await expect(page.getByText('In 1985 Kees Hoogendam and I made jointly')).toBeVisible();
    
    // Content is well-formatted and readable
    await expect(aboutPage.autobiographicalSection).toBeVisible();
    await expect(aboutPage.ceramicsSection).toBeVisible();
    await expect(aboutPage.glassSection).toBeVisible();
    
    // Verify internal navigation links work
    const internalLinks = page.getByRole('link', { name: 'Introduction' });
    await expect(internalLinks.first()).toBeVisible();
  });
});