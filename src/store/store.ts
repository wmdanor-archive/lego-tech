import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { recentLocationsMiddleware } from './middlewares/recent-locations.middleware';
import { recentLocationsReducer, initialState as recentLocationsInitialState } from './slices/recent-locations.slice';
import { Slices } from './slices/slices.enum';

const rootReducer = combineReducers({
  [Slices.RecentLocations]: recentLocationsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  const recentLocationsStateJson = localStorage.getItem('recentLocations__state');

  const initialState: PreloadedState<RootState> = {
    recentLocations: recentLocationsInitialState,
  };

  if (recentLocationsStateJson) {
    initialState.recentLocations = {
      ...recentLocationsInitialState,
      ...JSON.parse(recentLocationsStateJson),
    };
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      ...initialState,
      ...preloadedState,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recentLocationsMiddleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
