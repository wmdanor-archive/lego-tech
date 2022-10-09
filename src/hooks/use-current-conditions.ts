import { useEffect, useState } from 'react';
import { getCurrentConditionsByKey } from '../services/forecast.service';
import { AccuweatherCurrentConditions } from '../services/types/accuweather-current-conditions';

export const useCurrentConditions = (key: string) => {
  const [data, setData] = useState<AccuweatherCurrentConditions | undefined>();
  const [status, setStatus] = useState<'pending' | 'fetched' | 'error'>(
    'pending',
  );
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentConditionsByKey(key)
      .then(data => {
        setData(data);
        setError('');
        setStatus('fetched');
      })
      .catch(error => {
        setData(undefined);
        setError(error.message);
        setStatus('error');
      });
  }, [key]);

  return { data, status, error };
};
