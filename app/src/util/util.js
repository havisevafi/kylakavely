export const resolveImagePath = (image) =>
  `${import.meta.env.BASE_URL}/images/${image}`;

const toRad = (angle) => (angle * Math.PI) / 180;

export const haversineDistanceKm = (loc1, loc2) => {
  const R = 6361.653; // Mean radius (in km) of the Earth near 61.5 parallel
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const getGeoLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
};

export const findNearestDestinationId = (destinations, currentLoc) => {
  const destinationsWithDistances = Object.entries(destinations).map(
    ([id, d]) => ({
      ...d,
      id,
      distance: haversineDistanceKm(currentLoc, d.location),
    }),
  );

  destinationsWithDistances.sort((d1, d2) => d1.distance - d2.distance);

  console.log('destinationsWithDistances', destinationsWithDistances);

  return destinationsWithDistances[0].id;
};
