import { useEffect, useState } from 'react';
import { getLocationByKey } from '../services/location.service';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRecentLocations } from '../store/slices/recent-locations.slice';
import { Location } from '../store/types';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';

export const useLocation = (key: string) => {
  const [data, setData] = useState<Location | undefined>();
  const [status, setStatus] = useState<'pending' | 'fetched' | 'error'>(
    'pending',
  );
  const [error, setError] = useState('');
  const recentLocations = useAppSelector(selectRecentLocations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStatus('pending');
    const location = recentLocations.find(l => l.key === key);
    if (location) {
      setData(location);
      setStatus('fetched');

      return;
    }

    getLocationByKey(key)
      .then(data => {
        const location = mapAccuweatherLocationToLocation(data);

        setData(location);
        setError('');
        setStatus('fetched');
      })
      .catch(error => {
        setData(undefined);
        setError(error.message);
        setStatus('error');
        console.error(error);
      });
  }, [dispatch, key, recentLocations]);

  return { data, status, error };
};
