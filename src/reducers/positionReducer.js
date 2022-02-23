import openGeocodingAPI from '../api/apiGeocoding';

const SET_COORDS = 'SET_COORDS';
const FETCH_POSITION = 'FETCH_POSITION';
const SET_POSITION = 'SET_POSITION';
const SET_DATA_LIST_CITIES = 'SET_DATA_LIST_CITIES';
const RESET_DATA_LIST_CITIES = 'RESET_DATA_LIST_CITIES';

const defaultState = {
  coords: null,
  isFetchingPosition: false,
  position: null,
  listboxCityNames: [],
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
    case SET_DATA_LIST_CITIES:
      return {
        ...state, listboxCityNames: action.payload,
      };
    case RESET_DATA_LIST_CITIES:
      return {
        ...state, listboxCityNames: action.payload,
      };
    default: return state;
  }
};

export const setCoords = (coords) => ({ type: SET_COORDS, payload: coords });
export const fetchPosition = (payload) => ({ type: FETCH_POSITION, payload });
export const setPosition = (position) => ({ type: SET_POSITION, payload: position });
export const setDataListCities = (payload) => ({ type: SET_DATA_LIST_CITIES, payload });
export const resetDataListCities = () => ({ type: SET_DATA_LIST_CITIES, payload: [] });

export function getPosition(coords) {
  return async (dispatch) => {
    dispatch(fetchPosition(true));
    const data = await openGeocodingAPI.getPlace(coords);
    console.log('Получаем населенный пункт с поомщью координат:', data);
    //  get names : place, country from apiData
    const place = {
      placeEn: data.features[0].text_en,
      placeRu: data.features[0].text_ru,
    };
    const country = {
      countryEn: data.features[2].text_en,
      countryRu: data.features[2].text_ru,
    };
    dispatch(fetchPosition(false));
    dispatch(setPosition({ place, country }));
  };
}

export function getAllMatches(searchText) {
  return async (dispatch) => {
    dispatch(fetchPosition(true));

    const data = await openGeocodingAPI.getCoordsByText(searchText);
    console.log('Получаем массив совпадений и их координаты с помощью поисковой строки:', data);
    // debugger;
    if (data.length < 1) {
      alert('Совпадений нет, перефразируйте запрос поиска, введите название населённого пункта');
    } else {
      const listboxCityList = data.map((el) => {
        const countryObj = el.context.filter((element) => element.id.split('.')[0] === 'country');

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
            longitude: el.center[0],
            latitude: el.center[1],
          },
        };
      });
      console.log('Получаем listboxCityList:', listboxCityList);
      dispatch(setDataListCities(listboxCityList));
    }

    // получаем массив совпадений

    dispatch(fetchPosition(false));
  };
}

export default positionReducer;
