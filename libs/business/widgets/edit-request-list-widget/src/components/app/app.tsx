import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import Filters from '../filter/filter';
import DataTable from '../data-table/data-table';
import { useUpdateServiceDetails } from '../../services';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();

  const { data: updateService, isFetching: updateServiceLoading } = useUpdateServiceDetails();

  return (
    <S.AppContainer title={t('widget_name')}>
      <Filters />
      <DataTable requestList={updateService} requestListFetching={updateServiceLoading} />
    </S.AppContainer>
  );
};

export default App;
