import React from 'react';

import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { Button, Loading } from '@oxygen/ui-kit';
import { ReturnButton } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';

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
  const { data, isFetching } = useGetUpstreamServicesQuery(upstreamName);
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
  const services = data ?? [];
  const handleOk = () => {
    handleDeleteUpstream(upstreamName);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const modalFooter =
    services?.length > 0
      ? [<ReturnButton style={{ minWidth: '100%' }} onClick={() => setOpenModal(false)} />]
      : [
          <Button variant={'outlined'} color={'primary'} onClick={handleCancel}>
            {t('button.cancel')}
          </Button>,
          <Button variant={'solid'} color={'error'} disabled={isFetching || services?.length >= 1} onClick={handleOk}>
            {t('button.delete')}
          </Button>,
        ];
  const servicesCount = ` ${services?.length} ${t('service')}`;
  const upstreamNoServiceDeleteMessage = t('confirm_remove_msg', { name: upstreamName });
  const upstreamWithServiceDeleteMessage = t('confirm_multi_remove_msg', { name: servicesCount });
  return (
    <S.StyledModal
      title={t('notice')}
      open={openModal}
      confirmLoading={isPending}
      headerDivider={true}
      centered
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={modalFooter}
    >
      {isFetching ? (
        <Loading spinning={isFetching} style={{ margin: '2rem 0' }} />
      ) : (
        <S.ModalContent>
          {services?.length > 0 ? (
            <S.MarkText
              wordToHighlight={servicesCount}
              highlightColor={theme.error.main}
              text={upstreamWithServiceDeleteMessage}
            />
          ) : (
            <S.MarkText
              wordToHighlight={upstreamName}
              highlightColor={theme.error.main}
              text={upstreamNoServiceDeleteMessage}
            />
          )}
          <S.ServicesContainer>
            <S.ServiceList>
              {services?.length > 0 &&
                services.map((service) => (
                  <S.ListItem key={service}>
                    <span>{service}</span>
                    <Button
                      variant={'text'}
                      href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${service}`}
                      target={'_blank'}
                    >
                      <i className={'icon-link'} />
                      {t('view_service_details')}
                    </Button>
                  </S.ListItem>
                ))}
            </S.ServiceList>
          </S.ServicesContainer>
        </S.ModalContent>
      )}
    </S.StyledModal>
  );
};
export default ConfirmDeleteModal;
