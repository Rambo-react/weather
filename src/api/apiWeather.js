import * as axios from 'axios';

const instanceAxiosFirst = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const FIRST_API_KEY = 'ba9d950a3797af5698445a38cd00f507';
const exclude = 'current,minutely,hourly,alerts';
export const weatherApiFirst = {
  getWeather(latitude, longitude) {
    return (
      instanceAxiosFirst.get(`onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=metric&appid=${FIRST_API_KEY}`).then((response) => response.data).catch(() => console.error('error Weather First API'))
    );
  },
};

// second weather api
const instanceAxiosSecond = axios.create({
  baseURL: 'https://api.weatherbit.io/v2.0',
});

const SECOND_API_KEY = 'b80e50595d9545cf8049c09a56f7f9c6';
const countDays = 7;
export const weatherApiSecond = {
  getWeather(latitude, longitude) {
    return (
      instanceAxiosSecond.get(`/forecast/daily?lat=${latitude}&lon=${longitude}&days=${countDays}&units=M&key=${SECOND_API_KEY}`).then((response) => response.data).catch(() => console.error('error Weather Second API'))
    );
  },
};

// НЕ ЗАБЫТЬ =======================================написать обработку ответов от сервера
// 400  Неверный запрос — ваш запрос недействителен.
// 401  Неавторизованный — ваш ключ API недействителен.
// 429  Слишком много запросов — вы достигли дневного лимита.
// 500  Внутренняя ошибка сервера. У нас возникла проблема с нашим сервером. Попробуйте позже.
// 503  Служба недоступна —мы временно
//  отключены от сети в связи с техническим обслуживанием. Пожалуйста, повторите попытку позже.
