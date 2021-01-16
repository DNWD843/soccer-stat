import './CompetitionCalendarTable.css';

function CompetitionCalendarTable({ match }) {
  const date = new Date(match.utcDate).toLocaleString().slice(0, 10);
  const time = new Date(match.utcDate).toLocaleTimeString().slice(0, 5);
  return (
    <>
      <tr className="matchday-table-stroke matchday-table__stroke">
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__date">{date}</span>
        </td>
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__time">{time}</span>
        </td>
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__hometeam">{match.homeTeam.name}</span>
        </td>
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__score">
            {`${
              match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : ' -- '
            } : ${match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : ' -- '}`}
          </span>
        </td>
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__awayteam">{match.awayTeam.name}</span>
        </td>
        <td className="matchday-table__cell">
          <span className="matchday-table-stroke__status">{match.status}</span>
        </td>
      </tr>
    </>
  );
}

export default CompetitionCalendarTable;
