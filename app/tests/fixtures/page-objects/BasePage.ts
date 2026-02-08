import { Page, expect } from '@playwright/test';
import { BASE_ROUTES } from '../constants';
import { waitForAnimation, waitForPageFullyLoaded } from '../mock-data';

/**
 * Base page object class providing common navigation and assertion methods
 *
 * All page objects (HomePage, MapPage, etc.) extend this class
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async navigateToHome(): Promise<void> {
    await this.navigate(BASE_ROUTES.HOME);
  }

  async navigateToMap(): Promise<void> {
    await this.navigate(BASE_ROUTES.MAP);
  }

  /** @param id - Destination ID */
  async navigateToDestination(id: number | string): Promise<void> {
    await this.navigate(BASE_ROUTES.DESTINATION(id));
  }

  async waitForNavigation(): Promise<void> {
    await waitForAnimation(this.page);
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /** Returns hash part of URL (e.g., '#/', '#/map', '#/1') */
  async getHash(): Promise<string> {
    const url = this.page.url();
    const hashIndex = url.indexOf('#');
    return hashIndex > -1 ? url.substring(hashIndex) : '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page
      .locator(selector)
      .isVisible()
      .catch(() => false);
  }

  async getAttribute(
    selector: string,
    attribute: string,
  ): Promise<string | null> {
    return this.page.locator(selector).getAttribute(attribute);
  }

  /** Screenshot name should not include extension */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }

  async reload(): Promise<void> {
    await this.page.reload();
    await waitForPageFullyLoaded(this.page);
  }

  async waitForPageLoad(): Promise<void> {
    await waitForPageFullyLoaded(this.page);
    await waitForAnimation(this.page);
  }

  async expectUrl(urlMatcher: string | RegExp): Promise<void> {
    // Handle both exact URLs and regex patterns
    // Convert strings like "/#/" to regex that matches /kylakavely#/ or /#/
    let matcher = urlMatcher;
    if (typeof urlMatcher === 'string' && urlMatcher.includes('#')) {
      // Create regex that allows optional /kylakavely prefix
      const hashPart = urlMatcher.substring(urlMatcher.indexOf('#'));
      matcher = new RegExp(
        `.*${hashPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
      );
    }
    await expect(this.page).toHaveURL(matcher);
  }

  // Semantic element access via getByRole
  getByRole(role: string, options?: { name?: string | RegExp }) {
    return this.page.getByRole(role as any, options);
  }
}
