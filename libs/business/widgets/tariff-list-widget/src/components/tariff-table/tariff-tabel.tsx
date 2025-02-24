import React from 'react';

import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns } from '../../utils/table-data-list';

import * as S from './tariff-tabel.style';

export type TariffTablePropsType = PageProps & {
  tableData: any[];
  isLoading: boolean;
};

export const TariffTable: React.FC<TariffTablePropsType> = (props) => {
  const { tableData, isLoading } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const handlePageChange = async () => {
    console.log('current');
  };
  const data = [
    {
      id: 1,
      serviceName: 'Tariff 1',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
    {
      id: 2,
      serviceName: 'Tariff 1',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },

    {
      id: 3,
      serviceName: 'Tariff 1',
      persianName: 'Tariff 2',
      scope: 'Tariff 3',
      url: 'Tariff 4',
      version: 'Tariff 5',
    },
  ];
  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getDesktopColumns({ t });
  return (
    <S.TariffTableContainer>
      <Table
        loading={isLoading}
        dataSource={data}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={handlePageChange}
        rowKey={(row) => row.id}
        showHeader={true}
      />
    </S.TariffTableContainer>
  );
};
