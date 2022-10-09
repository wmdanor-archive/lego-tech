import { useCallback } from 'react';

export const useGeolocationPosition = () => {
  const fetch = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (positionError) => {
          reject(positionError);
        }
      );
    });
  }, []);

  return { fetch };
};
