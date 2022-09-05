import moment from 'moment';
import { useEffect, useState } from 'react';
import './date-time.scss';

function DateTime() {
  const [time, setTime] = useState(moment());

  const tick = () => {
    setTime(moment());
  };

  // что бы не рендерить каждую секунду, можно вычислить сколько осталось до следущей минуты секунд
  // и через этот промежуток времени запустить интервал с периодичностью 60 сек
  useEffect(() => {
    // если нужна перерисовка каждую минуту можно так
    // const delay = (60 - Number(moment().format('ss'))) * 1000;
    // let intervalID = null;
    // const TimerID = setTimeout(() => {
    //   intervalID = setInterval(() => tick(), 60000);
    //   clearTimeout(TimerID);
    // }, delay);
    // return () => {
    //   clearInterval(intervalID);
    //   clearTimeout(TimerID);
    // };
    // каждую секунду перерисовка
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="datetime-wrapper">
      <h2 className="time">
        {time.format('HH:mm')}
        <span className="times-of-day">
          {time.format(' A')}
        </span>
      </h2>
      <h3 className="date">
        {time.format('dddd, D MMMM YYYY')}
      </h3>
    </div>
  );
}

export default DateTime;
