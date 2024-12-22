import React from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useGetRequestListQuery } from '../../services';
import { getDesktopColumns, getMobileColumns } from '../../utils/request-list.util';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  clientStatus: string;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();

  const { clientStatus } = props;

  const requestListParams = { ...rest, pagination };

  const { data: requestList, isFetching: requestListFetching } = useGetRequestListQuery(requestListParams);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination, clientStatus };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <S.Table
        loading={requestListFetching}
        current={pagination.page}
        total={requestList?.total}
        dataSource={requestList?.list}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
