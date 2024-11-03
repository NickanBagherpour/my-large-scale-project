import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps, type Pagination } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
import * as S from './data-table.style';
import type { TablePaginationConfig } from 'antd';
import { useGetScopeListQuery } from '../../services/get-scope-list.api';
import { getDesktopColumns, getMobileColumns } from '../../utils/scopes-list.util';

type DataTableProps = PageProps & {
  //
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
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
      <S.Table
        loading={isFetching}
        current={page}
        total={data?.total}
        dataSource={data?.list}
        pagination={{ pageSize: rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        scroll={{ x: 'max-content' }}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
