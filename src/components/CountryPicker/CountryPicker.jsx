import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { fetchCountries } from '../../api';

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
        showSearch
        optionFilterProp='children'
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        style={{ width: '20%', margin: '1.5rem 0' }}
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
        <Select defaultValue={graph} style={{ width: '10%', margin: '1.5rem 1rem' }} onChange={graphHandler}>
          <Option value=''>Bar</Option>
          <Option value='doughnut'>Doughnut</Option>
        </Select>
      ) : null}
    </div>
  );
}
