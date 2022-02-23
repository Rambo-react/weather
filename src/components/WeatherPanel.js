import { useSelector } from 'react-redux';
import Preloader from './Preloader/Preloader';
import WeatherToday from './WeatherToday';
import WeekPanel from './WeekPanel';

function WeatherPanel() {
  const weatherData = useSelector((state) => state.weather.weatherData);
  if (!weatherData) {
    return <Preloader />;
  }
  const [today, ...week] = weatherData;

  return (
    <div style={{ border: '3px solid yellow' }}>
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
