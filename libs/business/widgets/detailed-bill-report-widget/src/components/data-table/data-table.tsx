import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { TablePaginationConfig } from 'antd';
import { useState } from 'react';
import Expandable from '../expandable/expandable';
import { InfoData } from '../../types';
import { getDesktopColumns, getMobileColumns } from '../../utils/client-table';

type Props = {
  data: InfoData;
};

export default function DataTable(props: Props) {
  const {
    data: { clientDataList, billingYear, billingMonth },
  } = props;
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

  const desktopColumns = getDesktopColumns({ page, t, size });
  const mobileColumns = getMobileColumns({ t });

  return (
    <Table
      loading={false}
      current={page}
      dataSource={clientDataList}
      pagination={false}
      columns={desktopColumns}
      mobileColumns={mobileColumns}
      onChange={changePage}
      rowKey={(row) => row.gatewayId}
      expandable={{
        expandedRowRender: (record) => <Expandable year={billingYear} month={billingMonth} record={record} />,
        columnWidth: '7rem',
      }}
    />
  );
}
