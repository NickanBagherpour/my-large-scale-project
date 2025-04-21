import React from 'react';

import type { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { useTr } from '@oxygen/translation';
import { PageProps, UserRole } from '@oxygen/types';

import { updateFilters, updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/invoice-list.util';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  userRole: UserRole;
  invoiceListFetching: boolean;
  invoiceList: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const { userRole, invoiceList, invoiceListFetching } = props;

  const dispatch = useAppDispatch();
  const { filters, pagination } = useAppState();
  const [t] = useTr();
  const theme = useTheme();

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (filters) {
      updateFilters(dispatch, filters);
    }
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination, userRole, filters, theme };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <S.Table
        loading={invoiceListFetching}
        current={pagination.page}
        total={invoiceList?.page?.totalElements}
        dataSource={invoiceList?.content}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.id}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
