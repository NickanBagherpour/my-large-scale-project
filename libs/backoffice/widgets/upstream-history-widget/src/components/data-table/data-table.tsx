import { useSearchParams } from 'next/navigation';
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
  function prepareParams() {
    const params = {
      pagination: table?.pagination,
      id,
    };
    return params;
  }
  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  return (
    <>
      {displayTable ? (
        <S.TableContainer>
          <Table
            rowKey={'id'}
            title={t('subtitle')}
            size='small'
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
            scroll={undefined}
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
