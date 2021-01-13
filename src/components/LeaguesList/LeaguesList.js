import Competition from '../Competition/Competition';
import './LeaguesList.css';

function LeaguesList({ competitionsList }) {
  return (
    <section className="competitions">
      <ul className="leagues-list competitions__elements">
        {competitionsList.map(({ id, name, area, ensignUrl }) => (
          <Competition key={id} title={name} country={area} flag={ensignUrl} />
        ))}
      </ul>
    </section>
  );
}
export default LeaguesList;
