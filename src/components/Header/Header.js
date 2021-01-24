import Menu from '../Menu/Menu';
import classNames from 'classnames';
import { forHeader as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './Header.css';

/**
 * @module Header
 * @description Хэдер, блок содержит логотип и меню навигации по сайту.<br>
 * @property {Function} onMenuButtonClick - колбэк, открывает скрытое меню на мобильном разрешении
 * @property {Boolean} isMobileMenuOpened - стейт открытого состояния мобильного меню
 * @property {Function} onOverlayClick - колбэк, закрывает попапы при клике по оверлею
 * @returns {JSX}
 * @since v.1.0.0
 */
function Header({ onMenuButtonClick, isMobileMenuOpened, onOverlayClick }) {
  const { HEADER_LOGO_TEXT } = config;

  const headerContainerClassName = classNames('header__container', {
    header__container_mobile: isMobileMenuOpened,
  });

  const headerMobileMenuButtonClassName = classNames('header__menu-button', {
    'header__menu-button_not-pressed': !isMobileMenuOpened,
    'header__menu-button_pressed': isMobileMenuOpened,
  });

  const headerMobileMenuOverlayClassName = classNames('overlay', {
    'header__menu-mobile-overlay': isMobileMenuOpened,
  });

  return (
    <header className="header">
      <div className={headerContainerClassName}>
        <p className="header__logo">{HEADER_LOGO_TEXT}</p>
        <Menu isMobile={false} isMobileMenuOpened={isMobileMenuOpened} />
        <button
          type="button"
          onClick={onMenuButtonClick}
          className={headerMobileMenuButtonClassName}
        />
      </div>
      <div className={headerMobileMenuOverlayClassName} onClick={onOverlayClick}>
        <Menu isMobile={true} isMobileMenuOpened={isMobileMenuOpened} />
      </div>
    </header>
  );
}

Header.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
};

export default Header;
