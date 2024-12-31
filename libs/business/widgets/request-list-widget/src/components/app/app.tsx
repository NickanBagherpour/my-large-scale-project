import React, { useEffect } from 'react';

import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';
import { getValueOrDash } from '@oxygen/utils';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { PageProps } from '@oxygen/types';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useGetRequestListQuery } from '../../services';
import { handleUserRoleRedirect, prepareRequestListParams } from '../../utils/utility-functions';
import { UserRoleType } from '../../types/common-types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
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
  const userRole: UserRoleType = user?.role;

  useEffect(() => {
    handleUserRoleRedirect(userRole);
  }, [userRole]);

  const requestListParams = {
    searchTerm,
    page,
    rowsPerPage,
    status,
    sort,
  };

  const { data: requestList, isFetching: requestListFetching } = useGetRequestListQuery(
    prepareRequestListParams(requestListParams, userRole)
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
