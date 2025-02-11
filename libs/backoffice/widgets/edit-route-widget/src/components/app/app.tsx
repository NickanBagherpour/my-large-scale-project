import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import EditRoute from '../edit-route/edit-route';

import * as S from './app.style';
import { useSearchParams } from 'next/navigation';
import { getWidgetTitle } from '@oxygen/utils';
import { useGetRouteDetailsQuery } from '../../services';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');
  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery(serviceName);

  return (
    <S.AppContainer
      title={getWidgetTitle({
        defaultTitle: t('common.edit_data'),
        primaryTitle: routeDetails?.name,
      })}
    >
      <EditRoute />
    </S.AppContainer>
  );
};

export default App;
