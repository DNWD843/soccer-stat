import { useCallback, useEffect } from 'react';
import { forSetDatePeriodForm as config } from '../../configs/configForComponents';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './SetDatePeriodForm.css';

/**
 * @module SetDatePeriodForm
 * @description Форма поиска матчей по диапазону дат.
 * @param {Function} handleSubmitSetDatePeriodForm - колбэк, обработчик сабмита формы задания диапазона дат
 * @returns {JSX}
 * @since v.1.0.0
 */
function SetDatePeriodForm({ handleSubmitSetDatePeriodForm }) {
  const {
    LABEL_DATE_FROM,
    PLACEHOLDER_DATE_FROM,
    LABEL_DATE_TO,
    PLACEHOLDER_DATE_TO,
    SUBMIT_BUTTON_TEXT,
    FORM_TITLE_TEXT,
  } = config;

  const { values, resetForm, isFormValid, handleInputChange, errors } = useFormWithValidation();
  const { dateFrom, dateTo } = values;

  /**
   * @method handleFormSubmit
   * @description Обработчик сабмита формы задания диапазона дат.
   * @param {Event} evt - событие
   * @public
   * @since v.1.0.0
   */
  const handleFormSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      handleSubmitSetDatePeriodForm(dateFrom, dateTo);
      resetForm();
    },
    [resetForm, handleSubmitSetDatePeriodForm, dateFrom, dateTo],
  );

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <form onSubmit={handleFormSubmit} className="form content-calendar__form">
      <h2 className="form__title">{FORM_TITLE_TEXT}</h2>
      <div className="form__field">
        <label className="form__label">{LABEL_DATE_FROM}</label>
        <input
          type="text"
          id="dateFrom"
          name="dateFrom"
          value={dateFrom || ''}
          onChange={handleInputChange}
          className="form__input"
          placeholder={PLACEHOLDER_DATE_FROM}
          required
        ></input>
        <span className="form__input-error" id="dateFrom-input-error">
          {errors.dateFrom || ''}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">{LABEL_DATE_TO}</label>
        <input
          type="text"
          id="dateTo"
          name="dateTo"
          value={dateTo || ''}
          onChange={handleInputChange}
          className="form__input"
          placeholder={PLACEHOLDER_DATE_TO}
          required
        ></input>
        <span className="form__input-error" id="dateTo-input-error">
          {errors.dateTo || ''}
        </span>
      </div>
      <button className="form__submit-button" type="submit" disabled={!isFormValid}>
        {SUBMIT_BUTTON_TEXT}
      </button>
    </form>
  );
}

export default SetDatePeriodForm;
