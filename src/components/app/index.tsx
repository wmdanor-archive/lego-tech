import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header';

const App: FC = () => {
  return (
    <div className='min-vh-100 d-flex flex-column bg-light'>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
