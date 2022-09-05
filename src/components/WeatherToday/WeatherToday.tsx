import React from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './weather-today.scss';

type WeatherTodayType = {
  temp: number,
  tempFeels: number,
  tempDay: number,
  tempNight: number,
  weatherDescription: string,
  weatherId: number,
  windSpeed: number,
};

function WeatherToday({
  temp = 0, tempFeels = 0, tempDay = 0, tempNight = 0, weatherDescription = 'n/d', weatherId = 0, windSpeed = 0,
}: WeatherTodayType) {
  return (
    <div className="weather-today-wrapper">
      <div className="today">TODAY</div>
      <div className="today-weather-info">
        <div className="today-icon-block">
          <div className="today-desc">{weatherDescription}</div>
          <WeatherIcon weatherId={weatherId} classN="weather-ico-today" />
        </div>
        <div className="today-desc-block">
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

export default React.memo(WeatherToday);
