import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import { TariffTable } from '../tariff-table/tariff-tabel';
import { TopSection } from '../top-section/top-section';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  /* Sample Query Usage
  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
     const { filters,submit,pagination,...rest } = state;
     const params = {
       form: submit,
       pagination: pagination,
     };

     return params;
   }
 */

  return (
    <S.AppContainer title={t('widget_Title')}>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <TopSection />
      <TariffTable />
    </S.AppContainer>
  );
};

export default App;
