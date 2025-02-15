import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import * as S from './app.style';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { getWidgetTitle } from '@oxygen/utils';
import { useGetRouteDetailsQuery } from '../../services';
import { Route } from '@oxygen/reusable-components';
import { useAppDispatch } from '../../context';
import { notification } from 'antd';
import { useApp } from '@oxygen/hooks';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');
  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery(serviceName);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { notification } = useApp();

  if (!serviceName) {
    return void redirect('/not-found');
  }

  const onSuccess = () => {
    notification.success({
      message: t('success_notif'),
    });
    setTimeout(() => {
      router.back();
    }, 200); // this prevents rendering notifications twice, don't know why it works
  };

  return (
    <S.AppContainer
      title={getWidgetTitle({
        defaultTitle: t('common.edit_data'),
        primaryTitle: routeDetails?.name,
      })}
    >
      <Route dispatch={dispatch} nextStep={onSuccess} previousStep={() => router.back()} serviceName={serviceName} />
    </S.AppContainer>
  );
};

export default App;
