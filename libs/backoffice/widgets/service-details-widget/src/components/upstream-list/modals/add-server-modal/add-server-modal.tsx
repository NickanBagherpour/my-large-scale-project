import { Button, Modal } from '@oxygen/ui-kit';
import * as S from './add-server-modal.style';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
export type AddServerModalPropsType = {
  isOpen: boolean;
  toggle: () => void;
};
export const AddServerModal: React.FC<AddServerModalPropsType> = (props) => {
  const { isOpen, toggle } = props;

  const [t] = useTr();

  return (
    <Modal
      centered
      title={t('remove_service')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <Button onClick={toggle} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
      ]}
    >
      <S.ModalContainer>alireza</S.ModalContainer>
    </Modal>
  );
};
