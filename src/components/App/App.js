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
              />
            )}
          </Route>
          <Route path={to.TEAMS} exact>
            {isLoading ? (
              <Preloader />
            ) : (
              <CardsList cardsList={teamsList} handleSelectOfCard={handleClickOnTeamCard} />
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
              />
            )}
          </Route>

          <Route path={`${to.COMPETITIONS}/:id${to.SEASON}/:seasonId${to.MONTH}/:monthId`}>
            {isLoading ? (
              <Preloader />
            ) : (
              <CompetitionCalendar
                getData={getCompetitionDataBySeasonId}
                calendarData={calendarData}
                competitionInfo={competitionInfo}
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
