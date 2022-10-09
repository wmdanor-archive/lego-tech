import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { selectRecentLocations } from '../../store/slices/recent-locations.slice';
import { Location } from '../../store/types';
import styles from './styles.module.css';

interface Props {
  locationLinkClickHandlerBuilder: (location: Location) => MouseEventHandler;
}

const LocationsSearchBarRecent: FC<Props> = ({
  locationLinkClickHandlerBuilder,
}) => {
  const locations = useAppSelector(selectRecentLocations);

  if (locations.length === 0) {
    return <div className='pt-2 ps-2 pb-1'>No recent locations</div>;
  }

  return (
    <div>
      <div className='pt-2 ps-2 pb-1'>Recent</div>
      <div>
        {locations.map(location => (
          <div
            key={location.key}
            className={`${styles.recentLocationsItem} p-2`}
          >
            <Link
              onClick={locationLinkClickHandlerBuilder(location)}
              to={`/forecast/${location.key}`}
            >
              {location.name}, {location.administrativeArea.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsSearchBarRecent;
