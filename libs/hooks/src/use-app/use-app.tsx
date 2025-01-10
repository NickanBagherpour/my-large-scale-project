'use client';

import { message, Modal, notification, App } from 'antd';
import { useConfig } from '../use-config/use-config';

import { Direction } from '@oxygen/types';

type CustomModalFunctions = Omit<ReturnType<typeof Modal>, 'warn'> & {
  confirm: typeof Modal.confirm;
  info: typeof Modal.info;
  error: typeof Modal.error;
  warning: typeof Modal.warning;
  success: typeof Modal.success;
};

interface IUseApp {
  message: typeof message;
  notification: typeof notification;
  modal: CustomModalFunctions;
}

const useApp = (): IUseApp => {
  const [modalInstance, contextHolder] = Modal.useModal();
  const { config } = useConfig();

  notification.config({
    placement: config.direction === Direction.RTL ? 'topLeft' : 'topRight',
    top: 85,
    duration: 5,
    showProgress: true,
    rtl: config.direction === Direction.RTL,
  });

  message.config({
    top: 90,
    duration: 3,
    rtl: config.direction === Direction.RTL,
  });

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

export default useApp;
