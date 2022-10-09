import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import mockLocationJson from '../../services/mocks/mock-search-location.json';
import { Location } from '../../store/types';
import { mapAccuweatherLocationToLocation } from '../../utils/mappers';
import Forecast from './index';

let mockData: Location | undefined;
let mockStatus: 'pending' | 'fetched' | 'error' = 'pending';
const mockForecastNavigate = jest.fn();

jest.mock('../../hooks/use-location', () => ({
  useLocation: (key: string) => ({
    data: mockData,
    status: mockStatus,
  }),
}));

jest.mock('../../hooks/use-forecast-navigate', () => ({
  useForecastNavigate: () => mockForecastNavigate,
}));

beforeEach(() => {
  mockData = undefined;
  mockStatus = 'pending';
});

afterEach(() => {
  mockForecastNavigate.mockClear();
});

it('Should show error text when status is set to "error"', () => {
  mockStatus = 'error';
  render(<Forecast />);

  const element = screen.getByText(
    /Error loading location data, please try again by reloading the page/i,
  );

  expect(element).toBeInTheDocument();
});

it('Should have spinner when status is "pending" and data is "undefined"', () => {
  mockStatus = 'pending';
  mockData = undefined;
  render(<Forecast />, {wrapper: MemoryRouter});

  const spinner = screen.getByText(/loading.../i);

  expect(spinner).toBeInTheDocument();
});

it('Should show selected location name when status is "fetched" and data is present', () => {
  mockStatus = 'fetched';
  mockData = mapAccuweatherLocationToLocation(mockLocationJson);
  render(<Forecast />, {wrapper: MemoryRouter});

  const regExp = new RegExp(`${mockData.name}, ${mockData.administrativeArea.name}, ${mockData.country.name}`, 'i');

  expect(screen.getByText(regExp)).toBeInTheDocument();
});
