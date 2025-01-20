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
      title: t('column.edit-date'),
      dataIndex: 'modifyDate',
      // key: 'editDate',
      render: (value, record) => {
        return <div>{getValueOrDash(value.value)}</div>;
      },
      // width: 130,
    },
    {
      title: t('column.admin-name'),
      dataIndex: 'modifyBy',
      // key: 'adminName',
      ellipsis: true,
      render: (value, record) => {
        return <div>{getValueOrDash(value.value)}</div>;
      },
      // width: 100,
    },
    {
      title: t('column.en-name'),
      dataIndex: 'service',
      // key: 'enName',
      ellipsis: true,
      className: 'left-to-right',
      render: (value, record) => {
        return getValueOrDash(value?.value?.name.value);
      },
      // width: 100,
    },
    {
      title: t('column.fa-name'),
      dataIndex: 'service',
      // key: 'faName',
      ellipsis: true,
      className: 'right-to-left',
      render: (value, _record, index) => {
        return <HistoryCell item={value.value.persianName} />;
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
      dataIndex: 'service',
      // key: 'access',
      render: (value, record) => {
        return getValueOrDash(value.value.accessLevel.value.title.value);
      },
      // width: 100,
    },
    {
      title: t('column.category'),
      dataIndex: 'service',
      // key: 'category',
      render: (value, _record, index) => {
        return <HistoryCell item={value?.value?.category?.value?.title} />;
      },
      // width: 120,
    },
    {
      title: t('column.throughput'),
      dataIndex: 'service',
      // key: 'throughout',
      render: (value, record) => {
        return getValueOrDash(value?.value.throughput.value.title.value);
      },
      // width: 120,
    },
    {
      title: t('column.version'),
      dataIndex: 'service',
      // key: 'version',
      render: (value, _record, index) => {
        return <HistoryCell item={value?.value?.version} />;
      },
      // width: 80,
    },
    {
      title: t('column.owner'),
      dataIndex: 'service',
      //key: 'owner',
      render: (value, _record, index) => {
        return <HistoryCell item={value?.value?.owner} />;
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
          scroll={{ x: 1600 }}
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
