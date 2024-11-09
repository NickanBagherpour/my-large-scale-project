import styled, { css } from 'styled-components';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const NotificationWrapper = styled.div<{ type: NotificationType }>`
  ${({ type }) => {
    switch (type) {
      case 'success':
        return css`
          background-color: #22c55e;
          color: #ffffff;
        `;
      case 'info':
        return css`
          background-color: #2563eb;
          color: #ffffff;
        `;
      case 'warning':
        return css`
          background-color: #f59e0b;
          color: #000000;
        `;
      case 'error':
        return css`
          background-color: #ef4444;
          color: #ffffff;
        `;
      default:
        return css`
          background-color: #ffffff;
          color: #000000;
        `;
    }
  }}
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export default NotificationWrapper;
