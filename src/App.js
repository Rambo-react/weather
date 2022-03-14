import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/app.scss';
import InfoPanel from './components/InfoPanel';
import SearchPanel from './components/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel';
import { getPosition, setCoords } from './redux/positionReducer';
import { getWeatherFromApi } from './redux/weatherReducer';
import TodoPanel from './components/TodoPanel';

function App() {
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const longitude = useSelector((state) => state.geoposition.longitude);
  const latitude = useSelector((state) => state.geoposition.latitude);
  const dispatch = useDispatch();

  //  navigator functions success/error
  function successPos(position) {
    if (!longitude && !latitude) {
      console.log('navigator default', position.coords);
      dispatch(setCoords(position.coords));
    }
  }

  function errorPos() {
    alert('Failed to get location data.');
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
    if (longitude && latitude) {
      dispatch(getPosition(latitude, longitude));
    }
  }, [latitude, longitude]);

  //  GET weather data if got city name
  useEffect(() => {
    if (longitude && latitude) {
      dispatch(getWeatherFromApi(latitude, longitude, selectedApi));
    }
  }, [latitude, longitude, selectedApi]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="head-panel">
          <SelectApiPanel selectedApi={selectedApi} />
          <SearchPanel />
        </div>
        <InfoPanel />
        <TodoPanel />
        <WeatherPanel />
      </div>
    </div>
  );
}

export default App;
