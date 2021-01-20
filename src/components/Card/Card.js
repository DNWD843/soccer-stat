import pathToDefaultImage from '../../images/soccer-ball.svg';
import { useCallback } from 'react';
import './Card.css';

function Card({ id, title, country, image, handleSelectOfCard }) {
  const handleClick = useCallback(() => {
    handleSelectOfCard(id);
  }, [handleSelectOfCard, id]);

  return (
    <li onClick={handleClick} className="card cards__item">
      <div className="card__info">
        <h2 className="card__title">{title}</h2>
        <span className="card__subtitle">{country.name}</span>
      </div>
      <div
        className="card__image"
        style={{
          backgroundImage: image ? `url(${image})` : `url(${pathToDefaultImage})`,
        }}
      ></div>
    </li>
  );
}

export default Card;
