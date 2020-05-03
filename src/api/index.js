import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let modifiedURL;
  if (country) modifiedURL = `${url}/countries/${country}`;
  else modifiedURL = url;
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(modifiedURL);

    const modifiedData = { confirmed, recovered, deaths, lastUpdate };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`);

    const modifiedData = response.data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  const {
    data: { countries },
  } = await axios.get(`${url}/countries`);

  const modifiedData = countries.map((countries) => countries.name);
  // console.log(data);
  return modifiedData;
};
