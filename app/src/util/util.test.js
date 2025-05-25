import { describe, expect, test } from 'vitest';
import { haversineDistanceKm } from './util.js';

describe('util', () => {
  describe('haversineDistanceKm', () => {
    test('~1 km', () => {
      const loc1 = { lat: 61.53496, lng: 24.081517 };
      const loc2 = { lat: 61.542642, lng: 24.095026 };

      const distanceKm = haversineDistanceKm(loc1, loc2);

      expect(distanceKm).toBeCloseTo(1.11, 1);
    });

    test('~10 km', () => {
      const loc1 = { lat: 61.50761030509614, lng: 23.69755431994114 };
      const loc2 = { lat: 61.497803996261204, lng: 23.884430781784253 };

      const distanceKm = haversineDistanceKm(loc1, loc2);

      expect(distanceKm).toBeCloseTo(10, 0.5);
    });

    test('~100 km', () => {
      const loc1 = { lat: 61.47254854731472, lng: 22.001762342929485 };
      const loc2 = { lat: 61.49700313034131, lng: 23.884578121055853 };

      const distanceKm = haversineDistanceKm(loc1, loc2);

      expect(distanceKm).toBeCloseTo(100, 0.1);
    });
  });
});
