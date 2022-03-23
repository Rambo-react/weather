import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Preloader from './Preloader/Preloader';
import '../styles/weather-icon.scss';

function WeatherIcon({ weatherId, classN }) {
  const iconCodes = useSelector((state) => state.weather.iconCodes);
  if (weatherId === 1000) {
    return (
      <Preloader />
    );
  }
  const iconObj = iconCodes.find((item) => item.codes.includes(weatherId));
  const pathToImg = `../weather/assets/svg/${iconObj.iconId}.svg`;

  return (
    <div className={classN} style={{ backgroundImage: `url(${pathToImg})` }}> </div>
  );
}

WeatherIcon.defaultProps = {
  weatherId: 1000,
  classN: 'weather-ico',
};

WeatherIcon.propTypes = {
  weatherId: PropTypes.number,
  classN: PropTypes.string,
};

export default WeatherIcon;
