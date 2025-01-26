import React, { useEffect } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import { resetMessageAction, updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetUpstreamListQuery } from '../../services';
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

  useEffect(() => {
    if (upstreams?.empty === true && upstreams?.totalElements !== 0) {
      updatePagination(dispatch, { page: pagination.page - 1 });
    }
  }, [upstreams]);

  function prepareParams() {
    const params = {
      page: pagination.page - 1,
      size: pagination.rowsPerPage,
      ...(searchField ? { ['search-field']: searchField } : {}),
      // sort:state.sort,
    };
    return params;
  }

  const upstreamSubTitle = upstreams?.totalElements ? `(${upstreams?.totalElements ?? 0})` : '';

  return (
    <S.UpstreamContainer title={t('upstream_management')} subtitle={upstreamSubTitle}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      <Filters />
      {upstreams?.content?.length ? (
        <Upstreams data={upstreams.content} total={upstreams.totalElements} isLoading={isFetching} />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.UpstreamContainer>
  );
};

export default App;
