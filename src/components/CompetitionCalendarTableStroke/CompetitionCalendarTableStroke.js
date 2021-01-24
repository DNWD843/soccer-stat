import PropTypes from 'prop-types';
import './CompetitionCalendarTableStroke.css';

/**
 * @module CompetitionCalendarTableStroke
 * @description Строка таблицы с данными о матче
 * @param {Object} match - объект с данными о матче
 * @returns {JSX}
 * @since v.1.0.0
 */
function CompetitionCalendarTableStroke({ match }) {
  const date = new Date(match.utcDate).toLocaleString().slice(0, 10);
  const time = new Date(match.utcDate).toLocaleTimeString().slice(0, 5);
  return (
    <>
      <tr className="matchday-table-stroke matchday-table__stroke">
        <td className="matchday-table__cell matchday-table__cell_size_100">
          <span className="matchday-table-stroke__date">{date}</span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_60">
          <span className="matchday-table-stroke__time">{time}</span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_220">
          <span className="matchday-table-stroke__hometeam">{match.homeTeam.name}</span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_50">
          <span className="matchday-table-stroke__score">
            {`${
              match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : ' -- '
            } : ${match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : ' -- '}`}
          </span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_220">
          <span className="matchday-table-stroke__awayteam">{match.awayTeam.name}</span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_135">
          <span className="matchday-table-stroke__group">{match.group}</span>
        </td>
        <td className="matchday-table__cell matchday-table__cell_size_135">
          <span className="matchday-table-stroke__status">{match.status}</span>
        </td>
      </tr>
    </>
  );
}

CompetitionCalendarTableStroke.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CompetitionCalendarTableStroke;
