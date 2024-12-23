import React from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps, typeScopeListParams } from '@oxygen/types';
import { Table } from '@oxygen/ui-kit';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import { useGetScopeListQuery } from '../../services';
import { getDesktopColumns, getMobileColumns } from '../../utils/scopes-list.util';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  //
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { pagination, searchField } = useAppState();
  const [t] = useTr();

  const scopeListParams: typeScopeListParams = {
    'search-field': searchField,
    page: pagination.page,
    size: pagination.pageSize,
    sort: '',
  };

  const { data: scopeListData, isFetching: scopeListLoading } = useGetScopeListQuery(scopeListParams);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: pageSize === pagination.pageSize ? current : 1,
        pageSize: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <Table
        title={t('table.title')}
        loading={scopeListLoading}
        current={pagination.page}
        total={scopeListData?.totalElements}
        dataSource={scopeListData?.content}
        pagination={{ pageSize: pagination.pageSize }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
    </S.DataTableContainer>
  );
};

export default DataTable;
