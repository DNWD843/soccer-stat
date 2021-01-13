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
export const getCompetitions = () => {
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
