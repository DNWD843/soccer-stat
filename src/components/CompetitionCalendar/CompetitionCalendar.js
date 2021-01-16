import { COMPETITIONS } from '../../utils/routesMap';
import { forCompetitionCalendar as config } from '../../configs/configForComponents';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import pathToBallImage from '../../images/soccer-ball.svg';
import CompetitionCalendarTable from '../CompetitionCalendarTable/CompetitionCalendarTable';
import './CompetitionCalendar.css';

function CompetitionCalendar({ getCalendarData, getCompetitionInfo }) {
  let { id } = useParams();
  const {
    TITLE,
    BACK_TO_COMPETITIONS_LIST_LINK_TEXT,
    MATCHDAY,
    SEASON,
    DATE,
    HOMETEAM,
    SCORE,
    AWAYTEAM,
    STATUS,
  } = config;

  const [calendarData, setCalendarData] = useState([]);
  const [competitionInfo, setCompetitionInfo] = useState({});

  const currentSeasonInfo = competitionInfo.currentSeason
    ? `${SEASON}: ${new Date(competitionInfo.currentSeason.startDate).getFullYear()}/${new Date(
        competitionInfo.currentSeason.endDate,
      ).getFullYear()}`
    : `${SEASON}: `;
  const currentManchDay = competitionInfo.currentSeason
    ? `${MATCHDAY}: ${competitionInfo.currentSeason.currentMatchday}`
    : `${MATCHDAY}: `;

  useEffect(() => {
    Promise.all([getCalendarData(id), getCompetitionInfo(id)])
      .then(([data, info]) => {
        const matchDaysSortedByNumber = data.matches.reduce((acc, match) => {
          if (!acc[match.matchday]) {
            acc[match.matchday] = [match];
          } else {
            acc[match.matchday].push(match);
          }
          return acc;
        }, {});
        setCalendarData(matchDaysSortedByNumber);
        setCompetitionInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getCalendarData, getCompetitionInfo, id]);

  return (
    <section className="competition-calendar">
      <h2 className="competition-calendar__title">{TITLE}</h2>

      <div className="competition-calendar__info">
        <img
          src={competitionInfo.emblemUrl || pathToBallImage}
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

      <table className="matchday-table competition-calendar__table">
        <thead className="matchday-table-head matchday-table__header">
          <tr>
            <th className="matchday-table-head__cell" colSpan="2">
              <span className="matchday-table-head__date">{DATE}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__hometeam">{HOMETEAM}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__score">{SCORE}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__awayteam">{AWAYTEAM}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__status">{STATUS}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {competitionInfo.currentSeason &&
            calendarData[competitionInfo.currentSeason.currentMatchday].map((match) => (
              <CompetitionCalendarTable key={match.id} match={match} />
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default CompetitionCalendar;
