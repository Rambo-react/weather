import WeatherDay from '../WeatherDay/WeatherDay';
import './week-panel.scss';

type WeekDay = {
  nameDay: string,
  temp: number,
  tempFeels: number,
  tempDay: number,
  tempNight: number,
  weatherDescription: string,
  weatherId: number,
}

type WeekPanelType = {
  week: Array<WeekDay>
}

function WeekPanel({ week }: WeekPanelType) {
  const weekDays = week.map((el: WeekDay) => (
    <WeatherDay
      key={el.nameDay}
      nameDay={el.nameDay}
      temp={el.temp}
      tempFeels={el.tempFeels}
      tempDay={el.tempDay}
      tempNight={el.tempNight}
      weatherDescription={el.weatherDescription}
      weatherId={el.weatherId}
    />
  ));

  return (
    <div className="week-panel">
      {weekDays}
    </div>
  );
}
export default WeekPanel;
