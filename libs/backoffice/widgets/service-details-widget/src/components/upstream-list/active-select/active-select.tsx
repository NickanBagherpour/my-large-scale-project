import { useState } from 'react';

import { Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { Modal } from '@oxygen/ui-kit';
import CustomInfobox from '../custom-infobox/custom-infobox';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';
import { getDesktopColumns, getMobileColumns } from '../../../utils/upstream-tab/table';

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
  const { data, loading = false } = props;
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  //constants
  // const tableData=state.upstream.table
  const tableData = [];

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

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <S.UpstreamContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBoxContainer>
        <CustomInfobox handleDeleteButton={handleDeleteButton} data={{ latinName: 'alireza', persianName: 'علیرضا' }} />
        <S.Table>
          <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
          <Table dataSource={tableData} columns={desktopColumns} mobileColumns={mobileColumns} loading={loading} />
        </S.Table>
      </S.BorderBoxContainer>
      <RemoveServiceModal
        isOpen={modals.removeService}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={() => toggleModal('removeService')}
        id='SEJAM-UPSTREAM'
      />
      {/* <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} /> */}
    </S.UpstreamContainer>
  );
};
