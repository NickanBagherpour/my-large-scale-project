import { useMemo, useState } from 'react';

import { Modal } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';
import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { ParamsType } from '../../types';

import * as S from './app.style';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

const DRAFT_LIST_LIMIIT = 4;
const App = () => {
  const theme = useAppTheme();
  const { message, searchTerm, status, sort, table, ...fetchState } = useAppState();
  const prepareParams = () => {
    return {
      isActive: status,
      'search-field': searchTerm ? searchTerm : null,
      page: table.pagination.page - 1,
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };
  const { data: services, isFetching: isClientsFetching } = useGetServicesQuery(prepareParams());
  const { data: drafts } = useGetDraftsQuery();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const hasDrafts = !!drafts?.length;
  const clientsSubTitle = services?.totalElements ? `(${services?.totalElements ?? 0})` : '';
  const draftsSubTitle = drafts?.length ? `(${drafts?.length ?? 0})` : '';
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [operationalStatus, setOperationalStatus] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  // const queryClient = useQueryClient();

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
    setOpenStatusModal(false);
  };

  const deleteHandler = (name: string, status: ParamsType) => {
    setOpenDeleteModal(true);
    setSelectedServiceName(name);
  };

  // const handleDeleteOk = (name: string) => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     queryClient.setQueryData([RQKEYS.SERVICES_LIST.GET_LIST, fetchState], (oldData: any) => {
  //       if (!oldData) return;
  //       return {
  //         ...oldData,
  //         list: oldData.list.filter((item) => item.name !== name),
  //       };
  //     });

  //     setOpenDeleteModal(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleDeleteCancel = () => {
  //   setOpenDeleteModal(false);
  // };
  const draftList = useMemo(
    () => (showLoadMore ? drafts?.slice(0, DRAFT_LIST_LIMIIT) : drafts),
    [showLoadMore, drafts]
  );

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />
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

      {/* {openDeleteModal && (
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
      )} */}
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {draftList?.map((item) => (
              <DraftCard
                id={item?.serviceInfoId}
                level={item?.serviceProgress?.step}
                key={item?.serviceInfoId}
                name={item?.serviceName}
                progressPercentage={item?.serviceProgress?.percent}
              />
            ))}
          </S.Grid>
          {showLoadMore && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(false)}>
              <span>{t('show_all')}</span>
              <i className='icon-chev-down' />
            </S.Button>
          )}
          {!showLoadMore && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(true)}>
              <span>{t('show_less')}</span>
              <i className='icon-arrow-up' />
            </S.Button>
          )}
        </S.DraftsContainer>
      )}

      <S.ServicesContainer title={t('widget_name')} subtitle={clientsSubTitle} fillContainer={!hasDrafts}>
        <Filters />
        <Services
          isFetching={isClientsFetching}
          data={services?.content}
          total={services?.totalElements}
          searchTerm={searchTerm}
          isLoading={isClientsFetching}
          wordToHighlight={searchTerm ?? ''}
          changeStatus={(status, name) => changeStatusHandler(status, name)}
          deleteService={(name, status) => deleteHandler(name, status)}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
