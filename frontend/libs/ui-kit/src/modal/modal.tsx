import React from 'react';

import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';

import * as S from './modal.style';

export type ModalProps = AntModalProps & {
  //
  headerDivider?: boolean;
};

export const Modal = (props: ModalProps) => {
  const { children, headerDivider = true, ...rest } = props;

  return (
    <S.StyledModal headerDivider={headerDivider} {...rest}>
      {children}
    </S.StyledModal>
  );
};
