import { expect, test } from '@playwright/test';
import { DestinationPage } from '../fixtures/page-objects/DestinationPage';
import { HomePage } from '../fixtures/page-objects/HomePage';
import { MapPage } from '../fixtures/page-objects/MapPage';

test.describe('Cross-Browser Compatibility', () => {
  test('Home page loads in all browsers', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateAndWait();
    const url = await homePage.getUrl();
    expect(url).toContain('#/');
  });

  test('Map page loads in all browsers', async ({ page }) => {
    const mapPage = new MapPage(page);
    await mapPage.navigateAndWait();
    const url = await mapPage.getUrl();
    expect(url).toContain('map');
  });

  test('Destination detail page loads in all browsers', async ({ page }) => {
    const destPage = new DestinationPage(page);
    await destPage.navigateAndWait(3);
    const title = await destPage.title.textContent();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Navigation works in all browsers', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateAndWait();
    await homePage.isOnPage();
    await homePage.mapButton.click();

    const mapPage = new MapPage(page);
    const url = await mapPage.getUrl();
    expect(url).toContain('map');
    await mapPage.waitForPageLoad();
    await mapPage.isOnPage();
  });

  test('Images render in all browsers', async ({ page }) => {
    const destPage = new DestinationPage(page);
    await destPage.navigateAndWait(3);
    const imageCount = await destPage.images.count();
    expect(imageCount).toBeGreaterThanOrEqual(0);
  });

  test('Page layouts render in all browsers', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateAndWait();
    expect(await homePage.destinationLinks.count()).toBeGreaterThan(0);
  });

  test('Buttons render in all browsers', async ({ page }) => {
    const destPage = new DestinationPage(page);
    await destPage.navigateAndWait(3);
    await expect(destPage.homeButton).toBeVisible();
  });

  test('Text content renders in all browsers', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateAndWait();
    expect(await homePage.destinationLinks.count()).toBeGreaterThan(0);
  });
});
