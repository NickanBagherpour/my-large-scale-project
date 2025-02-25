import { useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { ROUTES, RQKEYS } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Button } from '@oxygen/ui-kit';
import { useApp } from '@oxygen/hooks';

import RemoveServiceModal from '../remove-service-modal/remove-service-modal';
import { usePostAssignScopeToService, useUpstreamListQuery } from '../../../services';
import { UpstreamDetails } from '../upstream-details/upstream-details';

import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';

import * as S from './upstream-list.style';

type ActiveSelectType = PageProps & {};

export const UpstreamList: React.FC<ActiveSelectType> = (props) => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { notification } = useApp();

  const serviceName: Nullable<string> = searchParams.get('servicename');

  if (!serviceName) {
    redirect('/not-found');
  }

  const [removeServiceModals, setRemoveServiceModals] = useState<boolean>(false);

  const { data: upStreamListData, isFetching: upStreamLoading } = useUpstreamListQuery({ serviceName });

  const { mutate } = usePostAssignScopeToService();

  const tableData = upStreamListData?.targets;

  const infoBoxData = { englishName: upStreamListData?.name, persianName: upStreamListData?.description };

  const executePostAction = () => {
    return {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.GET_UPSTREAM_LIST],
          refetchType: 'active',
        });

        updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, cardId: null });

        setRemoveServiceModals(false);

        await queryClient.invalidateQueries({
          queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.SCOPE, serviceName],
          refetchType: 'active',
        });

        await queryClient.invalidateQueries({
          queryKey: [RQKEYS.BACKOFFICE.SERVICES_LIST.DRAFTS],
          refetchType: 'none',
        });

        notification.success({
          message: t('message.success_alert', { element: t('upstream') }),
        });
      },
    };
  };

  const handleModalDeleteButton = async () => {
    const assignUpstreamParams = {
      serviceName: serviceName,
      upstreamName: state?.upstreamTab?.activeSelect?.cardId,
    };

    mutate(assignUpstreamParams, executePostAction());
  };

  const handleModalCancelButton = () => {
    updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, cardId: null });
    setRemoveServiceModals(false);
  };

  return (
    <>
      <S.Header>
        <S.Title>{t('upstream_tab.tab_header')}</S.Title>
        <Button
          variant='filled'
          icon={<S.Icon className='icon-clock' />}
          href={`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?upstream-name=${upStreamListData?.name}`}
        >
          {t('see_changes_history')}
        </Button>
      </S.Header>
      <UpstreamDetails
        tableLoading={upStreamLoading}
        tableData={tableData}
        handleDeleteButton={setRemoveServiceModals}
        infoBoxData={infoBoxData}
        infoBoxLoading={upStreamLoading}
      />
      <RemoveServiceModal
        isOpen={removeServiceModals}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={handleModalCancelButton}
        id={upStreamListData?.name}
      />
    </>
  );
};
