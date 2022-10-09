import { act, cleanup } from '@testing-library/react-hooks';
import { getCurrentConditionsByKey } from '../services/forecast.service';
import mockCurrentConditionsJson from '../services/mocks/mock-current-conditions-details.json';
import { AccuweatherCurrentConditions } from '../services/types/accuweather-current-conditions';
import { renderHookWithProviders } from '../utils/test-utils';
import { useCurrentConditions } from './use-current-conditions';

let mockCurrentConditions: AccuweatherCurrentConditions | undefined;
const mockError = 'error mock';

jest.mock('../services/forecast.service', () => ({
  getCurrentConditionsByKey: jest.fn(
    (key: string): Promise<AccuweatherCurrentConditions> => {
      if (!mockCurrentConditions) {
        return Promise.reject(new Error(mockError));
      }

      return Promise.resolve(mockCurrentConditions);
    },
  ),
}));

beforeAll(() => {
  mockCurrentConditions = undefined;
});

afterEach(async () => {
  await cleanup();
  (getCurrentConditionsByKey as jest.Mock).mockClear();
});

it('Should be pending, have no data and no error when just mounted', () => {
  const key = '';
  const { result } = renderHookWithProviders(() => useCurrentConditions(key));

  expect(result.current).toEqual({
    status: 'pending',
    data: undefined,
    error: '',
  });
});

it('Should have data and no error when awaited for successful response', async () => {
  const key = '';
  mockCurrentConditions = mockCurrentConditionsJson;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useCurrentConditions(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(getCurrentConditionsByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'fetched',
    data: mockCurrentConditionsJson,
    error: '',
  });
});

it('Should have error and no data when awaited for error response', async () => {
  const key = '';
  mockCurrentConditions = undefined;
  const { result, waitForNextUpdate } = renderHookWithProviders(() =>
    useCurrentConditions(key),
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(getCurrentConditionsByKey).toBeCalledTimes(1);
  expect(result.current).toEqual({
    status: 'error',
    data: undefined,
    error: mockError,
  });
});
