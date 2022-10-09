import React, {
  FC,
  FocusEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useAutocompletedLocations } from '../../hooks/use-autocompleted-locations';
import { useForecastNavigate } from '../../hooks/use-forecast-navigate';
import { useOutsideAlerter } from '../../hooks/use-outside-alerter';
import { Location } from '../../store/types';
import LocationsSearchBarCurrentLocation from '../locations-search-bar-current-location';
import LocationsSearchBarForm from '../locations-search-bar-form';
import LocationsSearchBarRecent from '../locations-search-bar-recent';
import LocationsSearchBarResults from '../locations-search-bar-results';
import styles from './styles.module.css';

const LocationsSearchBar: FC = () => {
  const [query, setQuery] = useState('');
  const [isSearchBarFocus, setIsSearchBarFocus] = useState(false);
  const [minimumQueryLength] = useState(2);
  const { data: autocompletedLocations, status: autocompletedLocationsStatus } =
    useAutocompletedLocations(query);
  const forecastNavigate = useForecastNavigate();
  const searchComponentRef = useRef(null);

  const searchSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      event.preventDefault();

      if (autocompletedLocations.length === 0) {
        return;
      }

      forecastNavigate(autocompletedLocations[0]);
    },
    [autocompletedLocations, forecastNavigate],
  );

  const searchBarFocusInHandler = useCallback<FocusEventHandler>(() => {
    setIsSearchBarFocus(true);
  }, []);

  const searchBarFocusOutHandler = useCallback(() => {
    setIsSearchBarFocus(false);
  }, []);

  useOutsideAlerter(searchComponentRef, searchBarFocusOutHandler);

  const currentLocationHandler = useCallback(
    (location: Location) => {
      forecastNavigate(location);
      setQuery('');
      setIsSearchBarFocus(false);
    },
    [forecastNavigate],
  );

  const locationLinkClickHandlerBuilder = useCallback(
    (location: Location): MouseEventHandler =>
      () => {
        forecastNavigate(location, false);
        setQuery('');
        setIsSearchBarFocus(false);
      },
    [forecastNavigate],
  );

  return (
    <div
      className={`position-relative ${styles.searchBar}`}
      ref={searchComponentRef}
      onFocus={searchBarFocusInHandler}
      role='search'
    >
      <LocationsSearchBarForm
        query={query}
        setQuery={setQuery}
        searchSubmitHandler={searchSubmitHandler}
      />
      {isSearchBarFocus && <div
        role='dialog'
        className={`${styles.searchBarDropdown} bg-white rounded border w-100 mt-2 pb-2 d-flex flex-column `}
      >
        <LocationsSearchBarCurrentLocation
          currentLocationHandler={currentLocationHandler}
        />
        {query.length >= minimumQueryLength ? (
          <LocationsSearchBarResults
            locations={autocompletedLocations}
            status={autocompletedLocationsStatus}
            locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
          />
        ) : (
          <LocationsSearchBarRecent
            locationLinkClickHandlerBuilder={locationLinkClickHandlerBuilder}
          />
        )}
      </div>}

    </div>
  );
};

export default LocationsSearchBar;
