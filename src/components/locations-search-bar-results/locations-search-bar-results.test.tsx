import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Location } from '../../store/types';
import LocationsSearchBarResults from './index';

it('Should show error text when status is set to "error"', () => {
  const locationLinkClickHandlerBuilder = jest.fn();
  render(
    <LocationsSearchBarResults
      locations={[]}
      status='error'
      locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
    />,
  );

  const element = screen.getByText(/Error occurred while fetching locations/i);

  expect(element).toBeInTheDocument();
});

it('Should have spinner when status is "pending" and locations are empty', () => {
  const locationLinkClickHandlerBuilder = jest.fn();
  render(
    <LocationsSearchBarResults
      locations={[]}
      status='pending'
      locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
    />,
  );

  const spinner = screen.getByText(/loading.../i);

  expect(spinner).toBeInTheDocument();
});

it('Should have "No results found" text when status is "fetched" and location are empty', () => {
  const locationLinkClickHandlerBuilder = jest.fn();
  render(
    <LocationsSearchBarResults
      locations={[]}
      status='fetched'
      locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
    />,
  );

  const element = screen.getByText(/no results found/i);

  expect(element).toBeInTheDocument();
});

it('Should have links rendered correctly when status is "fetched" and location are not empty', () => {
  const locationLinkClickHandlerBuilder = jest.fn();
  const locations: Location[] = [
    {
      key: '1',
      type: 'City',
      name: 'London',
      country: {
        id: 'GB',
        name: 'United Kingdom',
      },
      administrativeArea: {
        id: 'LN',
        name: 'London',
      },
    },
    {
      key: '2',
      type: 'City',
      name: 'London',
      country: {
        id: 'CA',
        name: 'Canada',
      },
      administrativeArea: {
        id: 'LN',
        name: 'London',
      },
    },
  ];
  render(
    <LocationsSearchBarResults
      locations={locations}
      status='fetched'
      locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
    />,
    { wrapper: MemoryRouter },
  );

  const elements = screen.getAllByRole('link');

  expect(elements.length).toBe(locations.length);
  expect(elements[0]).toHaveAttribute('href', '/forecast/1');
  expect(elements[1]).toHaveAttribute('href', '/forecast/2');
});
