import React, { FC } from 'react';
import PageLayout from '../../components/page-layout';

const Home: FC = () => {
  return (
    <PageLayout className='d-flex flex-column align-items-center justify-content-center'>
      <h3 className='text-center'>Welcome to the Weather Forecast Web Application</h3>
      <h5 className='text-center text-muted'>Please use search bar in the top right corner</h5>
    </PageLayout>
  );
};

export default Home;
