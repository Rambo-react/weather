import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import InfoPanel from './components/InfoPanel';
import SearchPanel from './components/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel';
import { getPosition, setCoords } from './reducers/positionReducer';
import { getWeatherFromApi } from './reducers/weatherReducer';

function App() {
  const coords = useSelector((state) => state.geoposition.coords);
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const dispatch = useDispatch();

  console.log('2)App coords ', coords);
  console.log('3)App selectedApi ', selectedApi);

  //  navigator functions success/error
  function successPos(position) {
    console.log('получаем координаты из Навигатора:', position.coords);
    dispatch(setCoords(position.coords));
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
    console.log('useEffect где зависимость только координаты', coords);
    if (coords) {
      console.log('useEffect где зависимость только координаты, getPosition');
      dispatch(getPosition(coords));
    }
  }, [coords]);

  //  GET weather data if got city name
  useEffect(() => {
    console.log('useEffect где зависимость координаты и выбранный апи', coords);
    if (coords) {
      console.log('useEffect где зависимость координаты и выбранный апи,getWeatherFromApi', coords);
      dispatch(getWeatherFromApi(coords, selectedApi));
    }
  }, [coords, selectedApi]);

  return (
    <div className="App" style={{ background: '#366' }}>
      <SelectApiPanel selectedApi={selectedApi} />
      <SearchPanel />
      <InfoPanel />
      <WeatherPanel />
    </div>
  );
}

export default App;
