import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAMS } from '../../utils/routesMap';
import { forTeamCalendar as config } from '../../configs/configForComponents';
import TeamCalendarTable from '../TeamCalendarTable/TeamCalendarTable';
import SetDatePeriodForm from '../SetDatePeriodForm/SetDatePeriodForm';
import PropTypes from 'prop-types';
import './TeamCalendar.css';

/**
 * @module TeamCalendar
 * @description Календарь матчей выбранной команды
 * @param {Function} getData - колбэк, получает данные о команде и о матчах
 * @param {Array} teamCalendarData - массив матчей команды
 * @param {Object} teamInfo - информация о команде
 * @param {Function} handleSubmitSetDatePeriodForm - колбэк, обработчик сабмита формы задания диапазона дат
 * @returns {JSX}
 * @since v.1.0.0
 */
function TeamCalendar({ getData, teamCalendarData, teamInfo, handleSubmitSetDatePeriodForm }) {
  let { id, dateFromId, dateToId } = useParams();
  const { TITLE, BACK_TO_TEAMS_LIST_LINK_TEXT } = config;

  useEffect(() => {
    dateFromId && dateToId ? getData(id, dateFromId, dateToId) : getData(id);
  }, [getData, id, dateFromId, dateToId]);

  return (
    <section className="team-calendar">
      <h2 className="team-calendar__title">{TITLE}</h2>
      <div className="team-calendar__info">
        <img
          src={teamInfo.crestUrl}
          alt="логотип футбольного клуба"
          className="team-calendar__image"
        />
        <div className="team-calendar__description">
          <h3 className="team-calendar__team-name">{teamInfo.name || ''}</h3>
          <p className="team-calendar__team-country-name">
            {teamInfo.area ? teamInfo.area.name : ''}
          </p>
          {dateFromId ? (
            <Link to={`${TEAMS}/${id}`} className="team-calendar__link">
              {TITLE}
            </Link>
          ) : null}
        </div>

        <SetDatePeriodForm handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm} />

        <Link className="team-calendar__link" to={TEAMS}>
          {BACK_TO_TEAMS_LIST_LINK_TEXT}
        </Link>
      </div>

      <TeamCalendarTable teamCalendarData={teamCalendarData} id={id} />
    </section>
  );
}

TeamCalendar.propTypes = {
  getData: PropTypes.func.isRequired,
  teamCalendarData: PropTypes.array.isRequired,
  teamInfo: PropTypes.object.isRequired,
  handleSubmitSetDatePeriodForm: PropTypes.func.isRequired,
};

export default TeamCalendar;
