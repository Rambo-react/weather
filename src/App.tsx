import { withErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/app.scss';
import InfoPanel from './components/InfoPanel/InfoPanel';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SelectApiPanel from './components/SelectApiPanel/SelectApiPanel';
import WeatherPanel from './components/WeatherPanel/WeatherPanel';
import { getPosition, setCoords, setFirstStart } from './redux/positionReducer';
// import { getWeatherFromApi } from './redux/weatherReducer';
import { getWeatherFromApi } from './redux/weatherReducer';
import TodoPanel from './components/TodoPanel/TodoPanel';
import Notification from './components/Notification/Notification';
import { RootState } from './redux/store';
import { CoordsNavigatorType } from './redux/positionTypes';

function App() {
  const [notification, setNotification] = useState('');
  const selectedApi = useSelector((state: RootState) => state.weather.selectedApi);
  const longitude = useSelector((state: RootState) => state.geoposition.longitude);
  const latitude = useSelector((state: RootState) => state.geoposition.latitude);
  const firstStart = useSelector((state: RootState) => state.geoposition.firstStart);
  // for background img
  const backgroundDesc = useSelector((state: RootState) => state.weather.backgroundDesc);

  const dispatch = useDispatch();

  //  Get coords from NAVIGATOR
  useEffect(() => {
    //  success
    const successPos = (position: CoordsNavigatorType) => {
      if (!longitude && !latitude) {
        dispatch(setCoords(position.coords));
      }
    };
    //  error
    const errorPos = () => {
      if (!firstStart) {
        setNotification('Location unavailable. Enter the name of the city in the search bar.');
      }
    };

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
  }, [dispatch, longitude, latitude]);

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
            <SearchPanel setNotification={(text) => setNotification(text)} />
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

// export default App;
export default withErrorBoundary(App, {
  fallback: <div style={{ fontSize: '5rem' }}>Something went wrong ...</div>,
});
