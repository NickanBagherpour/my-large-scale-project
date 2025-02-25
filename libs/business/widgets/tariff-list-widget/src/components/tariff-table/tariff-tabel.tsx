import React, { useState } from 'react';

import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns } from '../../utils/table-data-list';

import * as S from './tariff-tabel.style';
import { ConfirmRemoveModal } from '@oxygen/reusable-components';
import { useToggle } from '@oxygen/hooks';

export type TariffTablePropsType = PageProps & {
  tableData: any[];
  isLoading: boolean;
};

export const TariffTable: React.FC<TariffTablePropsType> = (props) => {
  const { tableData, isLoading } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [isRemoveModalOpen, toggleRemoveModal] = useToggle(false);
  const [serviceToUnassign, setServiceToUnassign] = useState<string | null>(null);
  //TODO: handle the pagination change
  const handlePageChange = async () => {
    console.log('current');
  };
  const data = [
    {
      id: 1,
      serviceName: 'Tariff 11',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
    {
      id: 2,
      serviceName: 'Tariff 22',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },

    {
      id: 3,
      serviceName: 'Tariff 33',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
    {
      id: 4,
      serviceName: 'Tariff 44',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
    {
      id: 5,
      serviceName: 'Tariff 55',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
  ];
  const desktopColumns = getDesktopColumns({ t, toggleRemoveModal, setServiceToUnassign });
  return (
    <S.TariffTableContainer>
      <Table
        loading={isLoading}
        dataSource={data}
        columns={desktopColumns}
        onChange={handlePageChange}
        rowKey={(row) => row.id}
        showHeader={true}
      />
      <ConfirmRemoveModal
        title={t('remove_modal_title')}
        message={t('confirm_remove_msg', { name: serviceToUnassign })}
        isOpen={isRemoveModalOpen}
        close={() => {
          toggleRemoveModal();
        }}
        isLoading={false}
        onRemove={() => {
          console.log('remove');
        }}
        wordToHighlight={serviceToUnassign || ''}
      />
    </S.TariffTableContainer>
  );
};
