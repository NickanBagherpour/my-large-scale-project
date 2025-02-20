import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { getValueOrDash } from '@oxygen/utils';
import { ColumnsType, HistoryCell, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { PageProps, PaginatedData } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { ServiceHistoryContent } from '../../types';

import * as S from './data-table.style';

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
  const dataSource = data?.content || [];
  const columns: ColumnsType<ServiceHistoryContent> = [
    {
      title: t('field.edit_date'),
      dataIndex: 'modifyDate',
      render: (column) => {
        return <div>{getValueOrDash(column?.value)}</div>;
      },
    },
    {
      title: t('field.user_name'),
      dataIndex: 'userName',
      ellipsis: true,
      render: (column) => {
        return <HistoryCell item={column} />;
      },
    },
    {
      title: t('field.revision_type'),
      dataIndex: 'revisionDto',
      align: 'center',
      width: 'min-content',
      render: (_value, record) => {
        const variant = record?.revisionDto?.revType?.code.value;
        const isDeleted = record?.isDeleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(record?.revisionDto?.revType?.title.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('field.en_name'),
      dataIndex: 'service',
      ellipsis: true,
      render: (item) => {
        const value = item?.name.value;
        const hasDifference = item?.name?.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.fa_name'),
      dataIndex: 'service',
      ellipsis: true,
      render: (item) => {
        const value = item?.persianName.value;
        const hasDifference = item?.persianName.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.access'),
      dataIndex: 'service',
      render: (item) => {
        console.log(item, 'irwwdwdssd');

        const value = item?.accessLevel?.title.value;
        const hasDifference = item?.accessLevel?.title.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.category'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.category?.title.value;
        const hasDifference = item?.category?.title.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.throughput'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.throughput?.title.value;
        const hasDifference = item?.throughput?.title.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.version'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.version?.value;
        const hasDifference = item?.version?.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.owner'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.owner?.value;
        const hasDifference = item?.owner?.hasDifference;

        return <HistoryCell item={{ value, hasDifference }} />;
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
          title={t('subtitle')}
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
          rowKey={(row) => row.modifyDate.value + row.userName.value}
          onChange={handlePageChange}
          showHeader={true}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </div>
  );
};
export default DataTable;
