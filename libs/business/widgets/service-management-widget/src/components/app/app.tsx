import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import { Filters } from '../filters/filters';
import { TableContainer } from '../table-container/table-container';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.AppContainer title={t('widget_name')}>
      <Filters />
      <TableContainer />
    </S.AppContainer>
  );
};

export default App;
