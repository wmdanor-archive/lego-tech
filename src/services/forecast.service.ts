import { makeRequest } from '../utils/make-request';
import { AccuweatherCurrentConditions } from './types/accuweather-current-conditions';
import { AccuweatherForecast } from './types/accuweather-forecast';

export async function get5DaysForecastByKey(key: string): Promise<AccuweatherForecast> {
  return makeRequest(`/forecasts/v1/daily/5day/${key}`, {
    language: 'en-gb',
    details: true,
    metric: true,
  });
}

export async function getCurrentConditionsByKey(key: string): Promise<AccuweatherCurrentConditions> {
  return makeRequest(`/currentconditions/v1/${key}`, {
    language: 'en-gb',
    details: true,
  });
}
