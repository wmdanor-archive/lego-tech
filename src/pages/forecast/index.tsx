import React, { FC, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PageLayout from '../../components/page-layout';
import { useForecastNavigate } from '../../hooks/use-forecast-navigate';
import { useLocation } from '../../hooks/use-location';

const Forecast: FC = () => {
  const key = useParams().key as string;
  const { data: location, status: locationFetchingStatus } = useLocation(key);
  const forecastNavigate = useForecastNavigate();

  useEffect(() => {
    if (!location) {
      return;
    }

    forecastNavigate(location, false);
  }, [forecastNavigate, location]);

  if (locationFetchingStatus === 'error') {
    return (
      <PageLayout className='d-flex align-items-center justify-content-center'>
        <h3 className='text-danger text-center'>
          Error loading location data, please try again by reloading the page
        </h3>
      </PageLayout>
    );
  }

  return (
    <PageLayout className='d-flex flex-column'>
      <div className='mt-3'>
        {location ? (
          <h4 className='m-0'>
            {location.name}, {location.administrativeArea.name},{' '}
            {location.country.name}
          </h4>
        ) : (
          <ContentLoader height='calc(1.275rem + .3vw)' width='100%'>
            <rect rx='5' ry='5' width='100%' height='100%' />
          </ContentLoader>
        )}
      </div>
      <div>
        <Nav>
          <NavItem>
            <NavLink to='.' className='nav-link ps-0' end>
              Today
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='./daily' className='nav-link' end>
              Daily
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Outlet />
    </PageLayout>
  );
};

export default Forecast;
