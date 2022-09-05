import React from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './weather-day.scss';

type WeatherDayType = {
  nameDay: string,
  temp: number,
  tempFeels: number,
  tempDay: number,
  tempNight: number,
  weatherDescription: string,
  weatherId: number
}

function WeatherDay({
  nameDay = 'n/d', temp = 0, tempFeels = 0, tempDay = 0, tempNight = 0, weatherDescription = 'n/d', weatherId = 0,
}: WeatherDayType) {
  return (
    <div className="weather-day-wrapper">
      <div className="name-day">
        {nameDay.toUpperCase()}
      </div>
      <div className="weather-desc">{weatherDescription}</div>
      <WeatherIcon weatherId={weatherId} classN="weather-ico" />
      <div className="temp">
        {temp}
        &#176;
      </div>
      <div className="temp-feels">
        {`Feels like ${tempFeels}`}
        &#176;.
      </div>
      <div>
        <span className="temp-day">
          {tempDay}
          &#176;
        </span>
        <span className="temp-night">
          /
          {tempNight}
          &#176;
        </span>
      </div>
    </div>
  );
}

export default React.memo(WeatherDay);
