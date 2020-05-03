import React, { Component } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronavirus from './assets/coronavirus.svg';

export default class App extends Component {
  state = {
    data: {},
    country: '',
    graphType: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  countryHandler = (country) => {
    console.log(country);
    const fetchAPI = async () => {
      const countryData = await fetchData(country);
      console.log('single country data ', countryData);
      this.setState({ data: countryData, country: country });
    };

    fetchAPI();
  };

  graphHandler = (graphType) => {
    this.setState({ graphType: graphType });
  };

  render() {
    const { data, country, graphType } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <img className={styles.image} src={coronavirus} alt='' />
          <span className={styles.title}>Covid-19</span>
        </div>
        <Cards data={data} />
        <CountryPicker
          selectedCountry={(country) => this.countryHandler(country)}
          selectedGraph={(type) => this.graphHandler(type)}
        />
        <Chart data={data} country={country} graphType={graphType} />
      </div>
    );
  }
}
