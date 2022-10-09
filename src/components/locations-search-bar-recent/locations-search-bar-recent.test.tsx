import { PreloadedState } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RootState } from '../../store';
import { renderWithProviders } from '../../utils/test-utils';
import LocationsSearchBarRecent from './index';

const mockLocationLinkClickHandlerBuilder = jest.fn();

it('Should have "No recent locations text" when there are no locations in state', () => {
  renderWithProviders(
    <LocationsSearchBarRecent
      locationLinkClickHandlerBuilder={mockLocationLinkClickHandlerBuilder}
    />,
  );

  expect(screen.getByText(/^No recent locations$/i));
});

it('Should have recent locations link rendered when there are locations in state ', () => {
  const preloadedState: PreloadedState<RootState> = {
    recentLocations: {
      locations: [
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
      ],
      maxRecentLocations: 2,
    },
  };
  renderWithProviders(
    <MemoryRouter>
      <LocationsSearchBarRecent
        locationLinkClickHandlerBuilder={mockLocationLinkClickHandlerBuilder}
      />
    </MemoryRouter>,
    {
      preloadedState,
    },
  );

  expect(screen.getByText(/^Recent$/i));

  const elements = screen.getAllByRole('link');

  expect(elements.length).toEqual(
    preloadedState.recentLocations?.locations.length,
  );
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    expect(element).toHaveTextContent(
      new RegExp(
        `${preloadedState.recentLocations?.locations[0].name}, ${preloadedState.recentLocations?.locations[0].administrativeArea.name}`,
        'i',
      ),
    );
  }
});
