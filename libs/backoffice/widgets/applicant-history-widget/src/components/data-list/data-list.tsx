import React from 'react';

import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Table } from '@oxygen/ui-kit';
import { uuid } from '@oxygen/utils';

import { getDesktopColumns, getMobileColumns } from '../../utils/data-list.util';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetReportDataQuery } from '../../services';

import * as S from './data-list.style';

type dataListProps = PageProps & {
  //
};

const DataList: React.FC<dataListProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const theme = useTheme();

  const {
    table: { pagination = { page: 1, rowsPerPage: 10 } } = { pagination: { page: 1, rowsPerPage: 10 } }, // Fallback for pagination
  } = state || {};

  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      applicantId: state?.applicantId,
      ...pagination,
    };

    return params;
  }

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;

    if (pageSize && current) {
      const updatedPagination = {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      };
      updatePagination(dispatch, updatedPagination);
    }
  };

  const desktopColumns = getDesktopColumns({ t, theme });
  const mobileColumns = getMobileColumns({ t, theme });

  return (
    <S.TableContainer>
      {data?.content?.length ? (
        <Table
          loading={isFetching}
          current={pagination.page}
          total={data?.total}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={desktopColumns}
          // mobileColumns={mobileColumns}
          variant={'complex'}
          title={t('table.applicant_change_history')}
          // hasContainer={true}
          onChange={handlePageChange}
          rowKey={() => uuid()}
          size={'small'}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.TableContainer>
  );
};

export default DataList;
