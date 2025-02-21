'use client';

import { Modal, App } from 'antd';
import { useConfig } from '../use-config/use-config';

import { Direction } from '@oxygen/types';
import { App as AntApp } from 'antd';
import { type ReactNode } from 'react';
import { type NotificationInstance } from 'antd/es/notification/interface';
import { type MessageInstance } from 'antd/es/message/interface';

type CustomModalFunctions = Omit<ReturnType<typeof Modal>, 'warn'> & {
  confirm: typeof Modal.confirm;
  info: typeof Modal.info;
  error: typeof Modal.error;
  warning: typeof Modal.warning;
  success: typeof Modal.success;
};

interface IUseApp {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: CustomModalFunctions;
}

const useApp = (): IUseApp => {
  const [modalInstance, contextHolder] = Modal.useModal();
  const { message, notification } = AntApp.useApp();

  return {
    message,
    notification,
    modal: {
      ...modalInstance,
      ...contextHolder,
      confirm: Modal.confirm,
      success: Modal.success,
      info: Modal.info,
      error: Modal.error,
      warning: Modal.warning,
    },
  };
};

export function NotificationProvider(props: { children: ReactNode }) {
  const { children } = props;
  const { config } = useConfig();

  return (
    <App
      notification={{
        placement: config.direction === Direction.RTL ? 'topLeft' : 'topRight',
        top: 85,
        duration: 5,
        showProgress: true,
        rtl: config.direction === Direction.RTL,
      }}
      message={{
        top: 90,
        duration: 3,
        rtl: config.direction === Direction.RTL,
      }}
    >
      {children}
    </App>
  );
}

export default useApp;
