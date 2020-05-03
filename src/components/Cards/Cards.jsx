import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './Cards.module.css';
import cx from 'classnames';
import CountUp from 'react-countup';

export default function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }) {
  console.log(lastUpdate);
  if (!confirmed) {
    return <Skeleton active width={'33%'} />;
  }

  return (
    <div className={styles.container}>
      <div className={cx(styles.card, styles.confirmed)}>
        <h2>Infected</h2>
        <h3>
          <CountUp start={0} end={confirmed.value} duration={2.5} separator=',' />{' '}
        </h3>
        <p>{new Date(lastUpdate).toDateString()}</p>
      </div>
      <div className={cx(styles.card, styles.recovered)}>
        <h2>Recovered</h2>
        <h3>
          <CountUp start={0} end={recovered.value} duration={2.5} separator=',' />{' '}
        </h3>
        <p>{new Date(lastUpdate).toDateString()}</p>
      </div>
      <div className={cx(styles.card, styles.deaths)}>
        <h2>Deaths</h2>
        <h3>
          <CountUp start={0} end={deaths.value} duration={2.5} separator=',' />{' '}
        </h3>
        <p>{new Date(lastUpdate).toDateString()}</p>
      </div>
    </div>
  );
}
