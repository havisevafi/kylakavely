import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Destination detail page (/:id)
 *
 * Provides methods for interacting with content, navigation buttons, and images
 */
export class DestinationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly title = this.page.getByRole('heading', { level: 1 });
  readonly content = this.page.getByRole('main');
  readonly prevButton = this.page.getByRole('button', { name: 'Edellinen' });
  readonly nextButton = this.page.getByRole('button', { name: 'Seuraava' });
  readonly homeButton = this.page.getByRole('button', { name: 'Pääsivu' });
  readonly images = this.page.locator('img');

  async isOnPage() {
    // TODO: try to remove flakiness due to duplicate main element. first() was added
    // because the swipe component sometimes is caught in a state where there are two
    // main elements on the page.
    return expect(this.content.first()).toBeVisible();
  }

  getContentBlocks() {
    return this.content.locator('p.contentblock-paragraph');
  }

  async isHomeButtonVisible(): Promise<boolean> {
    return this.homeButton.isVisible().catch(() => false);
  }

  async getContentBlockCount(): Promise<number> {
    return this.getContentBlocks().count();
  }

  async allImagesHaveSrc(): Promise<boolean> {
    const images = await this.images.all();
    for (const image of images) {
      const src = await image.getAttribute('src');
      if (!src) return false;
    }
    return true;
  }

  async waitForContentLoaded(): Promise<void> {
    // Wait for main content to be visible instead of specific heading
    await this.content.waitFor({ state: 'visible' });
  }

  async navigateAndWait(id: number | string): Promise<void> {
    await this.navigateToDestination(id);
    await this.waitForPageLoad();
    await this.waitForContentLoaded();
  }
}
