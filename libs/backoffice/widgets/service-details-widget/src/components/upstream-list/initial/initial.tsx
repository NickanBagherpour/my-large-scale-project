import { useState } from 'react';

import { Button } from 'antd';

import { InfoBox, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { InfoItemType, PageProps } from '@oxygen/types';

// import DetailsModal from './modals/info-service-modal/info-service-modal';
import { useAppDispatch, useAppState } from '../../../context';
import { getDesktopColumns, getMobileColumns } from '../../../utils/upstream-tab/table';
import { Modal } from '../../scope-list/scope-list';

import * as S from './initial.style';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';

type InitialType = PageProps & {
  //
};
export const Initial: React.FC<InitialType> = (props) => {
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
  const isInitialized = state.upstreamTab.isInitialized;

  //Handlers
  const handleDelete = () => {
    console.log('delete');
    toggleModal('removeService');
  };
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };
  //Render
  const infoBoxData: InfoItemType[] = [
    {
      key: 'upstream_tab.info_box_latinName',
      value: 'SEJAM-UPSTREAM',
    },
    {
      key: 'upstream_tab.info_box_persianName',
      value: 'آپ‌استریم سجام',
    },
    {
      key: '',
      value: (
        <Button variant='outlined' color='danger' onClick={handleDelete}>
          <S.TrashIcon className='icon-trash'></S.TrashIcon>
          {t('upstream_tab.delete_button')}
        </Button>
      ),
    },
  ];

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <S.UpstreamContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBoxContainer>
        <InfoBox data={infoBoxData} minColumnCount={3} margin={0} />
        <S.Table>
          <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
          <Table dataSource={tableData} columns={desktopColumns} mobileColumns={mobileColumns} loading={false} />
        </S.Table>
      </S.BorderBoxContainer>
      <RemoveServiceModal
        isOpen={modals.removeService}
        toggle={() => toggleModal('removeService')}
        id='SEJAM-UPSTREAM'
      />
      {/* <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} /> */}
    </S.UpstreamContainer>
  );
};
