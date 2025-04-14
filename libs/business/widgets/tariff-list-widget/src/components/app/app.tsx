import React from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { TopSection } from '../top-section/top-section';
import { TariffTable } from '../tariff-table/tariff-tabel';
import { useGetTariffListDataQuery } from '../../services';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { data, isFetching } = useGetTariffListDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      page: state.table.pagination.page - 1,
      size: state.table.pagination.size,
    };
    if (state.searchValue) {
      params['search-field'] = state.searchValue;
    }
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
