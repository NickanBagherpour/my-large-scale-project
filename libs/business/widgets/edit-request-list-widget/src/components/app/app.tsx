import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useUpdateServiceDetails } from '../../services';
import { REQUEST_ID_KEY } from '../../utils/consts';
import { handleUserRoleRedirect } from '../../utils/helper';
import { UserRoleType } from '../../../../request-list-widget/src/types/common-types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import { ROUTES } from '@oxygen/utils';
import EditClient from '../../../../../../backoffice/widgets/edit-client-info-widget/src/components/edit-client/edit-client';

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

  const checkParams = (data, requestId, isLoading) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} />;
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

  const params = {
    submissionId: submissionId,
    searchName: searchTerm,
    page: page - 1,
    size: rowsPerPage,
  };

  const { data: updateService, isFetching: updateServiceLoading } = useUpdateServiceDetails(params);

  return checkParams(updateService, submissionId, updateServiceLoading);
};

export default App;
