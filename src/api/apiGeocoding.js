import * as axios from 'axios';

const instanceAx = axios.create({
  // withCredentials: true,
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
});

const ACCESS_TOKEN = 'pk.eyJ1IjoicmFtYm8tcmVhY3QiLCJhIjoiY2t2ZzljNnFqN3FlbDJuczdkOHd5cjF3OSJ9.yaBqKRzHJW1-YQBUEjC7JQ';
const types = 'types=place,region,country';
const typesCoords = 'types=place';
const limit = 10;
const language = 'en,ru';

const openGeocodingAPI = {
  getPlace(latitude, longitude) {
    return (
      instanceAx.get(`${longitude},${latitude}.json?${types}&language=${language}&access_token=${ACCESS_TOKEN}`).then((response) => response.data.features).catch((err) => {
        if (err.response) {
          // клиент получил ответ об ошибке (5xx, 4xx)
        } else if (err.request) {
          return 'Network error';
        } else {
          // отобразить ошибку
        }
        return 'err';
      })
    );
  },
  getCoordsByText(searchText, countryISO = '') {
    const countryId = countryISO ? (`&country=${countryISO}`) : '';

    return (
      instanceAx.get(`/${searchText}.json?${typesCoords}${countryId}&limit=${limit}&language=${language}&access_token=${ACCESS_TOKEN}`).then((response) => response.data.features).catch(() => [])
    );
  },
};

export default openGeocodingAPI;
