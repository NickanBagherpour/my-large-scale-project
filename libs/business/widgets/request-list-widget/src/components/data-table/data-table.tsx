import React, { useState } from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps, type Pagination } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import { useGetScopeListQuery } from '../../services/get-report.api';
import { getDesktopColumns, getMobileColumns } from '../../utils/scopes-list.util';

import * as S from './data-table.style';
import { Table } from '@oxygen/ui-kit';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../../utils/consts';

type DataTableProps = PageProps & {
  //
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [pagination, setPagination] = useState<Pagination>({ page: INITIAL_PAGE, rowsPerPage: INITIAL_ROW_PER_PAGE });
  const { page, rowsPerPage } = pagination;

  const { data, isFetching } = useGetScopeListQuery(pagination);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <Table
        loading={isFetching}
        current={page}
        total={data?.total}
        dataSource={data?.list}
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
