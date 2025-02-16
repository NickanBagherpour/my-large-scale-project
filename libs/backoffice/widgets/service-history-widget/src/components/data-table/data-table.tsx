import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { ColumnsType, HistoryCell, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { PageProps, PaginatedData } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { ServiceHistoryContent } from '../../types';
import { getValueOrDash } from '@oxygen/utils';

type AppProps = PageProps & {
  data?: PaginatedData<ServiceHistoryContent>;
  isFetching: boolean;
};
const DataTable: React.FC<AppProps> = ({ data, isFetching }) => {
  const { table } = useAppState();
  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);
  const [t] = useTr();
  const displayTable = data?.totalElements;
  const dispatch = useAppDispatch();
  const dataSource =
    data?.content?.map((c) => {
      const result = { ...c, ...c.service };
      delete result.service;
      return result;
    }) ?? [];
  const columns: ColumnsType<ServiceHistoryContent> = [
    {
      title: t('column.edit_date'),
      dataIndex: 'modifyDate',
      render: (value, record) => {
        return <div>{getValueOrDash(value?.value)}</div>;
      },
    },
    {
      title: t('column.user_name'),
      dataIndex: 'modifyBy',
      ellipsis: true,
      render: (value, record) => {
        return <HistoryCell item={value} />;
      },
    },
    {
      title: t('column.en_name'),
      dataIndex: 'name',
      ellipsis: true,
      render: (value, record) => {
        return <HistoryCell item={value} />;
      },
    },
    {
      title: t('column.fa_name'),
      dataIndex: 'persianName',
      ellipsis: true,
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
    },
    {
      title: t('column.access'),
      dataIndex: 'accessLevel',
      render: (value, record) => {
        return <HistoryCell item={value?.title} />;
      },
    },
    {
      title: t('column.category'),
      dataIndex: 'category',
      render: (value, _record, index) => {
        return <HistoryCell item={value?.title} />;
      },
    },
    {
      title: t('column.throughput'),
      dataIndex: 'throughput',
      render: (value, record) => {
        return <HistoryCell item={value?.title} />;
      },
    },
    {
      title: t('column.version'),
      dataIndex: 'version',
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
    },
    {
      title: t('column.owner'),
      dataIndex: 'owner',
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
    },
  ];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal);
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <div>
      {displayTable ? (
        <Table
          rowKey={'id'}
          title={t('subtitle')}
          scroll={{ x: 1000 }}
          size='small'
          variant='complex'
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
          pagination={{
            ...table?.pagination,
            total: data?.totalElements || lastTotal,
            pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
            pageSize: table?.pagination?.limit,
            current: table?.pagination?.page,
            hideOnSinglePage: false,
          }}
          onChange={handlePageChange}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </div>
  );
};
export default DataTable;
