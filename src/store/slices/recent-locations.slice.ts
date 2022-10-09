import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Location } from '../types';
import { Slices } from './slices.enum';

export function isRecentLocationType(obj: any): obj is Location {
  return obj.recentLocationType === true;
}

interface RecentLocationsState {
  locations: Location[];
  maxRecentLocations: number;
}

export const initialState: RecentLocationsState = {
  locations: [],
  maxRecentLocations: 3,
};

export const recentLocationsSlice = createSlice({
  name: Slices.RecentLocations,
  initialState,
  reducers: {
    appendRecentLocation(state, action: PayloadAction<Location>) {
      const index = state.locations.findIndex(
        location => location.key === action.payload.key,
      );

      if (index === 0) {
        return;
      }

      if (index !== -1) {
        state.locations.splice(index, 1);
        state.locations.unshift(action.payload);

        return;
      }

      if (state.locations.length === state.maxRecentLocations) {
        state.locations.pop();
      }

      state.locations.unshift(action.payload);
    },
  },
});

export const { appendRecentLocation } = recentLocationsSlice.actions;

export const selectRecentLocations = (state: RootState) =>
  state.recentLocations.locations;

export const recentLocationsReducer = recentLocationsSlice.reducer;
