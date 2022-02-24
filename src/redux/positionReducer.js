import openGeocodingAPI from '../api/apiGeocoding';

const SET_COORDS = 'SET_COORDS';
const FETCH_POSITION = 'FETCH_POSITION';
const SET_POSITION = 'SET_POSITION';
const SET_DATA_LIST_CITIES = 'SET_DATA_LIST_CITIES';
const RESET_DATA_LIST_CITIES = 'RESET_DATA_LIST_CITIES';
// const FIRST_START = 'FIRST_START';

const defaultState = {
  longitude: null,
  latitude: null,
  isFetchingPosition: false,
  position: null,
  listboxCityNames: [],
  // firstStart: false,
};

const positionReducer = (state = defaultState, action) => {
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
        ...state, listboxCityNames: action.payload,
      };
    // case FIRST_START:
    //   return {
    //     ...state, firstStart: action.payload,
    //   };
    default: return state;
  }
};

export const setCoords = (coords) => ({ type: SET_COORDS, payload: coords });
export const fetchPosition = (payload) => ({ type: FETCH_POSITION, payload });
export const setPosition = (position) => ({ type: SET_POSITION, payload: position });
export const setDataListCities = (payload) => ({ type: SET_DATA_LIST_CITIES, payload });
export const resetDataListCities = () => ({ type: SET_DATA_LIST_CITIES, payload: [] });
// export const firstStartSet = () => ({ type: FIRST_START, payload: true });

export function getPosition(latitude, longitude) {
  return async (dispatch) => {
    dispatch(fetchPosition(true));
    const data = await openGeocodingAPI.getPlace(latitude, longitude);
    console.log('Получаем населенный пункт с поомщью координат:', data);
    //  get names : place, country from apiData
    console.log('======EQUIL=', (data[2].text_en || data[1].text_en));
    const place = {
      placeEn: data[0].text_en,
      placeRu: data[0].text_ru,
    };
    const country = {
      countryEn: (data[2].text_en || data[1].text_en),
      countryRu: (data[2].text_ru || data[1].text_ru),
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
      let countryObj = null;
      console.log('====================', data);
      const listboxCityList = data.map((el) => {
        // проверка для таких стран как гонгонг
        if (el.context) {
          countryObj = el.context.filter((element) => element.id.split('.')[0] === 'country');
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
      console.log('Получаем listboxCityList:', listboxCityList);
      dispatch(setDataListCities(listboxCityList));
    }

    // получаем массив совпадений

    dispatch(fetchPosition(false));
  };
}

export default positionReducer;
