import * as PATH_TO from './endpoints';
import { API_URL, API_KEY } from '../configs';

/**
 * @module NewsApi
 * @description Модуль взаимодействия с новостным сервером.
 * @since v.1.1.0
 */

/**
 * @method getArticlesFromNewsApi
 * @description Метод получения статей по ключевому слову (запросу) от новостного сервера.
 * По ключевому слову ищет статьи на новостном сервере, возвращает:
 * -  массив с данными новостей,
 * - пустой массив, если статьи не найдены,
 * - ошибку, если запрос завершился неудачей
 * @returns {Array} массив с данными найденных новостей
 * @since v.1.1.0
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
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};

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
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};

export const getCompetitionCalendar = (competitionId, seasonStartDate) => {
  return fetch(
    `${API_URL}${PATH_TO.COMPETITIONS}/${competitionId}${PATH_TO.MATCHES}?season=${seasonStartDate}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': `${API_KEY}`,
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};

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
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};

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
    return Promise.reject(`Статус ответа: ${res.errorCode}${res.message}`);
  });
};

export const getCompetitionInfo = (competitionId) => {
  return fetch(`${API_URL}${PATH_TO.COMPETITIONS}/${competitionId}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': `${API_KEY}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.errorCode}${res.message}`);
  });
};
