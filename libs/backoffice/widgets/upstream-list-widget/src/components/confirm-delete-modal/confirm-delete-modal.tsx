import React from 'react';

import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';

import { useDeleteUpstream } from '../../services/delete-upstream.api';

import * as S from './confirm-delete-modal.style';

type Props = {
  openModal: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  data: any;
  upstreamName: Nullable<string>;
};
const ConfirmDeleteModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, data, upstreamName } = props;
  const [t] = useTr();
  const theme = useAppTheme();
  const { targets } = data;

  const { mutate, isPending } = useDeleteUpstream();
  const handleDeleteUpstream = async (params) => {
    await mutate(params, {
      onSettled: () => {
        setOpenModal(false);
      },
    });
  };
  const handleOk = () => {
    handleDeleteUpstream(upstreamName);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <S.StyledModal
      title={t('warning')}
      open={openModal}
      onOk={() => handleOk()}
      confirmLoading={isPending}
      onCancel={handleCancel}
      headerDivider={true}
      centered
      cancelText={t('button.cancel')}
      okText={t('button.delete')}
      okButtonProps={{ style: { backgroundColor: theme.error.main } }}
      cancelButtonProps={{ style: { color: theme.primary.main } }}
    >
      <S.ModalContent>
        <S.ModalMessage>
          {t('confirm_question_first')}
          <S.ServiceCount>{` ${targets?.length} ${t('service')}`}</S.ServiceCount>
          {t('confirm_question_last')}
        </S.ModalMessage>
        <S.TargetContainer>
          {targets?.length > 0 && targets.map((target) => <span key={target?.id}>{target?.domain}</span>)}
        </S.TargetContainer>
      </S.ModalContent>
    </S.StyledModal>
  );
};
export default ConfirmDeleteModal;
