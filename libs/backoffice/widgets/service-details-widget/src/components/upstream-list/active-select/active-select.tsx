import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { Button, Modal } from '@oxygen/ui-kit';
import CustomInfobox from '../custom-infobox/custom-infobox';
// import { Modal } from '../../scope-list/scope-list';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';

import { useUpstreamListQuery } from '../../../services';
import { UpstreamDetails } from '../upstream-details/upstream-details';

import * as S from './active-select.style';

type ActiveSelectType = PageProps & {
  data?: any;
  loading?: boolean;
};

export type Modal = {
  details: boolean;
  removeService: boolean;
};

export const ActiveSelect: React.FC<ActiveSelectType> = (props) => {
  // const {  } = props;
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const router = useRouter();
  //States
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  const params = {
    serviceName: state.serviceName,
    id: state.upstreamTab.activeSelect.id,
  };
  //Queries
  const { data, isFetching } = useUpstreamListQuery(params);
  //constants
  const tableData = data?.targets;
  const infoBoxData = { latinName: data?.name, persianName: data?.description };
  //Handlers
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handleDeleteButton = () => {
    toggleModal('removeService');
  };

  const handleModalDeleteButton = () => {
    updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, isInitialized: false });
    toggleModal('removeService');
  };
  //please add correct route instead of ROUTES.BACKOFFICE.UPSTREAM_LIST
  const handleHistoryBtn = () =>
    router.push(`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?serviceName=${state.serviceName}&type=service`);
  return (
    <>
      <S.Header>
        <S.Title>{t('upstream_tab.tab_header')}</S.Title>
        <Button variant='filled' icon={<S.Icon className='icon-clock' />} onClick={handleHistoryBtn}>
          {t('see_changes_history')}
        </Button>
      </S.Header>
      <UpstreamDetails
        tableLoading={isFetching}
        tableData={tableData}
        handleDeleteButton={handleDeleteButton}
        infoBoxData={infoBoxData}
        infoBoxLoading={isFetching}
      />
      <RemoveServiceModal
        isOpen={modals.removeService}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={() => toggleModal('removeService')}
        id={data?.name}
      />
    </>
  );
};
