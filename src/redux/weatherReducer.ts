import moment from 'moment';
import { WeatherActionTypes, DefaultStateType, IconCode } from './weatherTypes';
import { weatherApiFirst, weatherApiSecond } from '../api/apiWeather';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const SET_WEATHER = 'SET_WEATHER';
export const SET_WEATHER_API = 'SET_WEATHER_API';
export const SET_BACKGROUND_DESC = 'SET_BACKGROUND_DESC';

// коды иконок и коды погодных условий
const iconCodes: Array<IconCode> = [
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

const defaultState: DefaultStateType = {
  weatherData: null,
  isFetching: false,
  selectedApi: 'first',
  iconCodes,
  backgroundDesc: 'none',
};

const weatherReducer = (state = defaultState, action: WeatherActionTypes): DefaultStateType => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state, isFetching: action.payload,
      };
    case SET_WEATHER:
      return {
        ...state, weatherData: action.payload,
      };
    case SET_WEATHER_API:
      return {
        ...state, selectedApi: action.payload,
      };
    case SET_BACKGROUND_DESC:
      return {
        ...state, backgroundDesc: action.payload,
      };
    default: return state;
  }
};

export const fetchWeather = (payload: boolean): WeatherActionTypes => ({
  type: FETCH_WEATHER, payload,
});
export const setWeather = (payload: any): WeatherActionTypes => ({
  type: SET_WEATHER, payload,
});
export const setWeatherApi = (payload: string): WeatherActionTypes => ({
  type: SET_WEATHER_API, payload,
});
export const setBackgroundDesc = (payload: string): WeatherActionTypes => ({
  type: SET_BACKGROUND_DESC, payload,
});

// округляет и если остается -0 то преобразует его в 0
function numRound(num) {
  return (Math.round(num) === +'-0') ? 0 : Math.round(num);
}

// устанавливаем значение для фона
function getBackgroundDesc(weatherId = 90) {
  const iconObj = iconCodes.find((item) => item.codes.includes(weatherId));
  return iconObj?.backgroundDesc;
}

export function getWeatherFromApi(latitude, longitude, selectedApi) {
  return async (dispatch) => {
    dispatch(fetchWeather(true));
    let data;
    const weekWeather: Array<any> = [];
    if (selectedApi === 'first') {
      data = await weatherApiFirst.getWeather(latitude, longitude);
      // разбираем данные на необходимые элементы
      for (let i = 0; i < 7; i++) {
        const nameDay = moment(data.daily[i].dt * 1000).format('ddd');
        const temp = numRound(data.daily[i].temp.day);
        const tempNight = numRound(data.daily[i].temp.night);
        const tempDay = numRound(data.daily[i].temp.max);
        const tempFeels = numRound(data.daily[i].feels_like.day);
        const weatherDescription = data.daily[i].weather[0].description.toUpperCase();
        const weatherId = data.daily[i].weather[0].id;
        const windSpeed = data.daily[i].wind_speed;
        weekWeather.push(
          {
            nameDay,
            temp,
            tempNight,
            tempDay,
            tempFeels,
            weatherDescription,
            weatherId,
            windSpeed,
          },
        );
      }
    } else if (selectedApi === 'second') {
      data = await weatherApiSecond.getWeather(latitude, longitude);
      for (let i = 0; i < 7; i++) {
        const nameDay = moment(data.data[i].ts * 1000).format('ddd');
        const temp = numRound(data.data[i].temp);
        const tempNight = numRound(data.data[i].low_temp);
        const tempDay = numRound(data.data[i].high_temp);
        const tempFeels = numRound((data.data[i].app_max_temp + data.data[i].app_min_temp) / 2);
        const weatherDescription = data.data[i].weather.description.toUpperCase();
        const weatherId = (data.data[i].weather.code === 751) ? 742 : data.data[i].weather.code;
        const windSpeed = data.data[i].wind_spd;
        weekWeather.push(
          {
            nameDay,
            temp,
            tempNight,
            tempDay,
            tempFeels,
            weatherDescription,
            weatherId,
            windSpeed,
          },
        );
      }
    }
    dispatch(fetchWeather(false));
    dispatch(setWeather(weekWeather));
    // установить погоду для бэкграунда
    const backgroundDesc: any = getBackgroundDesc(weekWeather[0].weatherId);
    dispatch(setBackgroundDesc(backgroundDesc));
  };
}

export default weatherReducer;
