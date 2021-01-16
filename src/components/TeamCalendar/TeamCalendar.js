import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamCalendarTable from '../TeamCalendarTable/TeamCalendarTable';
import { TEAMS } from '../../utils/routesMap';
import { forTeamCalendar as config } from '../../configs/configForComponents';
import './TeamCalendar.css';

function TeamCalendar({ getCalendarData, getTeamInfo }) {
  let { id } = useParams();
  const {
    TITLE,
    BACK_TO_TEAMS_LIST_LINK_TEXT,
    DATE,
    COMPETITION,
    OPPONENT,
    SCORE,
    WINNER,
    STATUS,
  } = config;
  const [teamCalendarData, setTeamCalendarData] = useState([]);
  const [teamInfo, setTeamInfo] = useState({});

  useEffect(() => {
    Promise.all([getCalendarData(id), getTeamInfo(id)])
      .then(([data, info]) => {
        setTeamCalendarData(data.matches);
        setTeamInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getCalendarData, getTeamInfo, id]);

  return (
    <section className="team-calendar">
      <h2 className="team-calendar__title">{TITLE}</h2>
      <div className="team-calendar__info">
        <img
          src={teamInfo.crestUrl}
          alt="логотип футбольного клуба"
          className="team-calendar__image"
        />
        <div className="team-calendar__description">
          <h3 className="team-calendar__team-name">{teamInfo.name || ''}</h3>
          <p className="team-calendar__team-country-name">
            {teamInfo.area ? teamInfo.area.name : ''}
          </p>
        </div>
        <Link className="team-calendar__link" to={TEAMS}>
          {BACK_TO_TEAMS_LIST_LINK_TEXT}
        </Link>
      </div>

      <table className="team-calendar-table">
        <thead className="table-head team-calendar-table__header">
          <tr>
            <th className="table-head__cell" colSpan="2">
              <span className="table-head__date">{DATE}</span>
            </th>
            <th className="table-head__cell">
              <span className="table-head__competition">{COMPETITION}</span>
            </th>
            <th className="table-head__cell">
              <span className="table-head__opponent">{OPPONENT}</span>
            </th>
            <th className="table-head__cell">
              <span className="table-head__score">{SCORE}</span>
            </th>
            <th className="table-head__cell">
              <span className="table-head__winner">{WINNER}</span>
            </th>
            <th className="table-head__cell">
              <span className="table-head__status">{STATUS}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {teamCalendarData.map((match) => (
            <TeamCalendarTable key={match.id} match={match} selectedTeamId={id} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TeamCalendar;
