import { COMPETITIONS } from '../../utils/routesMap';
import { forCompetitionCalendar as config } from '../../configs/configForComponents';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import pathToBallImage from '../../images/soccer-ball.svg';
import CompetitionCalendarTableStroke from '../CompetitionCalendarTableStroke/CompetitionCalendarTableStroke';
import './CompetitionCalendar.css';

function CompetitionCalendar({ getCalendarData, getCompetitionInfo }) {
  let { id } = useParams();
  const {
    TITLE,
    BACK_TO_COMPETITIONS_LIST_LINK_TEXT,
    MATCHDAY,
    SEASON,
    DATE,
    HOMETEAM,
    SCORE,
    AWAYTEAM,
    GROUP,
    STATUS,
  } = config;

  const stageSelectInput = useRef(null);
  const seasonSelectInput = useRef(null);

  const [calendarData, setCalendarData] = useState([]);
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [seasonSelectValue, setSeasonSelectValue] = useState(
    competitionInfo.currentSeason
      ? new Date(competitionInfo.currentSeason.startDate).getFullYear() /
          new Date(competitionInfo.currentSeason.endDate).getFullYear()
      : 2020,
  );
  const [stageSelectValue, setStageSelectValue] = useState(
    competitionInfo.currentSeason ? competitionInfo.currentSeason.currentMatchday : 1,
  );
  /*
  const currentSeasonInfo = competitionInfo.currentSeason
    ? `${SEASON}: ${new Date(competitionInfo.currentSeason.startDate).getFullYear()}/${new Date(
        competitionInfo.currentSeason.endDate,
      ).getFullYear()}`
    : `${SEASON}: `;
  const currentManchDay = competitionInfo.currentSeason
    ? `${MATCHDAY}: ${competitionInfo.currentSeason.currentMatchday}`
    : `${MATCHDAY}: `;
*/
  useEffect(() => {
    Promise.all([getCalendarData(id), getCompetitionInfo(id)])
      .then(([data, info]) => {
        const matchDaysSortedByNumber = data.matches.reduce((acc, match) => {
          if (match.matchday) {
            if (!acc[match.matchday]) {
              acc[match.matchday] = [match];
            } else {
              acc[match.matchday].push(match);
            }
          } else {
            if (!acc[match.stage]) {
              acc[match.stage] = [match];
            } else {
              acc[match.stage].push(match);
            }
          }
          return acc;
        }, {});
        setCalendarData(matchDaysSortedByNumber);
        setCompetitionInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getCalendarData, getCompetitionInfo, id]);

  const handleStageSelectChange = useCallback(() => {
    setStageSelectValue(stageSelectInput.current.value);
  }, []);

  const handleSeasonSelectChange = useCallback(() => {
    setSeasonSelectValue(seasonSelectInput.current.value);
  }, []);

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
            <select onChange={handleSeasonSelectChange} ref={seasonSelectInput}>
              {competitionInfo.seasons.map((season) => (
                <option value={`${season.startDate.slice(0, 4)} / ${season.endDate.slice(0, 4)}`}>
                  {`${season.startDate.slice(0, 4)} / ${season.endDate.slice(0, 4)}`}
                </option>
              ))}
            </select>
          </div>

          <div className="competition-calendar__matchday-select">
            <span className="competition-calendar__matchday">{MATCHDAY}</span>
            <select onChange={handleStageSelectChange} ref={stageSelectInput} name="stage">
              {Object.keys(calendarData).map((key) => (
                <option value={key}>{key}</option>
              ))}
            </select>
          </div>
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
          {competitionInfo.currentSeason &&
            calendarData[stageSelectValue].map((match) => (
              <CompetitionCalendarTableStroke key={match.id} match={match} />
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default CompetitionCalendar;
