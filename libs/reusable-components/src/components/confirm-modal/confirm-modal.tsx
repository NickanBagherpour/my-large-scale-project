import React, {  MouseEventHandler } from 'react';

import { BasicComponentProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, ButtonProps, ModalProps } from '@oxygen/ui-kit';


import * as S from './confirm-modal.style';

type Props = BasicComponentProps &
  ModalProps & {
    title: string;
    onCancel?: MouseEventHandler;
    onConfirm?: MouseEventHandler;
    showConfirm?: boolean;
    showCancel?: boolean;
    confirmBtnProps?: ButtonProps;
    cancelBtnProps?: ButtonProps;
    modalProps?: ModalProps;
    isOpen?: boolean;
    footer?: React.ReactNode;
    okText?: string;
  };
const ConfirmModal: React.FC<Props> = ({
  onCancel,
  onConfirm,
  title,
  isOpen,
  confirmBtnProps,
  cancelBtnProps,
  showConfirm = true,
  showCancel = true,
  okText,
  footer: inputFooter,
  children,
  ...rest
}) => {
  const [t] = useTr();
  const footer: Array<React.ReactNode> = [];
  if (showConfirm || showCancel) {
    if (showCancel) {
      footer.push(
        <Button onClick={onCancel} size='large' color='primary' variant='outlined' {...cancelBtnProps}>
          {cancelBtnProps?.children ?? t('button.cancel')}
        </Button>
      );
    }
    if (showConfirm) {
      footer.push(
        <S.ConfirmButton onClick={onConfirm} size='large' color='primary' {...confirmBtnProps}>
          {confirmBtnProps?.children ?? t(`${okText ? okText : 'button.confirm'}`)}
        </S.ConfirmButton>
      );
    }
  } else if (inputFooter) {
    footer.push(inputFooter);
  }
  return (
    <S.ConfirmModal centered title={title} open={isOpen} onCancel={onCancel} footer={footer} {...rest}>
      {children}
    </S.ConfirmModal>
  );
};
export default ConfirmModal;
