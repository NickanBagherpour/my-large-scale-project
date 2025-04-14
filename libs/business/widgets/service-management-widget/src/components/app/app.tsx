import React from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { generateQueryParams } from '../../utils/generate-query-params-table-data';
import { TableContainer } from '../table-container/table-container';
import { useGetReportDataQuery } from '../../services';
import { Filters } from '../filters/filters';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  //QUERIES
  const { data: tableData, isFetching: tableFetching } = useGetReportDataQuery(generateQueryParams(state));

  return (
    <S.AppContainer title={t('widget_name')}>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <Filters />
      <TableContainer data={tableData} loading={tableFetching} />
    </S.AppContainer>
  );
};

export default App;
