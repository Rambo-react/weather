import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';

function WeatherDay({
  nameDay, temp, tempFeels, tempDay, tempNight, weatherDescription, weatherId, windSpeed,
}) {
  return (
    <div style={{ border: '1px solid red', margin: '5px' }}>
      <div className="ico">{weatherDescription}</div>
      <div>{nameDay}</div>
      <div>
        {temp}
        &#176;
      </div>
      <div>
        {tempFeels}
        &#176;
      </div>
      <div>
        {tempDay}
        &#176;
        /
        {tempNight}
        &#176;
      </div>
      {/* <div>{weatherId}</div> */}
      <WeatherIcon weatherId={weatherId} />
      <div>
        скорость ветра:
        {windSpeed}
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
  windSpeed: 'н/д',
};

WeatherDay.propTypes = {
  nameDay: PropTypes.string,
  temp: PropTypes.number,
  tempFeels: PropTypes.number,
  tempDay: PropTypes.number,
  tempNight: PropTypes.number,
  weatherDescription: PropTypes.string,
  weatherId: PropTypes.number,
  windSpeed: PropTypes.number,
};

export default WeatherDay;
