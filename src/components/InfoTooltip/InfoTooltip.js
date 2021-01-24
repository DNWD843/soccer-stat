import classNames from 'classnames';
import PropTypes from 'prop-types';
import './InfoTooltip.css';

/**
 * @module InfoTooltip
 * @description Функциональный компонент<br>
 * Всплывающая подсказка об успешной регистрации пользователя.<br>
 * @property {Function} onOverlayClick - колбэк, закрывает подсказку при клике по оверлею
 * @property {Boolean} isOpened - стейт открытого состояния подсказки
 * @property {Function} onClose - колбэк, закрывает попапы при клике по крестику
 * @property {String} errorTitle - заголовок подсказки
 * @property {String} errorSubtitle - текст подсказки
 * @returns {JSX}
 * @since v.1.0.0
 */
function InfoTooltip({ onOverlayClick, isOpened, onClose, errorTitle, errorSubtitle }) {
  const infoTooltipOverlayClassName = classNames('popup-info', 'page__overlay-info', {
    'popup-info_opened': isOpened,
  });

  return (
    <div onClick={onOverlayClick} className={infoTooltipOverlayClassName}>
      <div className="popup-info__container">
        <button type="button" onClick={onClose} className="popup-info__close-button"></button>
        <h2 className="popup-info__tooltip-title">{errorTitle}</h2>
        <p className="popup-info__tooltip-subtitle">{errorSubtitle}</p>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errorTitle: PropTypes.string.isRequired,
  errorSubtitle: PropTypes.string,
};

export default InfoTooltip;
