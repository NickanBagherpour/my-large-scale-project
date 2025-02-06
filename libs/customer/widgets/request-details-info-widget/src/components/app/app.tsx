import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';
import { useQueryParams } from '@oxygen/hooks';
import { getWidgetTitle } from '@oxygen/utils';

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

  const title = getWidgetTitle({
    defaultTitle:
      t('widget_name_request_details') +
      ' ' +
      (requestDetailsInfo ? requestDetailsInfo?.submissionInfoDto?.clientName : ''),
  });

  return (
    <Loading spinning={isRequestDetailsFetching}>
      <S.AppContainer title={title}>
        <DetailsInfo data={requestDetailsInfo} />
      </S.AppContainer>
    </Loading>
  );
};

export default App;
