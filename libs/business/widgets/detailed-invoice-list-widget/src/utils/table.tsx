import { Button, ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import * as S from '../components/data-table/data-table.style';
import { TFunction } from 'i18next';
import { clientTypeMap, getMonthsWithValues, years } from './consts';
import { updateMonthAction, updateYearAction, WidgetDispatchType, WidgetStateType } from '../context';
import { addThousandSeparator, CONSTANTS, getValueOrDash, ROUTES } from '@oxygen/utils';
import { Reports } from '../types';

export const getJalalliMonths = (t: TFunction) => {
  return {
    1: t('months.farvardin'),
    2: t('months.ordibehesht'),
    3: t('months.khordad'),
    4: t('months.tir'),
    5: t('months.mordad'),
    6: t('months.shahrivar'),
    7: t('months.mehr'),
    8: t('months.aban'),
    9: t('months.azar'),
    10: t('months.dey'),
    11: t('months.bahman'),
    12: t('months.esfand'),
  };
};

type DesktopProps = {
  size: number;
  page: number;
  t: TFunction;
  dispatch: WidgetDispatchType;
  year: WidgetStateType['year'];
  month: WidgetStateType['month'];
};

export const getDesktopColumns = (props: DesktopProps): ColumnsType<Reports['content'][number]> => {
  const { page, size, t, dispatch, year, month } = props;
  const jalliMonths = getJalalliMonths(t);

  return [
    {
      title: t('row'),
      dataIndex: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * size + 1;
        return start + index;
      },
    },
    {
      title: t('aggregator_or_client_name'),
      dataIndex: '',
      key: 'name',
      render: (record: Reports['content'][number]) => {
        const isAggregator = record.clientType === clientTypeMap['aggregator'];
        const value = getValueOrDash(record.name);
        return (
          <Tooltip title={value}>
            <S.Name>
              {isAggregator && <S.Icon className='icon-award' />}
              {value}
            </S.Name>
          </Tooltip>
        );
      },
    },
    {
      title: t('year'),
      dataIndex: 'year',
      filters: years,
      render: (year) => {
        const value = getValueOrDash(year);
        return <Tooltip title={value}>{value}</Tooltip>;
      },
      filterDropdown: ({ filters, close }) => {
        return (
          <S.Dropdown>
            {filters?.map((filter, idx) => (
              <li key={idx}>
                <S.FilterBtn
                  variant='text'
                  color='primary'
                  $active={filter.value === year}
                  onClick={() => {
                    close();
                    updateYearAction(dispatch, filter.value as number);
                  }}
                >
                  {filter.text}
                </S.FilterBtn>
              </li>
            ))}
          </S.Dropdown>
        );
      },
      filterIcon: () => <S.ChevIcon className='icon-chev-down' />,
    },
    {
      title: t('month'),
      dataIndex: 'month',
      filters: getMonthsWithValues(t),
      render: (month) => {
        const value = getValueOrDash(month);
        return <Tooltip title={value}>{jalliMonths[value]}</Tooltip>;
      },
      filterDropdown: ({ filters, close }) => {
        return (
          <S.Dropdown>
            {filters?.map((filter, idx) => (
              <li key={idx}>
                <S.FilterBtn
                  variant='text'
                  color='primary'
                  $active={filter.value === month}
                  onClick={() => {
                    close();
                    updateMonthAction(dispatch, filter.value as number);
                  }}
                >
                  {filter.text}
                </S.FilterBtn>
              </li>
            ))}
          </S.Dropdown>
        );
      },
      filterIcon: () => <S.ChevIcon className='icon-chev-down' />,
    },
    {
      title: t('successful_transaction'),
      dataIndex: 'successCount',
      render: (count) => {
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
      render: (count) => {
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
      dataIndex: 'allCount',
      render: (count) => {
        const value = getValueOrDash(addThousandSeparator(count));
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
    {
      title: '',
      key: 'details',
      width: '15rem',
      render: (record) => {
        return (
          <Button
            variant='link'
            href={`${ROUTES.BUSINESS.DETAILED_INVOICE}?id=${record.id}&client-type=${record.clientType}`}
          >
            <i className='icon-document' />
            <span>{t('view_details')}</span>
          </Button>
        );
      },
    },
  ];
};

type MobileProps = {
  t: TFunction;
};

export function getMobileColumns(props: MobileProps) {
  const { t } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render(record: Reports['content'][number]) {
        const data = [
          {
            title: t('aggregator_or_client_name'),
            value: record.name,
          },
          {
            title: t('year'),
            value: record.year,
          },
          {
            title: t('month'),
            value: record.month,
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
            value: getValueOrDash(addThousandSeparator(record.allCount)),
          },
          {
            title: '',
            colon: false,
            value: (
              <Button
                variant='link'
                className='item__btn'
                href={`${ROUTES.BUSINESS.DETAILED_INVOICE}?id=${record.id}&client-type=${record.clientType}`}
              >
                <i className='icon-document' />
                <span>{t('view_details')}</span>
              </Button>
            ),
          },
        ];

        /* using rem to have a constant height acorss all user devices */
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
}
