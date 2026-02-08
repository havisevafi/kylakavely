/**
 * Test constants for Kylakavely E2E tests
 *
 * Centralized configuration for timeouts, delays, and routes
 */

// Timeouts
export const ANIMATION_DELAY = 300; // Material-UI page transition animation
export const ANIMATION_BUFFER = 100; // Additional buffer for animation waits

// Base URL (configured in playwright.config.ts)
export const BASE_URL = 'http://localhost:5173/kylakavely';

// Router routes
export const BASE_ROUTES = {
  HOME: '/#/',
  MAP: '/#/map',
  DESTINATION: (id: number | string) => `/#/${id}`,
} as const;

// Geolocation test coordinates (Haviseva village)
export const TEST_GEOLOCATION = {
  HAVISEVA: { latitude: 61.5, longitude: 24.1 },
} as const;
