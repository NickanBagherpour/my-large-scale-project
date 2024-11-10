import { useState } from 'react';

import { TablePaginationConfig } from 'antd';
import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { PageProps } from '@oxygen/types';

import { useGetsServiceHistoryDataQuery } from '../../services';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

import * as S from './data-table.style';
import { useSearchParams } from 'next/navigation';

type AppProps = PageProps & {
  //
};
const DataTable: React.FC<AppProps> = () => {
  const { table } = useAppState();
  const searchParams = useSearchParams();

  const id = searchParams.get('historyId') || '';
  const { data, isFetching } = useGetsServiceHistoryDataQuery(prepareParams());
  const lastValidTotal = data?.paginationResult.total;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);
  const [t] = useTr();
  const displayTable = true;
  const dispatch = useAppDispatch();
  const dataSource = data?.items || [];
  const columns: ColumnsType<any> = [
    {
      title: t('column.edit-date'),
      dataIndex: 'editDate',
      key: 'editDate',
      render: (value, record) => {
        return <div>{getValueOrDash(value)}</div>;
      },
      width: 130,
    },
    {
      title: t('column.admin-name'),
      dataIndex: 'adminName',
      key: 'adminName',
      ellipsis: true,
      render: (value, record) => {
        return <div>{getValueOrDash(value)}</div>;
      },
      width: 100,
    },
    {
      title: t('column.en-name'),
      dataIndex: 'enName',
      key: 'enName',
      ellipsis: true,
      className: 'left-to-right',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 130,
    },
    {
      title: t('column.fa-name'),
      dataIndex: 'faName',
      key: 'faName',
      ellipsis: true,
      className: 'right-to-left',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 170,
    },
    {
      title: t('column.method'),
      dataIndex: 'method',
      key: 'method',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 100,
    },
    {
      title: t('column.protocol'),
      dataIndex: 'protocol',
      key: 'protocol',
      render: (value, record) => {
        // return getValueOrDash(convertShamsiDateFormat(value));
        return getValueOrDash(value);
      },
      width: 100,
    },
    {
      title: t('column.access'),
      dataIndex: 'access',
      key: 'access',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 100,
    },
    {
      title: t('column.category'),
      dataIndex: 'category',
      key: 'category',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 120,
    },
    {
      title: t('column.throughout'),
      dataIndex: 'throughout',
      key: 'throughout',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 120,
    },
    {
      title: t('column.version'),
      dataIndex: 'version',
      key: 'version',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 80,
    },
    {
      title: t('column.owner'),
      dataIndex: 'owner',
      key: 'owner',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 120,
    },
    {
      title: t('column.tags'),
      dataIndex: 'tags',
      key: 'tags',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 120,
    },
    {
      title: t('column.tags'),
      dataIndex: 'tags',
      key: 'tags',
      render: (value, record) => {
        return getValueOrDash(value);
      },
      width: 120,
    },
    {
      title: t('column.tags'),
      dataIndex: 'tags',
      key: 'tags',
      render: (value, record) => {
        return getValueOrDash(value);
      },
    },
  ];
  function prepareParams() {
    const params = {
      pagination: table?.pagination,
      id,
    };
    return params;
  }
  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal);
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <>
      {displayTable ? (
        <S.TableContainer>
          <Table
            size='small'
            scroll={{ x: 1000 }}
            variant='complex'
            columns={columns}
            dataSource={dataSource}
            loading={isFetching}
            pagination={{
              ...table?.pagination,
              total: data?.paginationResult.total || lastTotal,
              pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
              pageSize: table?.pagination?.limit,
              current: table?.pagination?.page,
              hideOnSinglePage: false,
            }}
            onChange={handlePageChange}
          />
        </S.TableContainer>
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </>
  );
};
export default DataTable;
