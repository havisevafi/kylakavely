import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Home page (/)
 *
 * Provides methods for interacting with destination cards, hero section, and navigation
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly heroTitle = this.getByRole('heading', {
    name: 'Tervetuloa Havisevalle',
  });
  readonly mapButton = this.getByRole('button', {
    name: 'Näytä kyläkävelyn kohteet kartalla',
  });
  readonly destinationLinks = this.page.getByRole('link');

  isOnPage() {
    return expect(this.heroTitle).toBeVisible();
  }

  async getDestinationCardCount(): Promise<number> {
    return this.destinationLinks.count();
  }

  async waitForDestinationCardsLoaded(): Promise<void> {
    await this.destinationLinks.first().waitFor({ state: 'visible' });
  }

  async navigateAndWait(): Promise<void> {
    await this.navigateToHome();
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    const maxAttempts = 10;
    let attempts = 0;
    let heroTitleCount = await this.heroTitle.count();
    while (heroTitleCount > 1 && attempts < maxAttempts) {
      attempts++;
      await super.waitForPageLoad();
      heroTitleCount = await this.heroTitle.count();
    }
  }
}
