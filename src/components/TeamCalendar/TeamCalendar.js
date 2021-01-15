import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamInfo } from '../../utils/Api';
import TeamCalendarTable from '../TeamCalendarTable/TeamCalendarTable';
import './TeamCalendar.css';

function TeamCalendar({ getCalendarData }) {
  let { id } = useParams();
  const [teamCalendarData, setTeamCalendarData] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({});

  useEffect(() => {
    Promise.all([getCalendarData(id), getTeamInfo(id)])
      .then(([calendarData, teamInfo]) => {
        setTeamCalendarData(calendarData.matches);
        setCurrentTeam(teamInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getCalendarData, id]);

  return (
    <section className="team-calendar">
      <h2 className="team-calendar__title">Расписание игр</h2>
      <div className="team-calendar__info">
        <img
          src={currentTeam.crestUrl}
          alt="логотип футбольного клуба"
          className="team-calendar__image"
        />
        <div className="team-calendar__description">
          <h3 className="team-calendar__team-name">{currentTeam.name || ''}</h3>
          <p className="team-calendar__team-country-name">
            {currentTeam.area ? currentTeam.area.name : ''}
          </p>
        </div>
      </div>

      <table className="team-calendar-table">
        <thead className="table-head team-calendar-table__header">
          <tr>
            <th colSpan="2">
              <span className="table-head__date">Дата</span>
            </th>
            <th>
              <p className="table-head__competition">Турнир</p>
            </th>
            <th>
              <p className="table-head__opponent">Соперник</p>
            </th>
            <th>
              <span className="table-head__score">Счет</span>
            </th>
            <th>
              <p className="table-head__winner">Победитель</p>
            </th>
            <th>
              <p className="table-head__status">Статус</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {teamCalendarData.map((match) => (
            <TeamCalendarTable key={match.id} match={match} id={id} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TeamCalendar;
