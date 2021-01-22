import { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardsList from '../CardsList/CardsList';
import TeamCalendar from '../TeamCalendar/TeamCalendar';
import CompetitionCalendar from '../CompetitionCalendar/CompetitionCalendar';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import './App.css';
import {
  getCompetitionsData,
  getTeamsData,
  getCompetitionCalendarBySeason,
  getTeamCalendar,
  getTeamInfo,
  getCompetitionInfo,
  getCompetitionCalendarByPeriod,
  getTeamCalendarByDatePeriod,
} from '../../utils/Api';
import * as to from '../../utils/routesMap';

function App() {
  const history = useHistory();

  const [competitionsList, setCompetitionsList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [teamCalendarData, setTeamCalendarData] = useState([]);
  const [teamInfo, setTeamInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getFullData = useCallback(() => {
    setIsLoading(true);
    Promise.all([getCompetitionsData(), getTeamsData()])
      .then(([competitionsData, teamsData]) => {
        const competitionsArray = competitionsData.competitions
          .filter(
            (competition) =>
              competition.plan === 'TIER_ONE' && competition.id !== 2013 && competition.id !== 2000,
          )
          .map((competition) => {
            const resultCompetitionData = {
              id: competition.id,
              area: competition.area,
              name: competition.name,
              image: competition.area.ensignUrl,
              currentSeason: competition.currentSeason.startDate.slice(0, 4),
              currentSeasonMonth: new Date(competition.currentSeason.startDate).getMonth(),
            };
            return resultCompetitionData;
          });
        const teamsArray = teamsData.teams.map((team) => {
          const resultTeamData = {
            id: team.id,
            area: team.area,
            name: team.name,
            image: team.crestUrl,
          };
          return resultTeamData;
        });
        setCompetitionsList(competitionsArray);
        setTeamsList(teamsArray);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleClickOnCompetitionCard = useCallback(
    (id) => {
      const selectedCompetition = competitionsList.find((competition) => competition.id === id);
      history.push(
        `${history.location.pathname}/${id}${to.SEASON}/${selectedCompetition.currentSeason}${to.MONTH}/${selectedCompetition.currentSeasonMonth}`,
      );
    },
    [history, competitionsList],
  );

  const handleClickOnTeamCard = useCallback(
    (id) => {
      history.push(`${history.location.pathname}/${id}`);
    },
    [history],
  );

  const getCompetitionDataBySeasonId = useCallback((id, seasonId) => {
    Promise.all([getCompetitionCalendarBySeason(id, seasonId), getCompetitionInfo(id)])
      .then(([data, info]) => {
        const matchDaysSortedByNumber = data.matches.reduce((acc, match) => {
          const matchDate = new Date(match.utcDate).getMonth();
          if (!acc[matchDate]) {
            acc[matchDate] = [match];
          } else {
            acc[matchDate].push(match);
          }
          return acc;
        }, {});
        setCalendarData(matchDaysSortedByNumber);
        setCompetitionInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCompetitionDataByDatePeriod = useCallback((id, dateFromId, dateToId) => {
    Promise.all([getCompetitionCalendarByPeriod(id, dateFromId, dateToId), getCompetitionInfo(id)])
      .then(([data, info]) => {
        setCalendarData(data);
        setCompetitionInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getTeamData = useCallback((id) => {
    Promise.all([getTeamCalendar(id), getTeamInfo(id)])
      .then(([data, info]) => {
        setTeamCalendarData(data.matches);
        setTeamInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getTeamDataByDatePeriod = useCallback((id, dateFromId, dateToId) => {
    Promise.all([getTeamCalendarByDatePeriod(id, dateFromId, dateToId), getTeamInfo(id)])
      .then(([data, info]) => {
        setTeamCalendarData(data.matches);
        setTeamInfo(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmitSearchFormOnCompetitionsList = useCallback(
    (obtainedCard) => {
      if (!obtainedCard) {
        alert('oops');
      } else {
        history.push(
          `${history.location.pathname}/${obtainedCard.id}${to.SEASON}/${obtainedCard.currentSeason}${to.MONTH}/${obtainedCard.currentSeasonMonth}`,
        );
      }
    },
    [history],
  );

  const handleSubmitSearchFormOnTeamsList = useCallback(
    (obtainedCard) => {
      if (!obtainedCard) {
        alert('oops');
      } else {
        history.push(`${history.location.pathname}/${obtainedCard.id}`);
      }
    },
    [history],
  );

  const handleChangeSeason = useCallback(
    (selectedSeason, id) => {
      history.push(
        `${to.COMPETITIONS}/${id}${to.SEASON}/${selectedSeason.startDate.slice(0, 4)}${
          to.MONTH
        }/${new Date(selectedSeason.startDate).getMonth()}`,
      );
    },
    [history],
  );

  const handleChangeMonth = useCallback(
    ({ id, season, selectedMonth }) => {
      history.push(`${to.COMPETITIONS}/${id}${to.SEASON}/${season}${to.MONTH}/${selectedMonth}`);
    },
    [history],
  );

  const handleSubmitSetDatePeriodForm = useCallback(
    (dateFrom, dateTo) => {
      history.push(
        `${history.location.pathname.split('/').slice(0, 3).join('/')}${
          to.PERIOD
        }/${dateFrom}/${dateTo}`,
      );
    },
    [history],
  );

  useEffect(() => {
    getFullData();
  }, [getFullData]);

  return (
    <>
      <Header />

      <main className="content">
        <Switch>
          <Route path={to.MAIN} exact>
            <Redirect to={to.COMPETITIONS} />
          </Route>
          <Route path={to.COMPETITIONS} exact>
            {isLoading ? (
              <Preloader />
            ) : (
              <CardsList
                cardsList={competitionsList}
                handleSelectOfCard={handleClickOnCompetitionCard}
                handleSubmitSearchForm={handleSubmitSearchFormOnCompetitionsList}
              />
            )}
          </Route>
          <Route path={to.TEAMS} exact>
            {isLoading ? (
              <Preloader />
            ) : (
              <CardsList
                cardsList={teamsList}
                handleSelectOfCard={handleClickOnTeamCard}
                handleSubmitSearchForm={handleSubmitSearchFormOnTeamsList}
              />
            )}
          </Route>
          <Route path={`${to.TEAMS}/:id`} exact>
            {isLoading ? (
              <Preloader />
            ) : (
              <TeamCalendar
                getData={getTeamData}
                teamCalendarData={teamCalendarData}
                teamInfo={teamInfo}
              />
            )}
          </Route>
          <Route path={`${to.TEAMS}/:id${to.PERIOD}/:dateFromId/:dateToId`} exact>
            {isLoading ? (
              <Preloader />
            ) : (
              <TeamCalendar
                getData={getTeamDataByDatePeriod}
                teamCalendarData={teamCalendarData}
                teamInfo={teamInfo}
                handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm}
              />
            )}
          </Route>

          <Route path={`${to.COMPETITIONS}/:id${to.SEASON}/:seasonId${to.MONTH}/:monthId`}>
            {isLoading ? (
              <Preloader />
            ) : (
              <CompetitionCalendar
                calendarData={calendarData}
                competitionInfo={competitionInfo}
                getData={getCompetitionDataBySeasonId}
                handleChangeSeason={handleChangeSeason}
                handleChangeMonth={handleChangeMonth}
                handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm}
              />
            )}
          </Route>
          <Route path={`${to.COMPETITIONS}/:id${to.PERIOD}/:dateFromId/:dateToId`}>
            {isLoading ? (
              <Preloader />
            ) : (
              <CompetitionCalendar
                getData={getCompetitionDataByDatePeriod}
                calendarData={calendarData}
                competitionInfo={competitionInfo}
                handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm}
              />
            )}
          </Route>
          <Route path={to.ANY_ROUTE}>
            <PageNotFound />
          </Route>
        </Switch>
      </main>

      <Footer />
    </>
  );
}

export default App;
