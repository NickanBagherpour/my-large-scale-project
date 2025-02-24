import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import { TariffTable } from '../tariff-table/tariff-tabel';
import { TopSection } from '../top-section/top-section';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useGetTariffListtDataQuery } from '../../services';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { data, isFetching } = useGetTariffListtDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      searchValue: state.searchValue,
      pagination: state.table.pagination,
    };

    return params;
  }

  return (
    <S.AppContainer title={t('widget_Title')}>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <TopSection />
      <TariffTable tableData={data} isLoading={isFetching} />
    </S.AppContainer>
  );
};

export default App;
