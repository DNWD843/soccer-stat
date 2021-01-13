import './Competition.css';

function Competiton({ title, country, flag }) {
  return (
    <li className="competition leagues-list__item ">
      <h2 className="competition__title">{title}</h2>
      <span className="competiton__country">{country}</span>
      <div className="competition__flag">{flag}</div>
    </li>
  );
}

export default Competiton;
