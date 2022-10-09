import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';

const Header: FC = () => {
  return (
    <Navbar className='bg-dark'>
      <NavLink to='/' className='me-auto navbar-brand text-white' end>
        Weather
      </NavLink>
      <div>search bar</div>
    </Navbar>
  );
};

export default Header;
