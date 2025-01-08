import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetUpstreamListQuery } from '../../services/get-upstream-list.api';
import Upstreams from '../upstreams/upstreams';
import Filters from '../filters/filters';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const {
    table: { pagination },
    message,
    searchField,
  } = state;

  const { data: upstreams, isFetching } = useGetUpstreamListQuery(prepareParams());

  function prepareParams() {
    const params = {
      ...pagination,
      size: pagination.rowsPerPage,
      ['search-field']: searchField,
    };
    return params;
  }
  const upstreamSubTitle = upstreams?.total ? `(${upstreams?.total ?? 0})` : '';

  return (
    <S.UpstreamContainer title={t('widget_name')} subtitle={upstreamSubTitle}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      <Filters />
      <Loading spinning={isFetching} size='default'>
        {upstreams?.content?.length ? (
          <Upstreams data={upstreams.content} total={upstreams.totalElements} isLoading={isFetching} />
        ) : (
          <NoResult isLoading={false} />
        )}
      </Loading>
    </S.UpstreamContainer>
  );
};

export default App;
