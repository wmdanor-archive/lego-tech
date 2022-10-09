import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../pages/home';
import App from '../app';

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
        element: <div></div>,
        children: [
          {
            path: '',
            element: <div></div>
          },
          {
            path: 'daily',
            element: <div></div>
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
