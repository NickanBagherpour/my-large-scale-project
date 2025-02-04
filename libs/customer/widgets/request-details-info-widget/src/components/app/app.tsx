import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';
import { useQueryParams } from '@oxygen/hooks';

import { useAppDispatch, useAppState } from '../../context';
import { useGetRequestDataQuery } from '../../services/get-request-details-info.api';
import DetailsInfo from '../detail-info/detail-info';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const queryParams = useQueryParams();
  const submissionId = queryParams.get('submissionId') ?? '';
  const { data: requestDetailsInfo, isFetching: isRequestDetailsFetching } = useGetRequestDataQuery(submissionId);

  return (
    <Loading spinning={isRequestDetailsFetching}>
      <S.AppContainer
        title={`${t('widget_name')} ` + (requestDetailsInfo ? requestDetailsInfo?.submissionInfoDto?.clientName : '')}
      >
        <DetailsInfo data={requestDetailsInfo} />
      </S.AppContainer>
    </Loading>
  );
};

export default App;
