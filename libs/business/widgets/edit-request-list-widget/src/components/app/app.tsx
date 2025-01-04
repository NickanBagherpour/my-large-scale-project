import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useUpdateServiceDetails } from '../../services';
import { REQUEST_ID_KEY } from '../../utils/consts';

import { useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const {
    searchTerm,
    pagination: { page, rowsPerPage },
  } = useAppState();

  const searchParams = useSearchParams();

  const submissionId: Nullable<string> = searchParams.get(REQUEST_ID_KEY);

  const params = {
    submissionId: submissionId,
    searchName: searchTerm,
    page: page - 1,
    size: rowsPerPage,
  };

  const { data: updateService, isFetching: updateServiceLoading } = useUpdateServiceDetails(params);

  return (
    <S.AppContainer title={t('widget_name')}>
      <Filters />
      <DataTable requestList={updateService} requestListFetching={updateServiceLoading} />
    </S.AppContainer>
  );
};

export default App;
