import {
  SET_COORDS,
  FETCH_POSITION,
  SET_POSITION,
  SET_DATA_LIST_CITIES,
  RESET_DATA_LIST_CITIES,
  FIRST_START,
} from './positionReducer';

export type PositionType = {
  place: {placeEn: string, placeRu: string},
  country: {countryEn: string, countryRu: string}
}

export type defaultStatePositionType = {
  longitude: number | null,
  latitude: number | null,
  isFetchingPosition: boolean,
  position: PositionType | null,
  listboxCityNames: Array<any>,
  firstStart: boolean,
};

export type CoordsType = {
  longitude: number,
  latitude: number
}

export type CoordsNavigatorType = {
  coords: {
    latitude: number,
    longitude: number
  }
}

// actions
interface IsetCoords {
  type: typeof SET_COORDS,
  payload: CoordsType
}

interface IfetchPosition {
  type: typeof FETCH_POSITION,
  payload: boolean
}

interface IsetPosition {
  type: typeof SET_POSITION,
  payload: PositionType
}

interface IsetDataListCities {
  type: typeof SET_DATA_LIST_CITIES,
  payload: Array<any>
}

interface IresetDataListCities {
  type: typeof RESET_DATA_LIST_CITIES
}

interface IfirstStart {
  type: typeof FIRST_START
}

export type PositionActionTypes =
  IsetCoords
  | IfetchPosition
  | IsetPosition
  | IsetDataListCities
  | IresetDataListCities
  | IfirstStart;
