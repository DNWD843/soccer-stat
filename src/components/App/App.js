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
} from '../../utils/Api';
import * as to from '../../utils/routesMap';

function App() {
  const history = useHistory();

  const [competitionsList, setCompetitionsList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [competitionInfo, setCompetitionInfo] = useState({});
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
      setIsLoading(true);
      getCompetitionInfo(id)
        .then((info) => {
          history.push(
            `${history.location.pathname}/${id}/season/${info.currentSeason.startDate.slice(
              0,
              4,
            )}/month/${new Date(info.currentSeason.startDate).getMonth()}`,
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [history],
  );

  const handleClickOnTeamCard = useCallback(
    (id) => {
      setIsLoading(true);
      getTeamInfo(id)
        .then((teamInfo) => {
          history.push(`${history.location.pathname}/${id}`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [history],
  );

  const handleChangeSeason = useCallback((id, seasonId) => {
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

  const handleSetDatePeriod = useCallback((id, dateFromId, dateToId) => {
    Promise.all([getCompetitionCalendarByPeriod(id, dateFromId, dateToId), getCompetitionInfo(id)])
      .then(([data, info]) => {
        setCalendarData(data);
        setCompetitionInfo(info);
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
        {isLoading ? (
          <Preloader />
        ) : (
          <Switch>
            <Route path={to.MAIN} exact>
              <Redirect to={to.COMPETITIONS} />
            </Route>
            <Route path={to.COMPETITIONS} exact>
              <CardsList cardsList={competitionsList} getInfo={handleClickOnCompetitionCard} />
            </Route>
            <Route path={to.TEAMS} exact>
              <CardsList cardsList={teamsList} getInfo={handleClickOnTeamCard} />
            </Route>
            {/* <Route path={`${to.COMPETITIONS}/:id`} exact>
            <CompetitionCalendar
              getCalendarData={getCompetitionCalendar}
              getCompetitionInfo={getCompetitionInfo}
            />
          </Route>*/}
            <Route path={`${to.TEAMS}/:id`} exact>
              <TeamCalendar getCalendarData={getTeamCalendar} getTeamInfo={getTeamInfo} />
            </Route>
            <Route path={`${to.COMPETITIONS}/:id/season/:seasonId/month/:monthId`}>
              <CompetitionCalendar
                handleChangeSeason={handleChangeSeason}
                calendarData={calendarData}
                competitionInfo={competitionInfo}
              />
            </Route>
            <Route path={`${to.COMPETITIONS}/:id/period/:dateFromId/:dateToId`}>
              <CompetitionCalendar
                handleSetDatePeriod={handleSetDatePeriod}
                calendarData={calendarData}
                competitionInfo={competitionInfo}
              />
            </Route>
            <Route path={to.ANY_ROUTE}>
              <PageNotFound />
            </Route>
          </Switch>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
