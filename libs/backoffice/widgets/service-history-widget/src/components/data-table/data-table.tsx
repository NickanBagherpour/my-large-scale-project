import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { convertShamsiDateFormat, getValueOrDash } from '@oxygen/utils';
import { ColumnsType, HistoryCell, Table, Tooltip } from '@oxygen/ui-kit';
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
      render: (column) => (
        <Tooltip title={convertShamsiDateFormat(column?.value)}>{convertShamsiDateFormat(column?.value, true)}</Tooltip>
      ),
    },
    {
      title: t('field.user_name'),
      dataIndex: 'userName',
      render: (column) => (
        <Tooltip title={column?.value}>
          <HistoryCell item={column} />
        </Tooltip>
      ),
    },
    {
      title: t('field.revision_type'),
      dataIndex: 'revisionDto',
      align: 'center',
      width: 'min-content',
      ellipsis: false,
      render: (_value, record) => {
        const variant = record?.revisionDto?.revType?.code?.value;
        const isDeleted = record?.isDeleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(record?.revisionDto?.revType?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('field.en_name'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.name?.value;
        const hasDifference = item?.name?.hasDifference;
        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.fa_name'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.persianName?.value;
        const hasDifference = item?.persianName?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.access'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.accessLevel?.title?.value;
        const hasDifference = item?.accessLevel?.title?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.category'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.category?.title?.value;
        const hasDifference = item?.category?.title?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.throughput'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.throughput?.title?.value;
        const hasDifference = item?.throughput?.title?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.version'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.version?.value;
        const hasDifference = item?.version?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('field.owner'),
      dataIndex: 'service',
      render: (item) => {
        const value = item?.owner?.value;
        const hasDifference = item?.owner?.hasDifference;

        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
  ];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal);
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <>
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
          rowKey={(row) => row?.revisionDto?.revNumber?.value || row?.modifyDate?.value + row?.userName?.value}
          onChange={handlePageChange}
          showHeader={true}
          minHeight={'auto'}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </>
  );
};
export default DataTable;
