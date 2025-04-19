import { Table, type ColumnsType } from '@oxygen/ui-kit';
import { TFunction } from 'i18next';
import { FinancialReportData } from '../types';
import { addThousandSeparator, CONSTANTS, getValueOrDash, numberToPersian } from '@oxygen/utils';
import { Tooltip } from 'antd';
import * as S from '../components/expandable/expandable.style';

const getRange = (report: FinancialReportData[number], t: TFunction) => {
  const { fromRate, toRate } = report;

  if (!fromRate && !toRate) return '-';

  if (!fromRate) return `${t('common.to')} ${numberToPersian(toRate)} ${t('common.rial')}`;

  if (!toRate) return `${t('more_than')} ${numberToPersian(fromRate)} ${t('common.rial')}`;

  return `${t('between')} ${numberToPersian(fromRate)} ${t('and')} ${numberToPersian(toRate)} ${t('common.rial')}`;
};

type Props = {
  t: TFunction;
};

export const getDesktopColumns = (props: Props): ColumnsType<FinancialReportData[number]> => {
  const { t } = props;
  return [
    {
      title: t('common.index'),
      dataIndex: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        return index + 1;
      },
    },
    {
      title: t('period'),
      key: 'range',
      render: (record: FinancialReportData[number]) => {
        const value = getRange(record, t);
        return (
          <Tooltip arrow={false} placement='topRight' title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: t('successful_transaction'),
      dataIndex: 'successCount',
      render(count) {
        const value = getValueOrDash(addThousandSeparator(count));
        return (
          <Tooltip title={value}>
            <S.Success>{value}</S.Success>
          </Tooltip>
        );
      },
    },
    {
      title: t('unsuccessful_transaction'),
      dataIndex: 'failedCount',
      render(count) {
        const value = getValueOrDash(addThousandSeparator(count));
        return (
          <Tooltip title={value}>
            <S.Failure>{value}</S.Failure>
          </Tooltip>
        );
      },
    },
    {
      title: t('total_transaction_count'),
      dataIndex: 'totalAmount',
      render(count) {
        const value = getValueOrDash(addThousandSeparator(count));
        return (
          <Tooltip title={value}>
            <S.TotalCount>{value}</S.TotalCount>
          </Tooltip>
        );
      },
    },
    {
      title: t('commission_fee_price'),
      dataIndex: 'feePriceRiyal',
      render(count) {
        // const value = getValueOrDash(addThousandSeparator(count));
        const value = '???';
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
    {
      title: t('total_amount'),
      dataIndex: 'totalAmountRiyal',
      render(count) {
        // const value = getValueOrDash(addThousandSeparator(count));
        const value = '???';
        return (
          <Tooltip title={value}>
            <S.TotalMoney>{value}</S.TotalMoney>
          </Tooltip>
        );
      },
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
            value: getRange(record, t),
          },
          {
            title: t('successful_transaction'),
            value: <S.Success>{getValueOrDash(addThousandSeparator(record.successCount))}</S.Success>,
          },
          {
            title: t('unsuccessful_transaction'),
            value: <S.Failure>{getValueOrDash(addThousandSeparator(record.failedCount))}</S.Failure>,
          },
          {
            title: t('total_transaction_count'),
            value: <S.TotalCount>{getValueOrDash(addThousandSeparator(record.totalAmount))}</S.TotalCount>,
          },
          {
            title: t('commission_fee_price'),
            value: <S.TotalCount>???</S.TotalCount>,
          },
          {
            title: t('total_amount'),
            value: <S.TotalMoney>???</S.TotalMoney>,
          },
        ];

        /* using rem to have a constant height acorss all user devices */
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
};
