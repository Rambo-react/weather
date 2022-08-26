import {
  SET_COORDS,
  FETCH_POSITION,
  SET_POSITION,
  SET_DATA_LIST_CITIES,
  RESET_DATA_LIST_CITIES,
  FIRST_START,
} from './positionReducer';

// actions
interface IsetCoords {
  type: typeof SET_COORDS
}

interface IfetchPosition {
  type: typeof FETCH_POSITION
}

interface IsetPosition {
  type: typeof SET_POSITION
}

interface IsetDataListCities {
  type: typeof SET_DATA_LIST_CITIES
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
