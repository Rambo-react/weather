import { useSelector } from 'react-redux';
import Preloader from './Preloader/Preloader';
import WeatherToday from './WeatherToday';
import WeekPanel from './WeekPanel';
import '../styles/weather-panel.scss';

function WeatherPanel() {
  const weatherData = useSelector((state) => state.weather.weatherData);
  const isFetching = useSelector((state) => state.weather.isFetching);
  if (isFetching) {
    return (
      <Preloader />
    );
  }

  if (!weatherData) {
    return (
      <Preloader />
      // <div className="weather-wrapper">NO data</div>
    );
  }

  const [today, ...week] = weatherData;

  return (
    <div className="weather-wrapper">
      <WeatherToday
        nameDay={today.nameDay}
        temp={today.temp}
        tempFeels={today.tempFeels}
        tempDay={today.tempDay}
        tempNight={today.tempNight}
        weatherDescription={today.weatherDescription}
        weatherId={today.weatherId}
        windSpeed={today.windSpeed}
      />
      <WeekPanel week={week} />
    </div>
  );
}

export default WeatherPanel;
