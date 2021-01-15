import { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardsList from '../CardsList/CardsList';
import Calendar from '../Calendar/Calendar';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import {
  getCompetitionsData,
  getTeamsData,
  getCompetitionCalendar,
  getTeamCalendar,
} from '../../utils/Api';
import * as to from '../../utils/routesMap';

function App() {
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
            <CardsList cardsList={competitionsList} />
          </Route>
          <Route path={to.TEAMS} exact>
            <CardsList cardsList={teamsList} />
          </Route>
          <Route path={`${to.COMPETITIONS}/:id`}>
            <Calendar getCalendarData={getCompetitionCalendar} />
          </Route>
          <Route path={`${to.TEAMS}/:id`}>
            <Calendar getCalendarData={getTeamCalendar} />
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
