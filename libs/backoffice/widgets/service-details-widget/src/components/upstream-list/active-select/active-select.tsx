import { useState } from 'react';

import { Button } from 'antd';

import { InfoBox, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { InfoItemType, PageProps } from '@oxygen/types';

// import DetailsModal from './modals/info-service-modal/info-service-modal';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../context';
import { getDesktopColumns, getMobileColumns } from '../../../utils/upstream-tab/table';
import { Modal } from '../../scope-list/scope-list';

import * as S from './active-select.style';
import RemoveServiceModal from '../modals/remove-sevice-modal/remove-service-modal';

type ActiveSelectType = PageProps & {
  data?: any;
  loading?: boolean;
};
export const ActiveSelect: React.FC<ActiveSelectType> = (props) => {
  const { data, loading } = props;
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
  const handleModalDleteButton = () => {
    updateUpstreamAction(dispatch, { ...state.upstreamTab, isInitialized: false });
    toggleModal('removeService');
  };

  //Render
  const infoBoxData: InfoItemType[] = [
    {
      key: 'upstream_tab.info_box_latinName',
      value: `${data?.content.latinName}`,
    },
    {
      key: 'upstream_tab.info_box_persianName',
      value: 'آپ‌استریم سجام',
    },
    ...(state.upstreamTab.isInitialized
      ? [
          {
            key: '',
            value: (
              <Button variant='outlined' color='danger' onClick={handleDeleteButton}>
                <S.TrashIcon className='icon-trash' />
                {t('upstream_tab.delete_button')}
              </Button>
            ),
          },
        ]
      : []),
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
        deleteToggle={handleModalDleteButton}
        cancelToggle={() => toggleModal('removeService')}
        id='SEJAM-UPSTREAM'
      />
      {/* <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} /> */}
    </S.UpstreamContainer>
  );
};
