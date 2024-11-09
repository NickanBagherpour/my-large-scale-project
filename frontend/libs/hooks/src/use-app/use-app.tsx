'use client';

import { message, Modal, notification } from 'antd';
import { useConfig } from '../use-config/use-config';

import { Direction } from '@oxygen/types';
// import { Notification } from '@oxygen/ui-kit';

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
    placement: config.direction === Direction.RTL ? 'topRight' : 'topLeft',
    top: 85,
    duration: 30000,
    rtl: config.direction === Direction.RTL,
  });

  message.config({
    top: 90,
    duration: 3,
    rtl: config.direction === Direction.RTL,
  });

  // const notify = (type: NotificationType, title: string, description: string) => {
  //   const NotificationContent = (
  //     <Notification type={type} title={title} message={description} />
  //   );

  //   notification.open({
  //     message: null,
  //     description: NotificationContent,
  //     duration: 30000,
  //   });
  // };

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
