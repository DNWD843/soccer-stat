import * as PATH_TO from './endpoints';
import { API_URL, API_KEY } from '../configs';

/**
 * @module NewsApi
 * @description Модуль взаимодействия с новостным сервером.
 * @since v.1.1.0
 */

/**
 * @method getCompetitionsData
 * @description Метод получения данных о доступных турнирах
 * @returns {JSON} массив с данными турниров
 * @since v.1.0.0
 */
export const getCompetitionsData = () => {
  return fetch(`${API_URL}${PATH_TO.COMPETITIONS}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getTeamsData
 * @description Метод получения данных о доступных командах
 * @returns {JSON} массив с данными команд
 * @since v.1.0.0
 */
export const getTeamsData = () => {
  return fetch(`${API_URL}${PATH_TO.TEAMS}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getCompetitionCalendarBySeason
 * @description Метод получения данных о матчах турнира по сезону
 * @param {Number} competitionId - id турнира
 * @param {Number} seasonStartDate - дата начала сезона
 * @returns {JSON} массив с данными о матчах турнира в выбранном сезоне
 * @since v.1.0.0
 */
export const getCompetitionCalendarBySeason = (competitionId, seasonStartDate) => {
  return fetch(
    `${API_URL}${PATH_TO.COMPETITIONS}/${competitionId}${PATH_TO.MATCHES}?season=${seasonStartDate}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': `${API_KEY}`,
      },
    },
  ).then((res) => {
    if (!res.status.toString().startsWith('5') || !(res.status === 429)) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getTeamCalendar
 * @description Метод получения данных о матчах команды
 * @param {Number} teamId - id команды
 * @returns {JSON} массив с данными о матчах команды
 * @since v.1.0.0
 */
export const getTeamCalendar = (teamId) => {
  return fetch(`${API_URL}${PATH_TO.TEAMS}/${teamId}${PATH_TO.MATCHES}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getTeamCalendarByDatePeriod
 * @description Метод получения данных о матчах команды за определенный период
 * @param {Number} teamId - id команды
 * @param {String} dateFrom - дата начала периода
 * @param {String} dateTo - дата окончания периода
 * @returns {JSON} массив с данными о матчах команды за заданный период
 * @since v.1.0.0
 */
export const getTeamCalendarByDatePeriod = (teamId, dateFrom, dateTo) => {
  return fetch(
    `${API_URL}${PATH_TO.TEAMS}/${teamId}${PATH_TO.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': `${API_KEY}`,
      },
    },
  ).then((res) => {
    if (!res.status.toString().startsWith('5') || !(res.status === 429)) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getCompetitionCalendarByPeriod
 * @description Метод получения данных о матчах турнира за определенный период
 * @param {Number} competitionId - id турнира
 * @param {String} dateFrom - дата начала периода
 * @param {String} dateTo - дата окончания периода
 * @returns {JSON} массив с данными о матчах турнира за заданный период
 * @since v.1.0.0
 */
export const getCompetitionCalendarByPeriod = (competitionId, dateFrom, dateTo) => {
  return fetch(
    `${API_URL}${PATH_TO.COMPETITIONS}/${competitionId}${PATH_TO.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': `${API_KEY}`,
      },
    },
  ).then((res) => {
    if (!res.status.toString().startsWith('5') || !(res.status === 429)) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getTeamInfo
 * @description Метод получения информации о команде
 * @param {Number} teamId - id команды
 * @returns {JSON} данные о команде
 * @since v.1.0.0
 */
export const getTeamInfo = (teamId) => {
  return fetch(`${API_URL}${PATH_TO.TEAMS}/${teamId}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};

/**
 * @method getCompetitionInfo
 * @description Методп олучения информации о турнире
 * @param {Number} competitionId - id турнира
 * @returns {JSON} информация о турнире
 * @since v.1.0.0
 */
export const getCompetitionInfo = (competitionId) => {
  return fetch(`${API_URL}${PATH_TO.COMPETITIONS}/${competitionId}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (!res.status.toString().startsWith('5') || !(res.status === 429)) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status} ${res.statusText}`);
  });
};
