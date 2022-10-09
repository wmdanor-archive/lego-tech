import { cleanup, renderHook } from '@testing-library/react-hooks';
import mockCurrentLocationJson from '../services/mocks/mock-search-by-geo.json';
import { AccuweatherLocation } from '../services/types/accuweather-location';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';
import { useCurrentLocation } from './use-current-location';

let mockPosition: GeolocationPosition | undefined;
const mockPositionError = 'position error mock';

let mockLocation: AccuweatherLocation | undefined;
const mockLocationError = 'location error mock';

beforeEach(() => {
  mockPosition = undefined;
  mockLocation = undefined;
});

afterEach(async () => {
  await cleanup();
});

jest.mock('../services/location.service', () => ({
  getLocationByGeolocationPosition: jest.fn(
    (position: GeolocationPosition): Promise<AccuweatherLocation> => {
      if (!mockLocation) {
        return Promise.reject(new Error(mockLocationError));
      }

      return Promise.resolve(mockLocation);
    },
  ),
}));

jest.mock('./use-geolocation-position', () => ({
  useGeolocationPosition: () => ({
    fetch: jest.fn(() => {
      if (!mockPosition) {
        return Promise.reject(new Error(mockPositionError));
      }

      return Promise.resolve(mockPosition);
    }),
  }),
}));

it('Should reject when use geolocation position threw error', async () => {
  mockPosition = undefined;

  const { result } = renderHook(() => useCurrentLocation());

  await expect(result.current.fetch()).rejects.toMatchObject({ message: mockPositionError });
});

it('Should reject when getting location by geolocation position threw error', async () => {
  mockPosition = {} as GeolocationPosition;
  mockLocation = undefined;

  const { result } = renderHook(() => useCurrentLocation());

  await expect(result.current.fetch()).rejects.toMatchObject({ message: mockLocationError });
});

it('Should return location when no error occurred', async () => {
  mockPosition = {} as GeolocationPosition;
  mockLocation = mockCurrentLocationJson;

  const { result } = renderHook(() => useCurrentLocation());

  await expect(result.current.fetch()).resolves.toEqual(
    mapAccuweatherLocationToLocation(mockCurrentLocationJson),
  );
});
