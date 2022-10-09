import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { Location } from '../../store/types';
import LocationsSearchBar from './index';

const mockForecastNavigate = jest.fn();
let mockData: Location[] = [];
let mockStatus: 'pending' | 'fetched' | 'error' = 'pending';

jest.mock('../../hooks/use-forecast-navigate', () => ({
  useForecastNavigate: () => mockForecastNavigate,
}));

jest.mock('../../hooks/use-autocompleted-locations', () => ({
  useAutocompletedLocations: () => ({
    data: mockData,
    status: mockStatus,
  }),
}));

jest.mock('../locations-search-bar-current-location', () => () => (
  <div data-testid='current-location'></div>
));
jest.mock(
  '../locations-search-bar-form',
  () =>
    ({ query, setQuery, searchSubmitHandler }: any) =>
      (
        <form onSubmit={searchSubmitHandler}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            type='text'
            data-testid='form'
          />
        </form>
      ),
);
jest.mock('../locations-search-bar-recent', () => () => (
  <div data-testid='recent'></div>
));
jest.mock('../locations-search-bar-results', () => () => (
  <div data-testid='results'></div>
));

beforeEach(() => {
  mockData = [];
  mockStatus = 'pending';
});

afterEach(() => cleanup);

it('Should show box not with recent locations and search results when search input is not focused', () => {
  render(<LocationsSearchBar />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('Should show box with recent locations and search results when search input is focused', () => {
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('Should hide box with recent locations and search results when search input is focused out', () => {
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  act(() => {
    fireEvent.focusOut(form);
  });

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('Should show recent locations component and not show search results component when query length < 2', () => {
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  const input = screen.getByRole('textbox');
  act(() => {
    fireEvent.change(input, { target: { value: 'a' } });
  });

  expect(screen.getByTestId('recent')).toBeInTheDocument();
  expect(screen.queryByTestId('results')).not.toBeInTheDocument();
});

it('Should show recent locations component and not show search results component when query length >= then 2', () => {
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  const input = screen.getByRole('textbox');
  act(() => {
    fireEvent.change(input, { target: { value: 'aa' } });
  });

  expect(screen.queryByTestId('recent')).not.toBeInTheDocument();
  expect(screen.getByTestId('results')).toBeInTheDocument();
});

it('Should not call "forecastNavigate" function the are no search results present and form is submitted', () => {
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  const input = screen.getByRole('textbox');
  act(() => {
    fireEvent.change(input, { target: { value: 'aa' } });
  });

  act(() => {
    fireEvent.submit(form);
  });

  expect(mockForecastNavigate).not.toBeCalled();
});

it('Should call "forecastNavigate" function with first location when the are search results present and form is submitted', () => {
  mockData = [
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
  render(<LocationsSearchBar />);

  const form = screen.getByTestId('form');
  act(() => {
    fireEvent.focusIn(form);
  });

  const input = screen.getByRole('textbox');
  act(() => {
    fireEvent.change(input, { target: { value: 'aa' } });
  });

  act(() => {
    fireEvent.submit(form);
  });

  expect(mockForecastNavigate).toBeCalledWith(mockData[0]);
});
