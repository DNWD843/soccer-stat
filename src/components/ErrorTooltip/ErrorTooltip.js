import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { forInfoTooltip as config } from '../../configs/configForComponents';

/**
 * @module ErrorTooltip
 * @description Всплывающая подсказка об ошибке поиска или сервера.
 * @param {Boolean} isErrorTooltipOpened - стейт состояния подсказки об ошибке поиска
 * @param {Boolean} isServerErrorTooltipOpened - стейт состояния подсказки об ошибке сервера
 * @param {Function} onOverlayClick - колбэк, обработчик клика по оверлею
 * @param {Function} onClose - колбэк, обработчик клика по иконке закрытия подсказки
 * @returns {JSX}
 * @since v.1.0.0
 */
function ErrorTooltip({
  isErrorTooltipOpened,
  isServerErrorTooltipOpened,
  onOverlayClick,
  onClose,
}) {
  const { ERROR_TITLE, ERROR_SUBTITLE, SERVER_ERROR_TITLE, SERVER_ERROR_SUBTITLE } = config;
  return (
    <InfoTooltip
      isOpened={isErrorTooltipOpened || isServerErrorTooltipOpened}
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      errorTitle={isErrorTooltipOpened ? ERROR_TITLE : SERVER_ERROR_TITLE}
      errorSubtitle={isErrorTooltipOpened ? ERROR_SUBTITLE : SERVER_ERROR_SUBTITLE}
    />
  );
}

export default ErrorTooltip;
