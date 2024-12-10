import React, { useState } from 'react';

import { Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import * as S from './data-table.style';
import { useTr } from '@oxygen/translation';
import { AddServerModal } from '../../../modals/add-server-modal/add-server-modal';
import {
  getDesktopColumns,
  getMobileColumns,
} from 'libs/backoffice/widgets/service-details-widget/src/utils/upstream-tab/table';
export type UpstreamTabModalType = {
  addService: boolean;
  removeService: boolean;
};

export type TablePropsType = PageProps & {
  //
};
export const DataTable: React.FC<TablePropsType> = (props) => {
  // const {} = props;
  const [t] = useTr();

  const tableData = [];

  const [modals, setModals] = useState<UpstreamTabModalType>({
    addService: false,
    removeService: false,
  });

  const toggleModal = (modal: keyof UpstreamTabModalType) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const desktopColumns = getDesktopColumns({ t, deletable: true, toggleModal });
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
        dataSource={tableData}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        loading={false}
        pagination={false}
      />
      <AddServerModal isOpen={modals.addService} toggle={() => toggleModal('addService')} />
    </S.TableContainer>
  );
};
