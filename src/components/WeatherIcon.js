import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Preloader from './Preloader/Preloader';

function WeatherIcon({ weatherId }) {
  // eslint-disable-next-line no-debugger
  const iconCodes = useSelector((state) => state.weather.iconCodes);
  console.log('iconCodes', iconCodes);
  console.log('weatherId', weatherId);
  if (weatherId === 1000) {
    return (
      <Preloader />
    );
  }
  // eslint-disable-next-line no-debugger
  const iconObj = iconCodes.find((item) => item.codes.includes(weatherId));
  console.log('iconObj', iconObj);
  // const iconObj = iconCodes.find((item) => {
  //   console.log('item.codes', item.codes);
  //   console.log('item.codes.include(weatherId)', item.codes.includes(weatherId));
  //   return item.codes.includes(weatherId);
  // });
  // const num = 4;
  const pathToImg = `/assets/svg/${iconObj.iconId}.svg`;

  return (
    <div style={{
      backgroundImage: `url(${pathToImg})`,
      backgroundRepeat: 'no-repeat',
      width: '270px',
      backgroundPosition: 'center',
      height: '270px',
    }}
    >
      {iconObj.iconId}
      {/* <img src="/assets/svg/4.svg" alt="weatherImg" /> */}
    </div>
  );
}

WeatherIcon.defaultProps = {
  weatherId: 1000,
};

WeatherIcon.propTypes = {
  weatherId: PropTypes.number,
};

export default WeatherIcon;

// let user = users.find(item => item.id == 1);
