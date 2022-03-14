import moment from 'moment';
import { useEffect, useState } from 'react';
import '../styles/date-time.scss';

function DateTime() {
  const [time, setTime] = useState(moment());

  function tick() {
    setTime(moment());
  }

  useEffect(() => {
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
