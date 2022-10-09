import { AccuweatherAutocompletedLocation } from '../services/types/accuweather-autocompleted-location';
import { AccuweatherLocation } from '../services/types/accuweather-location';
import { Location } from '../store/types';

export function mapAccuweatherLocationToLocation(
  data: AccuweatherLocation,
): Location {
  return {
    key: data.Key,
    name: data.LocalizedName,
    type: data.Type,
    administrativeArea: {
      id: data.AdministrativeArea.ID,
      name: data.AdministrativeArea.LocalizedName,
    },
    country: {
      id: data.Country.ID,
      name: data.Country.LocalizedName,
    },
  };
}

export function mapAccuweatherAutocompletedLocationToLocation(
  data: AccuweatherAutocompletedLocation,
): Location {
  return {
    key: data.Key,
    type: data.Type,
    name: data.LocalizedName,
    country: {
      id: data.Country.ID,
      name: data.Country.LocalizedName,
    },
    administrativeArea: {
      id: data.AdministrativeArea.ID,
      name: data.AdministrativeArea.LocalizedName,
    },
  };
}
