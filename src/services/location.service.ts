import { makeRequest } from '../utils/make-request';
import { AccuweatherAutocompletedLocation } from './types/accuweather-autocompleted-location';
import { AccuweatherLocation } from './types/accuweather-location';

export async function getLocationByKey(key: string): Promise<AccuweatherLocation> {
  return makeRequest(`/locations/v1/${key}`, {
    language: 'en-gb',
    details: true,
  });
}

export async function getLocationByGeolocationPosition(position: GeolocationPosition): Promise<AccuweatherLocation> {
  return makeRequest('/locations/v1/cities/geoposition/search', {
    q: `${position.coords.latitude},${position.coords.longitude}`,
    language: 'en-gb',
    details: true,
  });
}

export async function getAutocompletedLocations(query: string): Promise<AccuweatherAutocompletedLocation[]> {
  return makeRequest('/locations/v1/cities/autocomplete', {
    q: query,
    language: 'en-gb',
  });
}
