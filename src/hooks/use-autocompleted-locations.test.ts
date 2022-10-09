import { act, cleanup } from '@testing-library/react-hooks';
import { getAutocompletedLocations } from '../services/location.service';
import mockAutocompletedLocationsJson from '../services/mocks/mock.json';
import { AccuweatherAutocompletedLocation } from '../services/types/accuweather-autocompleted-location';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';
import { renderHookWithProviders } from '../utils/test-utils';
import { useAutocompletedLocations } from './use-autocompleted-locations';

let mockAutocompletedLocations: AccuweatherAutocompletedLocation[] = [];
const mockError = 'error mock';

jest.mock('../services/location.service', () => ({
  getAutocompletedLocations: jest.fn(
    (query: string): Promise<AccuweatherAutocompletedLocation[]> => {
      if (!mockAutocompletedLocations.length) {
        return Promise.reject(new Error(mockError));
      }

      return Promise.resolve(mockAutocompletedLocations);
    },
  ),
}));

beforeAll(() => {
  mockAutocompletedLocations = [];
});

afterEach(async () => {
  await cleanup();
  (getAutocompletedLocations as jest.Mock).mockClear();
});

it('Should be pending, have empty data array and no error when just mounted', () => {
  const query = '';
  const minimumQueryLength = 2;
  const debounce = 500;
  mockAutocompletedLocations = [];
  const { result } = renderHookWithProviders(() =>
    useAutocompletedLocations(query, minimumQueryLength, debounce),
  );

  expect(result.current).toEqual({
    status: 'pending',
    data: [],
    error: '',
  });
});

it('Should have have empty data array and no error when query is longer than minimum and not awaited debounce time', async () => {
  mockAutocompletedLocations = mockAutocompletedLocationsJson;
  const query = 'abc';
  const minimumQueryLength = 2;
  const debounce = 500;
  const { result } = renderHookWithProviders(() =>
    useAutocompletedLocations(query, minimumQueryLength, debounce),
  );

  expect(getAutocompletedLocations).not.toBeCalled();
  expect(result.current).toEqual({
    status: 'pending',
    data: [],
    error: '',
  });
});

it('Should have data and no error when awaited for successful response, query is longer than minimum and awaited debounce time', async () => {
  mockAutocompletedLocations = mockAutocompletedLocationsJson;
  const query = 'abc';
  const minimumQueryLength = 2;
  const debounce = 500;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useAutocompletedLocations(query, minimumQueryLength, debounce),
  );

  await act(async () => {
    jest.advanceTimersByTime(debounce);
    await waitForNextUpdate();
  });

  expect(getAutocompletedLocations).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'fetched',
    data: mockAutocompletedLocationsJson.map(mapAccuweatherLocationToLocation),
    error: '',
  });
});

it('Should have have empty data array and no error when awaited for successful response, query is smaller than minimum and awaited debounce time', async () => {
  mockAutocompletedLocations = mockAutocompletedLocationsJson;
  const query = 'a';
  const minimumQueryLength = 2;
  const debounce = 500;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useAutocompletedLocations(query, minimumQueryLength, debounce),
  );

  await act(async () => {
    jest.advanceTimersByTime(debounce);
    await waitForNextUpdate();
  });

  expect(getAutocompletedLocations).not.toBeCalled();
  expect(result.current).toEqual({
    status: 'fetched',
    data: [],
    error: '',
  });
});

it('Should have error and empty data array when awaited for error response, query is longer than minimum and awaited debounce time', async () => {
  const query = 'abc';
  const minimumQueryLength = 2;
  const debounce = 500;
  mockAutocompletedLocations = [];
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useAutocompletedLocations(query, minimumQueryLength, debounce),
  );

  await act(async () => {
    jest.advanceTimersByTime(debounce);
    await waitForNextUpdate();
  });

  expect(getAutocompletedLocations).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'error',
    data: [],
    error: mockError,
  });
});
