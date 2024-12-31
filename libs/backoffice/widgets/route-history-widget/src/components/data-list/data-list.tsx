import React from 'react';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';
import { NoResult } from '@oxygen/reusable-components';
import { Table } from '@oxygen/ui-kit';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns } from '../../utils/data-list.util';
import { useGetRouteHistoryQuery } from '../../services';

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
    table: { pagination },
  } = state;

  const { data, isFetching } = useGetRouteHistoryQuery(prepareParams());

  function prepareParams() {
    const params = {
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

  return (
    <S.TableContainer>
      {data?.content?.length ? (
        <Table
          scroll={{ x: 1600 }}
          loading={isFetching}
          current={pagination.page}
          total={data?.total}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={desktopColumns}
          variant={'complex'}
          title={t('scope_change_history')}
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
