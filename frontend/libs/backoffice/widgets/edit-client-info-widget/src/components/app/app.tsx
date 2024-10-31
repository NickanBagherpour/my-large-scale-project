import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import EditClient from '../edit-client/edit-client';
import * as S from './app.style';
import { redirect, useSearchParams } from 'next/navigation';
import { useGetApplicantInfo } from '../../../../edit-applicant-info-widget/src/services/get-applicant-info.api';
import { Loading } from '@oxygen/ui-kit';
import { useGetClientInfo } from '../../services/get-client-info.api';
import { useGetGrantTypeQuery } from '../../services/get-grant-type.api';
import { useGetTags } from '../../services/get-tag-info.api';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();

  const requestId: Nullable<string> = searchParams.get('requestId');

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
      redirect('/not-found');
    }
    return <EditClient userData={data} />;
  };

  console.log(data);

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {isFetching ? showLoadingSpinner() : checkParams(data, requestId)}
    </S.AppContainer>
  );
};

export default App;
