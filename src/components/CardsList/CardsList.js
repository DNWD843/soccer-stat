import { useRouteMatch } from 'react-router-dom';
import Card from '../Card/Card';
import './CardsList.css';

function CardsList({ cardsList }) {
  let { path } = useRouteMatch();
  return (
    <ul className="cards content__elements">
      {cardsList.map(({ id, name, area, image }) => (
        <Card key={id} pathToCalendar={`${path}/${id}`} title={name} country={area} image={image} />
      ))}
    </ul>
  );
}
export default CardsList;
