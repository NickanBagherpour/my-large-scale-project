import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { Modal } from '../../scope-list/scope-list';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';

import { useUpstreamListQuery } from '../../../services';
import { UpstreamDetails } from '../upstream-details/upstream-details';

import * as S from './active-select.style';

type ActiveSelectType = PageProps & {
  data?: any;
  loading?: boolean;
};
export const ActiveSelect: React.FC<ActiveSelectType> = (props) => {
  // const {  } = props;
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  //States
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  //Queries
  const { data, isFetching } = useUpstreamListQuery(state.serviceName);
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

  return (
    <>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
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
