import moment from 'moment';
import { weatherApiFirst, weatherApiSecond } from '../api/apiWeather';

export const FETCH_WEATHER: string = 'FETCH_WEATHER';
export const SET_WEATHER: string = 'SET_WEATHER';
export const SET_WEATHER_API: string = 'SET_WEATHER_API';
export const SET_BACKGROUND_DESC: string = 'SET_BACKGROUND_DESC';

type IconCode = {
  iconId: number,
  backgroundDesc: string,
  codes: Array<number>,
}

// коды иконок и коды погодных условий
const iconCodes : Array<IconCode> = [
  { iconId: 21, backgroundDesc: 'thunderstorm', codes: [200, 230, 231] },
  { iconId: 22, backgroundDesc: 'thunderstorm', codes: [201, 232] },
  { iconId: 23, backgroundDesc: 'thunderstorm', codes: [210] },
  { iconId: 24, backgroundDesc: 'thunderstorm', codes: [211] },
  { iconId: 25, backgroundDesc: 'thunderstorm', codes: [212] },
  { iconId: 26, backgroundDesc: 'thunderstorm', codes: [221] },
  { iconId: 27, backgroundDesc: 'thunderstorm', codes: [233] },
  { iconId: 28, backgroundDesc: 'thunderstorm', codes: [202] },
  { iconId: 31, backgroundDesc: 'drizzle', codes: [300] },
  { iconId: 32, backgroundDesc: 'drizzle', codes: [301, 310, 311, 321] },
  { iconId: 33, backgroundDesc: 'drizzle', codes: [302, 312] },
  { iconId: 34, backgroundDesc: 'drizzle', codes: [313, 314] },
  { iconId: 51, backgroundDesc: 'rain', codes: [500] },
  { iconId: 52, backgroundDesc: 'rain', codes: [501] },
  { iconId: 53, backgroundDesc: 'rain', codes: [502, 520, 521, 531] },
  { iconId: 54, backgroundDesc: 'rain', codes: [503, 504, 511, 522] },
  { iconId: 61, backgroundDesc: 'snow', codes: [600] },
  { iconId: 62, backgroundDesc: 'snow', codes: [601, 620] },
  { iconId: 63, backgroundDesc: 'snow', codes: [602, 621] },
  { iconId: 64, backgroundDesc: 'snow', codes: [610, 616] },
  { iconId: 65, backgroundDesc: 'snow', codes: [611, 612, 613, 615] },
  { iconId: 66, backgroundDesc: 'snow', codes: [622] },
  { iconId: 67, backgroundDesc: 'snow', codes: [623] },
  { iconId: 71, backgroundDesc: 'mist', codes: [700, 701] },
  { iconId: 72, backgroundDesc: 'mist', codes: [711] },
  { iconId: 73, backgroundDesc: 'mist', codes: [721] },
  { iconId: 74, backgroundDesc: 'sand', codes: [731] },
  { iconId: 75, backgroundDesc: 'mist', codes: [741, 742] },
  { iconId: 76, backgroundDesc: 'sand', codes: [751, 761, 762] },
  { iconId: 77, backgroundDesc: 'wind', codes: [771] },
  { iconId: 78, backgroundDesc: 'tornado', codes: [781] },
  { iconId: 81, backgroundDesc: 'clear', codes: [800] },
  { iconId: 82, backgroundDesc: 'cloudy', codes: [801, 802] },
  { iconId: 83, backgroundDesc: 'cloudy', codes: [803] },
  { iconId: 84, backgroundDesc: 'cloudy', codes: [804] },
  { iconId: 90, backgroundDesc: '', codes: [900] },
];

type DefaultStateType = {
  weatherData: any,
  isFetching: boolean,
  selectedApi: string,
  iconCodes: Array<IconCode>,
  backgroundDesc: string,
}

const defaultState: DefaultStateType = {
  weatherData: null,
  isFetching: false,
  selectedApi: 'first',
  iconCodes,
  backgroundDesc: 'none',
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
    case SET_BACKGROUND_DESC:
      return {
        ...state, backgroundDesc: action.payload,
      };
    default: return state;
  }
};

export const setWeatherApi = (selectedApi) => ({ type: SET_WEATHER_API, selectedApi });
export const weatherFetch = (payload) => ({ type: FETCH_WEATHER, payload });
export const setWeather = (payload) => ({ type: SET_WEATHER, payload });
export const setBackgroundDesc = (payload) => ({ type: SET_BACKGROUND_DESC, payload });

// округляет и если остается -0 то преобразует его в 0
function numRound(num) {
  return (Math.round(num) === +'-0') ? 0 : Math.round(num);
}

// устанавливаем значение для фона
function getBackgroundDesc(weatherId) {
  const iconObj = iconCodes.find((item) => item.codes.includes(weatherId));
  return iconObj.backgroundDesc;
}

export function getWeatherFromApi(latitude, longitude, selectedApi) {
  return async (dispatch) => {
    dispatch(weatherFetch(true));
    let data = null;
    let weekWeather = null;
    if (selectedApi === 'first') {
      data = await weatherApiFirst.getWeather(latitude, longitude);
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
    dispatch(weatherFetch(false));
    dispatch(setWeather(weekWeather));
    // установить погоду для бэкграунда
    const backgroundDesc = getBackgroundDesc(weekWeather[0].weatherId);
    dispatch(setBackgroundDesc(backgroundDesc));
  };
}

export default weatherReducer;
