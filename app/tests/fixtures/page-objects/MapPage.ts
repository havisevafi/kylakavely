import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Map page (/map)
 *
 * Provides methods for interacting with Leaflet map, markers, and geolocation
 */
export class MapPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly mapContainer = this.page.locator('.destination-map-container');
  readonly leafletPopup = this.page.locator('.leaflet-popup-content-wrapper');
  readonly leafletPopupLink = this.leafletPopup.getByRole('link');
  readonly markers = this.page.locator('.leaflet-marker-icon');
  readonly zoomInButton = this.page.locator('.leaflet-control-zoom-in');

  async isOnPage() {
    // TODO: rhe PageTransitionWrapper renders the dom twice during animation,
    //  which causes the selector to find more than one map container. Fix is
    //  to specify different layouts for Map and Home routes, the animation is
    //  mainly for the swipe effect between destinations anyway.
    return expect(await this.mapContainer.count()).toBeGreaterThan(0);
  }

  async clickZoomIn(): Promise<void> {
    await this.zoomInButton.click();
    await this.page.waitForTimeout(300);
  }

  async clickBackButton(): Promise<void> {
    // Use getByRole to find back button
    const buttons = this.page.getByRole('button');
    await buttons.first().click();
    await this.waitForNavigation();
  }

  async waitForMapLoaded(): Promise<void> {
    await this.mapContainer.waitFor({ state: 'visible' });
  }

  async waitForMarkersLoaded(): Promise<void> {
    await this.markers.first().waitFor({ state: 'visible' });
  }

  async navigateAndWait(): Promise<void> {
    await this.navigateToMap();
    await this.waitForPageLoad();
  }
}
