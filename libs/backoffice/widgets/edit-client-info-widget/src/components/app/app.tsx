import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import EditClient from '../edit-client/edit-client';
import { REQUEST_ID_KEY } from '../../utils/consts';
import { useGetClientInfo } from '../../services/get-client-info.api';

import { TitleChanger } from '../../utils/helper';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const { message } = useAppState();

  const requestId: Nullable<string> = searchParams.get(REQUEST_ID_KEY);

  const { data, isFetching } = useGetClientInfo(requestId);

  const checkParams = (data, requestId, isLoading) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} hasReturnButton={true} />;
    }
    return <EditClient userData={data} userDataLoading={isFetching} />;
  };

  return (
    <S.AppContainer fillContainer={true} title={TitleChanger(data, isFetching, t)}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      {checkParams(data, requestId, isFetching)}
    </S.AppContainer>
  );
};

export default App;
