// Notification.tsx
import React from 'react';
import * as S from './notification.style';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ type, title, message }) => {
  return (
    <S.NotificationWrapper type={type}>
      <h4>{title}</h4>
      <p>{message}</p>
    </S.NotificationWrapper>
  );
};
