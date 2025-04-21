import { Table, type ColumnsType } from '@oxygen/ui-kit';
import { TFunction } from 'i18next';
import { FinancialReportData, NonfinancialReportData } from '../types';
import { addThousandSeparator, CONSTANTS, getValueOrDash, numberToPersian } from '@oxygen/utils';
import { Tooltip } from 'antd';
import * as S from '../components/expandable/expandable.style';
import { TabKey } from '../types/tabs.type';

const getRange = (report: FinancialReportData[number], t: TFunction) => {
  const { fromRate, toRate } = report;

  if (!fromRate && !toRate) return '-';

  if (!fromRate) return `${t('common.to')} ${numberToPersian(toRate)} ${t('common.rial')}`;

  if (!toRate) return `${t('more_than')} ${numberToPersian(fromRate)} ${t('common.rial')}`;

  return `${t('between')} ${numberToPersian(fromRate)} ${t('and')} ${numberToPersian(toRate)} ${t('common.rial')}`;
};

type DesktopProps = {
  t: TFunction;
  activeTab: TabKey;
};

export const getDesktopColumns = (
  props: DesktopProps
): ColumnsType<FinancialReportData[number] | NonfinancialReportData[number]> => {
  const { t, activeTab } = props;
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
      title: activeTab === 'financial' ? t('period') : t('servcie_name'),
      key: 'first_column',
      render: (record: FinancialReportData[number] | NonfinancialReportData[number]) => {
        const value = 'persianName' in record ? record.persianName : getRange(record, t);
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

type MobileProps = {
  t: TFunction;
};

export const getMobileColumns = (props: MobileProps) => {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render(record: FinancialReportData[number] | NonfinancialReportData[number]) {
        const data = [
          {
            ...('persianName' in record
              ? {
                  title: t('servcie_name'),
                  value: record.persianName,
                }
              : {
                  title: t('period'),
                  value: getRange(record, t),
                }),
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
            // @ts-expect-error fix me
            value: <S.TotalCount>{getValueOrDash(addThousandSeparator(record?.totalAmount))}</S.TotalCount>,
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
