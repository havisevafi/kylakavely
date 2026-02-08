import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Error page (fallback for invalid routes)
 *
 * Provides methods for interacting with error messages and navigation
 */
export class ErrorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly title = this.getByRole('heading', {
    name: 'Voi ei! Jotain meni pieleen...',
  });

  isOnPage() {
    return expect(this.title).toBeVisible();
  }
}
