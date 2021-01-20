import Card from '../Card/Card';
import { useRef, useCallback } from 'react';
import { forCardsList as config } from '../../configs/configForComponents';
import './CardsList.css';

function CardsList({ cardsList, handleSelectOfCard }) {
  const { SELECT_INPUT_DEFAULT_OPTION_TEXT } = config;
  const selectInput = useRef(null);

  const handleChangeOptionOnSelectInput = useCallback(
    (evt) => {
      evt.preventDefault();
      handleSelectOfCard(selectInput.current.value);
    },
    [handleSelectOfCard],
  );

  return (
    <>
      <select onChange={handleChangeOptionOnSelectInput} ref={selectInput} value={undefined}>
        <option key={1} value={undefined}>
          {SELECT_INPUT_DEFAULT_OPTION_TEXT}
        </option>
        {cardsList.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <ul className="cards content__elements">
        {cardsList.map(({ id, name, area, image }) => (
          <Card
            key={id}
            id={id}
            title={name}
            country={area}
            image={image}
            handleSelectOfCard={handleSelectOfCard}
          />
        ))}
      </ul>
    </>
  );
}
export default CardsList;
