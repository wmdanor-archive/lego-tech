import React, { FC, memo, MouseEventHandler, useCallback, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useCurrentLocation } from '../../hooks/use-current-location';
import { Location } from '../../store/types';

interface Props {
  currentLocationHandler: (location: Location) => void;
}

const LocationsSearchBarCurrentLocation: FC<Props> = memo(({ currentLocationHandler }) => {
  const { fetch: fetchCurrentLocation } = useCurrentLocation();
  const [isCurrentLocationFetching, setIsCurrentLocationFetching] =
    useState(false);

  const clickHandler = useCallback<MouseEventHandler>(() => {
    setIsCurrentLocationFetching(true);
    fetchCurrentLocation()
      .then(currentLocation => {
        currentLocationHandler(currentLocation);
      })
      .finally(() => setIsCurrentLocationFetching(false));
  }, [currentLocationHandler, fetchCurrentLocation]);

  return (
    <div className='bg-light d-flex align-items-center justify-content-center p-1'>
      <button
        className='btn btn-link'
        type='button'
        onClick={clickHandler}
      >
        Use Current Location
      </button>
      {isCurrentLocationFetching && <Spinner size='sm' color='primary' />}
    </div>
  );
});

export default LocationsSearchBarCurrentLocation;
