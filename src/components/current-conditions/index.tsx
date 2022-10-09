import React, { FC, useMemo } from 'react';
import { Spinner } from 'reactstrap';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useCurrentConditions } from '../../hooks/use-current-conditions';

const CurrentConditions: FC = () => {
  const key = useParams().key as string;
  const { data, status } = useCurrentConditions(key);

  const observationTime = useMemo(() => {
    if (!data) {
      return '';
    }

    const observationDateTime = new Date(data[0].LocalObservationDateTime);

    return observationDateTime
      .toLocaleTimeString()
      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
  }, [data]);

  if (status === 'error') {
    return <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
      <h3 className='text-danger text-center'>Error loading current conditions, please try again by reloading the page</h3>
    </div>;
  }

  if (!data) {
    return (
      <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const colClassName = 'col-12 col-sm-6 d-flex flex-column';
  const detailItemClassName = `d-flex justify-content-between py-2 ${styles.detailItem}`;

  return (
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-between'>
        <b className=''>CURRENT WEATHER</b>
        <small className='text-muted'>{observationTime}</small>
      </div>
      <div className='row'>
        <div className='col-12 col-sm-6 mb-2 mb-sm-0 d-flex flex-column align-items-center justify-content-center'>
          <div className='position-relative mt-2 my-sm-2'>
            <span className='display-3'>{data[0].Temperature.Metric.Value}°</span>
            <span className={`${styles.mainTemperatureUnit} font-monospace`}>{data[0].Temperature.Metric.Unit}</span>
          </div>
          <span className='align-self-sm-start'>{data[0].WeatherText}</span>
        </div>
        <div className='col-12 col-sm-6 d-flex flex-column align-items-center align-items-sm-start justify-content-center'>
          <span className={styles.realFeelText}>RealFeel {data[0].RealFeelTemperature.Metric.Value}°</span>
          <span className='text-muted'>{data[0].RealFeelTemperature.Metric.Phrase}</span>
        </div>
      </div>
      <div className='row mt-3'>
        <div className={colClassName}>
          <div className={detailItemClassName}>
            <span>Wind</span>
            <span>{data[0].Wind.Direction.Localized} {data[0].Wind.Speed.Metric.Value} {data[0].Wind.Speed.Metric.Unit}</span>
          </div>
          <div className={detailItemClassName}>
            <span>Wind Gusts</span>
            <span>{data[0].WindGust.Speed.Metric.Value} {data[0].WindGust.Speed.Metric.Unit}</span>
          </div>
          <div className={detailItemClassName}>
            <span>Humidity</span>
            <span>{data[0].RelativeHumidity}%</span>
          </div>
          <div className={detailItemClassName}>
            <span>Indoor Humidity</span>
            <span>{data[0].IndoorRelativeHumidity}% (Ideal)</span>
          </div>
          <div className={detailItemClassName}>
            <span>Dew Point</span>
            <span>{data[0].DewPoint.Metric.Value} {data[0].DewPoint.Metric.Unit}</span>
          </div>
        </div>
        <div className={colClassName}>
          <div className={detailItemClassName}>
            <span>Pressure</span>
            <span>{data[0].Pressure.Metric.Value} {data[0].Pressure.Metric.Unit}</span>
          </div>
          <div className={detailItemClassName}>
            <span>Cloud Cover</span>
            <span>{data[0].CloudCover}%</span>
          </div>
          <div className={detailItemClassName}>
            <span>Visibility</span>
            <span>{data[0].Visibility.Metric.Value} {data[0].Visibility.Metric.Unit}</span>
          </div>
          <div className={detailItemClassName}>
            <span>Cloud Ceiling</span>
            <span>{data[0].Ceiling.Metric.Value} {data[0].Ceiling.Metric.Unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
