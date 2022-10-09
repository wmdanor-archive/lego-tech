import { Middleware } from '@reduxjs/toolkit';

export const recentLocationsMiddleware: Middleware =
  store => next => action => {
    const result = next(action);

    if (action.type?.startsWith('recentLocations/')) {
      const recentLocationsState = store.getState().recentLocations;

      localStorage.setItem(
        'recentLocations__state',
        JSON.stringify(recentLocationsState),
      );
    }

    return result;
  };
