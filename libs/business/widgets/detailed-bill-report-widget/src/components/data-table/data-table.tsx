import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { TablePaginationConfig } from 'antd';
import { useState } from 'react';
import Expandable from '../expandable/expandable';
import { InfoData } from '../../types';

type Props = {
  list: InfoData['clientDataList'];
};

export default function DataTable(props: Props) {
  const { list } = props;
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
      dataIndex: 'gatewayId', // TODO: get nationalId instead of this
    },
  ];

  return (
    <Table
      loading={false}
      current={page}
      // total={30}
      dataSource={list}
      // pagination={{ pageSize: size }}
      pagination={false}
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
