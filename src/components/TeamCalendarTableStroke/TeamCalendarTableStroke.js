import PropTypes from 'prop-types';
import './TeamCalendarTableStroke.css';

/**
 * @module TeamCalendarTableStroke
 * @description Строка таблицы календаря матчей команды
 * @param {Object} match - объект с данными матча команды
 * @param {Number} selectedTeamId - id команды
 * @returns {JSX}
 * @since v.1.0.0
 */
function TeamCalendarTableStroke({ match, selectedTeamId }) {
  const date = new Date(match.utcDate).toLocaleString().slice(0, 10);
  const time = new Date(match.utcDate).toLocaleTimeString().slice(0, 5);

  return (
    <>
      <tr className="team-calendar-table__stroke">
        <td className="team-calendar-table__cell team-calendar-table__cell_size_100">
          <span className="stroke__date">{date}</span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_60">
          <span className="stroke__time">{time}</span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_220">
          <span className="stroke__competition">
            {`${match.competition.name}. ${match.competition.area.name}`}
          </span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_220">
          <span className="stroke__opponent">
            {match.homeTeam.id === +selectedTeamId ? match.awayTeam.name : match.homeTeam.name}
          </span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_50">
          <span className="stroke__score">
            {`${
              match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : ' -- '
            } : ${match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : ' -- '}`}
          </span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_220">
          <span className="stroke__winner">
            {!match.score.winner
              ? ''
              : match.score.winner === 'DRAW'
              ? match.score.winner
              : match.score.winner === 'HOME_TEAM'
              ? match.homeTeam.name
              : match.awayTeam.name}
          </span>
        </td>
        <td className="team-calendar-table__cell team-calendar-table__cell_size_135">
          <span className="stroke__status">{match.status}</span>
        </td>
      </tr>
    </>
  );
}

TeamCalendarTableStroke.propTypes = {
  match: PropTypes.object.isRequired,
  selectedTeamId: PropTypes.string.isRequired,
};

export default TeamCalendarTableStroke;
