import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { ColumnsType, Table, HistoryCell } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';
import { convertShamsiDateFormat, getValueOrDash, uuid } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { useGetUpstreamHistory } from '../../services';
import { HistoryDifferenceObj } from '../../types';

import * as S from './data-table.style';

const DataTable = () => {
  const {
    pagination: { limit, page },
    pagination,
  } = useAppState();
  const searchParams = useSearchParams();

  const upstreamName = searchParams.get('upstream-name') || '';

  const { data, isFetching } = useGetUpstreamHistory({
    page: page - 1,
    size: limit,
    upstreamName,
  });

  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const dataSource = data?.content ?? [];

  if (!data?.content.length) return <NoResult isLoading={isFetching} />;

  const columns: ColumnsType<HistoryDifferenceObj> = [
    {
      title: t('column.edit-date'),
      dataIndex: 'modifyDate',
      render: (column) => convertShamsiDateFormat(column.value, true),
    },
    {
      title: t('column.user-name'),
      dataIndex: 'userName',
      ellipsis: true,
      render: (column) => {
        return <HistoryCell item={column} />;
      },
    },
    {
      title: t('column.revision-type'),
      dataIndex: 'revision',

      render: (column) => {
        const variant = column.revType?.code?.value;
        const isDeleted = column?.deleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(column?.revType?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('column.en-name'),
      dataIndex: 'upstream',
      key: 'enName',
      ellipsis: true,
      className: 'left-to-right',
      render: (column) => <HistoryCell item={column.name} />,
    },
    {
      title: t('column.fa-name'),
      dataIndex: 'upstream',
      key: 'faName',
      ellipsis: true,
      className: 'right-to-left',
      render: (column) => <HistoryCell item={column.description} />,
    },
  ];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <S.TableContainer>
      <Table
        rowKey={(row) => row?.revision?.revNumber?.value || `fallback-${uuid()}`}
        title={t('subtitle')}
        size='small'
        variant='complex'
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
        pagination={{
          ...pagination,
          total: data?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: pagination.limit,
          current: pagination.page,
          hideOnSinglePage: false,
        }}
        scroll={undefined}
        onChange={handlePageChange}
        showHeader={true}
      />
    </S.TableContainer>
  );
};
export default DataTable;
