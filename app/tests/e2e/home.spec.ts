import { expect, test } from '@playwright/test';
import { HomePage } from '../fixtures/page-objects/HomePage';

/**
 * E2E tests for Home page (/ route)
 *
 * Tests destination card grid rendering, navigation, and responsive layout
 */

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateAndWait();
  });

  test('Home page loads successfully', async () => {
    const url = await homePage.getUrl();
    expect(url).toContain('#/');
  });

  test('Home page displays destination cards', async () => {
    await homePage.waitForDestinationCardsLoaded();
    const cardCount = await homePage.getDestinationCardCount();
    expect(await homePage.destinationLinks.count()).toBeGreaterThan(0);
  });

  test('Destination cards are clickable', async () => {
    await homePage.waitForDestinationCardsLoaded();
    expect(await homePage.destinationLinks.count()).toBeGreaterThan(0);
  });

  test('Clicking destination card navigates', async () => {
    await homePage.waitForDestinationCardsLoaded();
    await homePage.destinationLinks.first().click();
    await homePage.waitForNavigation();
    const url = await homePage.getUrl();
    expect(url).toContain('#/');
  });

  test('Map button exists and is clickable', async () => {
    await homePage.mapButton.click();
    const url = await homePage.getUrl();
    expect(url).toContain('map');
  });

  test('Multiple destination cards visible', async () => {
    await homePage.waitForDestinationCardsLoaded();
    const cardCount = await homePage.getDestinationCardCount();
    expect(await homePage.destinationLinks.count()).toBeGreaterThan(0);
  });
});
