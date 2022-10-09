import React, { FC, useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';
import { use5DaysForecast } from '../../hooks/use-5-days-forecast';
import DailyForecastItem from '../daily-forecast-item';

const DailyForecast: FC = () => {
  const key = useParams().key as string;
  const { data, status } = use5DaysForecast(key);
  const { observationStartDateText, observationEndDateText } = useMemo(() => {
    if (!data) {
      return {
        observationStartDateText: '',
        observationEndDateText: '',
      };
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
    };

    const observationStartDateText = new Date(
      data.DailyForecasts[0].Date,
    ).toLocaleString('en-gb', options);
    const observationEndDateText = new Date(
      data.DailyForecasts[data.DailyForecasts.length - 1].Date,
    ).toLocaleString('en-gb', options);

    return {
      observationStartDateText,
      observationEndDateText,
    };
  }, [data]);

  if (status === 'error') {
    return (
      <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
        <h3 className='text-danger text-center'>
          Error loading daily forecast, please try again by reloading the page
        </h3>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div>
          <ContentLoader height='21.33px' width='160px'>
            <rect rx='5' ry='5' width='100%' height='100%' />
          </ContentLoader>
        </div>
        <div className='d-flex flex-column gap-2 py-2'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <ContentLoader key={`${key} + ${i}`} height='73.66px' width='100%'>
                <rect rx='5' ry='5' width='100%' height='73.66px' />
              </ContentLoader>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <span>
          {`${observationStartDateText} - ${observationEndDateText}`}
        </span>
      </div>
      <div className='d-flex flex-column gap-2 py-2'>
        {data.DailyForecasts.map(dailyForecast => (
          <DailyForecastItem
            key={key + dailyForecast.Date}
            forecast={dailyForecast}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
