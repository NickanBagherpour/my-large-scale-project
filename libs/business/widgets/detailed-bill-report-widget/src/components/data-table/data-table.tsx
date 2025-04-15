import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { TablePaginationConfig } from 'antd';
import { useState } from 'react';
import Expandable from '../expandable/expandable';
import { clients } from '../../utils/consts';

export default function DataTable() {
  const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { page, size } = pagination;
  const [t] = useTr();

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === size ? current : 1,
        size: pageSize,
      });
    }
  };

  // TODO: handle responsivness, tooltip, etc.
  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
      width: '8rem',
    },
    {
      title: t('client'),
      dataIndex: 'name',
    },
    {
      title: t('national_id'),
      dataIndex: 'nationalId',
    },
  ];

  return (
    <Table
      loading={false}
      current={page}
      total={30}
      dataSource={clients}
      pagination={{ pageSize: size }}
      columns={columns}
      // mobileColumns={mobileColumns}
      onChange={changePage}
      rowKey={(row) => row.index}
      expandable={{
        expandedRowRender: (record) => <Expandable record={record} />,
      }}
    />
  );
}
