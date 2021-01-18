import { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardsList from '../CardsList/CardsList';
import TeamCalendar from '../TeamCalendar/TeamCalendar';
import CompetitionCalendar from '../CompetitionCalendar/CompetitionCalendar';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import {
  getCompetitionsData,
  getTeamsData,
  getCompetitionCalendar,
  getTeamCalendar,
  getTeamInfo,
  getCompetitionInfo,
} from '../../utils/Api';
import * as to from '../../utils/routesMap';

function App() {
  const history = useHistory();

  const [competitionsList, setCompetitionsList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);

  const getFullData = useCallback(() => {
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
      });
  }, []);

  const handleClickOnCompetitionCard = useCallback(
    (id) => {
      getCompetitionInfo(id)
        .then((info) => {
          history.push(
            `${history.location.pathname}/${id}/season/${info.currentSeason.startDate.slice(
              0,
              4,
            )}/stage/${info.currentSeason.currentMatchday}`,
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [history],
  );

  const handleClickOnTeamCard = useCallback(
    (id) => {
      getTeamInfo(id)
        .then((teamInfo) => {
          history.push(`${history.location.pathname}/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
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
          <Route path={`${to.COMPETITIONS}/:id/season/:seasonId/stage/:stageId`}>
            <CompetitionCalendar
              getCalendarData={getCompetitionCalendar}
              getCompetitionInfo={getCompetitionInfo}
            />
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
