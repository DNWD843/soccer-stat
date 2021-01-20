import { COMPETITIONS } from '../../utils/routesMap';
import { forCompetitionCalendar as config } from '../../configs/configForComponents';
import { useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import pathToBallImage from '../../images/soccer-ball.svg';
import CompetitionCalendarTableStroke from '../CompetitionCalendarTableStroke/CompetitionCalendarTableStroke';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './CompetitionCalendar.css';

function CompetitionCalendar({
  calendarData,
  competitionInfo,
  getDataBySeasonId,
  getDataByDatePeriod,
}) {
  const history = useHistory();
  let { id, seasonId, monthId, dateFromId, dateToId } = useParams();

  const seasonSelectInput = useRef(null);
  const monthSelectInput = useRef(null);

  const { values, resetForm, isFormValid, handleInputChange, errors } = useFormWithValidation();
  const { dateFrom, dateTo } = values;

  const {
    TITLE,
    BACK_TO_COMPETITIONS_LIST_LINK_TEXT,
    MONTH,
    SEASON,
    DATE,
    HOMETEAM,
    SCORE,
    AWAYTEAM,
    GROUP,
    STATUS,
    LABEL_DATE_FROM,
    PLACEHOLDER_DATE_FROM,
    LABEL_DATE_TO,
    PLACEHOLDER_DATE_TO,
    SUBMIT_BUTTON_TEXT,
    MONTHS_LIST,
    SEASON_OPTION_TEXT,
    MONTH_OPTION_TEXT,
    FORM_TITLE_TEXT,
  } = config;

  const getData = useCallback(() => {
    seasonId && monthId
      ? getDataBySeasonId(id, seasonId)
      : getDataByDatePeriod(id, dateFromId, dateToId);
  }, [getDataBySeasonId, getDataByDatePeriod, id, monthId, seasonId, dateFromId, dateToId]);

  const handleChangeSeason = useCallback(() => {
    const selectedSeason = competitionInfo.seasons.find(
      (season) => season.startDate.slice(0, 4) === seasonSelectInput.current.value,
    );
    history.push(
      `/competitions/${id}/season/${selectedSeason.startDate.slice(0, 4)}/month/${new Date(
        selectedSeason.startDate,
      ).getMonth()}`,
    );
  }, [history, competitionInfo.seasons, id]);

  const handleChangeMonth = useCallback(() => {
    history.push(
      `/competitions/${id}/season/${seasonSelectInput.current.value}/month/${monthSelectInput.current.value}`,
    );
  }, [history, id]);

  const handleFormSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      resetForm();
      history.push(`/competitions/${id}/period/${dateFrom}/${dateTo}`);
    },
    [resetForm, history, dateFrom, dateTo, id],
  );

  useEffect(() => {
    resetForm();
    getData();
  }, [resetForm, getData]);

  return (
    <section className="competition-calendar">
      <h2 className="competition-calendar__title">{TITLE}</h2>

      <div className="competition-calendar__info">
        <img
          src={competitionInfo.emblemUrl || pathToBallImage}
          alt="логотип футбольного турнира"
          className="competition-calendar__image"
        />
        <div className="competition-calendar__description">
          <h3 className="competition-calendar__competition-name">{competitionInfo.name || ''}</h3>
          <p className="competition-calendar__competition-country-name">
            {competitionInfo.area ? competitionInfo.area.name : ''}
          </p>

          <div className="competition-calendar__season-select">
            <span className="competition-calendar__season">{SEASON}</span>

            <select
              onChange={handleChangeSeason}
              ref={seasonSelectInput}
              value={seasonId}
              className="competition-calendar__season-select-input"
            >
              <option key={1} value={undefined}>
                {SEASON_OPTION_TEXT}
              </option>
              {competitionInfo.seasons &&
                competitionInfo.seasons.map((season) => (
                  <option key={season.id} value={season.startDate.slice(0, 4)}>
                    {`${season.startDate.slice(0, 4)} / ${season.endDate.slice(0, 4)}`}
                  </option>
                ))}
            </select>
          </div>

          <div className="competition-calendar__month-select">
            <span className="competition-calendar__month">{MONTH}</span>

            <select
              onChange={handleChangeMonth}
              ref={monthSelectInput}
              name="stage"
              value={monthId}
              disabled={!monthId}
              className="competition-calendar__month-select-input"
            >
              <option key={1} value={undefined}>
                {MONTH_OPTION_TEXT}
              </option>
              {Object.keys(calendarData).map((calendarDataKey, index) => (
                <option key={index} value={calendarDataKey}>
                  {MONTHS_LIST[calendarDataKey]}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleFormSubmit} className="form competition-calendar_form">
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
        </div>
        <Link className="competition-calendar__link" to={COMPETITIONS}>
          {BACK_TO_COMPETITIONS_LIST_LINK_TEXT}
        </Link>
      </div>

      <table className="matchday-table competition-calendar__table">
        <thead className="matchday-table-head matchday-table__header">
          <tr>
            <th className="matchday-table-head__cell" colSpan="2">
              <span className="matchday-table-head__date">{DATE}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__hometeam">{HOMETEAM}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__score">{SCORE}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__awayteam">{AWAYTEAM}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__group">{GROUP}</span>
            </th>
            <th className="matchday-table-head__cell">
              <span className="matchday-table-head__status">{STATUS}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {competitionInfo.currentSeason && calendarData[monthId] && seasonId && monthId
            ? calendarData[monthId].map((match) => (
                <CompetitionCalendarTableStroke key={match.id} match={match} />
              ))
            : null}
          {competitionInfo.currentSeason && calendarData.matches && dateFromId && dateToId
            ? calendarData.matches.map((match) => (
                <CompetitionCalendarTableStroke key={match.id} match={match} />
              ))
            : null}
        </tbody>
      </table>
    </section>
  );
}

export default CompetitionCalendar;
