import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';
import * as S from './app.style';
import FirstStep from '../first-step/first-step';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { useGetApplicantInfo } from '../../services/get-applicant-info.api';
import { useGetGrantTypeQuery } from '../../../../edit-client-info-widget/src/services/get-grant-type.api';
import { useGetTags } from '../../../../edit-client-info-widget/src/services/get-tag-info.api';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();

  const requestId: Nullable<string> = searchParams.get('requestId');

  const { data, isFetching } = useGetApplicantInfo(requestId);

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
    return <FirstStep userData={data} />;
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {isFetching ? showLoadingSpinner() : checkParams(data, requestId)}
    </S.AppContainer>
  );
};

export default App;
