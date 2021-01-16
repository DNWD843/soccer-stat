import { forNavigation as config } from '../../configs/configForComponents';
import { NavLink } from 'react-router-dom';
import { COMPETITIONS, TEAMS } from '../../utils/routesMap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Navigation.css';

/**
 * @module Navigation
 * @description Функциональный компонент<br>
 * Блок навигации по сайту.<br>
 * @property {Boolean} isMobile -стейт состояния меню - мобильное (на мобильном разрешении)
 * @returns {JSX}
 * @since v.1.0.0
 */
function Navigation({ isMobile }) {
  const { COMPETITIONS_LINK_TEXT, TEAMS_LINK_TEXT } = config;

  const navbarClassName = classNames('navbar', {
    navbar_mobile: isMobile,
  });

  const navLinksListClassName = classNames('navbar__links', {
    navbar__links_mobile: isMobile,
  });

  const activeLinkClassName = classNames({
    navbar__link_active: !isMobile,
    '': isMobile,
  });

  const linkToSavedNewsPageClassName = classNames('navbar__link', {
    navbar__link_mobile: isMobile,
    navbar__link_color_grey: !isMobile,
  });

  return (
    <nav className={navbarClassName}>
      <ul className={navLinksListClassName}>
        <li className="navbar__item">
          <NavLink
            to={COMPETITIONS}
            className={linkToSavedNewsPageClassName}
            activeClassName={activeLinkClassName}
          >
            {COMPETITIONS_LINK_TEXT}
          </NavLink>
        </li>
        <li className={navLinksListClassName}>
          <NavLink
            to={TEAMS}
            className={linkToSavedNewsPageClassName}
            activeClassName={activeLinkClassName}
          >
            {TEAMS_LINK_TEXT}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Navigation;
