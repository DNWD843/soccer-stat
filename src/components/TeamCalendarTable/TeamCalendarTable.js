import './TeamCalendarTable.css';

function TeamCalendarTable({ match, id }) {
  const date = new Date(match.utcDate).toLocaleString().slice(0, 10);
  const time = new Date(match.utcDate).toLocaleTimeString().slice(0, 5);

  return (
    <>
      <tr>
        <td>
          <span className="stroke__date">{date}</span>
        </td>
        <td>
          <span className="stroke__time">{time}</span>
        </td>
        <td>
          <p className="stroke__competition">
            {`${match.competition.name}. ${match.competition.area.name}`}
          </p>
        </td>
        <td>
          <p className="stroke__opponent">
            {match.homeTeam.id === +id ? match.awayTeam.name : match.homeTeam.name}
          </p>
        </td>
        <td>
          <span className="stroke__score">
            {`${match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : ' - '} : ${
              match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : ' - '
            }`}
          </span>
        </td>
        <td>
          <p className="stroke__winner">
            {match.score.winner === 'HOME_TEAM' ? match.homeTeam.name : match.awayTeam.name}
          </p>
        </td>
        <td>
          <p className="stroke__status">{match.status}</p>
        </td>
      </tr>
    </>
  );
}

export default TeamCalendarTable;
