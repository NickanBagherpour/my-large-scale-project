import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { NoResult } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';

import { useAppDispatch, useAppState } from '../../context';

import EditClient from '../edit-client/edit-client';
import { REQUEST_ID_KEY } from '../../utils/consts';
import { useGetClientInfo } from '../../services/get-client-info.api';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const searchParams = useSearchParams();

  const requestId: Nullable<string> = searchParams.get(REQUEST_ID_KEY);

  const { data, isFetching } = useGetClientInfo(requestId);

  const checkParams = (data, requestId, isLoading) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} link={ROUTES.BACKOFFICE.CLIENT_DETAILS} />;
    }
    return <EditClient userData={data} />;
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {checkParams(data, requestId, isFetching)}
    </S.AppContainer>
  );
};

export default App;
