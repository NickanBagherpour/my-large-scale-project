import React from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import EditClient from '../edit-client/edit-client';
import { NOT_FOUND_URL, REQUEST_ID_KEY } from '../../utils/consts';
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

  const showLoadingSpinner = () => {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
  };

  const checkParams = (data, requestId) => {
    if (!requestId || !data) {
      redirect(NOT_FOUND_URL);
    }
    return <EditClient userData={data} />;
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {isFetching ? showLoadingSpinner() : checkParams(data, requestId)}
    </S.AppContainer>
  );
};

export default App;
