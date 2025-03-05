import { useMemo, useState } from 'react';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Modal } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';

import DraftList from '../drafts/draft-list';
import * as S from './app.style';

const App = () => {
  const { message, searchTerm, status, sort, table, ...fetchState } = useAppState();
  const prepareServiceParams = () => {
    return {
      isActive: status,
      // 'search-field': searchTerm ? searchTerm : null,
      page: table.pagination.page - 1,
      ...(searchTerm && { 'search-field': searchTerm }),
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };
  const { data: services, isFetching: isServiceListFetching } = useGetServicesQuery(prepareServiceParams());
  const offset = (services?.pageable?.offset ?? 0) + 1;
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const servicesSubTitle = services?.totalElements ? `(${services?.totalElements ?? 0})` : '';
  // const [openStatusModal, setOpenStatusModal] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [selectedServiceName, setSelectedServiceName] = useState('');
  // const [operationalStatus, setOperationalStatus] = useState(false);

  // const changeStatusHandler = (status: boolean, name: string) => {
  //   setOpenStatusModal(true);
  //   setSelectedServiceName(name);
  //   setOperationalStatus(status);
  // };

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />
      {/* <Modal
        title={operationalStatus ? t('stop_service') : t('operationalization')}
        open={openStatusModal}
        confirmLoading={confirmLoading}
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
      </Modal> */}

      <DraftList />
      <S.ServicesContainer title={t('widget_name')} subtitle={servicesSubTitle}>
        <Filters />
        <Services
          offset={offset}
          isFetching={isServiceListFetching}
          data={services?.content}
          total={services?.totalElements}
          searchTerm={searchTerm}
          isLoading={isServiceListFetching}
          wordToHighlight={searchTerm ?? ''}
          // changeStatus={(status, name) => changeStatusHandler(status, name)}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
