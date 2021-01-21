import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAMS } from '../../utils/routesMap';
import { forTeamCalendar as config } from '../../configs/configForComponents';
import TeamCalendarTable from '../TeamCalendarTable/TeamCalendarTable';
import SetDatePeriodForm from '../SetDatePeriodForm/SetDatePeriodForm';
import './TeamCalendar.css';
function TeamCalendar({ getData, teamCalendarData, teamInfo }) {
  let { id } = useParams();
  const { TITLE, BACK_TO_TEAMS_LIST_LINK_TEXT } = config;

  useEffect(() => {
    getData(id);
  }, [getData, id]);

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
        </div>

        <SetDatePeriodForm />

        <Link className="team-calendar__link" to={TEAMS}>
          {BACK_TO_TEAMS_LIST_LINK_TEXT}
        </Link>
      </div>

      <TeamCalendarTable teamCalendarData={teamCalendarData} id={id} />
    </section>
  );
}

export default TeamCalendar;
