import React from 'react';

import type { TablePaginationConfig } from 'antd';
import { TFunction } from 'i18next';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Table } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import { getDesktopColumns, getMobileColumns } from '../../utils/requested-services.util';
import { PaginationType } from '../../context/types';
import { updatePagination } from '../../context';
import { SubmissionDetailType } from '../../types';

import * as S from './requested-services.style';

type DataTableProps = PageProps & {
  data: SubmissionDetailType['services'];
  isLoading: boolean;
};

const RequestedServices: React.FC<DataTableProps> = (props) => {
  const { data, isLoading } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const {
    table: { pagination },
  } = state;

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;

    if (pageSize && current) {
      const updatedPagination = {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      };
      updatePagination(dispatch, updatedPagination);
    }
  };

  const dataTableParams: { t: TFunction; pagination: PaginationType } = { t, pagination };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <Table
        loading={isLoading}
        current={pagination.page}
        total={data.length}
        dataSource={data}
        // pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={handlePageChange}
        rowKey={'id'}
        pagination={false}
      />
    </S.DataTableContainer>
  );
};

export default RequestedServices;
