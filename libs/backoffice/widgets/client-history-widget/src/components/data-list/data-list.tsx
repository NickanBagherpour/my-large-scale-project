import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { uuid } from '@oxygen/utils';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns } from '../../utils/data-list.util';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { NormalizedClientHistoryResponse } from '../../types';

import * as S from './data-list.style';

type dataListProps = {
  data: NormalizedClientHistoryResponse;
  isFetching: boolean;
};

const DataList: React.FC<dataListProps> = (props) => {
  const { data, isFetching } = props;
  const dataSource = data?.content || [];
  const dispatch = useAppDispatch();
  const {
    table: { pagination },
  } = useAppState();
  const [t] = useTr();

  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  const clientType = data?.commonClientInfoDto?.clientType?.title;

  const desktopColumns = getDesktopColumns({ t, clientType });

  return (
    <S.TableContainer>
      {dataSource?.length ? (
        <Table
          loading={isFetching}
          dataSource={dataSource}
          pagination={{
            ...pagination,
            total: data?.totalElements || lastTotal,
            pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
            pageSize: pagination?.limit,
            current: pagination?.page,
            hideOnSinglePage: false,
          }}
          columns={desktopColumns}
          title={t('widget_name')}
          onChange={handlePageChange}
          rowKey={(row) => row?.revNumber?.value || `fallback-${uuid()}`}
          variant={'complex'}
          showHeader={true}
          size={'small'}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.TableContainer>
  );
};

export default DataList;
