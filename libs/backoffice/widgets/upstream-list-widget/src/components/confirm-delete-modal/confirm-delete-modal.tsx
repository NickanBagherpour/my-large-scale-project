import React from 'react';

import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { updateMessageAction, useAppDispatch } from '../../context';
import { useDeleteUpstream, useGetUpstreamServicesQuery } from '../../services';

import * as S from './confirm-delete-modal.style';

type Props = {
  openModal: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  upstreamName: Nullable<string>;
};
const ConfirmDeleteModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, upstreamName } = props;
  const [t] = useTr();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useDeleteUpstream();
  const { data: services, isFetching } = useGetUpstreamServicesQuery(upstreamName);
  const handleDeleteUpstream = async (params) => {
    await mutate(params, {
      onSuccess: () => {
        setOpenModal(false);
        updateMessageAction(dispatch, {
          description: t('delete_upstream_success'),
          type: 'success',
          shouldTranslate: false,
        });
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
      okButtonProps={{ style: { backgroundColor: theme.error.main }, disabled: isFetching || services?.length >= 1 }}
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
            <S.ServiceList>
              {services?.length > 0 && services.map((service) => <li key={service}>{service}</li>)}
            </S.ServiceList>
          </S.ServicesContainer>
        </S.ModalContent>
      )}
    </S.StyledModal>
  );
};
export default ConfirmDeleteModal;
