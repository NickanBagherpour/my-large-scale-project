import { useMemo, useState } from 'react';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
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
import { INITIAL_DRAFTS_PAGE_SIZE } from '../../utils/consts';

import * as S from './app.style';

const DRAFT_LIST_LIMIT = 4;
const App = () => {
  const theme = useAppTheme();
  const { message, searchTerm, status, sort, table, ...fetchState } = useAppState();
  const [pageSize, setPageSize] = useState(INITIAL_DRAFTS_PAGE_SIZE);
  const prepareParams = () => {
    return {
      isActive: status,
      // 'search-field': searchTerm ? searchTerm : null,
      page: table.pagination.page - 1,
      ...(searchTerm && { 'search-field': searchTerm }),
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };
  const { data: services, isFetching: isClientsFetching } = useGetServicesQuery(prepareParams());
  const { data: drafts, isFetching: isFetchingDrafts } = useGetDraftsQuery({
    page: 0,
    size: pageSize,
    sort: 'createDate,DESC',
    isActive: null,
    searchParam: '',
  });
  const getAllDrafts = () => {
    const totalElements = drafts?.totalElements;
    if (totalElements) {
      setPageSize(totalElements);
    }
    setShowLoadMore(false);
  };
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const hasDrafts = !!drafts?.content.length;
  const clientsSubTitle = services?.totalElements ? `(${services?.totalElements ?? 0})` : '';
  const draftsSubTitle = drafts?.content.length ? `(${drafts?.content.length ?? 0})` : '';
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

  const visibleDrafts = useMemo(
    () => (showLoadMore ? drafts?.content.slice(0, DRAFT_LIST_LIMIT) : drafts?.content),
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

      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {visibleDrafts?.map((item) => (
              <DraftCard
                id={item?.serviceInfoId}
                level={item?.serviceProgress?.step}
                key={item?.serviceInfoId}
                name={item?.serviceName}
                progressPercentage={item?.serviceProgress?.percent}
              />
            ))}
          </S.Grid>

          {/* {console.log(draftList, 'draftList')} */}

          {(showLoadMore || isFetchingDrafts) && drafts?.totalElements > DRAFT_LIST_LIMIT && (
            <S.Button loading={isFetchingDrafts} variant='link' color='primary' onClick={getAllDrafts}>
              <span>{t('button.show_all')}</span>
              <i className='icon-chev-down' />
            </S.Button>
          )}
          {!showLoadMore && !isFetchingDrafts && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(true)}>
              <span>{t('button.show_less')}</span>
              <i className='icon-arrow-up' />
            </S.Button>
          )}
        </S.DraftsContainer>
      )}

      <S.ServicesContainer title={t('widget_name')} subtitle={clientsSubTitle} fillContainer={!hasDrafts}>
        <Filters />
        <Services
          isFetching={isFetchingDrafts}
          data={services?.content}
          total={services?.totalElements}
          searchTerm={searchTerm}
          isLoading={isFetchingDrafts}
          wordToHighlight={searchTerm ?? ''}
          changeStatus={(status, name) => changeStatusHandler(status, name)}
          deleteService={(name, status) => deleteHandler(name, status)}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
