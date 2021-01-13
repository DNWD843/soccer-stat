import Competition from '../Competition/Competition';
import './LeaguesList.css';

function LeaguesList({ competitionsList }) {
  return (
    <section className="competitions">
      <ul className="leagues-list competitions__elements">
        {competitionsList.map(({ title, country, flag }) => (
          <Competition title={title} country={country} flag={flag} />
        ))}
      </ul>
    </section>
  );
}
export default LeaguesList;
