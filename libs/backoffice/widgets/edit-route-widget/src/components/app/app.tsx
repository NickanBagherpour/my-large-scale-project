import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import * as S from './app.style';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { getWidgetTitle } from '@oxygen/utils';
import { useGetRouteDetailsQuery } from '../../services';
import { GlobalMessageContainer, Route } from '@oxygen/reusable-components';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useApp } from '@oxygen/hooks';

const App = () => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');
  const { data: routeDetails } = useGetRouteDetailsQuery(serviceName);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { notification } = useApp();
  const { message } = useAppState();

  if (!serviceName) {
    return void redirect('/not-found');
  }

  const onSuccess = () => {
    notification.success({
      message: t('success_notif'),
    });

    router.back();
  };

  return (
    <S.AppContainer
      title={getWidgetTitle({
        defaultTitle: t('common.edit_data'),
        primaryTitle: routeDetails?.route.serviceName,
      })}
    >
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <S.Title>{t('edit_route')}</S.Title>
      <Route dispatch={dispatch} nextStep={onSuccess} previousStep={() => router.back()} serviceName={serviceName} />
    </S.AppContainer>
  );
};

export default App;
