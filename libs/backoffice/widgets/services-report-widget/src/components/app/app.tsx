import React from 'react';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { getValueOrDash, getWidgetTitle } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesReportQuery } from '../../services';
import DataTable from '../data-table/data-table';
import Filters from '../filter/filter';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const {
    searchTerm,
    pagination: { page, rowsPerPage },
    status,
    sort,
    message,
  } = useAppState();

  const { data, isFetching } = useGetServicesReportQuery(prepareParams());

  function prepareParams() {
    return {
      searchTerm: searchTerm,
      status: status,
      page: page,
      size: rowsPerPage,
      sort: sort,
    };
  }

  return (
    <S.AppContainer
      fillContainer={true}
      title={getWidgetTitle({ defaultTitle: t('widget_name') })}
      subtitle={`( ${getValueOrDash(data?.totalElements)} )`}
    >
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filters />
      <DataTable data={data} isLoading={isFetching} />
    </S.AppContainer>
  );
};

export default App;
