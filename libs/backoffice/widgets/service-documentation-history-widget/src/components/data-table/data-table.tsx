import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { uuid } from '@oxygen/utils';
import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ColumnsType, Table, HistoryCell } from '@oxygen/ui-kit';
import { getValueOrDash, convertShamsiDateFormat } from '@oxygen/utils';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

import * as S from './data-table.style';
import { useGetServiceDocumentationHistory } from '../../services';
import { HistoryDifferenceObj } from '../../types';

const DataTable = () => {
  const {
    pagination: { limit, page },
    pagination,
  } = useAppState();
  const searchParams = useSearchParams();

  const upstreamName = searchParams.get('upstream-name') || '';

  const { data, isFetching } = useGetServiceDocumentationHistory({
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
      key: 'modifyDate',
      render: (column) => {
        return convertShamsiDateFormat(column.value);
      },
    },
    {
      title: t('column.user-name'),
      dataIndex: 'modifyBy',
      key: 'modifyBy',
      render: (column) => getValueOrDash(column.value),
    },
    {
      title: t('column.revision-type'),
      dataIndex: 'upstream',
      key: 'actionType',
      ellipsis: true,
      className: 'left-to-right',
      render: (column) => <HistoryCell item={column?.name} />,
      // render: (column) => getValueOrDash(column.value),
      // render: (_value, record) => {
      //   const variant = record?.revType?.code?.value;
      //   const isDeleted = record?.deleted?.value;
      //   return (
      //     <S.RevisionType variant={variant} isDeleted={isDeleted}>
      //       {getValueOrDash(record?.revType?.title?.value)}
      //     </S.RevisionType>
      //   );
      // },
    },
    {
      title: t('column.file-name'),
      dataIndex: 'upstream',
      key: 'fileName',
      ellipsis: true,
      className: 'right-to-left',
      // render: (column) => <HistoryCell item={column.description} />,
      render: (column) => getValueOrDash(column.value),
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
        rowKey={() => uuid()}
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
      />
    </S.TableContainer>
  );
};
export default DataTable;
