import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/app.scss';
import InfoPanel from './components/InfoPanel';
import SearchPanel from './components/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel';
import { getPosition, setCoords } from './redux/positionReducer';
import { getWeatherFromApi } from './redux/weatherReducer';
import TodoPanel from './components/TodoPanel';
import Notification from './components/Tooltip/Notification';

function App() {
  const [tooltip, setTooltip] = useState('');
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const longitude = useSelector((state) => state.geoposition.longitude);
  const latitude = useSelector((state) => state.geoposition.latitude);
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
      setTooltip('Location unavailable. Enter the name of the city in the search bar.');
      // setTooltip('Location unavailable.<br /> Enter city name in the search bar.');
      // alert('Failed to get location data.APP');
    }

    if (!navigator.geolocation) {
      setTooltip('Browser no support "navigator". Enter the name of the city in the search bar.');
    } else {
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //  Get position if coords not null
  useEffect(() => {
    if (longitude && latitude) {
      dispatch(getPosition(latitude, longitude));
    }
  }, [latitude, longitude, dispatch]);

  //  GET weather data if got city name
  useEffect(() => {
    if (longitude && latitude) {
      dispatch(getWeatherFromApi(latitude, longitude, selectedApi));
    }
  }, [latitude, longitude, selectedApi, dispatch]);

  return (
    <div className={`app ${backgroundDesc}`}>

      <div className={`wrapper ${backgroundDesc}`}>
        <div className="notification-wrapper" tabIndex={-1} role="textbox" onClick={() => setTooltip('')} onKeyDown={() => setTooltip('')}>
          {tooltip && <Notification text={tooltip} />}
        </div>
        <div className="container container-head">
          <div className="head-panel">
            <SelectApiPanel selectedApi={selectedApi} />
            <SearchPanel setTooltip={(text) => setTooltip(text)} />
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
