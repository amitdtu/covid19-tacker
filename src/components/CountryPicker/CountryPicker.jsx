import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const { Option } = Select;

export default function CountryPicker({ selectedCountry, selectedGraph }) {
  const [countries, setCountries] = useState([]);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [graph, setGraph] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };

    fetchAPI();
  }, []);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    selectedCountry(value);
    if (value !== '') setIsCountrySelected(true);
    else setIsCountrySelected(false);
  };
  const graphHandler = (value) => {
    selectedGraph(value);
    setGraph(value);
  };
  return (
    <div>
      <Select
        className={styles.country}
        showSearch
        optionFilterProp='children'
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        defaultValue=''
        onChange={handleChange}
      >
        <Option value=''>Global</Option>
        {countries
          ? countries.map((country, i) => (
              <Option key={i} value={country}>
                {country}
              </Option>
            ))
          : null}
      </Select>
      {isCountrySelected ? (
        <Select className={styles.graph} defaultValue={graph} onChange={graphHandler}>
          <Option value=''>Bar</Option>
          <Option value='doughnut'>Doughnut</Option>
        </Select>
      ) : null}
    </div>
  );
}
