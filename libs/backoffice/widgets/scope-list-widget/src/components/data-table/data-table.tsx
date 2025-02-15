import React from 'react';
import type { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { ScopeListData } from '../../types';
import { Table } from '@oxygen/ui-kit';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/scopes-list.util';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  scopeListData: ScopeListData | undefined;
  scopeListLoading: boolean;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { pagination } = useAppState();
  const { scopeListLoading, scopeListData } = props;
  const [t] = useTr();

  const dataTableParams = { t, pagination };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: pageSize === pagination.pageSize ? current : 1,
        pageSize: pageSize,
      });
    }
  };

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
