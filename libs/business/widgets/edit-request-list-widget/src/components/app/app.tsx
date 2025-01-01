import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import * as S from './app.style';
import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  return (
    <S.AppContainer title={t('widget_name')}>
      <Filters />
      <DataTable requestList={[]} requestListFetching={false} />
    </S.AppContainer>
  );
};

export default App;
