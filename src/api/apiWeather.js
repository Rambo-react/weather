import * as axios from 'axios';

const instanceAxios = axios.create({
  // withCredentials: true,
  baseURL: 'https://api.openweathermap.org/data/2.5',
  // headers: {
  //   'API-KEY': 'ba9d950a3797af5698445a38cd00f507',
  // },
});

const API_KEY = 'ba9d950a3797af5698445a38cd00f507';
const openWeatherAPI = {
  getWeather(locality) {
    return (
      instanceAxios.get(`weather?q=${locality || 'London'}&appid=${API_KEY}`).then((response) => response.data).catch(() => console.log('error Weather API'))
    );
  },
};

export default openWeatherAPI;
