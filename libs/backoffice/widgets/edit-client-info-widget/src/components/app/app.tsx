import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import { getWidgetTitle } from '@oxygen/utils';

import EditClient from '../edit-client/edit-client';
import { useGetClientInfo } from '../../services/get-client-info.api';
import { ClientInfoType } from '../../types';
import { CLIENT_NAME } from '../../utils/consts';
import { useGetTags } from '../../services/get-tag-info.api';
import { useGetClientTypes } from '../../services/get-client-types.api';

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

  const requestId: Nullable<string> = searchParams.get(CLIENT_NAME);

  const { data: clientInfo, isFetching: isClientInfoFetching } = useGetClientInfo(requestId);

  const { data: tags, isFetching: isTagsFetching } = useGetTags();

  const { data: clientTypes, isFetching: isClientTypesFetching } = useGetClientTypes();

  const checkParams = (data: ClientInfoType, requestId: Nullable<string>, isLoading: boolean) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} hasReturnButton={true} />;
    }
    return (
      <EditClient
        userData={data}
        tags={tags}
        isTagsFetching={isTagsFetching}
        clientTypes={clientTypes}
        isClientTypesFetching={isClientTypesFetching}
      />
    );
  };

  return (
    <S.AppContainer
      fillContainer={true}
      title={getWidgetTitle({
        defaultTitle: t('edit_information'),
        primaryTitle: clientInfo?.clientPersianName,
        secondaryTitle: clientInfo?.clientEnglishName,
      })}
    >
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />

      {checkParams(clientInfo, requestId, isClientInfoFetching)}
    </S.AppContainer>
  );
};

export default App;
