import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps, typeScopeListParams } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { getValueOrDash } from '@oxygen/utils';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import Filter from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useGetScopeListQuery } from '../../services';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const { pagination, searchField, message } = useAppState();
  const [t] = useTr();

  const scopeListParams: typeScopeListParams = {
    'search-field': searchField,
    page: pagination.page - 1,
    size: pagination.pageSize,
    sort: '',
  };

  const { data: scopeListData, isFetching: scopeListLoading } = useGetScopeListQuery(scopeListParams);

  return (
    <S.AppContainer
      fillContainer={true}
      title={t('widget_name')}
      subtitle={`(${getValueOrDash(scopeListData?.totalElements)})`}
    >
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filter />
      <DataTable scopeListData={scopeListData} scopeListLoading={scopeListLoading} />
    </S.AppContainer>
  );
};

export default App;
