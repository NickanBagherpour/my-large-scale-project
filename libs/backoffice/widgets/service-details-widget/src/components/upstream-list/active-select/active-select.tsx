import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button } from '@oxygen/ui-kit';

import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';
import { usePostAssignScopeToService, useUpstreamListQuery } from '../../../services';
import { UpstreamDetails } from '../upstream-details/upstream-details';

import { useAppState } from '../../../context';

import * as S from './active-select.style';

type ActiveSelectType = PageProps & {
  serviceName: string;
};

export const ActiveSelect: React.FC<ActiveSelectType> = (props) => {
  const [t] = useTr();
  const { serviceName } = props;
  const queryClient = useQueryClient();
  const state = useAppState();

  const [removeServiceModals, setRemoveServiceModals] = useState<boolean>(false);

  const { data: upStreamListData, isFetching: upStreamLoading } = useUpstreamListQuery({ serviceName });
  const { mutate, isPending: postAssignLoading } = usePostAssignScopeToService();

  const tableData = upStreamListData?.targets;

  const infoBoxData = { englishName: upStreamListData?.name, persianName: upStreamListData?.description };

  const toggleModal = () => {
    setRemoveServiceModals(!removeServiceModals);
  };

  const handleModalDeleteButton = async () => {
    mutate(
      { serviceName: serviceName ?? '', scopeName: state?.upstreamTab?.activeSelect?.cardId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.GET_UPSTREAM_LIST] });
          toggleModal();
        },
      }
    );
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
        handleDeleteButton={toggleModal}
        infoBoxData={infoBoxData}
        infoBoxLoading={upStreamLoading}
      />
      <RemoveServiceModal
        isOpen={removeServiceModals}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={() => toggleModal()}
        id={upStreamListData?.name}
        loading={postAssignLoading}
      />
    </>
  );
};
