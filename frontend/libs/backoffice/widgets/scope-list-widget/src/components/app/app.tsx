import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import Filter from '../filter/filter';
import DataTable from '../data-table/data-table';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')} subtitle={'(367)'}>
      <Filter />
      <DataTable />
    </S.AppContainer>
  );
};

export default App;
