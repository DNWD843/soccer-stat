import Card from '../Card/Card';
import { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './CardsList.css';

function CardsList({ cardsList, getInfo }) {
  const selectInput = useRef(null);

  const handleSelectCard = useCallback(() => {
    console.log(selectInput.current.value);
  });

  return (
    <>
      <select onChange={handleSelectCard} ref={selectInput} value={undefined}>
        <option key={1} value={undefined}>
          Выбрать из списка
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
