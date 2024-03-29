/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FETCH_WEATHER, SET_WEATHER, SET_WEATHER_API, SET_BACKGROUND_DESC,
} from './weatherReducer';

// actions
interface IfetchWeather {
  type: typeof FETCH_WEATHER,
  payload: boolean
}

interface IsetWeather {
  type: typeof SET_WEATHER,
  // weatherData: any
  payload: any
}

interface IsetWeatherApi {
  type: typeof SET_WEATHER_API,
  // selectedApi: string
  payload: string
}

interface IsetBackgroundDesc {
  type: typeof SET_BACKGROUND_DESC,
  // backgroundDesc: string
  payload: string
}

export type IconCode = {
  iconId: number,
  backgroundDesc: string,
  codes: Array<number>,
}

export type DefaultStateWeatherType = {
  weatherData: any,
  isFetching: boolean,
  selectedApi: string,
  iconCodes: Array<IconCode>,
  backgroundDesc: string,
}

export type WeatherActionTypes = IfetchWeather | IsetWeather | IsetWeatherApi | IsetBackgroundDesc;
