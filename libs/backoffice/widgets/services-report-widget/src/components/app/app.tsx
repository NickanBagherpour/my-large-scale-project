import React from 'react';

import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
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
    isActive,
    sort,
    message,
  } = useAppState();

  const { data, isFetching } = useGetServicesReportQuery(prepareParams());

  function prepareParams() {
    return {
      ...(searchTerm ? { ['search-field']: searchTerm } : {}),
      isActive,
      page: page - 1,
      size: rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
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
      {data ? (
        <DataTable data={data} isLoading={isFetching} wordToHighlight={searchTerm} />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.AppContainer>
  );
};

export default App;
