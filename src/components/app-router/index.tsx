import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forecast from '../../pages/forecast';
import Home from '../../pages/home';
import App from '../app';
import CurrentConditions from '../current-conditions';
import DailyForecast from '../daily-forecast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'forecast/:key',
        element: <Forecast />,
        children: [
          {
            path: '',
            element: <CurrentConditions />
          },
          {
            path: 'daily',
            element: <DailyForecast />
          }
        ]
      }
    ],
  },
]);

const AppRouter: FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;
