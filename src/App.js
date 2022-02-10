import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getPosition, setCoords } from './reducers/positionReducer';
import { getWeather, setWeatherApi } from './reducers/weatherReducer';

function App() {
  const weatherInfo = useSelector((state) => state.weather);
  const locality = useSelector((state) => state.geoposition.position);
  const coords = useSelector((state) => state.geoposition.coords);
  const selectedApi = useSelector((state) => state.weather.selectedApi);
  const dispatch = useDispatch();

  // const checkboxApi = React.createRef();
  function changeApi(e) {
    dispatch(setWeatherApi(e.currentTarget.value));
  }

  const input = React.createRef();

  function setWeather(city) {
    dispatch(getWeather(city));
  }

  //  navigator functions success/error
  function successPos(position) {
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
    if (coords) {
      dispatch(getPosition(coords));
    }
  }, [coords]);

  //  GET weather data if got city name
  useEffect(() => {
    if (locality) {
      dispatch(getWeather(locality.place.place_en));
    }
  }, [locality]);

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="first-api">
          OpenWeatherMap
          <input type="radio" name="checkbox-ip" checked={selectedApi === 'first'} value="first" id="first-api" onChange={(e) => changeApi(e)} />
        </label>
        <label htmlFor="second-api">
          stormglass
          <input type="radio" name="checkbox-ip" checked={selectedApi === 'second'} value="second" id="second-api" onChange={(e) => changeApi(e)} />
        </label>
      </div>
      {(locality)
        ? (
          <div>
            <h1>{locality.place.place_en}</h1>
            <h2>{locality.region.region_en}</h2>
            <h2>{locality.country.country_en}</h2>
          </div>
        )
        : (
          <h3>Нет данных</h3>
        )}
      <input ref={input} />
      <button type="submit" onClick={() => { setWeather(input.current.value); }}>set from NET weather</button>
      {JSON.stringify(weatherInfo, null, 2)}
    </div>
  );
}

export default App;
