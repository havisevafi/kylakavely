import { test } from '@playwright/test';
import { ErrorPage } from '../fixtures/page-objects/ErrorPage';
import { HomePage } from '../fixtures/page-objects/HomePage';
import { MapPage } from '../fixtures/page-objects/MapPage';

test.describe('Error Handling', () => {
  let errorPage: ErrorPage;
  let homePage: HomePage;
  let mapPage: MapPage;

  test.beforeEach(async ({ page }) => {
    errorPage = new ErrorPage(page);
    homePage = new HomePage(page);
    mapPage = new MapPage(page);
  });

  test('Invalid route handled', async () => {
    await errorPage.navigate('/#/invalid-route');
    await errorPage.waitForPageLoad();
    await errorPage.isOnPage();
  });

  test('Invalid destination ID handled', async () => {
    await errorPage.navigate('/#/9999');
    await errorPage.waitForPageLoad();
    await errorPage.isOnPage();
  });

  test('Navigation after invalid route', async () => {
    await errorPage.navigate('/#/invalid');
    await errorPage.navigateToHome();
    await errorPage.waitForPageLoad();
    await homePage.waitForPageLoad();
    await homePage.isOnPage();
  });

  test('Home accessible after error', async () => {
    await errorPage.navigate('/#/invalid');
    await errorPage.navigateToHome();
    await homePage.waitForPageLoad();
    await homePage.isOnPage();
  });

  test('Map accessible after error', async () => {
    await errorPage.navigate('/#/invalid');
    await errorPage.navigateToMap();
    await mapPage.isOnPage();
  });

  test('Multiple invalid routes handled', async () => {
    for (let i = 0; i < 3; i++) {
      await errorPage.navigate(`/#/invalid-${i}`);
      await errorPage.isOnPage();
    }
  });
});
