import { fireEvent, waitFor } from '@testing-library/dom';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import LocationsSearchBarCurrentLocation from './index';

const mockFetch = jest.fn(() => Promise.resolve());
const mockCurrentLocationHandler = jest.fn();

afterEach(() => {
  mockFetch.mockClear();
});

jest.mock('../../hooks/use-current-location', () => ({
  useCurrentLocation: () => ({ fetch: mockFetch }),
}));

it('Should have not have loading spinner when nothing happened', () => {
  render(
    <LocationsSearchBarCurrentLocation
      currentLocationHandler={mockCurrentLocationHandler}
    />,
  );

  const element = screen.queryByText(/loading.../i);

  expect(element).not.toBeInTheDocument();
});

it('Should have have loading spinner when button was clicked', async () => {
  render(
    <LocationsSearchBarCurrentLocation
      currentLocationHandler={mockCurrentLocationHandler}
    />,
  );

  const button = screen.getByText(/Use Current Location/i);
  act(() => {
    fireEvent.click(button);
  });

  const element = await waitFor(() => screen.getByText(/loading.../i));

  expect(element).toBeInTheDocument();
  expect(mockFetch).toBeCalledTimes(1);
});
