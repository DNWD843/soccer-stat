import * as to from '../../utils/routesMap';
import { forCompetitionCalendar as config } from '../../configs/configForComponents';
import { useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import pathToBallImage from '../../images/soccer-ball.svg';
import CompetitionCalendarTable from '../CompetitionCalendarTable/CompetitionCalendarTable';
import SetDatePeriodForm from '../SetDatePeriodForm/SetDatePeriodForm';
import './CompetitionCalendar.css';

function CompetitionCalendar({
  calendarData,
  competitionInfo,
  getData,
  handleChangeSeason,
  handleChangeMonth,
  handleSubmitSetDatePeriodForm,
}) {
  let { id, seasonId, monthId, dateFromId, dateToId } = useParams();

  const seasonSelectInput = useRef(null);
  const monthSelectInput = useRef(null);

  const {
    TITLE,
    BACK_TO_COMPETITIONS_LIST_LINK_TEXT,
    MONTH,
    SEASON,
    MONTHS_LIST,
    SEASON_OPTION_TEXT,
    MONTH_OPTION_TEXT,
  } = config;

  const handleChangeSeasonSelectInputOption = useCallback(() => {
    const selectedSeason = competitionInfo.seasons.find(
      (season) => season.startDate.slice(0, 4) === seasonSelectInput.current.value,
    );
    handleChangeSeason(selectedSeason, id);
  }, [competitionInfo.seasons, handleChangeSeason, id]);

  const handleChangeMonthSelectInputOption = useCallback(() => {
    handleChangeMonth({
      id,
      season: seasonSelectInput.current.value,
      selectedMonth: monthSelectInput.current.value,
    });
  }, [id, handleChangeMonth]);

  useEffect(() => {
    seasonId && monthId ? getData(id, seasonId) : getData(id, dateFromId, dateToId);
  }, [getData, id, seasonId, monthId, dateFromId, dateToId]);

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
              onChange={handleChangeSeasonSelectInputOption}
              ref={seasonSelectInput}
              name="season"
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
              onChange={handleChangeMonthSelectInputOption}
              ref={monthSelectInput}
              name="month"
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
        </div>

        <SetDatePeriodForm handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm} />

        <Link className="competition-calendar__link" to={to.COMPETITIONS}>
          {BACK_TO_COMPETITIONS_LIST_LINK_TEXT}
        </Link>
      </div>

      <CompetitionCalendarTable
        competitionInfo={competitionInfo}
        calendarData={calendarData}
        seasonId={seasonId}
        monthId={monthId}
        dateFromId={dateFromId}
        dateToId={dateToId}
      />
    </section>
  );
}

export default CompetitionCalendar;
