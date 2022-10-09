import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div></div>,
    children: [
      {
        path: '',
        element: <div></div>,
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
