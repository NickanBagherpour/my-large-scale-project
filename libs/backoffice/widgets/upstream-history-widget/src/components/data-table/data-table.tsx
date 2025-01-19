import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ColumnsType, Table, HistoryCell } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { PageProps } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

import * as S from './data-table.style';
import { useGetUpstreamHistory, type HistoryDifferenceObj } from '../../services';

type AppProps = PageProps & {
  //
};

const DataTable: React.FC<AppProps> = () => {
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
  const hasResults = !data?.empty;

  const columns: ColumnsType<HistoryDifferenceObj> = [
    {
      title: t('column.edit-date'),
      dataIndex: 'modifyDate',
      // key: 'editDate',
      render: (value, _record, index) => {
        return getValueOrDash(value?.value); // TODO: this should display value.value
      },
      // width: 50,
    },
    {
      title: t('column.admin-name'),
      dataIndex: 'modifyBy',
      // key: 'adminName',
      ellipsis: true,
      render: (value, _record, index) => {
        return getValueOrDash(value?.value);
      },
      // width: 50,
    },
    {
      title: t('column.en-name'),
      dataIndex: 'upstream',
      key: 'enName',
      ellipsis: true,
      className: 'left-to-right',
      render: (value, _record, index) => {
        return <HistoryCell item={value.value.name} />;
      },
      // width: 50,
    },
    {
      title: t('column.fa-name'),
      dataIndex: 'upstream',
      key: 'faName',
      ellipsis: true,
      className: 'right-to-left',
      render: (value, _record, index) => {
        return <HistoryCell item={value.value.description} />;
      },
      // width: 50,
    },
  ];

  const mobileColumns: ColumnsType<any> = [
    {
      title: t('column.edit-date'),
      dataIndex: 'editDate',
      // key: 'editDate',
      render: (value, record) => {
        return <div>{getValueOrDash(value)}</div>;
      },
      // width: 50,
    },
    {
      title: t('column.admin-name'),
      dataIndex: 'adminName',
      // key: 'adminName',
      ellipsis: true,
      render: (value, record) => {
        return <div>{getValueOrDash(value)}</div>;
      },
      // width: 50,
    },
    {
      title: t('column.en-name'),
      dataIndex: 'enName',
      // key: 'enName',
      ellipsis: true,
      className: 'left-to-right',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      // width: 50,
    },
    {
      title: t('column.fa-name'),
      dataIndex: 'faName',
      // key: 'faName',
      ellipsis: true,
      className: 'right-to-left',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      // width: 50,
    },
  ];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return hasResults ? (
    <S.TableContainer>
      <Table
        rowKey={'id'}
        title={t('subtitle')}
        size='small'
        variant='complex'
        columns={columns}
        mobileColumns={mobileColumns}
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
      />
    </S.TableContainer>
  ) : (
    <NoResult isLoading={isFetching} />
  );
};
export default DataTable;
