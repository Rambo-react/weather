import moment from 'moment';
import { weatherApiFirst, weatherApiSecond } from '../api/apiWeather';

const FETCH_WEATHER = 'FETCH_WEATHER';
const SET_WEATHER = 'SET_WEATHER';
const SET_WEATHER_API = 'SET_WEATHER_API';

// коды иконок и коды погодных условий
const iconCodes = [
  { iconId: 21, codes: [200, 230, 231] },
  { iconId: 22, codes: [201, 232] },
  { iconId: 23, codes: [210] },
  { iconId: 24, codes: [211] },
  { iconId: 25, codes: [212] },
  { iconId: 26, codes: [221] },
  { iconId: 27, codes: [233] },
  { iconId: 28, codes: [202] },
  { iconId: 31, codes: [300] },
  { iconId: 32, codes: [301, 310, 311, 321] },
  { iconId: 33, codes: [302, 312] },
  { iconId: 34, codes: [313, 314] },
  { iconId: 51, codes: [500] },
  { iconId: 52, codes: [501] },
  { iconId: 53, codes: [502, 520, 521, 531] },
  { iconId: 54, codes: [503, 504, 511, 522] },
  { iconId: 61, codes: [600] },
  { iconId: 62, codes: [601, 620] },
  { iconId: 63, codes: [602, 621] },
  { iconId: 64, codes: [610, 616] },
  { iconId: 65, codes: [611, 612, 613, 615] },
  { iconId: 66, codes: [622] },
  { iconId: 67, codes: [623] },
  { iconId: 71, codes: [700, 701] },
  { iconId: 72, codes: [711] },
  { iconId: 73, codes: [721] },
  { iconId: 74, codes: [731] },
  { iconId: 75, codes: [741, 742] },
  { iconId: 76, codes: [751, 761, 762] },
  { iconId: 77, codes: [771] },
  { iconId: 78, codes: [781] },
  { iconId: 81, codes: [800] },
  { iconId: 82, codes: [801, 802] },
  { iconId: 83, codes: [803] },
  { iconId: 84, codes: [804] },
  { iconId: 90, codes: [900] },
];

const defaultState = {
  weatherData: null,
  isFetching: false,
  selectedApi: 'first',
  iconCodes,
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

// округляет и если остается -0 то преобразует его в 0
function numRound(num) {
  return (Math.round(num) === +'-0') ? 0 : Math.round(num);
}

export function getWeatherFromApi(latitude, longitude, selectedApi) {
  return async (dispatch) => {
    dispatch(weatherFetch(true));
    let data = null;
    let weekWeather = null;
    if (selectedApi === 'first') {
      data = await weatherApiFirst.getWeather(latitude, longitude);
      console.log('Получаем погоду из координат АПИ №1:', data);
      // разбираем данные на необходимые элементы
      data.daily.length = 7;
      weekWeather = data.daily.map((el) => {
        const nameDay = moment(el.dt * 1000).format('ddd');
        const temp = numRound(el.temp.day);
        const tempNight = numRound(el.temp.night);
        const tempDay = numRound(el.temp.max);
        const tempFeels = numRound(el.feels_like.day);
        const weatherDescription = el.weather[0].description.toUpperCase();
        const weatherId = el.weather[0].id;
        const windSpeed = el.wind_speed;

        return {
          nameDay, temp, tempNight, tempDay, tempFeels, weatherDescription, weatherId, windSpeed,
        };
      });
    } else if (selectedApi === 'second') {
      data = await weatherApiSecond.getWeather(latitude, longitude);
      console.log('Получаем погоду из координат АПИ №2:', data);
      data.data.length = 7;
      weekWeather = data.data.map((el) => {
        const nameDay = moment(el.ts * 1000).format('ddd');
        const temp = numRound(el.temp);
        const tempNight = numRound(el.low_temp);
        const tempDay = numRound(el.high_temp);
        const tempFeels = numRound((el.app_max_temp + el.app_min_temp) / 2);
        const weatherDescription = el.weather.description.toUpperCase();
        const weatherId = (el.weather.code === 751) ? 742 : el.weather.code;
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
