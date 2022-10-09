import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AccuweatherCurrentConditions } from '../../services/types/accuweather-current-conditions';
import CurrentConditions from './index';
import mock from '../../services/mocks/mock-current-conditions-details.json';

let mockData: AccuweatherCurrentConditions | undefined;
let mockStatus: 'pending' | 'fetched' | 'error' = 'pending';
let mockError = '';

jest.mock('../../hooks/use-current-conditions', () => ({
  useCurrentConditions: () => ({
    data: mockData,
    status: mockStatus,
    error: mockError,
  }),
}));

beforeEach(() => {
  mockData = undefined;
  mockStatus = 'pending';
  mockError = '';
});

it('Should show error text when status is set to "error"', () => {
  mockStatus = 'error';
  render(<CurrentConditions />);

  const element = screen.getByText(/Error loading current conditions, please try again by reloading the page/i);

  expect(element).toBeInTheDocument();
});

it('Should have spinner when status is "pending" and data is "undefined"', () => {
  mockStatus = 'pending';
  mockData = undefined;
  render(<CurrentConditions />);

  const spinner = screen.getByText(/loading.../i);

  expect(spinner).toBeInTheDocument();
});

it('Should show current weather data when status is "fetched" and data is present', () => {
  mockStatus = 'fetched';
  mockData = mock;
  render(<CurrentConditions />);

  // TODO
  expect(screen.getByText(/CURRENT WEATHER/i)).toBeInTheDocument();
  expect(screen.getByText(/^Wind$/i)).toBeInTheDocument();
});
