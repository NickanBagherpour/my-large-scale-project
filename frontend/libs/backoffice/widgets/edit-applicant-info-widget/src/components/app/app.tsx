import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { NoResult } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';

import { useAppDispatch, useAppState } from '../../context';

import EditApplicant from '../edit-applicant/edit-applicant';
import { useGetApplicantInfo } from '../../services/get-applicant-info.api';
import { REQUEST_ID_KEY } from '../../utils/consts';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();

  const requestId: Nullable<string> = searchParams.get(REQUEST_ID_KEY);

  const { data, isFetching } = useGetApplicantInfo(requestId);

  const checkParams = (data, requestId, isLoading) => {
    if (!requestId || !data) {
      return <NoResult isLoading={isLoading} link={ROUTES.BACKOFFICE.CLIENT_DETAILS} />;
    }
    return <EditApplicant userData={data} />;
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {checkParams(data, requestId, isFetching)}
    </S.AppContainer>
  );
};

export default App;
