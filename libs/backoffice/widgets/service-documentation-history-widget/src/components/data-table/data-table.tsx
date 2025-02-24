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

  const serviceName = searchParams.get('service-name') || '';

  const { data, isFetching } = useGetServiceDocumentationHistory({
    page: page - 1,
    size: limit,
    serviceName,
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
      dataIndex: 'userName',
      key: 'userName',
      render: (column) => {
        return <HistoryCell item={column} />;
      },
    },
    {
      title: t('column.revision-type'),
      dataIndex: 'revisionDto',
      key: 'revisionDto',
      render: (column) => {
        const variant = column.revType?.code?.value;

        return <S.RevisionType variant={variant}>{getValueOrDash(column?.revType?.title?.value)}</S.RevisionType>;
      },
    },
    {
      title: t('column.file-name'),
      dataIndex: 'serviceDocumentDto',
      key: 'serviceDocumentDto',
      ellipsis: true,
      className: 'right-to-left',

      render: (column) => {
        return getValueOrDash(column.fileName?.value);
      },
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
