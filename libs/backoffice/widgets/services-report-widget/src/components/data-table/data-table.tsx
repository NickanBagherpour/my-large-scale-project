import React, { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { getDesktopColumns, getMobileColumns } from '../../utils/data-table.util';
import { updatePaginationAction, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  isLoading: boolean;
  data: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const { data, isLoading } = props;
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();

  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;

    if (lastValidTotal) setLastTotal(lastValidTotal);

    if (pageSize && current) {
      updatePaginationAction(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.TableContainer>
      <S.Table
        loading={isLoading}
        current={pagination.page}
        total={data?.totalElements}
        dataSource={data?.content}
        pagination={{
          ...pagination,
          total: data?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: pagination?.rowsPerPage,
          current: pagination?.page,
          hideOnSinglePage: false,
        }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={handlePageChange}
        rowKey={'id'}
      />
    </S.TableContainer>
  );
};

export default DataTable;
