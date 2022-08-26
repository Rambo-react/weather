import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import '../styles/weather-day.scss';

function WeatherDay({
  nameDay, temp, tempFeels, tempDay, tempNight, weatherDescription, weatherId,
}) {
  return (
    <div className="weather-day-wrapper">
      <div className="name-day">
        {nameDay.toUpperCase()}
      </div>
      <div className="weather-desc">{weatherDescription}</div>
      <WeatherIcon weatherId={weatherId} />
      <div className="temp">
        {temp}
        &#176;
      </div>
      <div className="temp-feels">
        {`Feels like ${tempFeels}`}
        &#176;.
      </div>
      <div>
        <span className="temp-day">
          {tempDay}
          &#176;
        </span>
        <span className="temp-night">
          /
          {tempNight}
          &#176;
        </span>
      </div>
    </div>
  );
}

WeatherDay.defaultProps = {
  nameDay: 'н/д',
  temp: 'н/д',
  tempFeels: 'н/д',
  tempDay: 'н/д',
  tempNight: 'н/д',
  weatherDescription: 'н/д',
  weatherId: 'н/д',
};

WeatherDay.propTypes = {
  nameDay: PropTypes.string,
  temp: PropTypes.number,
  tempFeels: PropTypes.number,
  tempDay: PropTypes.number,
  tempNight: PropTypes.number,
  weatherDescription: PropTypes.string,
  weatherId: PropTypes.number,
};

export default React.memo(WeatherDay);
