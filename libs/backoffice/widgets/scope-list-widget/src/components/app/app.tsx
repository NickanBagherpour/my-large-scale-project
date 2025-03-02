import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import Filter from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useGetScopeListQuery } from '../../services';
import { prepareScopeListParams } from '../../utils/scopes-list.util';
import { TypeScopeListParams, TypeSubTitle } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const {
    pagination: { page, pageSize },
    searchField,
    message,
  } = useAppState();

  const scopeListParams: TypeScopeListParams = {
    searchField,
    page,
    pageSize,
  };

  const { data: scopeListData, isFetching: scopeListLoading } = useGetScopeListQuery(
    prepareScopeListParams(scopeListParams)
  );

  const subTitle: TypeSubTitle = scopeListData?.totalElements ? `(${scopeListData?.totalElements ?? 0})` : '';

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')} subtitle={subTitle}>
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
