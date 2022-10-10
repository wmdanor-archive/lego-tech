import { AccuweatherAutocompletedLocation } from './types/accuweather-autocompleted-location';
import { AccuweatherLocation } from './types/accuweather-location';
import mock from './mocks/mock-search-location.json';
import mockGeo from './mocks/mock-search-by-geo.json';
import mockAutocompleted from './mocks/mock.json';

export function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function getLocationByKey(key: string): Promise<AccuweatherLocation> {
  await delay(1000);
  return mock;
}

export async function getLocationByGeolocationPosition(position: GeolocationPosition): Promise<AccuweatherLocation> {
  await delay(1000);
  return mockGeo;
}

export async function getAutocompletedLocations(query: string): Promise<AccuweatherAutocompletedLocation[]> {
  await delay(1000);
  return mockAutocompleted;
}
