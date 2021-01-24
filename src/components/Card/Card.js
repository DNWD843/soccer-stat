import pathToDefaultImage from '../../images/soccer-ball.svg';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * @module Card
 * @description Карточка с информацией о турнире или команде
 * @param {Object} card - объект с данными турнира или команды
 * @property {Number} card.id - id турнира или команды
 * @property {String} card.title - название турнира или команды
 * @property {Object} card.country - страна турнира или команды
 * @property {String} card.image - URL изображения: для турнира - флаг страны, для команды - эмблема команды
 * @param {Function} handleSelectOfCard - колбэк, обработчик выбора карточки
 * @returns {JSX}
 * @since v.1.0.0
 */
function Card({ id, title, country, image, handleSelectOfCard }) {
  /**
   * @method handleClick
   * @description Обработчик клика по карточке.
   * @public
   * @since v.1.0.0
   */
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

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  image: PropTypes.string,
  handleSelectOfCard: PropTypes.func.isRequired,
};

export default Card;
