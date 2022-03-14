import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import '../styles/weather-today.scss';

function WeatherToday({
  temp, tempFeels, tempDay, tempNight, weatherDescription, weatherId, windSpeed,
}) {
  return (
    <div className="weather-today-wrapper">
      {/* <div className="today">{`Today, ${nameDay}`}</div> */}
      <div className="today">TODAY</div>
      <div className="today-weather-info">
        <div>
          <div className="today-desc">{weatherDescription}</div>
          <WeatherIcon weatherId={weatherId} classN="weather-ico-today" />
        </div>
        <div>
          <div className="today-temp">
            {temp}
            &#176;
          </div>
          <div className="today-temp-feels">
            {`Feels like ${tempFeels}`}
            &#176;.
          </div>
          <div className="today-temp-day">
            {`Day: ${tempDay}`}
            &#176;.
          </div>
          <div className="today-temp-night">
            {`Night: ${tempNight}`}
            &#176;.
          </div>
          <div className="today-wind">
            {`Speed wind: ${Math.round(windSpeed)} m/s.`}
          </div>
        </div>
      </div>
    </div>
  );
}

WeatherToday.defaultProps = {
  temp: 'н/д',
  tempFeels: 'н/д',
  tempDay: 'н/д',
  tempNight: 'н/д',
  weatherDescription: 'н/д',
  weatherId: 'н/д',
  windSpeed: 'н/д',
};

WeatherToday.propTypes = {
  temp: PropTypes.number,
  tempFeels: PropTypes.number,
  tempDay: PropTypes.number,
  tempNight: PropTypes.number,
  weatherDescription: PropTypes.string,
  weatherId: PropTypes.number,
  windSpeed: PropTypes.number,
};

export default WeatherToday;

// tempDay, tempFeels, tempMax, tempMin, weatherDescription, weatherId, windSpeed
