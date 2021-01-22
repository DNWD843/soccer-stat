import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { forInfoTooltip as config } from '../../configs/configForComponents';

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
