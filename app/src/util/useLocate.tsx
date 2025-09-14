import { NavigateFunction } from 'react-router';
import { Destinations } from '../data';
import { findNearestDestinationId, getGeoLocation } from './util';

interface UseLocateProps {
  destinations: Destinations;
  navigate: NavigateFunction;
}

export const useLocate = ({ destinations, navigate }: UseLocateProps) => {
  const onLocateSuccess = (position: GeolocationPosition) => {
    const currentLoc = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    const nearestDestinationId = findNearestDestinationId(
      destinations,
      currentLoc,
    );

    navigate(`/${nearestDestinationId}`);
  };

  const onLocateError = (err: GeolocationPositionError) => {
    navigate('/error');
  };

  return {
    onLocate: async () => {
      await getGeoLocation(onLocateSuccess, onLocateError);
    },
  };
};
