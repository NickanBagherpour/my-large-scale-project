import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import { getWidgetTitle } from '@oxygen/utils';

import EditClient from '../edit-client/edit-client';
import { useGetClientInfo } from '../../services/get-client-info.api';
import { ClientInfoType } from '../../types';
import { REQUEST_ID_Name } from '../../utils/consts';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { message } = useAppState();

  const requestId: Nullable<string> = searchParams.get(REQUEST_ID_Name);

  const { data, isFetching } = useGetClientInfo(requestId);

  const checkParams = (data: ClientInfoType, requestId: Nullable<string>, isLoading: boolean) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} hasReturnButton={true} />;
    }
    return <EditClient userData={data} />;
  };

  return (
    <S.AppContainer
      fillContainer={true}
      title={getWidgetTitle({
        defaultTitle: t('edit_client_information'),
        primaryTitle: data?.clientPersianName,
        secondaryTitle: data?.clientEnglishName,
      })}
    >
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
