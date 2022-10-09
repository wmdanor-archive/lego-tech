import { delay } from './location.service';
import fiveDaysForecastMock from './mocks/mock-search-5-by-key-details.json';
import currentConditionsMock from './mocks/mock-current-conditions-details.json';
import { AccuweatherCurrentConditions } from './types/accuweather-current-conditions';
import { AccuweatherForecast } from './types/accuweather-forecast';

export async function get5DaysForecastByKey(key: string): Promise<AccuweatherForecast> {
  // TODO
  await delay(2000);
  return fiveDaysForecastMock;
}

export async function getCurrentConditionsByKey(key: string): Promise<AccuweatherCurrentConditions> {
  await delay(2000);
  return currentConditionsMock;
}
