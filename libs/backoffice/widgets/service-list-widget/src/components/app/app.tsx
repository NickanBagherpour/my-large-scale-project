import { useTheme } from 'styled-components';
import { useState } from 'react';
import { Modal } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useQueryClient } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';
import { useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';

import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { ParamsType, ServiceTypeQuery } from '../../types';
import * as S from './app.style';

const App = () => {
  const theme = useTheme();
  const { message, ...fetchState } = useAppState();

  const { data: services, isFetching: isClientsFetching } = useGetServicesQuery(fetchState);
  const { data: drafts } = useGetDraftsQuery();

  const [t] = useTr();
  const hasDrafts = !!drafts?.length;
  const clientsSubTitle = services?.list?.length ? `(${services?.list?.length ?? 0})` : '';
  const draftsSubTitle = drafts?.length ? `(${drafts?.length ?? 0})` : '';
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

      {openDeleteModal && (
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
      )}
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {drafts?.map((item) => (
              <DraftCard key={item.id} {...item} />
            ))}
          </S.Grid>
        </S.DraftsContainer>
      )}

      <S.ServicesContainer title={t('widget_name')} subtitle={clientsSubTitle} fillContainer={!hasDrafts}>
        <Filters />
        <Services
          isFetching={isClientsFetching}
          data={services?.list}
          total={services?.list?.length}
          searchTerm={fetchState.searchTerm}
          isLoading={isClientsFetching}
          wordToHighlight={fetchState.searchTerm}
          changeStatus={(status, name) => changeStatusHandler(status, name)}
          deleteService={(name, status) => deleteHandler(name, status)}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
