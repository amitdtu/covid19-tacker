import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';

export default function Chart({ data: { confirmed, recovered, deaths }, country, graphType }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDailyData();
      setDailyData(data);
      // console.log(data);
    };

    fetchData();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            fill: false,
            label: 'Infected',
            borderColor: '#ffa928',
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            fill: true,
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: '#f78888',
          },
        ],
      }}
    />
  ) : null;

  const barGraph = confirmed ? (
    <Bar
      options={{
        legend: { display: false },
        label: { display: true, text: country },
      }}
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],

        datasets: [
          {
            label: 'People',
            backgroundColor: ['#ffa928', '#74e95d', '#dd5050'],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
    />
  ) : null;

  const doughnutGraph = confirmed ? (
    <Doughnut
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: ['#ffa928', '#74e95d', '#dd5050'],
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {country ? (graphType === 'doughnut' ? doughnutGraph : barGraph) : lineChart}
    </div>
  );
}
