import Card from '../Card/Card';
import { useCallback, useEffect, useRef } from 'react';
import { forCardsList as config } from '../../configs/configForComponents';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import PropTypes from 'prop-types';
import './CardsList.css';

/**
 * @module CardsList
 * @description Список карточек с информацией о турнирах или командах
 * @param {Array} cardsList - массив данных о турнирах или командах для отображения карточек
 * @param {Function} handleSelectOfCard - колбэк, обработчик клика по карточке
 * @param {Function} handleSubmitSearchForm - колбэк, обработчик сабмита формы поиска по названию
 * @returns {JSX}
 * @since v.1.0.0
 */
function CardsList({ cardsList, handleSelectOfCard, handleSubmitSearchForm }) {
  const {
    SELECT_INPUT_DEFAULT_OPTION_TEXT,
    INPUT_PLACEHOLDER_TEXT,
    FORM_SUBMIT_BUTTON_TEXT,
  } = config;
  const selectInput = useRef(null);

  const { values, handleInputChange, resetForm } = useFormWithValidation();
  const { query } = values;

  /**
   * @method handleChangeOptionOnSelectInput
   * @description Обработчик выбора пункта меню из выпадающего списка.
   * @public
   * @since v.1.0.0
   */
  const handleChangeOptionOnSelectInput = useCallback(() => {
    handleSelectOfCard(+selectInput.current.value);
  }, [handleSelectOfCard]);

  /**
   * @method handleSubmit
   * @description Обработчик сабмита формы поиска по названию.
   * @param {Event} evt - событие
   * @public
   * @since v.1.0.0
   */
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      const searchResult = cardsList.find((card) =>
        card.name.toLowerCase().includes(query.toLowerCase()),
      );
      handleSubmitSearchForm(searchResult);
    },
    [query, cardsList, handleSubmitSearchForm],
  );

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="cards-list content__cards">
      <div className="cards-list__info">
        <select
          onChange={handleChangeOptionOnSelectInput}
          ref={selectInput}
          value={undefined}
          className="cards-list__content-select"
        >
          <option key={1} value={undefined}>
            {SELECT_INPUT_DEFAULT_OPTION_TEXT}
          </option>
          {cardsList.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <form onSubmit={handleSubmit} className="search-form content__search-form">
          <div className="search-form__form-field">
            <input
              type="text"
              className="search-form__input"
              name="query"
              placeholder={INPUT_PLACEHOLDER_TEXT}
              value={query || ''}
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="search-form__submit" disabled={!query}>
            {FORM_SUBMIT_BUTTON_TEXT}
          </button>
        </form>
      </div>

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
    </section>
  );
}

CardsList.propTypes = {
  cardsList: PropTypes.array.isRequired,
  handleSelectOfCard: PropTypes.func.isRequired,
  handleSubmitSearchForm: PropTypes.func.isRequired,
};
export default CardsList;
