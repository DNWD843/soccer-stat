import path from '../../images/soccer-ball.svg';
import './Competition.css';

function Competiton({ title, country }) {
  return (
    <li className="competition leagues-list__item ">
      <div className="competition__info">
        <h2 className="competition__title">{title}</h2>
        <span className="competiton__country">{country.name}</span>
      </div>
      <div
        className="competition__flag"
        style={{
          backgroundImage: country.ensignUrl ? `url(${country.ensignUrl}` : `url(${path})`,
        }}
      ></div>
    </li>
  );
}

export default Competiton;
