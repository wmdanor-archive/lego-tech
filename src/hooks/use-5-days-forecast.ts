import { useEffect, useState } from 'react';
import { get5DaysForecastByKey } from '../services/forecast.service';
import { AccuweatherForecast } from '../services/types/accuweather-forecast';

export const use5DaysForecast = (key: string) => {
  const [data, setData] = useState<AccuweatherForecast | undefined>();
  const [status, setStatus] = useState<'pending' | 'fetched' | 'error'>('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    get5DaysForecastByKey(key)
      .then((data) => {
        setData(data);
        setError('');
        setStatus('fetched');
      })
      .catch(error => {
        setData(undefined);
        setError(error.message);
        setStatus('error');
        console.error(error);
      });
  }, [key]);

  return { data, status, error };
};
