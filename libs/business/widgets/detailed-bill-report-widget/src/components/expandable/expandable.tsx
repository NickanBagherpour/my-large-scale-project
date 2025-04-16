import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { useGetFinancialReportQuery /* , useGetNonFinancialReportQuery */ } from '../../services';
import { InfoData } from '../../types';
import { getDesktopColumns } from '../../utils/expandable-table';
import * as S from './expandable.style';

const onChange = (key: string) => {
  console.log(key);
};

type Props = {
  record: InfoData['clientDataList'][number];
  year: number;
  month: number;
};

export default function Expandable(props: Props) {
  const { record, year, month } = props;
  const [t] = useTr();
  console.log('>>> record', record.gatewayId);

  const { data: finincialData } = useGetFinancialReportQuery({
    year,
    month,
    gatewayId: record.gatewayId,
  });

  // const { data: nonfinancialData } = useGetNonFinancialReportQuery();

  // TODO: handle responsivness, tooltip, etc.
  const columns = getDesktopColumns({ t });

  const table = (
    <>
      <Table
        loading={false}
        // current={page}
        total={30}
        dataSource={finincialData}
        // pagination={{ pageSize: size }}
        columns={columns}
        // mobileColumns={mobileColumns}
        // onChange={changePage}
        rowKey={(row) => row.index}
        pagination={false}
      />
      <S.Sum>5,456,789,212,000</S.Sum>
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('non_financial_services_invoice'),
      children: table,
    },
    {
      key: '2',
      label: t('financial_services_invoice'),
      children: table,
    },
  ];

  return <Tabs size='small' defaultActiveKey='1' items={items} onChange={onChange} />;
}
