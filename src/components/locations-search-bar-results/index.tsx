import React, { FC, memo, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Location } from '../../store/types';
import styles from './styles.module.css';

interface Props {
  locations: Location[];
  status: 'pending' | 'fetched' | 'error';
  locationLinkClickHandlerBuilder: (location: Location) => MouseEventHandler;
}

const LocationsSearchBarResults: FC<Props> = memo(({ locations, status, locationLinkClickHandlerBuilder }) => {
  if (status === 'error') {
    return <div className='d-flex justify-content-center p-2'>
      <span className='text-danger'>Error occurred while fetching locations</span>
    </div>;
  }

  if (locations.length === 0 && status === 'pending') {
    return <div className='d-flex justify-content-center p-2'>
      <Spinner />
    </div>;
  }

  if (locations.length === 0 && status === 'fetched') {
    return <div className={`${styles.searchLocationsItem} px-2 py-1 text-center`}>No results found</div>;
  }

  return <div>
    {locations.map(location => (
      <div
        key={location.key}
        className={`${styles.searchLocationsItem} px-2 py-1`}
      >
        <Link
          onClick={locationLinkClickHandlerBuilder(location)}
          to={`/forecast/${location.key}`}
        >
          {location.name}, {location.administrativeArea.name}, {location.country.id}
        </Link>
      </div>
    ))}
  </div>;
});

export default LocationsSearchBarResults;
