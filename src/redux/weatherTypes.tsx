import {FETCH_WEATHER, SET_WEATHER, SET_WEATHER_API, SET_BACKGROUND_DESC} from './weatherReducer';


//actions
interface IsetWeatherApi {
  type: typeof SET_WEATHER_API
}

interface IweatherFetch {
  type: typeof FETCH_WEATHER
}

interface IsetWeather {
  type: typeof SET_WEATHER
}

interface IsetBackgroundDesc {
  type: typeof SET_BACKGROUND_DESC
}

export type WeatherActionTypes = IsetWeatherApi | IweatherFetch | IsetWeather | IsetBackgroundDesc;
