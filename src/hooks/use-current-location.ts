import { useCallback } from 'react';
import { getLocationByGeolocationPosition } from '../services/location.service';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';
import { useGeolocationPosition } from './use-geolocation-position';

export const useCurrentLocation = () => {
  const { fetch: fetchGeolocationPosition } = useGeolocationPosition();

  const fetch = useCallback(() => {
    return fetchGeolocationPosition()
      .then(position => getLocationByGeolocationPosition(position))
      .then(data => mapAccuweatherLocationToLocation(data));
  }, [fetchGeolocationPosition]);

  return { fetch };
};
