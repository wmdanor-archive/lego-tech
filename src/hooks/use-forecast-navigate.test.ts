import { act, cleanup } from '@testing-library/react-hooks';
import mockLocationJson from '../services/mocks/mock-search-location.json';
import { mapAccuweatherLocationToLocation } from '../utils/mappers';
import { renderHookWithProviders } from '../utils/test-utils';
import { useForecastNavigate } from './use-forecast-navigate';

const mockLocation = mapAccuweatherLocationToLocation(mockLocationJson);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

afterEach(async () => {
  await cleanup();
  mockNavigate.mockClear();
});

it('Should navigate to forecast page when "goToPage" is true and location added to recent locations when returned function called', () => {
  const { result, store } = renderHookWithProviders(() =>
    useForecastNavigate(),
  );

  act(() => {
    result.current(mockLocation, true);
  });

  expect(mockNavigate).toBeCalledTimes(1);
  expect(store?.getState().recentLocations.locations).toEqual([mockLocation]);
});

it('Should not navigate to forecast page when "goToPage" is false and location added to recent locations when returned function called', () => {
  const { result, store } = renderHookWithProviders(() =>
    useForecastNavigate(),
  );

  act(() => {
    result.current(mockLocation, false);
  });

  expect(mockNavigate).not.toBeCalled();
  expect(store?.getState().recentLocations.locations).toEqual([mockLocation]);
});
