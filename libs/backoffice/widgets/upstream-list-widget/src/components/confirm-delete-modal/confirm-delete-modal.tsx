import React from 'react';
import { Tooltip } from 'antd';

import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { GetUpstreamServiceResponseType } from '../../types';
import { useDeleteUpstream } from '../../services';

import * as S from './confirm-delete-modal.style';

type Props = {
  openModal: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  services: GetUpstreamServiceResponseType;
  upstreamName: Nullable<string>;
  isFetching: boolean;
};
const ConfirmDeleteModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, services, upstreamName, isFetching } = props;
  const [t] = useTr();
  const theme = useAppTheme();

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
      okButtonProps={{ style: { backgroundColor: theme.error.main }, disabled: isFetching }}
      cancelButtonProps={{ style: { color: theme.primary.main } }}
    >
      {isFetching ? (
        <Loading spinning={isFetching} style={{ margin: '2rem 0' }} />
      ) : (
        <S.ModalContent>
          {services?.length > 0 ? (
            <S.ModalMessage>
              {t('confirm_question_first')}
              <S.ServiceCount>{` ${services?.length} ${t('service')}`}</S.ServiceCount>
              {t('confirm_question_last')}
            </S.ModalMessage>
          ) : (
            <S.ModalMessage>{t('no_service_question')}</S.ModalMessage>
          )}
          <S.ServicesContainer>
            {services?.length > 0 &&
              services.map((service, index) => (
                <Tooltip title={service}>
                  <span key={index}>{service}</span>
                </Tooltip>
              ))}
          </S.ServicesContainer>
        </S.ModalContent>
      )}
    </S.StyledModal>
  );
};
export default ConfirmDeleteModal;
