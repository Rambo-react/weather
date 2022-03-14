import PropTypes from 'prop-types';
import WeatherDay from './WeatherDay';
import '../styles/week-panel.scss';

function WeekPanel({ week }) {
  const weekDays = week.map((el) => (
    <WeatherDay
      key={el.nameDay}
      nameDay={el.nameDay}
      temp={el.temp}
      tempFeels={el.tempFeels}
      tempDay={el.tempDay}
      tempNight={el.tempNight}
      weatherDescription={el.weatherDescription}
      weatherId={el.weatherId}
      windSpeed={el.windSpeed}
    />
  ));

  return (
    <div className="week-panel">
      {weekDays}
    </div>
  );
}

WeekPanel.propTypes = {
  week: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeekPanel;
