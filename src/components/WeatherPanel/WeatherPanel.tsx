import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import WeatherToday from '../WeatherToday/WeatherToday';
import WeekPanel from '../WeekPanel/WeekPanel';
import './weather-panel.scss';
import { RootState } from '../../redux/store';

function WeatherPanel() {
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const isFetching = useSelector((state: RootState) => state.weather.isFetching);
  if (isFetching) {
    return (
      <Preloader />
    );
  }

  if (!weatherData) {
    return (
      <Preloader />
    );
  }

  const [today, ...week] = weatherData;

  return (
    <div className="weather-wrapper">
      <WeatherToday
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
