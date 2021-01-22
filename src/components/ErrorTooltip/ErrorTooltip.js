import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { forInfoTooltip as config } from '../../configs/configForComponents';

function ErrorTooltip({ isOpened, onOverlayClick, onClose }) {
  const { ERROR_TITLE, ERROR_SUBTITLE } = config;
  return (
    <InfoTooltip
      isOpened={isOpened}
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      errorTitle={ERROR_TITLE}
      errorSubtitle={ERROR_SUBTITLE}
    />
  );
}

export default ErrorTooltip;
