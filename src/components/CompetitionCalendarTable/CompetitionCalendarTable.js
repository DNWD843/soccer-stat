import CompetitionCalendarTableStroke from '../CompetitionCalendarTableStroke/CompetitionCalendarTableStroke';
import { forCompetitionCalendarTable as config } from '../../configs/configForComponents';
import './CompetitionCalendarTable.css';

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
            <span className="matchday-table-head__group">{GROUP}</span>
          </th>
          <th className="matchday-table-head__cell">
            <span className="matchday-table-head__status">{STATUS}</span>
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
export default CompetitionCalendarTable;
