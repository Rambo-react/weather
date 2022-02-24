import * as axios from 'axios';

const instanceAx = axios.create({
  // withCredentials: true,
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  // headers: {
  // },
});

const ACCESS_TOKEN = 'pk.eyJ1IjoicmFtYm8tcmVhY3QiLCJhIjoiY2t2ZzljNnFqN3FlbDJuczdkOHd5cjF3OSJ9.yaBqKRzHJW1-YQBUEjC7JQ';
const types = 'types=place,region,country';
const typesCoords = 'types=place';
const limit = 10;
const language = 'en,ru';

const openGeocodingAPI = {
  getPlace(latitude, longitude) {
    return (
      instanceAx.get(`${longitude},${latitude}.json?${types}&language=${language}&access_token=${ACCESS_TOKEN}`).then((response) => response.data.features)
    );
  },
  getCoordsByText(searchText) {
    return (
      instanceAx.get(`/${searchText}.json?${typesCoords}&limit=${limit}&language=${language}&access_token=${ACCESS_TOKEN}`).then((response) => response.data.features)
    );
  },
};

export default openGeocodingAPI;
