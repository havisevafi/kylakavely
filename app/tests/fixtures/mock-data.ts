import { Page } from '@playwright/test';
import { ANIMATION_BUFFER, ANIMATION_DELAY } from './constants';

/**
 * Utility functions for test data and common async operations
 *
 * Includes animation wait utilities, destination ID extraction, and delays
 */

/**
 * Wait for Material-UI page transition animation to complete
 *
 * @param page - Playwright page object
 * @param delayMs - Animation delay in milliseconds (default: ANIMATION_DELAY + ANIMATION_BUFFER)
 *
 * @example
 * await page.click('[data-testid="destination-card"]');
 * await waitForAnimation(page);
 * // Page transition animation is complete
 */
export async function waitForAnimation(
  page: Page,
  delayMs: number = ANIMATION_DELAY + ANIMATION_BUFFER,
): Promise<void> {
  await page.waitForTimeout(delayMs);
}

/**
 * Generic delay utility (use sparingly - prefer explicit wait conditions)
 *
 * @param ms - Milliseconds to delay
 *
 * @example
 * await delay(1000); // Wait 1 second
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extract all destination IDs from page destinations
 * Reads destination data from the app's internal state or DOM
 *
 * @param page - Playwright page object
 * @returns Array of destination IDs (as numbers or strings)
 *
 * @example
 * const ids = await getDestinationIds(page);
 * console.log(ids); // [1, 2, 3, 4, ...]
 */
export async function getDestinationIds(
  page: Page,
): Promise<(number | string)[]> {
  // Get destination IDs from data-testid attributes on destination cards
  const cardElements = await page
    .locator('[data-testid^="destination-card-"]')
    .all();

  const ids: (number | string)[] = [];
  for (const element of cardElements) {
    const testId = await element.getAttribute('data-testid');
    if (testId) {
      // Extract ID from "destination-card-{id}"
      const id = testId.replace('destination-card-', '');
      ids.push(isNaN(Number(id)) ? id : Number(id));
    }
  }

  return ids;
}

/**
 * Get the first destination ID from the page
 * Useful for navigating to the first destination
 *
 * @param page - Playwright page object
 * @returns First destination ID, or null if no destinations found
 */
export async function getFirstDestinationId(
  page: Page,
): Promise<number | string | null> {
  const ids = await getDestinationIds(page);
  return ids.length > 0 ? ids[0] : null;
}

/**
 * Get the last destination ID from the page
 * Useful for testing the last destination's next button is disabled
 *
 * @param page - Playwright page object
 * @returns Last destination ID, or null if no destinations found
 */
export async function getLastDestinationId(
  page: Page,
): Promise<number | string | null> {
  const ids = await getDestinationIds(page);
  return ids.length > 0 ? ids[ids.length - 1] : null;
}

/**
 * Wait for network to be idle (all pending requests complete)
 * Useful after navigation or clicking elements that trigger requests
 *
 * @param page - Playwright page object
 *
 * @example
 * await page.click('a');
 * await waitForNetworkIdle(page);
 * // All requests are complete
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for DOM to be stable (all dynamic content rendered)
 * Useful for waiting after navigation before asserting content
 *
 * @param page - Playwright page object
 */
export async function waitForDomStable(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Wait for both network idle and DOM stable
 * Most reliable wait condition for complex pages with animations
 *
 * @param page - Playwright page object
 */
export async function waitForPageFullyLoaded(page: Page): Promise<void> {
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    page.waitForLoadState('networkidle'),
  ]);
}

/**
 * Take a screenshot for visual debugging
 * Screenshots are stored in test-results/ directory
 *
 * @param page - Playwright page object
 * @param name - Screenshot name (without .png extension)
 *
 * @example
 * await takeScreenshot(page, 'home-page-loaded');
 * // Screenshot saved to test-results/home-page-loaded.png
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `test-results/${name}.png` });
}
