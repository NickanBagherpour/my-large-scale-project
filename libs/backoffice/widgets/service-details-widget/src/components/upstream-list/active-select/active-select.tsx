import { useState } from 'react';

import { Loading, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { Modal } from '../../scope-list/scope-list';
import CustomInfobox from '../custom-infobox/custom-infobox';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';
import { getDesktopColumns, getMobileColumns } from '../../../utils/upstream-tab/table';

import * as S from './active-select.style';
import { useUpstreamListQuery } from '../../../services';

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

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const { data, isFetching } = useUpstreamListQuery(state.serviceName);
  //constants
  // const tableData=state.upstream.table
  const tableData = data?.targets ? [...data.targets] : undefined;
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

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <S.UpstreamContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBoxContainer>
        <CustomInfobox handleDeleteButton={handleDeleteButton} data={infoBoxData} loading={isFetching} />
        <S.Table>
          <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
          <Table
            dataSource={tableData}
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            pagination={false}
            loading={isFetching}
          />
        </S.Table>
      </S.BorderBoxContainer>
      <RemoveServiceModal
        isOpen={modals.removeService}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={() => toggleModal('removeService')}
        id={data?.name}
      />
      {/* <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} /> */}
    </S.UpstreamContainer>
  );
};
