import React from 'react';

import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';
import { getValueOrDash } from '@oxygen/utils';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useGetRequestListQuery } from '../../services';
import { prepareRequestListParams } from '../../utils/utility-functions';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import * as S from './app.style';

const App: React.FC = () => {
  const {
    searchTerm,
    pagination: { page, rowsPerPage },
    status,
    sort,
    message,
  } = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const { user } = useAuth();
  const userRole = user?.role;

  const requestListParams = {
    searchTerm,
    page,
    rowsPerPage,
    status,
    sort,
  };

  const { data: requestList, isFetching: requestListFetching } = useGetRequestListQuery(
    prepareRequestListParams(requestListParams)
  );

  return (
    <S.AppContainer
      fillContainer={true}
      title={t('widget_name')}
      subtitle={`( ${getValueOrDash(requestList?.page?.totalElements)} )`}
    >
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filters userRole={userRole} />
      <DataTable requestList={requestList} requestListFetching={requestListFetching} userRole={userRole} />
    </S.AppContainer>
  );
};

export default App;
