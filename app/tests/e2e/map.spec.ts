import { expect, test } from '@playwright/test';
import { TEST_GEOLOCATION } from '../fixtures/constants';
import {
  clearMockedGeolocation,
  mockGeolocation,
} from '../fixtures/mock-geolocation';
import { DestinationPage } from '../fixtures/page-objects/DestinationPage';
import { MapPage } from '../fixtures/page-objects/MapPage';

test.describe('Map Page', () => {
  let mapPage: MapPage;

  test.beforeEach(async ({ page }) => {
    mapPage = new MapPage(page);
    await mapPage.navigateAndWait();
  });

  test.afterEach(async ({ page }) => {
    await clearMockedGeolocation(page);
  });

  test('Map page loads', async () => {
    const url = await mapPage.getUrl();
    expect(url).toContain('map');
  });

  test('Map displays markers', async () => {
    await mapPage.waitForMarkersLoaded();
    const markerCount = await mapPage.markers.count();
    expect(markerCount).toBeGreaterThan(0);
  });

  test('Clicking marker navigates', async ({ page }) => {
    await mapPage.waitForMarkersLoaded();
    await mapPage.markers.first().click();

    await expect(mapPage.leafletPopup).toBeVisible();

    await mapPage.leafletPopupLink.click();
    await mapPage.waitForNavigation();

    const destinationPage = new DestinationPage(page);
    await destinationPage.waitForPageLoad();
    await destinationPage.isOnPage();
  });

  test('Back button works', async () => {
    await mapPage.clickBackButton();
    const url = await mapPage.getUrl();
    expect(url).toContain('#/');
  });

  test('Geolocation mocking works', async ({ page }) => {
    await mockGeolocation(
      page,
      TEST_GEOLOCATION.HAVISEVA.latitude,
      TEST_GEOLOCATION.HAVISEVA.longitude,
    );
    await mapPage.reload();
    await mapPage.waitForMapLoaded();
  });

  test('Zoom controls functional', async () => {
    await mapPage.clickZoomIn();
  });

  test('Map responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await mapPage.reload();
    await mapPage.waitForMapLoaded();
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Navigation home to map and back', async () => {
    await mapPage.navigateToHome();
    await mapPage.waitForPageLoad();
    await mapPage.navigateToMap();
    await mapPage.waitForPageLoad();
    const url = await mapPage.getUrl();
    expect(url).toContain('map');
  });
});
