import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LeaguesList from '../LeaguesList/LeaguesList';
import { competitionsList } from '../../mocks/competitionsList';
import './App.css';

function App() {
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
