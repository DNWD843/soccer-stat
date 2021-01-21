import { forTeamCalendarTable as config } from '../../configs/configForComponents';
import TeamCalendarTableStroke from '../TeamCalendarTableStroke/TeamCalendarTableStroke';
import './TeamCalendarTable.css';

function TeamCalendarTable({ teamCalendarData, id }) {
  const { DATE, COMPETITION, OPPONENT, SCORE, WINNER, STATUS } = config;
  return (
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
          <TeamCalendarTableStroke key={match.id} match={match} selectedTeamId={id} />
        ))}
      </tbody>
    </table>
  );
}

export default TeamCalendarTable;
