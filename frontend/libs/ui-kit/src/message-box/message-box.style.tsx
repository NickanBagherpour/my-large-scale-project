import styled from 'styled-components';
import { Alert } from '../alert/alert';

export const StyledContainer = styled(Alert)`
  padding-top: 1rem;
  padding-bottom: 1rem;

  .ant-alert-message {
    margin-bottom: 0;
    font-size: 1.6rem;
  }

  .ant-alert-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ant-alert-description {
    display: flex;
    flex-direction: column;
  }

  .ant-alert-close-icon {
    padding-top: 0.5rem;
  }

  .message-box__link {
    margin-top: 0.5rem;
    display: flex;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(p) => {
      switch (p.type) {
        case 'success':
          return p.theme.success.main;
        case 'error':
          return p.theme.error.main;
        case 'warning':
          return p.theme.warning.main;
        case 'info':
          return p.theme.info.main;
        default:
          return 'inherit';
      }
    }} !important;
  }
`;
