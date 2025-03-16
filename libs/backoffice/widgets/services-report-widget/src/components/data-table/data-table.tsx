import React from 'react';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { getDesktopColumns, getMobileColumns } from '../../utils/data-table.util';
import { updatePaginationAction, useAppDispatch, useAppState } from '../../context';
import { ServicesReportResponseType } from '../../types';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  isLoading: boolean;
  data: ServicesReportResponseType;
  wordToHighlight: string;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const { data, isLoading, wordToHighlight } = props;
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();
  const theme = useTheme();

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePaginationAction(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination, wordToHighlight, theme };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.TableContainer>
      {data?.content?.length ? (
        <S.Table
          loading={isLoading}
          current={pagination.page}
          total={data?.totalElements}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          variant={'simple'}
          onChange={handlePageChange}
          rowKey={'id'}
          minHeight={'auto'}
        />
      ) : (
        <NoResult isLoading={isLoading} />
      )}
    </S.TableContainer>
  );
};

export default DataTable;
