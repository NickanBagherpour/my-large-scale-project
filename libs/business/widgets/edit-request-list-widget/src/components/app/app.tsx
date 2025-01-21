import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useUpdateServiceDetails } from '../../services';
import { REQUEST_ID_KEY } from '../../utils/consts';
import { handleUserRoleRedirect } from '../../utils/helper';
import { UserRoleType } from '../../../../request-list-widget/src/types/common-types';

import { resetErrorMessageAction, updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  role?: UserRoleType;
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const {
    searchTerm,
    pagination: { page, rowsPerPage },
    message,
  } = useAppState();

  const role = props.parentProps?.role;

  const searchParams = useSearchParams();

  const submissionId: Nullable<string> = searchParams.get(REQUEST_ID_KEY);

  useEffect(() => {
    handleUserRoleRedirect(role as UserRoleType);
  }, [role]);

  const params = {
    submissionId: submissionId,
    searchName: searchTerm,
    page: page - 1,
    size: rowsPerPage,
  };

  const { data: updateService, isFetching: updateServiceLoading } = useUpdateServiceDetails(params);

  useEffect(() => {
    if (updateService?.content?.length === 0 && updateService?.page?.totalElements !== 0) {
      updatePagination(dispatch, { page: page - 1 });
    }
  }, [updateService]);

  const checkParams = (requestId, isLoading) => {
    if (!requestId) {
      return <NoResult isLoading={isLoading} hasReturnButton={true} />;
    }
    return (
      <S.AppContainer title={t('widget_name')}>
        <GlobalMessageContainer
          message={message}
          onClose={() => {
            resetErrorMessageAction(dispatch);
          }}
        />
        <Filters />
        <DataTable requestList={updateService} requestListFetching={updateServiceLoading} />
      </S.AppContainer>
    );
  };

  return checkParams(submissionId, updateServiceLoading);
};

export default App;
