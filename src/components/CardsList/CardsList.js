import Card from '../Card/Card';
import './CardsList.css';

function CardsList({ cardsList }) {
  return (
    <ul className="cards content__elements">
      {cardsList.map(({ id, name, area, image }) => (
        <Card key={id} id={id} title={name} country={area} image={image} />
      ))}
    </ul>
  );
}
export default CardsList;
