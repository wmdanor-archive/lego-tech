import React, { FC, memo } from 'react';
import styles from './styles.module.css';
import { AccuweatherForecast_DailyForecast } from '../../services/types/accuweather-forecast';

interface Props {
  forecast: AccuweatherForecast_DailyForecast;
}

const DailyForecastItem: FC<Props> = memo(({ forecast }) => {
  const observationDate = new Date(forecast.Date);
  const weekday = observationDate.toLocaleString('en-gb', { weekday: 'short' });
  const dayMonth = observationDate.toLocaleString('en-gb', { day: 'numeric', month: 'numeric' });

  return (
    <div className='bg-light p-2 row mx-0 shadow-sm d-flex align-items-center'>
      <div className='d-flex flex-column col-2'>
        <span>{weekday}</span>
        <span>{dayMonth}</span>
      </div>
      <div className='col-2'>
        <span className='display-4'>{forecast.Temperature.Maximum.Value}°</span>
        <span className='text-muted'>
          /{forecast.Temperature.Minimum.Value}°
        </span>
      </div>
      <div className='col-2'></div>
      <div className='col-4 d-none d-md-block'>
        <span>{forecast.Day.IconPhrase}</span>
      </div>
      <div className='col-md-2 col-6 d-flex align-items-center justify-content-end gap-1'>
        <svg
          className={styles.rainIcon}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 12 16'
        >
          <path
            fill='none'
            fillRule='nonzero'
            stroke='#878787'
            strokeWidth='.714'
            d='M5.532.891c1.723.952 5.315 5.477 5.775 8.756.028 1.718-.534 3.101-1.45 4.082C8.888 14.766 7.52 15.357 6 15.357a5.532 5.532 0 0 1-3.74-1.425c-.975-.89-1.587-2.124-1.616-3.49.503-4.035 4.013-8.49 4.888-9.551Zm-1.815 7.33a.336.336 0 0 0-.025.043c-.322.62-.59 1.255-.695 2.207.012.408.143.787.358 1.111.234.352.568.641.96.839.035.017.071.021.106.017a.201.201 0 0 0 .104-.044l.01-.005-.078-.1c-.328-.415-.82-1.067-.82-1.946 0-.752.076-1.613.08-2.121Z'
          ></path>
        </svg>
        <small className='text-muted'>{forecast.Day.RainProbability}%</small>
      </div>
    </div>
  );
});

export default DailyForecastItem;
