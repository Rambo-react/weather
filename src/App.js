import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/app.scss';
import InfoPanel from './components/InfoPanel';
import SearchPanel from './components/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel';
import { getPosition, setCoords, setFirstStart } from './redux/positionReducer';
import { getWeatherFromApi } from './redux/weatherReducer';
import TodoPanel from './components/TodoPanel';
import Notification from './components/Notification/Notification';

function App() {
  const [notification, setNotification] = useState('');
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const longitude = useSelector((state) => state.geoposition.longitude);
  const latitude = useSelector((state) => state.geoposition.latitude);
  const firstStart = useSelector((state) => state.geoposition.firstStart);
  // for background img
  const backgroundDesc = useSelector((state) => state.weather.backgroundDesc);

  const dispatch = useDispatch();

  //  Get coords from NAVIGATOR
  useEffect(() => {
    //  success
    function successPos(position) {
      if (!longitude && !latitude) {
        dispatch(setCoords(position.coords));
      }
    }
    //  error
    function errorPos() {
      if (!firstStart) {
        setNotification('Location unavailable. Enter the name of the city in the search bar.');
      }
    }

    if (!navigator.geolocation) {
      setNotification('Browser no support "navigator". Enter the name of the city in the search bar.');
    } else {
      dispatch(setFirstStart());
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //  Get position if coords not null
  useEffect(() => {
    if (longitude && latitude) {
      dispatch(getPosition(latitude, longitude));
    }
  }, [dispatch]);

  //  GET weather data if got city name
  useEffect(() => {
    if (longitude && latitude) {
      dispatch(getWeatherFromApi(latitude, longitude, selectedApi));
    }
  }, [latitude, longitude, selectedApi, dispatch]);

  return (
    <div className={`app ${backgroundDesc}`}>

      <div className={`wrapper ${backgroundDesc}`}>
        <div className="notification-wrapper" tabIndex={-1} role="textbox" onClick={() => setNotification('')} onKeyDown={() => setNotification('')}>
          {notification && <Notification text={notification} />}
        </div>
        <div className="container container-head">
          <div className="head-panel">
            <SelectApiPanel selectedApi={selectedApi} />
            <SearchPanel setTooltip={(text) => setNotification(text)} />
          </div>
          <InfoPanel />
        </div>
        <div className="container container-todo">
          <TodoPanel />
        </div>
        <WeatherPanel />
      </div>
    </div>
  );
}

export default App;
