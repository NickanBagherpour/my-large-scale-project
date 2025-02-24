import React from 'react';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { getWidgetTitle } from '@oxygen/utils';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import Filters from '../filters/filters';
import ClientReport from '../client-report/client-report';

import { useGetClientReportQuery } from '../../services';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const { message, searchTerm, table, ...fetchState } = useAppState();

  const prepareServiceParams = () => {
    return {
      page: table.pagination.page - 1,
      searchParam: searchTerm,
      size: table.pagination.rowsPerPage,
      // sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };

  const { data: clientReport, isFetching: isClientReportListFetching } = useGetClientReportQuery(
    prepareServiceParams()
  );

  const title = getWidgetTitle({
    defaultTitle: t('widget_name_client_detail'),
  });

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />

      <S.ClientReportContainer title={title}>
        <Filters />
        <ClientReport
          isFetching={isClientReportListFetching}
          data={clientReport?.content}
          total={clientReport?.totalElements}
          searchTerm={searchTerm}
          isLoading={isClientReportListFetching}
          wordToHighlight={searchTerm ?? ''}
        />
      </S.ClientReportContainer>
    </>
  );
};

export default App;
