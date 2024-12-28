import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import { useGetTags } from '../../services/get-tags.api';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const clientStatus = 'commercialBanking'; //Business;


const {data} = useGetTags();


  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')} subtitle={'(213)'}>
      <Filters />
      <DataTable clientStatus={clientStatus} />
    </S.AppContainer>
  );
};

export default App;
