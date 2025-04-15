import { TFunction } from 'i18next';

import { Button, ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { Pagination } from '@oxygen/types';

import { statusBadgeRenderer } from './status-badge.util';

import * as S from '../components/data-table/data-table.style';
import { DefaultTheme } from 'styled-components';
import { WidgetStateType } from '../context/types';

type Props = {
  t: TFunction;
  pagination: Pagination;
  userRole: string;
  filters: WidgetStateType['filters'];
  theme: DefaultTheme;
};

const years = Array.from({ length: 1405 - 1394 }, (_, index) => {
  const year = (1394 + index).toString();
  return { text: year, value: year };
});

const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
].map((month, index) => ({
  text: `${String(index + 1).padStart(2, '0')} / ${month}`,
  value: String(index + 1).padStart(2, '0'),
}));

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
    userRole,
    filters,
    theme,
  } = props;

  return [
    {
      title: t('common.index'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.aggregator_or_client_name'),
      dataIndex: 'name',
      render: (_val, record) => (
        <S.NameContainer>
          {/*{record?.isAggregator && <i className={'icon-award'} />}*/}
          <Tooltip title={getValueOrDash(record?.name)}>{getValueOrDash(record?.name)}</Tooltip>
        </S.NameContainer>
      ),
    },
    {
      title: t('common.year'),
      dataIndex: 'year',
      render: (_val, record) => <Tooltip title={getValueOrDash(record?.year)}>{getValueOrDash(record?.year)}</Tooltip>,
      filters: years,
      // filterMultiple: false,
      filterMode: 'menu',
      filterIcon: <i className={'icon-chev-down rotate-icon'} />,
      filteredValue: filters?.year || null,
      filterDropdownProps: {
        overlayStyle: {
          backgroundColor: theme.background.main,
          maxHeight: '10rem',
          overflowY: 'hidden',
        },
      },
    },
    {
      title: t('common.month'),
      dataIndex: 'month',
      render: (_val, record) => (
        <Tooltip title={getValueOrDash(record?.month)}>{getValueOrDash(record?.month)}</Tooltip>
      ),
      filters: months,
      // filterMultiple: false,
      filterMode: 'menu',
      filterIcon: <i className={'icon-chev-down rotate-icon'} />,
      filteredValue: filters?.month || null,
      filterDropdownProps: {
        overlayStyle: {
          backgroundColor: theme.background.main,
          maxHeight: '10rem',
          overflowY: 'hidden',
        },
      },
    },

    {
      title: t('table.bill_generator'),
      dataIndex: 'billGenerator',
      render: (_val, record) => (
        <Tooltip title={getValueOrDash(record?.billGenerator)}>{getValueOrDash(record?.billGenerator)}</Tooltip>
      ),
    },
    {
      title: t('field.status'),
      dataIndex: 'state',
      ellipsis: false,
      width: widthByButtonCount(2),
      render: (_val, record) => statusBadgeRenderer(record?.state, userRole, t),
    },
    {
      key: 'details',
      width: widthByButtonCount(2),
      align: 'left',
      ellipsis: false,
      render: (item, record) => {
        // const isApproved = record?.submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        // const colorButton = isApproved ? 'secondary' : 'primary';
        return (
          <Button
            variant={'link'}
            size={'small'}
            // className={colorButton}
            // href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${record?.id}`}
            // color={colorButton}
          >
            <i className={'icon-document'} />
            {t('table.details')}
          </Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, userRole, theme } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({ id, name, year, month, billGenerator, state }) => {
        // const isApproved = submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        // const colorButton = isApproved ? 'secondary' : 'primary';

        const data = [
          { title: t('table.aggregator_or_client_name'), value: getValueOrDash(name) },
          { title: t('common.year'), value: getValueOrDash(year) },
          { title: t('common.month'), value: getValueOrDash(month) },
          { title: t('field.status'), value: statusBadgeRenderer(state, userRole, t) },
          { title: t('table.bill_generator'), value: getValueOrDash(billGenerator) },
          {
            title: t('table.details'),
            value: (
              <Button
                // className={isApproved ? 'secondary' : 'primary'}
                href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${id}`}
                variant={'link'}
                size={'small'}
                // color={colorButton}
              >
                <i className={'icon-document'} />
                {t('table.details')}
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
