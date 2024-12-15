import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, Table } from '@oxygen/ui-kit';

import { AddServerModal } from '../../../modals/add-server-modal/add-server-modal';
import {
  getDesktopColumns,
  getMobileColumns,
} from 'libs/backoffice/widgets/service-details-widget/src/utils/upstream-tab/table';
import {
  filteredFallbackServersAction,
  useAppDispatch,
  useAppState,
} from 'libs/backoffice/widgets/service-details-widget/src/context';

import * as S from './data-table.style';
import RemoveServiceModal from '../../../modals/remove-sevice-modal/remove-service-modal';

export type UpstreamTabModalType = {
  addService: boolean;
  removeService: boolean;
};

export type TablePropsType = PageProps & {
  //
};
export const DataTable: React.FC<TablePropsType> = (props) => {
  // const {} = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const tableData = state.upstreamTab.fallbackSelect.servers;
  const revercedData = [...tableData].reverse();

  const [toggleInfo, setToggleInfo] = useState({
    ip_port: undefined,
    server_name: undefined,
  });
  const filteredData = () => {
    const filteredData = tableData.filter((item) => item.ip_port !== toggleInfo?.ip_port);
    console.log(filteredData);
    return filteredData;
  };
  const [modals, setModals] = useState<UpstreamTabModalType>({
    addService: false,
    removeService: false,
  });

  const toggleModal = (modal: keyof UpstreamTabModalType) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const desktopColumns = getDesktopColumns({ t, deletable: true, toggleModal, setToggleInfo });
  const mobileColumns = getMobileColumns({ t, deletable: true, toggleModal });
  return (
    <S.TableContainer>
      <S.Title>
        <S.TitleSpan>{t('upstream_tab.upstream_servers')}</S.TitleSpan>
        <Button color='secondary' onClick={() => toggleModal('addService')}>
          <S.Icon className='icon-plus' />
          {t('add_server')}
        </Button>
      </S.Title>
      <Table
        dataSource={revercedData}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        loading={false}
        pagination={false}
      />
      <AddServerModal isOpen={modals.addService} toggle={() => toggleModal('addService')} />
      <RemoveServiceModal
        isOpen={modals.removeService}
        id='test'
        cancelToggle={() => toggleModal('removeService')}
        deleteToggle={() => {
          filteredFallbackServersAction(dispatch, filteredData());
          // updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, isInitialized: false });
          toggleModal('removeService');
        }}
      />
    </S.TableContainer>
  );
};
