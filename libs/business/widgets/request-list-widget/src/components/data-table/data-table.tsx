import React from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { UserRoleType } from '../../types/common-types';

import { getDesktopColumns, getMobileColumns } from '../../utils/request-list.util';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  userRole: UserRoleType;
  requestListFetching: boolean;
  requestList: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();

  const { userRole, requestList, requestListFetching } = props;

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination, userRole };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <S.Table
        loading={requestListFetching}
        current={pagination.page}
        total={requestList?.page?.totalElements}
        dataSource={requestList?.content}
        pagination={{ pageSize: pagination.rowsPerPage, hideOnSinglePage: true }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
