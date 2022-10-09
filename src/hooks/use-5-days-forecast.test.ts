import { act, cleanup } from '@testing-library/react-hooks';
import { get5DaysForecastByKey } from '../services/forecast.service';
import mockForecastJson from '../services/mocks/mock-search-5-by-key-details.json';
import { AccuweatherForecast } from '../services/types/accuweather-forecast';
import { renderHookWithProviders } from '../utils/test-utils';
import { use5DaysForecast } from './use-5-days-forecast';

let mockForecast: AccuweatherForecast | undefined;
const mockError = 'error mock';

jest.mock('../services/forecast.service', () => ({
  get5DaysForecastByKey: jest.fn(
    (key: string): Promise<AccuweatherForecast> => {
      if (!mockForecast) {
        return Promise.reject(new Error(mockError));
      }

      return Promise.resolve(mockForecast);
    },
  ),
}));

beforeAll(() => {
  mockForecast = undefined;
});

afterEach(async () => {
  await cleanup();
  (get5DaysForecastByKey as jest.Mock).mockClear();
});

it('Should be pending, have no data and no error when just mounted', () => {
  const key = '';
  const { result } = renderHookWithProviders(() => use5DaysForecast(key));

  expect(result.current).toEqual({
    status: 'pending',
    data: undefined,
    error: '',
  });
});

it('Should have data and no error when awaited for successful response', async () => {
  const key = '';
  mockForecast = mockForecastJson;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    use5DaysForecast(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(get5DaysForecastByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'fetched',
    data: mockForecastJson,
    error: '',
  });
});

it('Should have error and no data when awaited for error response', async () => {
  const key = '';
  mockForecast = undefined;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    use5DaysForecast(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(get5DaysForecastByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'error',
    data: undefined,
    error: mockError,
  });
});
