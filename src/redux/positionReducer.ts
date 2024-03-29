import openGeocodingAPI from '../api/apiGeocoding';
import {
  CoordsType, defaultStatePositionType, PositionActionTypes, PositionType,
} from './positionTypes';

export const SET_COORDS = 'SET_COORDS';
export const FETCH_POSITION = 'FETCH_POSITION';
export const SET_POSITION = 'SET_POSITION';
export const SET_DATA_LIST_CITIES = 'SET_DATA_LIST_CITIES';
export const RESET_DATA_LIST_CITIES = 'RESET_DATA_LIST_CITIES';
export const FIRST_START = 'FIRST_START';

const defaultState: defaultStatePositionType = {
  longitude: null,
  latitude: null,
  isFetchingPosition: false,
  position: null,
  listboxCityNames: [],
  firstStart: false,
};

const positionReducer = (state = defaultState, action: PositionActionTypes) => {
  switch (action.type) {
    case SET_COORDS:
      return {
        ...state, longitude: action.payload.longitude, latitude: action.payload.latitude,
      };
    case FETCH_POSITION:
      return {
        ...state, isFetchingPosition: action.payload,
      };
    case SET_POSITION:
      return {
        ...state, position: action.payload,
      };
    case SET_DATA_LIST_CITIES:
      return {
        ...state, listboxCityNames: action.payload,
      };
    case RESET_DATA_LIST_CITIES:
      return {
        ...state, listboxCityNames: [],
      };
    case FIRST_START:
      return {
        ...state, firstStart: true,
      };
    default: return state;
  }
};

export const setCoords = (coords: CoordsType) => ({ type: SET_COORDS, payload: coords });
export const fetchPosition = (payload: boolean) => ({ type: FETCH_POSITION, payload });
export const setPosition = (position: PositionType) => ({ type: SET_POSITION, payload: position });
export const setDataListCities = (payload: any) => ({ type: SET_DATA_LIST_CITIES, payload });
export const resetDataListCities = () => ({ type: RESET_DATA_LIST_CITIES });
export const setFirstStart = () => ({ type: FIRST_START });

export function getPosition(latitude: number, longitude: number) {
  return async (dispatch: any) => {
    dispatch(fetchPosition(true));
    const data = await openGeocodingAPI.getPlace(latitude, longitude);
    if (typeof data === 'string') {
      alert(data);
    } else {
      //  get names : place, country from apiData
      const place = {
        placeEn: data[0].text_en,
        placeRu: data[0].text_ru,
      };
      const country = {
        countryEn: (data[2]?.text_en || data[1].text_en),
        countryRu: (data[2]?.text_ru || data[1].text_ru),
      };
      dispatch(setPosition({ place, country }));
    }
    dispatch(fetchPosition(false));
  };
}

export function getAllMatches(searchText: string) {
  return async (dispatch: any) => {
    dispatch(fetchPosition(true));
    if (searchText.includes(';')) {
      dispatch(resetDataListCities());
    } else {
      // ищем в строке уточнение в виде страны, после запятой
      let countryISO;
      let placeName;
      if (searchText.includes(',')) {
        placeName = searchText.split(',')[0].trim();
        countryISO = searchText.split(',')[1].trim().toUpperCase();
      } else {
        placeName = searchText;
      }
      const data = await openGeocodingAPI.getCoordsByText(placeName, countryISO);

      if (typeof data === 'string') {
        alert(data);
      } else if (data.length < 1) {
        dispatch(resetDataListCities());
      } else {
        let countryObj;
        const listboxCityList = data.map((el: any) => {
          // проверка для таких стран как гонгонг
          if (el.context) {
            countryObj = el.context.filter((element: any) => element.id.split('.')[0] === 'country');
            if (countryObj.length === 0) {
              countryObj = [el.context['0']];
            }
          } else {
            countryObj = [{
              text_en: el.place_name_en,
              text_ru: el.place_name_ru,
            }];
          }
          return {
            placeFullName: {
              placeNameEn: el.place_name_en,
              placeNameRu: el.place_name_ru,
            },
            country: {
              countryEn: countryObj[0].text_en,
              countryRu: countryObj[0].text_ru,
            },
            coords: {
              latitude: el.center[1],
              longitude: el.center[0],
            },
          };
        });
        dispatch(setDataListCities(listboxCityList));
      }
    }

    // получаем массив совпадений
    dispatch(fetchPosition(false));
  };
}

export default positionReducer;
