import { waitFor } from '@testing-library/dom';
import { act, cleanup } from '@testing-library/react-hooks';
import { getLocationByKey } from '../services/location.service';
import mockLocationJson from '../services/mocks/mock-search-location.json';
import { AccuweatherLocation } from '../services/types/accuweather-location';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';
import { renderHookWithProviders } from '../utils/test-utils';
import { useLocation } from './use-location';

let mockLocation: AccuweatherLocation | undefined;
const mockError = 'error mock';

jest.mock('../services/location.service', () => ({
  getLocationByKey: jest.fn(
    (key: string): Promise<AccuweatherLocation> => {
      if (!mockLocation) {
        return Promise.reject(new Error(mockError));
      }

      return Promise.resolve(mockLocation);
    },
  ),
}));

beforeAll(() => {
  mockLocation = undefined;
});

afterEach(async () => {
  await cleanup();
  (getLocationByKey as jest.Mock).mockClear();
});

it('Should be pending, have no data and no error when just mounted', () => {
  const key = '';
  const { result } = renderHookWithProviders(() => useLocation(key));

  expect(result.current).toEqual({
    status: 'pending',
    data: undefined,
    error: '',
  });
});

it('Should have data and no error when awaited for successful response and have no data in store', async () => {
  const key = '';
  mockLocation = mockLocationJson;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useLocation(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(getLocationByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'fetched',
    data: mapAccuweatherLocationToLocation(mockLocationJson),
    error: '',
  });
});

it('Should have error and no data when awaited for error response and have no data in store', async () => {
  const key = '';
  mockLocation = undefined;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useLocation(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(getLocationByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'error',
    data: undefined,
    error: mockError,
  });
});

it('Should have data from the store and no error when awaited for response and have data in store', async () => {
  const key = mockLocationJson.Key;
  const { result } = renderHookWithProviders(() => useLocation(key), {
    preloadedState: {
      recentLocations: {
        locations: [mapAccuweatherLocationToLocation(mockLocationJson)],
        maxRecentLocations: 3,
      },
    },
  });

  await waitFor(() => {
    expect(result.current.data?.key).toBe(key);
  });

  expect(getLocationByKey).not.toBeCalled();
  expect(result.current).toEqual({
    status: 'fetched',
    data: mapAccuweatherLocationToLocation(mockLocationJson),
    error: '',
  });
});
