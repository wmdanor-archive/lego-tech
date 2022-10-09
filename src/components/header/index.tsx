import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import LocationsSearchBar from '../locations-search-bar';

const Header: FC = () => {
  return (
    <Navbar className='bg-dark'>
      <NavLink to='/' className='me-auto navbar-brand text-white' end>
        Weather
      </NavLink>
      <LocationsSearchBar />
    </Navbar>
  );
};

export default Header;
