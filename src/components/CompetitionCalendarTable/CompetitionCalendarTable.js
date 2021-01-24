import CompetitionCalendarTableStroke from '../CompetitionCalendarTableStroke/CompetitionCalendarTableStroke';
import { forCompetitionCalendarTable as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './CompetitionCalendarTable.css';

/**
 * @module CompetitionCalendarTable
 * @description Таблица календаря матчей турнира
 * @param {Object} competitionInfo - объект с информацией о турнире
 * @param {Object} calendarData - объект с данными о матчах
 * @param {String} seasonId - идентификатор сезона - год начала сезона
 * @param {String} monthId - идентификатор месяца сезона
 * @param {String} dateFromId - начальная дата диапазона дат
 * @param {String} dateToId - конечная дата диапазона дат
 * @returns {JSX}
 * @since v.1.0.0
 */
function CompetitionCalendarTable({
  competitionInfo,
  calendarData,
  seasonId,
  monthId,
  dateFromId,
  dateToId,
}) {
  const { DATE, HOMETEAM, SCORE, AWAYTEAM, GROUP, STATUS } = config;

  return (
    <table className="competition-table competition-calendar__table">
      <thead className="competition-table-head competition-table__header">
        <tr>
          <th className="competition-table-head__cell" colSpan="2">
            <span className="competition-table-head__date">{DATE}</span>
          </th>
          <th className="competition-table-head__cell">
            <span className="competition-table-head__hometeam">{HOMETEAM}</span>
          </th>
          <th className="competition-table-head__cell">
            <span className="competition-table-head__score">{SCORE}</span>
          </th>
          <th className="competition-table-head__cell">
            <span className="competition-table-head__awayteam">{AWAYTEAM}</span>
          </th>
          <th className="competition-table-head__cell">
            <span className="competition-table-head__group">{GROUP}</span>
          </th>
          <th className="competition-table-head__cell">
            <span className="competition-table-head__status">{STATUS}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {competitionInfo.currentSeason && calendarData[monthId] && seasonId && monthId
          ? calendarData[monthId].map((match) => (
              <CompetitionCalendarTableStroke key={match.id} match={match} />
            ))
          : null}
        {competitionInfo.currentSeason && calendarData.matches && dateFromId && dateToId
          ? calendarData.matches.map((match) => (
              <CompetitionCalendarTableStroke key={match.id} match={match} />
            ))
          : null}
      </tbody>
    </table>
  );
}

CompetitionCalendarTable.propTypes = {
  competitionInfo: PropTypes.object.isRequired,
  calendarData: PropTypes.object.isRequired,
  seasonId: PropTypes.string,
  monthId: PropTypes.string,
  dateFromId: PropTypes.string,
  dateToId: PropTypes.string,
};

export default CompetitionCalendarTable;
