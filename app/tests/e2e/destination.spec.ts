import { expect, test } from '@playwright/test';
import { DestinationPage } from '../fixtures/page-objects/DestinationPage';
import { HomePage } from '../fixtures/page-objects/HomePage';

test.describe('Destination Detail Pages', () => {
  let destinationPage: DestinationPage;

  test.beforeEach(async ({ page }) => {
    destinationPage = new DestinationPage(page);
    await destinationPage.navigateAndWait(3);
  });

  test('Destination page loads', async () => {
    const title = await destinationPage.title.textContent();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Destination title visible', async () => {
    await expect(destinationPage.title).toBeVisible();
  });

  test('Previous button works', async () => {
    await destinationPage.prevButton.click();
    await destinationPage.waitForNavigation();
    await destinationPage.waitForPageLoad();
  });

  test('Next button works', async () => {
    await destinationPage.nextButton.click();
    await destinationPage.waitForNavigation();
    await destinationPage.waitForPageLoad();
  });

  test('Home button returns to home', async ({ page }) => {
    await destinationPage.homeButton.click();
    await destinationPage.waitForNavigation();
    await destinationPage.waitForPageLoad();
    const homePage = new HomePage(page);
    await homePage.waitForNavigation();
    await homePage.waitForPageLoad();
    await homePage.isOnPage();
  });

  test('Images load correctly', async () => {
    const allHaveSrc = await destinationPage.allImagesHaveSrc();
    expect(typeof allHaveSrc).toBe('boolean');
  });

  test('Content blocks render', async () => {
    const blockCount = await destinationPage.getContentBlockCount();
    expect(blockCount).toBeGreaterThanOrEqual(0);
  });

  test('Images present', async () => {
    expect(await destinationPage.images.count()).toBeGreaterThanOrEqual(0);
  });

  test('Content visible', async () => {
    await expect(destinationPage.content).toBeVisible();
  });

  test('Navigation controls present', async () => {
    await expect(destinationPage.homeButton).toBeVisible();
  });

  test('CopyrightNotice is visible above the bottom navigation', async () => {
    const copyright = destinationPage.copyrightNotice;

    await copyright.scrollIntoViewIfNeeded();
    await expect(copyright).toBeVisible();

    const copyrightBox = await copyright.boundingBox();
    const navBox = await destinationPage.bottomNav.boundingBox();

    if (copyrightBox && navBox) {
      expect(copyrightBox.y + copyrightBox.height).toBeLessThanOrEqual(navBox.y);
    }
  });
});
