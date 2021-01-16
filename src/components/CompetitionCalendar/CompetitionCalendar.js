import { COMPETITIONS } from '../../utils/routesMap';
import { forCompetitionCalendar as config } from '../../configs/configForComponents';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CompetitionCalendar.css';

function CompetitionCalendar({ getCalendarData, getCompetitionInfo }) {
  let { id } = useParams();
  const { TITLE, BACK_TO_COMPETITIONS_LIST_LINK_TEXT, MATCHDAY, SEASON } = config;

  const [calendarData, setCalendarData] = useState([]);
  const [competitionInfo, setCompetitionInfo] = useState({});

  const currentSeasonInfo = competitionInfo.currentSeason
    ? `${SEASON}: ${competitionInfo.currentSeason.startDate}/${competitionInfo.currentSeason.endDate}`
    : '';
  const currentManchDay = `${MATCHDAY}: ${competitionInfo.currentMatchDay}`;

  useEffect(() => {
    Promise.all([getCalendarData(id), getCompetitionInfo(id)])
      .then(([data, info]) => {
        setCalendarData(data);
        setCompetitionInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <section className="competition-calendar">
      <h2 className="competition-calendar__title">{TITLE}</h2>
      <div className="competition-calendar__info">
        <img
          src={competitionInfo.emblemUrl}
          alt="логотип футбольного клуба"
          className="competition-calendar__image"
        />
        <div className="competition-calendar__description">
          <h3 className="competition-calendar__competition-name">{competitionInfo.name || ''}</h3>
          <p className="competition-calendar__competition-country-name">
            {competitionInfo.area ? competitionInfo.area.name : ''}
          </p>
          <span className="competition-calendar__season">{currentSeasonInfo}</span>
          <span className="competition-calendar__matchday">{currentManchDay}</span>
        </div>
        <Link className="competition-calendar__link" to={COMPETITIONS}>
          {BACK_TO_COMPETITIONS_LIST_LINK_TEXT}
        </Link>
      </div>
    </section>
  );
}

export default CompetitionCalendar;
