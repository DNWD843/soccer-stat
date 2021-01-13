import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LeaguesList from '../LeaguesList/LeaguesList';
//import { competitionsList } from '../../mocks/competitionsList';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { getCompetitions } from '../../utils/Api';

function App() {
  const [competitionsList, setCompetitionsList] = useState([]);
  const getCompetitionsData = useCallback(() => {
    getCompetitions()
      .then((res) => {
        const competitionsFilteredArray = res.competitions.filter(
          (competition) =>
            competition.plan === 'TIER_ONE' && competition.id !== 2013 && competition.id !== 2000,
        );
        setCompetitionsList(competitionsFilteredArray);
        console.log(competitionsFilteredArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCompetitionsData();
  }, [getCompetitionsData]);
  return (
    <>
      <Header />
      <main className="content">
        <LeaguesList competitionsList={competitionsList} />
      </main>

      <Footer />
    </>
  );
}

export default App;
