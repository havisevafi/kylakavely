import { Page } from '@playwright/test';

/**
 * Utility functions for mocking the Geolocation API in Playwright tests
 *
 * Prevents browser permission prompts and enables consistent geolocation testing
 */

/**
 * Mock geolocation API for a page
 *
 * @param page - Playwright page object
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 *
 * @example
 * await mockGeolocation(page, 61.5, 24.1);
 * // Page now reports geolocation as Haviseva, Finland
 */
export async function mockGeolocation(
  page: Page,
  latitude: number,
  longitude: number,
): Promise<void> {
  // Grant geolocation permission
  await page.context().grantPermissions(['geolocation']);

  // Set mock geolocation coordinates
  await page.context().setGeolocation({ latitude, longitude });

  // Optional: Set as precise location (not always required but good practice)
  await page.context().setGeolocation({ latitude, longitude });
}

/**
 * Clear mocked geolocation from a page
 *
 * @param page - Playwright page object
 *
 * @example
 * await clearMockedGeolocation(page);
 * // Page geolocation is reset
 */
export async function clearMockedGeolocation(page: Page): Promise<void> {
  await page.context().clearPermissions();
}

/**
 * Set geolocation with simulated delay (mimics real geolocation request)
 *
 * @param page - Playwright page object
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param delayMs - Delay in milliseconds before setting location (default: 500ms)
 */
export async function mockGeolocationWithDelay(
  page: Page,
  latitude: number,
  longitude: number,
  delayMs: number = 500,
): Promise<void> {
  await page.context().grantPermissions(['geolocation']);

  // Simulate network delay for realistic testing
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  await page.context().setGeolocation({ latitude, longitude });
}

/**
 * Deny geolocation permission (for testing error handling)
 *
 * @param page - Playwright page object
 *
 * @example
 * await denyGeolocation(page);
 * // Geolocation requests will be denied
 */
export async function denyGeolocation(page: Page): Promise<void> {
  // Explicitly deny geolocation permission
  // This is the default behavior when permissions are not granted
  // Just ensure context has no geolocation permission
  await page.context().clearPermissions();
}
