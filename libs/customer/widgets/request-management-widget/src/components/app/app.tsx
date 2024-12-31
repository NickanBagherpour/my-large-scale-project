import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import Filters from '../filters/filters';
import Requests from '../requests/requests';

import { useAppDispatch, useAppState } from '../../context';
import { useGetRequestsQuery } from '../../services';
import { Container, Loading, SearchItemsContainer } from '@oxygen/ui-kit';
import { AdvanceGridCard, NoResult } from '@oxygen/reusable-components';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import { EmptyState } from '@oxygen/reusable-components';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, ...fetchState } = useAppState();
  const { data: requests, isFetching: isRequestsFetching } = useGetRequestsQuery(fetchState);
  const [t] = useTr();

  const requestsSubTitle = requests?.length ? `(${requests?.length ?? 0})` : '';
  const handleClick = () => {
    console.log('handle click');
  };

  return (
    <>
      {/* {hasDrafts && (
        <Container title={t('draft')} fillContainer={false}>
          <S.Grid>
            {drafts?.map((item) => (
              <DraftCard key={item.id} {...item} />
            ))}
          </S.Grid>
        </Container>
      )} */}

      <S.RequestsContainer title={t('widget_name')} subtitle={requestsSubTitle}>
        <Filters />
        <Loading spinning={isRequestsFetching}>
          <SearchItemsContainer $columnNumber='2'>
            {requests?.length ? (
              requests.map((request, index) => (
                <AdvanceGridCard
                  key={index}
                  btnHandleClick={handleClick}
                  btnLoading={isRequestsFetching}
                  data={request}
                />
              ))
            ) : (
              <NoResult isLoading={false} />
            )}
          </SearchItemsContainer>
        </Loading>
      </S.RequestsContainer>
    </>
  );
};

export default App;
