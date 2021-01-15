import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Calendar.css';

function Calendar({ getCalendarData }) {
  let { id } = useParams();
  const [calendar, setCalendar] = useState([]);
  console.log({ id });

  useEffect(() => {
    getCalendarData(id)
      .then((res) => {
        setCalendar(res.matches);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="calendar">calendar</div>;
}

export default Calendar;
