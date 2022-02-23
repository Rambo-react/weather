import moment from 'moment';
import { useEffect, useState } from 'react';

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
    <div style={{ border: '1px solid blue' }}>
      <h2>
        {time.format('h:mm:ss')}
        <span>
          {time.format(' a')}
        </span>
      </h2>
      <h3>
        {time.format('dddd, D MMMM YYYY')}
      </h3>
    </div>
  );
}

export default DateTime;
