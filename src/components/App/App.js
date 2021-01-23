import { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardsList from '../CardsList/CardsList';
import TeamCalendar from '../TeamCalendar/TeamCalendar';
import CompetitionCalendar from '../CompetitionCalendar/CompetitionCalendar';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import ErrorTooltip from '../ErrorTooltip/ErrorTooltip';
import ServerErrorTooltip from '../ServerErrorTooltip/ServerErrorTooltip';
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
import './App.css';
import EmptyDataTooltip from '../EmptyDataTooltip/EmptyDataTooltip';

function App() {
  const history = useHistory();

  const [competitionsList, setCompetitionsList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [teamCalendarData, setTeamCalendarData] = useState([]);
  const [teamInfo, setTeamInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorTooltipOpened, setIsErrorTooltipOpened] = useState(false);
  const [isServerErrorTooltipOpened, setIsServerErrorTooltipOpened] = useState(false);
  const [isEmptyDataTooltipOpened, setIsEmptyDataTooltipOpened] = useState(false);
  const [hasNoMatchesTooltipOpened, setHasNoMatchesTooltipOpened] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  /**
   * @method
   * @name closeAllPopups
   * @description Публичный метод<br>
   * Стрелочная функция, закрывает все попапы, удаляет слушатель нажатия клавиши Esc
   * @public
   * @since v.1.0.0
   */
  const closeAllPopups = useCallback((callback) => {
    document.removeEventListener('keydown', callback);
    setIsErrorTooltipOpened(false);
    setIsServerErrorTooltipOpened(false);
    setIsEmptyDataTooltipOpened(false);
    setHasNoMatchesTooltipOpened(false);
    setIsMobileMenuOpened(false);
  }, []);

  /**
   * @method handleEscClose
   * @description Обработчик нажатия на клавишу Escape<br>
   * Стрелочная функция, закрывает попап при нажатии клавиши Esc
   * @param {Event} evt - событие
   * @public
   * @since v.1.0.0
   */
  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups(handleEscClose);
      }
    },
    [closeAllPopups],
  );

  /**
   * @method handleClickOnOverlay
   * @description Обработчик клика по оверлею<br>
   * Стрелочная функция, закрывает попап при клике по оверлею
   * @param {Event} evt - событие
   * @public
   * @since v.1.0.0
   */
  const handleClickOnOverlay = useCallback(
    (evt) => {
      /**
       * Проверка истинности условия - клик по оверлею <br>
       * Примечание: этот метод используется как обработчик в слушателе клика на оверлее попапа<br>
       * Поэтому в данном случае условие проверяет совпадение клика именно на оверлее попапа
       * @ignore
       */
      if (evt.target === evt.currentTarget) {
        closeAllPopups(handleEscClose);
      }
    },
    [closeAllPopups, handleEscClose],
  );

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
        setIsServerErrorTooltipOpened(true);
        document.addEventListener('keydown', handleEscClose);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [handleEscClose]);

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

  const getCompetitionDataBySeasonId = useCallback(
    (id, seasonId) => {
      Promise.all([getCompetitionCalendarBySeason(id, seasonId), getCompetitionInfo(id)])
        .then(([data, info]) => {
          if (!data.matches) {
            setIsErrorTooltipOpened(true);
            document.addEventListener('keydown', handleEscClose);
            setCalendarData({});
          } else {
            const matchesSortedByMonths = data.matches.reduce((acc, match) => {
              const matchDate = new Date(match.utcDate).getMonth();
              if (!acc[matchDate]) {
                acc[matchDate] = [match];
              } else {
                acc[matchDate].push(match);
              }
              return acc;
            }, {});
            setCalendarData(matchesSortedByMonths);
            setCompetitionInfo(info);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsServerErrorTooltipOpened(true);
          document.addEventListener('keydown', handleEscClose);
        });
    },
    [handleEscClose],
  );

  const getCompetitionDataByDatePeriod = useCallback(
    (id, dateFromId, dateToId) => {
      Promise.all([
        getCompetitionCalendarByPeriod(id, dateFromId, dateToId),
        getCompetitionInfo(id),
      ])
        .then(([data, info]) => {
          if (!data.matches) {
            setIsErrorTooltipOpened(true);
            document.addEventListener('keydown', handleEscClose);
            setCalendarData({});
          } else if (data.matches.length === 0) {
            document.addEventListener('keydown', handleEscClose);
            setIsEmptyDataTooltipOpened(true);
          } else {
            setCalendarData(data);
            setCompetitionInfo(info);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsServerErrorTooltipOpened(true);
          document.addEventListener('keydown', handleEscClose);
        });
    },
    [handleEscClose],
  );

  const getTeamData = useCallback(
    (id) => {
      Promise.all([getTeamCalendar(id), getTeamInfo(id)])
        .then(([data, info]) => {
          setTeamInfo(info);
          if (data.matches.length === 0) {
            document.addEventListener('keydown', handleEscClose);
            setCalendarData(data.matches);
            setHasNoMatchesTooltipOpened(true);
          } else {
            setTeamCalendarData(data.matches);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsServerErrorTooltipOpened(true);
          document.addEventListener('keydown', handleEscClose);
        });
    },
    [handleEscClose],
  );

  const getTeamDataByDatePeriod = useCallback(
    (id, dateFromId, dateToId) => {
      Promise.all([getTeamCalendarByDatePeriod(id, dateFromId, dateToId), getTeamInfo(id)])
        .then(([data, info]) => {
          if (!data.matches) {
            setIsErrorTooltipOpened(true);
            document.addEventListener('keydown', handleEscClose);
            setCalendarData({});
          } else if (data.matches.length === 0) {
            document.addEventListener('keydown', handleEscClose);
            setIsEmptyDataTooltipOpened(true);
          } else {
            setTeamCalendarData(data.matches);
            setTeamInfo(info);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsServerErrorTooltipOpened(true);
          document.addEventListener('keydown', handleEscClose);
        });
    },
    [handleEscClose],
  );

  const handleSubmitSearchFormOnCompetitionsList = useCallback(
    (obtainedCard) => {
      if (!obtainedCard) {
        setIsErrorTooltipOpened(true);
        document.addEventListener('keydown', handleEscClose);
      } else {
        history.push(
          `${history.location.pathname}/${obtainedCard.id}${to.SEASON}/${obtainedCard.currentSeason}${to.MONTH}/${obtainedCard.currentSeasonMonth}`,
        );
      }
    },
    [history, setIsErrorTooltipOpened, handleEscClose],
  );

  const handleSubmitSearchFormOnTeamsList = useCallback(
    (obtainedCard) => {
      if (!obtainedCard) {
        setIsErrorTooltipOpened(true);
        document.addEventListener('keydown', handleEscClose);
      } else {
        history.push(`${history.location.pathname}/${obtainedCard.id}`);
      }
    },
    [history, setIsErrorTooltipOpened, handleEscClose],
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

  const handleClickOnMenuButton = useCallback(() => {
    if (isMobileMenuOpened) {
      closeAllPopups(handleEscClose);
    } else {
      document.addEventListener('keydown', handleEscClose);
      setIsMobileMenuOpened(true);
    }
  }, [closeAllPopups, handleEscClose, isMobileMenuOpened]);

  useEffect(() => {
    getFullData();
  }, [getFullData]);

  return (
    <>
      <Header
        onMenuButtonClick={handleClickOnMenuButton}
        isMobileMenuOpened={isMobileMenuOpened}
        onOverlayClick={handleClickOnOverlay}
      />

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
                handleSubmitSetDatePeriodForm={handleSubmitSetDatePeriodForm}
              />
            )}
          </Route>
          <Route path={`${to.TEAMS}/:id${to.PERIOD}/:dateFromId/:dateToId`}>
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

      <ErrorTooltip
        isOpened={isErrorTooltipOpened}
        onOverlayClick={handleClickOnOverlay}
        onClose={closeAllPopups}
      />

      <ServerErrorTooltip
        isOpened={isServerErrorTooltipOpened}
        onOverlayClick={handleClickOnOverlay}
        onClose={closeAllPopups}
      />

      <EmptyDataTooltip
        isEmptyDataTooltipOpened={isEmptyDataTooltipOpened}
        hasNoMatchesTooltipOpened={hasNoMatchesTooltipOpened}
        onOverlayClick={handleClickOnOverlay}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
