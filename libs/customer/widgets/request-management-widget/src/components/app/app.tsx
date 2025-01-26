import React, { useState, useEffect, useMemo } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@oxygen/utils';
import Filters from '../filter/filter';

import { useAppDispatch, useAppState } from '../../context';
import {
  useGetRequestsQuery,
  useGetRequestsDraftsQuery,
  useDeleteSelectedRequestsDraftsMutationQuery,
} from '../../services';
import { Loading, SearchItemsContainer } from '@oxygen/ui-kit';
import { AdvanceGridCard, NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
import RemoveModal from '../modal-confirm-remove/modal-confirm-remove';
import { Modal } from '../../types/modal.type';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, ...fetchState } = useAppState();
  const { data: requests, isFetching: isRequestsFetching } = useGetRequestsQuery(fetchState);
  const { data: drafts } = useGetRequestsDraftsQuery();
  const { mutate: deleteMutate, isPending: deleteIsPending } = useDeleteSelectedRequestsDraftsMutationQuery();
  const draftsSubTitle = drafts?.length ? `(${drafts?.length ?? 0})` : '';
  const [localDrafts, setLocalDrafts] = useState(drafts); // Local state for drafts
  const [showLoadMore, setShowLoadMore] = useState(true);
  const DRAFT_LIST_LIMIIT = 4;

  const [modals, setModals] = useState<Modal>({
    confirm: false,
    removeRequest: false,
    submissionId: undefined,
    requestName: '',
  });

  useEffect(() => {
    setLocalDrafts(drafts); // Sync local state with fetched drafts
  }, [drafts]);

  const [t] = useTr();
  const router = useRouter();

  const requestsSubTitle = requests?.length ? `(${requests?.length ?? 0})` : '';
  const handleClick = (submissionId: number) => {
    router.push(`${ROUTES.CUSTOMER.REQUEST_DETAILS_INFO}?submissionId=${submissionId}`);
  };

  const toggleModal = (modal: keyof Modal, requestName?: string, submissionId?: number) => {
    setModals((prev) => ({
      ...prev,
      submissionId: submissionId || undefined,
      requestName: requestName || '',
      [modal]: !prev[modal],
    }));
  };

  const handleDeleteModal = (submissionId?: number) => {
    if (submissionId) {
      console.log(submissionId);
      deleteMutate(submissionId, {
        onSuccess: (data) => {
          console.log('deleted selected  request :', data);
          let filteredDrafts = localDrafts;
          filteredDrafts = filteredDrafts.filter((draft) => draft.submissionId !== submissionId);
          setLocalDrafts(filteredDrafts);
          toggleModal('removeRequest');
        },
        onError: (error) => {
          console.error('request registration organization define step  failed:', error);
        },
      });
    }
  };

  const hasDrafts = !!drafts?.length;

  const draftList = useMemo(
    () => (showLoadMore ? drafts?.slice(0, DRAFT_LIST_LIMIIT) : drafts),
    [showLoadMore, drafts]
  );

  return (
    <>
      <RemoveModal
        isOpen={modals['removeRequest']}
        toggle={() => toggleModal('removeRequest')}
        onDelete={(id: number | undefined) => handleDeleteModal(id)}
        id={modals.submissionId}
        name={modals.requestName}
        loading={deleteIsPending}
      />
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {draftList?.map((item) => (
              <DraftCard
                key={item.id}
                {...item}
                deleteDraft={(submissionId) => toggleModal('removeRequest', item.organizationName, submissionId)}
              />
            ))}
          </S.Grid>
          {showLoadMore && drafts.length > DRAFT_LIST_LIMIIT && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(false)}>
              <span>{t('show_all')}</span>
              <i className='icon-chev-down' />
            </S.Button>
          )}
          {!showLoadMore && drafts.length > DRAFT_LIST_LIMIIT && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(true)}>
              <span>{t('show_less')}</span>
              <i className='icon-arrow-up' />
            </S.Button>
          )}
        </S.DraftsContainer>
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
