import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { forInfoTooltip as config } from '../../configs/configForComponents';

function ServerErrorTooltip({ isOpened, onOverlayClick, onClose }) {
  const { SERVER_ERROR_TITLE, SERVER_ERROR_SUBTITLE } = config;
  return (
    <InfoTooltip
      isOpened={isOpened}
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      errorTitle={SERVER_ERROR_TITLE}
      errorSubtitle={SERVER_ERROR_SUBTITLE}
    />
  );
}

export default ServerErrorTooltip;
