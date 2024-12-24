import React from 'react';

import type { TablePaginationConfig } from 'antd';
import { TFunction } from 'i18next';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Table } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import { useGetRequestedServicesQuery } from '../../services/get-requested-services';
import { getDesktopColumns, getMobileColumns } from '../../utils/requested-services.util';
import { PaginationType } from '../../context/types';
import { updatePagination } from '../../context';

import * as S from './requested-services.style';

type DataTableProps = PageProps & {
  //
};

const RequestedServices: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const {
    table: { pagination = { page: 1, rowsPerPage: 5 } } = { pagination: { page: 1, rowsPerPage: 10 } }, // Fallback for pagination
  } = state || {};

  const { data, isFetching } = useGetRequestedServicesQuery(prepareParams());
  function prepareParams() {
    const params = {
      requestId: state.requestId,
      pagination: state.table.pagination,
    };

    return params;
  }

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
        loading={isFetching}
        current={pagination.page}
        total={data?.total}
        dataSource={data?.content}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={handlePageChange}
        rowKey={(row) => row.index}
      />
    </S.DataTableContainer>
  );
};

export default RequestedServices;
