import React, { useState } from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps, type Pagination } from '@oxygen/types';

import { useGetRequestListQuery } from '../../services';
import { useAppDispatch, useAppState } from '../../context';

import { getDesktopColumns, getMobileColumns } from '../../utils/request-list.util';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../../utils/consts';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  //
  clientStatus: string;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, ...rest } = useAppState();
  const [t] = useTr();
  const { clientStatus } = props;

  const [pagination, setPagination] = useState<Pagination>({ page: INITIAL_PAGE, rowsPerPage: INITIAL_ROW_PER_PAGE });
  const { page, rowsPerPage } = pagination;

  const { data: requestList, isFetching } = useGetRequestListQuery({ ...rest, pagination });

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current : 1,
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
        loading={isFetching}
        current={page}
        total={requestList?.total}
        dataSource={requestList?.list}
        pagination={{ pageSize: rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
