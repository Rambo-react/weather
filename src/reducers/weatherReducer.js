import moment from 'moment';
import { weatherApiFirst, weatherApiSecond } from '../api/apiWeather';

const FETCH_WEATHER = 'FETCH_WEATHER';
const SET_WEATHER = 'SET_WEATHER';
const SET_WEATHER_API = 'SET_WEATHER_API';

const defaultState = {
  weatherData: null,
  isFetching: true,
  selectedApi: 'first',
};

const weatherReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_WEATHER_API:
      return {
        ...state, selectedApi: action.selectedApi,
      };
    case FETCH_WEATHER:
      return {
        ...state, isFetching: action.payload,
      };
    case SET_WEATHER:
      return {
        ...state, weatherData: action.payload,
      };
    default: return state;
  }
};

export const setWeatherApi = (selectedApi) => ({ type: SET_WEATHER_API, selectedApi });
export const weatherFetch = (payload) => ({ type: FETCH_WEATHER, payload });
export const setWeather = (payload) => ({ type: SET_WEATHER, payload });

// сделать в функциях загрузки данных с API, преобразование к одному формату при сохранении в state

// округляет и если остается -0 то преобразует его в 0
function numRound(num) {
  return (Math.round(num) === +'-0') ? 0 : Math.round(num);
}

export function getWeatherFromApi(coords, selectedApi) {
  return async (dispatch) => {
    dispatch(weatherFetch(true));
    let data = null;
    let weekWeather = null;
    if (selectedApi === 'first') {
      data = await weatherApiFirst.getWeather(coords);
      console.log('Получаем погоду из координат АПИ №1:', data);
      // разбираем данные на необходимые элементы
      data.daily.length = 7;
      weekWeather = data.daily.map((el) => {
        const nameDay = moment(el.dt * 1000).format('ddd');
        const temp = numRound(el.temp.day);
        const tempNight = numRound(el.temp.night);
        const tempDay = numRound(el.temp.max);
        const tempFeels = numRound(el.feels_like.day);
        const weatherDescription = el.weather[0].description;
        const weatherId = el.weather[0].id;
        const windSpeed = el.wind_speed;

        return {
          nameDay, temp, tempNight, tempDay, tempFeels, weatherDescription, weatherId, windSpeed,
        };
      });
    } else if (selectedApi === 'second') {
      data = await weatherApiSecond.getWeather(coords);
      console.log('Получаем погоду из координат АПИ №2:', data);
      data.data.length = 7;
      weekWeather = data.data.map((el) => {
        const nameDay = moment(el.ts * 1000).format('ddd');
        const temp = numRound(el.temp);
        const tempNight = numRound(el.low_temp);
        const tempDay = numRound(el.high_temp);
        const tempFeels = numRound((el.app_max_temp + el.app_min_temp) / 2);
        const weatherDescription = el.weather.description;
        const weatherId = el.weather.code;
        const windSpeed = el.wind_spd;

        return {
          nameDay, temp, tempNight, tempDay, tempFeels, weatherDescription, weatherId, windSpeed,
        };
      });
    }
    console.log('ТО что будет записано в базу:', weekWeather);
    dispatch(weatherFetch(false));
    dispatch(setWeather(weekWeather));
  };
}

export default weatherReducer;
