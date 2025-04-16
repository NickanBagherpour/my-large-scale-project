import { Table } from '@oxygen/ui-kit';
import { TFunction } from 'i18next';
import { FinancialReportData } from '../types';

type Props = {
  t: TFunction;
};

export const getDesktopColumns = (props: Props) => {
  const { t } = props;
  return [
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
};

export const getMobileColumns = (props: { t: TFunction }) => {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render(record: FinancialReportData[number]) {
        const data = [
          {
            title: t('period'),
            value: 'hello',
          },
          {
            title: t('successful_transaction'),
            value: 'successCount',
          },
          {
            title: t('unsuccessful_transaction'),
            value: 'failedCount',
          },
          {
            title: t('total_transaction_count'),
            value: 'totalAmount',
          },
          {
            title: t('commission_fee_price'),
            value: 'feePriceRiyal',
          },
          {
            title: t('total_amount'),
            value: 'totalAmountRiyal',
          },
        ];

        /* using rem to have a constant height acorss all user devices */
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
};
