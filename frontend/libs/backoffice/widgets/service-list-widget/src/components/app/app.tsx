import { useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';
import * as S from './app.style';
import { Loading, Modal } from '@oxygen/ui-kit';
import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { useTheme } from 'styled-components';
import { ParamsType, ServiceType, ServiceTypeQuery } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';

const App = () => {
  const theme = useTheme();
  const { message, ...fetchState } = useAppState();

  const { data: services, isFetching: isClientsFetching } = useGetServicesQuery(fetchState);
  const { data: drafts } = useGetDraftsQuery();

  const [t] = useTr();
  const hasDrafts = !!drafts?.length;
  const clientsSubTitle = services?.total ? `(${services?.total ?? 0})` : '';
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [operationalStatus, setOperationalStatus] = useState(false);

  const queryClient = useQueryClient();

  const changeStatusHandler = (status: boolean, name: string) => {
    setOpenStatusModal(true);
    setSelectedServiceName(name);
    setOperationalStatus(status);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenStatusModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenStatusModal(false);
  };

  const deleteHandler = (name: string, status: ParamsType) => {
    setOpenDeleteModal(true);
    setSelectedServiceName(name);
  };

  const handleDeleteOk = (name: string) => {
    setConfirmLoading(true);
    setTimeout(() => {
      queryClient.setQueryData([RQKEYS.SERVICES_LIST.GET_LIST, fetchState], (oldData: ServiceTypeQuery) => {
        if (!oldData) return;
        return {
          ...oldData,
          list: oldData.list.filter((item) => item.name !== name),
        };
      });

      setOpenDeleteModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDeleteCancel = () => {
    console.log('Clicked cancel button');
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Modal
        title={operationalStatus ? t('stop_service') : t('operationalization')}
        open={openStatusModal}
        onOk={() => handleOk()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        headerDivider={true}
        centered
        cancelText={t('button.cancel')}
        okButtonProps={{ style: { backgroundColor: operationalStatus ? theme.warning.main : theme.secondary.main } }}
        cancelButtonProps={{ style: { color: operationalStatus ? theme.warning.main : theme.secondary.main } }}
      >
        <S.ModalMessage>
          {t('service_question')}
          <S.ServiceName
            text={selectedServiceName}
            highlightColor={operationalStatus ? theme.warning.main : theme.secondary.main}
            wordToHighlight={selectedServiceName}
          />
          {operationalStatus ? t('stop') : t('operational')} {t('done_stopped')}
        </S.ModalMessage>
      </Modal>

      <Modal
        title={t('delete_service')}
        open={openDeleteModal}
        onOk={() => handleDeleteOk(selectedServiceName)}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteCancel}
        headerDivider={true}
        centered
        cancelText={t('button.cancel')}
        okText={t('button.delete')}
        okButtonProps={{ style: { backgroundColor: theme.error.main } }}
        cancelButtonProps={{ style: { color: theme.primary.main } }}
      >
        <S.ModalMessage>
          {t('delete_service_question')}
          <S.ServiceName
            text={selectedServiceName}
            highlightColor={theme.error.main}
            wordToHighlight={selectedServiceName}
          />
          {t('are_you_sure')}
        </S.ModalMessage>
      </Modal>
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} fillContainer={false}>
          <S.Grid>
            {drafts?.map((item) => (
              <DraftCard key={item.id} {...item} />
            ))}
          </S.Grid>
        </S.DraftsContainer>
      )}

      <S.ServicesContainer title={t('widget_name')} subtitle={clientsSubTitle} fillContainer={!hasDrafts}>
        <Filters />
        <Loading spinning={isClientsFetching} size='large'>
          {services?.list.length ? (
            <Services
              isFetching={isClientsFetching}
              data={services.list}
              total={services.total}
              searchTerm={fetchState.searchTerm}
              isLoading={isClientsFetching}
              wordToHighlight={fetchState.searchTerm}
              changeStatus={(status, name) => changeStatusHandler(status, name)}
              deleteService={(name, status) => deleteHandler(name, status)}
            />
          ) : (
            <NoResult isLoading={false} />
          )}
        </Loading>
      </S.ServicesContainer>
    </>
  );
};

export default App;
