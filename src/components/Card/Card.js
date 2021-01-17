import pathToDefaultImage from '../../images/soccer-ball.svg';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getCompetitionInfo } from '../../utils/Api';
import './Card.css';

function Card({ id, title, country, image }) {
  const history = useHistory();

  const handleClickOnCard = useCallback(() => {
    getCompetitionInfo(id)
      .then((info) => {
        history.push(
          `${history.location.pathname}/${id}/season/${info.currentSeason.startDate.slice(
            0,
            4,
          )}/stage/${info.currentSeason.currentMatchday}`,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history, id]);

  return (
    <li onClick={handleClickOnCard} className="card cards__item">
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
