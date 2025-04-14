import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { clients } from '../../utils/consts';

const onChange = (key: string) => {
  console.log(key);
};

type Props = {
  record: (typeof clients)[number];
};

export default function Expandable(props: Props) {
  const { record } = props;
  const [t] = useTr();

  const dataSource = record.data;

  // TODO: handle responsivness, tooltip, etc.
  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
    },
    {
      title: t('period'),
      dataIndex: 'range',
    },
    {
      title: t('successful_transaction'),
      dataIndex: 'successfulTransaction',
    },
    {
      title: t('unsuccessful_transaction'),
      dataIndex: 'unsuccessfulTransaction',
    },
    {
      title: t('total_transaction_count'),
      dataIndex: 'totalTransactionsCountAll',
    },
    {
      title: t('commission_fee_price'),
      dataIndex: 'feePriceRiyal',
    },
    {
      title: t('total_amount'),
      dataIndex: 'totalAmountRiyal',
    },
  ];

  const table = (
    <Table
      loading={false}
      // current={page}
      total={30}
      dataSource={dataSource}
      // pagination={{ pageSize: size }}
      columns={columns}
      // mobileColumns={mobileColumns}
      // onChange={changePage}
      rowKey={(row) => row.index}
      pagination={false}
    />
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
