import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import { Filters } from '../filters/filters';
import { TableContainer } from '../table-container/table-container';

import * as S from './app.style';
import { useGetReportDataQuery } from '../../services';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { data: tableData, isFetching: tableFetching } = useGetReportDataQuery({
    filters: { name: state.searchValue, code: state.status, branchCode: state.sort },
    pagination: { page: state.table.pagination.page, limit: state.table.pagination.limit },
  });

  return (
    <S.AppContainer title={t('widget_name')}>
      <Filters />
      <TableContainer data={tableData} loading={tableFetching} />
    </S.AppContainer>
  );
};

export default App;
