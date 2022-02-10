import openGeocodingAPI from '../api/apiGeocoding';

const SET_COORDS = 'SET_COORDS';
const FETCH_POSITION = 'FETCH_POSITION';
const SET_POSITION = 'SET_POSITION';

const defaultState = {
  coords: null,
  isFetchingPosition: false,
  position: null,
};

const positionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COORDS:
      return {
        ...state, coords: action.payload,
      };
    case FETCH_POSITION:
      return {
        ...state, isFetchingPosition: action.payload,
      };
    case SET_POSITION:
      return {
        ...state, position: action.payload,
      };
    default: return state;
  }
};

export const setCoords = (coords) => ({ type: SET_COORDS, payload: coords });
export const fetchPosition = (payload) => ({ type: FETCH_POSITION, payload });
export const setPosition = (position) => ({ type: SET_POSITION, payload: position });

export function getPosition(coords) {
  return async (dispatch) => {
    dispatch(fetchPosition(true));
    const data = await openGeocodingAPI.getPlace(coords);

    //  get names : place, region, country from apiData
    const place = {
      place_en: data.features[0].text_en,
      place_ru: data.features[0].text_ru,
    };
    const region = {
      region_en: data.features[1].text_en,
      region_ru: data.features[1].text_ru,
    };
    const country = {
      country_en: data.features[2].text_en,
      country_ru: data.features[2].text_ru,
    };
    dispatch(fetchPosition(false));
    dispatch(setPosition({ place, region, country }));
  };
}

export default positionReducer;
