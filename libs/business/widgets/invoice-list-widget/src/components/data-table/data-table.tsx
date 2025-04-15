import React from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { UserRoleType } from '../../types/common-types';

import { getDesktopColumns, getMobileColumns } from '../../utils/invoice-list.util';

import { updateFilters, updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './data-table.style';
import { useTheme } from 'styled-components';

type DataTableProps = PageProps & {
  userRole: UserRoleType;
  invoiceListFetching: boolean;
  invoiceList: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();
  const { filters } = useAppState();

  const { userRole, invoiceList, invoiceListFetching } = props;
  const theme = useTheme();
  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    console.log('filters:', filters);
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
