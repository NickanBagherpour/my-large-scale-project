import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { getValueOrDash } from '@oxygen/utils';
import { ColumnsType, HistoryCell, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { ServiceHistoryContent } from '../../types';

type AppProps = PageProps & {
  data?: any;
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
      title: t('column.edit_date'),
      dataIndex: 'modifyDate',
      // key: 'editDate',
      render: (value, record) => {
        return <div>{getValueOrDash(value?.value)}</div>;
      },
      // width: 130,
    },
    {
      title: t('column.admin_name'),
      dataIndex: 'modifyBy',
      // key: 'adminName',
      ellipsis: true,
      render: (value, record) => {
        return <div>{getValueOrDash(value?.value)}</div>;
      },
      // width: 100,
    },
    {
      title: t('column.en_name'),
      dataIndex: 'name',
      // key: 'enName',
      ellipsis: true,
      render: (value, record) => {
        return getValueOrDash(value?.value);
      },
      // width: 100,
    },
    {
      title: t('column.fa_name'),
      dataIndex: 'persianName',
      // key: 'faName',
      ellipsis: true,
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
      // width: 170,
    },
    // {
    //   title: t('column.method'),
    //   dataIndex: 'service.value.method',
    //   // key: 'method',
    //   render: (value, record) => {
    //     return getValueOrDash(value);
    //   },
    //   // width: 20,
    // },
    // {
    //   title: t('column.protocol'),
    //   dataIndex: 'service.value.protocol',
    //   // key: 'protocol',
    //   render: (value, record) => {
    //     // return getValueOrDash(convertShamsiDateFormat(value));
    //     return getValueOrDash(value);
    //   },
    //   // width: 1000,
    // },
    {
      title: t('column.access'),
      dataIndex: 'accessLevel',
      // key: 'access',
      render: (value, record) => {
        return getValueOrDash(value?.value);
      },
      // width: 100,
    },
    {
      title: t('column.category'),
      dataIndex: 'category',
      // key: 'category',
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
      // width: 120,
    },
    {
      title: t('column.throughput'),
      dataIndex: 'throughput',
      // key: 'throughout',
      render: (value, record) => {
        return getValueOrDash(value?.value);
      },
      // width: 120,
    },
    {
      title: t('column.version'),
      dataIndex: 'version',
      // key: 'version',
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
      // width: 80,
    },
    {
      title: t('column.owner'),
      dataIndex: 'owner',
      //key: 'owner',
      render: (value, _record, index) => {
        return <HistoryCell item={value} />;
      },
      // width: 120,
    },
  ];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <>
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
    </>
  );
};
export default DataTable;
