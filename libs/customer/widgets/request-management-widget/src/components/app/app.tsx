import React, { useState, useEffect } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@oxygen/utils';
import Filters from '../filters/filters';
import Requests from '../requests/requests';

import { useAppDispatch, useAppState } from '../../context';
import {
  useGetRequestsQuery,
  useGetRequestsDraftsQuery,
  useDeleteSelectedRequestsDraftsMutationQuery,
} from '../../services';
import { Container, Loading, SearchItemsContainer } from '@oxygen/ui-kit';
import { AdvanceGridCard, NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
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
  const { data: drafts } = useGetRequestsDraftsQuery();
  const { mutate: deleteMutate, isPending: deleteIsPending } = useDeleteSelectedRequestsDraftsMutationQuery();

  const [localDrafts, setLocalDrafts] = useState(drafts); // Local state for drafts

  useEffect(() => {
    setLocalDrafts(drafts); // Sync local state with fetched drafts
  }, [drafts]);

  const [t] = useTr();
  const router = useRouter();

  const requestsSubTitle = requests?.length ? `(${requests?.length ?? 0})` : '';
  const handleClick = (submissionId: number) => {
    router.replace(`${ROUTES.CUSTOMER.REQUEST_DETAILS_INFO}?submissionId=${submissionId}`);
  };

  const handleDeleteDraft = (submissionId: number) => {
    console.log(submissionId);
    deleteMutate(submissionId, {
      onSuccess: (data) => {
        console.log('deleted selected  request :', data);
        let filteredDrafts = localDrafts;
        filteredDrafts = filteredDrafts.filter((draft) => draft.submissionId != submissionId);
        setLocalDrafts(filteredDrafts);
      },
      onError: (error) => {
        console.error('request registration first step  failed:', error);
      },
    });
  };

  const hasDrafts = !!drafts?.length;

  return (
    <>
      {hasDrafts && (
        <Container title={t('draft')} fillContainer={false}>
          <S.Grid>
            {localDrafts?.map((item) => (
              <DraftCard key={item.id} {...item} deleteDraft={(submissionId) => handleDeleteDraft(submissionId)} />
            ))}
          </S.Grid>
        </Container>
      )}

      <S.RequestsContainer title={t('widget_name')} subtitle={requestsSubTitle}>
        <Loading spinning={isRequestsFetching}>
          <Filters />
          {requests?.length ? (
            <SearchItemsContainer $columnNumber='2'>
              {requests.map((request: any, index: number) => (
                <AdvanceGridCard
                  key={index}
                  btnHandleClick={(submissionId) => handleClick(submissionId)}
                  btnLoading={isRequestsFetching}
                  data={request}
                />
              ))}
            </SearchItemsContainer>
          ) : (
            <NoResult isLoading={false} />
          )}
        </Loading>
      </S.RequestsContainer>
    </>
  );
};

export default App;
