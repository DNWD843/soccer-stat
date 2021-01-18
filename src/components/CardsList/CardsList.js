import Card from '../Card/Card';
import { useRef, useCallback } from 'react';
import { forCardsList as config } from '../../configs/configForComponents';
import './CardsList.css';

function CardsList({ cardsList, getInfo }) {
  const { SELECT_INPUT_DEFAULT_OPTION_TEXT } = config;
  const selectInput = useRef(null);

  const handleChangeSelect = useCallback(
    (evt) => {
      evt.preventDefault();
      getInfo(selectInput.current.value);
    },
    [getInfo],
  );

  return (
    <>
      <select onChange={handleChangeSelect} ref={selectInput} value={undefined}>
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
          <Card key={id} id={id} title={name} country={area} image={image} getInfo={getInfo} />
        ))}
      </ul>
    </>
  );
}
export default CardsList;
