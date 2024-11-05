import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';
import { GlobalErrorContainer, NoResult } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetUpstreamQuery } from '../../services/get-report.api';
import Upstreams from '../upstreams/upstreams';
import Filters from '../filters/filters';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const { errorMessage, ...fetchState } = useAppState();
  const [t] = useTr();

  const { data: upstreams, isFetching } = useGetUpstreamQuery(fetchState);

  const upstreamSubTitle = upstreams?.total ? `(${upstreams?.total ?? 0})` : '';

  return (
    <S.UpstreamContainer title={t('widget_name')} subtitle={upstreamSubTitle} fillContainer={true}>
      <GlobalErrorContainer
        containerProps={{ marginTop: '2.4rem' }}
        errorMessage={errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filters />
      <Loading spinning={isFetching} size='large'>
        {upstreams?.list.length ? (
          <Upstreams
            data={upstreams.list}
            total={upstreams.total}
            searchTerm={fetchState.searchTerm}
            isLoading={isFetching}
          />
        ) : (
          <NoResult isLoading={false} />
        )}
      </Loading>
    </S.UpstreamContainer>
  );
};

export default App;
