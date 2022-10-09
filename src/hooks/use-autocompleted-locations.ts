import { useCallback, useEffect, useState } from 'react';
import { getAutocompletedLocations } from '../services/location.service';
import { Location } from '../store/types';
import { mapAccuweatherAutocompletedLocationToLocation } from '../utils/mappers';

export const useAutocompletedLocations = (
  query: string,
  minimumQueryLength = 1,
  debounce = 500,
) => {
  const [data, setData] = useState<Location[]>([]);
  const [status, setStatus] = useState<'pending' | 'fetched' | 'error'>(
    'pending',
  );
  const [error, setError] = useState('');

  const fetchAutocompletedLocations = useCallback(() => {
    if (query.length < minimumQueryLength) {
      setData([]);
      setStatus('fetched');

      return;
    }

    getAutocompletedLocations(query)
      .then(data => {
        const locations = data.map(mapAccuweatherAutocompletedLocationToLocation);

        setData(locations);
        setError('');
        setStatus('fetched');
      })
      .catch(fetchError => {
        setData([]);
        setError(fetchError.message);
        setStatus('error');
        console.error(fetchError);
      });
  }, [minimumQueryLength, query]);

  useEffect(() => {
    setStatus('pending');
    const timeoutId = setTimeout(fetchAutocompletedLocations, debounce);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debounce, fetchAutocompletedLocations, query]);

  return { data, status, error };
};
