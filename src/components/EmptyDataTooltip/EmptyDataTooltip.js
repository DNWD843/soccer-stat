import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { forInfoTooltip as config } from '../../configs/configForComponents';

/**
 * @module EmptyDataTooltip
 * @description Всплывающая подсказка об отсутсвии данных о матчах.
 * @param {Boolean} isEmptyDataTooltipOpened - стейт состояния подсказки об отсутсвии данных
 *  о матчах в заданном диапазоне дат
 * @param {Boolean} hasNoMatchesTooltipOpened - стейт состояния подсказки об отсутствии данных
 *  о матчах в выбранных турнире или команде
 * @param {Function} onOverlayClick - колбэк, обработчик клика по оверлею
 * @param {Function} onClose - колбэк, обработчик клика по иконке закрытия подсказки
 * @returns {JSX}
 * @since v.1.0.0
 */
function EmptyDataTooltip({
  isEmptyDataTooltipOpened,
  hasNoMatchesTooltipOpened,
  onOverlayClick,
  onClose,
}) {
  const {
    EMPTY_DATA_TITLE,
    EMPTY_DATA_SUBTITLE,
    NO_MATCHES_PLANED_TITLE,
    NO_MATCHES_PLANED_SUBTITLE,
  } = config;
  return (
    <InfoTooltip
      isOpened={isEmptyDataTooltipOpened || hasNoMatchesTooltipOpened}
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      errorTitle={isEmptyDataTooltipOpened ? EMPTY_DATA_TITLE : NO_MATCHES_PLANED_TITLE}
      errorSubtitle={isEmptyDataTooltipOpened ? EMPTY_DATA_SUBTITLE : NO_MATCHES_PLANED_SUBTITLE}
    />
  );
}

export default EmptyDataTooltip;
