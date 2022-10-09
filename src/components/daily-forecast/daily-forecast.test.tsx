import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AccuweatherForecast } from '../../services/types/accuweather-forecast';
import mockDailyForecastJson from '../../services/mocks/mock-search-5-by-key-details.json';
import DailyForecast from './index';

let mockData: AccuweatherForecast | undefined;
let mockStatus: 'pending' | 'fetched' | 'error' = 'pending';

beforeEach(() => {
  mockData = undefined;
  mockStatus = 'pending';
});

jest.mock('../../hooks/use-5-days-forecast', () => ({
  use5DaysForecast: () => ({
    data: mockData,
    status: mockStatus,
  }),
}));

it('Should show error text when status is set to "error"', () => {
  mockStatus = 'error';
  render(<DailyForecast />);

  const element = screen.getByText(/Error loading daily forecast, please try again by reloading the page/i);

  expect(element).toBeInTheDocument();
});

it('Should have loaders when status is "pending" and data is empty', () => {
  render(<DailyForecast />);

  const loaders = screen.getAllByText(/loading.../i);

  expect(loaders.length).not.toBe(0);
});

it('Should show daily forecast data when status is "fetched" and data is present', () => {
  mockData = mockDailyForecastJson;
  mockStatus = 'fetched';
  render(<DailyForecast />);

  expect(screen.getByText(/Wed/i)).toBeInTheDocument();
  expect(screen.getByText(/05\/10/i)).toBeInTheDocument();
  expect(screen.getByText(/18.9°/i)).toBeInTheDocument();
  expect(screen.getByText(/6.5°/i)).toBeInTheDocument();
  expect(screen.getByText(/Mostly cloudy w\/ showers/i)).toBeInTheDocument();
  expect(screen.getByText(/84%/i)).toBeInTheDocument();

  expect(screen.getByText(/Thu/i)).toBeInTheDocument();
  expect(screen.getByText(/06\/10/i)).toBeInTheDocument();
  expect(screen.getByText(/17.3°/i)).toBeInTheDocument();
  expect(screen.getByText(/11°/i)).toBeInTheDocument();
  expect(screen.getByText(/^Sunny$/i)).toBeInTheDocument();
  expect(screen.getByText(/3%/i)).toBeInTheDocument();

  expect(screen.getByText(/Fri/i)).toBeInTheDocument();
  expect(screen.getByText(/07\/10/i)).toBeInTheDocument();
  expect(screen.getByText(/18.3°/i)).toBeInTheDocument();
  expect(screen.getAllByText(/6.4°/i).length).not.toBe(0);
  expect(screen.getByText(/Partly sunny w\/ showers/i)).toBeInTheDocument();
  expect(screen.getByText(/61%/i)).toBeInTheDocument();

  expect(screen.getByText(/Sat/i)).toBeInTheDocument();
  expect(screen.getByText(/08\/10/i)).toBeInTheDocument();
  expect(screen.getByText(/15.4°/i)).toBeInTheDocument();
  expect(screen.getAllByText(/6.4°/i).length).not.toBe(0);
  expect(screen.getByText(/Mostly sunny/i)).toBeInTheDocument();
  expect(screen.getByText(/2%/i)).toBeInTheDocument();

  expect(screen.getByText(/^Sun$/i)).toBeInTheDocument();
  expect(screen.getByText(/09\/10/i)).toBeInTheDocument();
  expect(screen.getByText(/16.8°/i)).toBeInTheDocument();
  expect(screen.getByText(/11.2°/i)).toBeInTheDocument();
  expect(screen.getByText(/^Mostly cloudy$/i)).toBeInTheDocument();
  expect(screen.getByText(/^1%/i)).toBeInTheDocument();
});
