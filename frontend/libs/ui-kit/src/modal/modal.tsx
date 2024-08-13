import React from 'react';

import * as S from './modal.style';

export interface IModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = (props) => {
  const { open, onClose, children } = props;
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };

  if (!open) return <></>;
  return (
    <S.OverLay onClick={handleClose}>
      <S.ModalWrapper>{children}</S.ModalWrapper>
    </S.OverLay>
  );
};
export default Modal;
