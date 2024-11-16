import React from 'react';

import { useTr } from '@oxygen/translation';

import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { uuid } from '@oxygen/utils';
import { Table } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';
import { PageProps } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/data-list.util';
import { useGetReportDataQuery } from '../../services';

import * as S from './data-list.style';

type dataListProps = PageProps & {
  //
};

const DataList: React.FC<dataListProps> = (props) => {
  // const { data, isFetching } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const theme = useTheme();

  const {
    table: { pagination },
  } = state;

  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      clientId: state?.clientId,
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
      {data?.content ? (
        <Table
          loading={isFetching}
          current={pagination.page}
          total={data?.total}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={desktopColumns}
          // mobileColumns={mobileColumns}
          variant={'complex'}
          title={t('table.client_change_history')}
          // hasContainer={true}
          onChange={handlePageChange}
          rowKey={() => uuid()}
          size={'small'}
          // tableLayout="fixed"
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.TableContainer>
  );
};

export default DataList;
