import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import InfoPanel from './components/InfoPanel';
import SearchPanel from './components/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel';
import { getPosition, setCoords } from './redux/positionReducer';
import { getWeatherFromApi } from './redux/weatherReducer';

function App() {
  // const coords = useSelector((state) => state.geoposition.coords);
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const longitude = useSelector((state) => state.geoposition.longitude);
  const latitude = useSelector((state) => state.geoposition.latitude);
  // const firstStart = useSelector((state) => state.geoposition.firstStart);
  const dispatch = useDispatch();

  console.log('2)App coords ', latitude, longitude);
  console.log('3)App selectedApi ', selectedApi);

  //  navigator functions success/error
  function successPos(position) {
    console.log('получаем координаты из Навигатора:', position.coords);
    if (!longitude && !latitude) {
      console.log('СЕТАЕМ КООРДЛИНАТЫ:', position.coords);
      dispatch(setCoords(position.coords));
    }
  }

  function errorPos() {
    alert('Failed to get location data');
  }

  //  Get coords from NAVIGATOR
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Browser no support NAVIGATOR');
    } else {
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
  }, []);

  //  Get position if coords not null
  useEffect(() => {
    console.log('useEffect где зависимость только координаты', latitude, longitude);
    if (longitude && latitude) {
      console.log('useEffect где зависимость только координаты, getPosition');
      dispatch(getPosition(latitude, longitude));
    }
  }, [latitude, longitude]);

  //  GET weather data if got city name
  useEffect(() => {
    console.log('useEffect где зависимость координаты и выбранный апи', latitude, longitude);
    if (longitude && latitude) {
      console.log('useEffect где зависимость координаты и выбранный апи,getWeatherFromApi', latitude, longitude);
      // eslint-disable-next-line no-debugger
      // debugger;
      dispatch(getWeatherFromApi(latitude, longitude, selectedApi));
    }
  }, [latitude, longitude, selectedApi]);

  return (
    <div className="App">
      <SelectApiPanel selectedApi={selectedApi} />
      <SearchPanel />
      <InfoPanel />
      <WeatherPanel />
    </div>
  );
}

export default App;
