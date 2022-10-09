import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { appendRecentLocation } from '../store/slices/recent-locations.slice';
import { Location } from '../store/types';

export const useForecastNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const forecastNavigate = useCallback((location: Location, goToPage = true) => {
    dispatch(appendRecentLocation(location));

    if (goToPage) {
      navigate(`/forecast/${location.key}`);
    }
  }, [dispatch, navigate]);

  return forecastNavigate;
};
