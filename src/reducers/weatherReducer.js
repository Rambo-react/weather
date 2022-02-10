import openWeatherAPI from '../api/apiWeather';

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
        ...state, selectedApi: action.payload,
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

export const setWeatherApi = (payload) => ({ type: SET_WEATHER_API, payload });
export const weatherFetch = (payload) => ({ type: FETCH_WEATHER, payload });

export function getWeather(locality) {
  return async (dispatch) => {
    const data = await openWeatherAPI.getWeather(locality);
    dispatch(weatherFetch(data));
  };
}

export default weatherReducer;
