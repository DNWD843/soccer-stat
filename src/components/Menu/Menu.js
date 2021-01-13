import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import * as to from '../../utils/routesMap';
import pathToMainIcon from '../../images/logout-icon-white.svg';
import pathToSavedNewsIcon from '../../images/logout-icon-black.svg';
import { forMenu as config } from '../../configs/configForComponents';

import PropTypes from 'prop-types';
import './Menu.css';

/**
 * @module Menu
 * @description Функциональный компонент<br>
 * Меню, блок содержит меню навигации по сайту и кнопку входа/выхода в приложение.<br>
 * @property {Boolean} isLoggedIn - стейт состяния пользователя: авторизован/не авторизован
 * @property {Function} onLogOutClick - колбэк, переводит состояние пользователя в "не авторизован"
 * @property {Function} onLogInClick - колбэк, вызывается при клике по кнопке "Авторизоваться"
 * @property {Boolean} isMobile -стейт состояния меню - мобильное (на мобильном разрешении)
 * @property {Boolean} isMobileMenuOpened - стейт открытого состояния мобильного меню
 * @returns {JSX}
 * @since v.1.0.0
 */
function Menu({ isLoggedIn, onLogOutClick, onLogInClick, isMobile, isMobileMenuOpened }) {
  const { BUTTON_IMAGE_ALT, AUTHORIZATION_TITLE } = config;

  const menuClassName = classNames('menu', {
    menu_mobile: isMobile,
    menu_desktop: !isMobile,
    menu_opened: isMobileMenuOpened,
  });

  const authButtonClassName = classNames('menu__button', {
    menu__button_mobile: isMobile,
  });

  return (
    <div className={menuClassName}>
      <Navigation isMobile={isMobile} />

      <button onClick={onLogOutClick} type="button" className={authButtonClassName}>
        <span className="menu__button-title">menu</span>
      </button>
    </div>
  );
}

Menu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogOutClick: PropTypes.func.isRequired,
  onLogInClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
};

export default Menu;
