import { Box, Button, ColumnsType, getTheme, Table, Tooltip } from '@oxygen/ui-kit';
import type { Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FEETYPE } from './consts';
import { DefaultTheme } from 'styled-components';
import { JSX } from 'react';

type PropsType = {
  t: TFunction;
  router: AppRouterInstance;
  theme: DefaultTheme;
  page: number;
  size: number;
};

export function getDesktopColumns(props: PropsType): ColumnsType<Service> {
  const { t, router, theme, page, size } = props;

  const handleClick = (serviceName) => router.push(`${ROUTES.BUSINESS.TARIFF_DETAILS}?service-name=${serviceName}`);

  return [
    {
      title: t('common.row_number'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = 1 + (page - 1) * size;
        return start + index;
      },
    },
    {
      title: t('service_persian_name'),
      dataIndex: 'servicePersianName',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {getValueOrDash(value)}
        </Tooltip>
      ),
    },
    {
      title: t('service_english_name'),
      dataIndex: 'serviceName',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {getValueOrDash(value)}
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip placement='top' title={getValueOrDash(t('banking_share'))}>
          {t('banking_share')}
        </Tooltip>
      ),
      dataIndex: 'bankingShare',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {`${getValueOrDash(value)}%`}
        </Tooltip>
      ),
    },
    {
      title: t('contribution_operational_team'),
      dataIndex: 'operationShare',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {`${getValueOrDash(value)}%`}
        </Tooltip>
      ),
    },
    {
      title: t('tariff_type'),
      dataIndex: 'feeType',
      align: 'center',
      render: (value) => {
        let icon;
        let text;

        switch (value) {
          case FEETYPE.FIXED:
            icon = <i className='icon-folder' style={{ fontSize: '2rem', color: theme.primary.main }} />;
            text = t('fixed');
            break;
          case FEETYPE.STEP:
            icon = <i className='icon-3square' style={{ fontSize: '2rem', color: theme.secondary.main }} />;
            text = t('step');

            break;
          case FEETYPE.RANGE:
            icon = <i className='icon-star' style={{ fontSize: '2rem', color: theme.warning._500 }} />;
            text = t(`range`);

            break;
          default:
            text = '-';
            break;
        }
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            {icon}
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      width: '20rem',
      key: '',
      align: 'left',
      ellipsis: false,
      render: (value, record) => (
        <Box display='flex' alignItems='center' justifyContent='end'>
          <Button
            style={{ padding: '0' }}
            variant='link'
            color='primary'
            onClick={() => handleClick(value.serviceName)}
          >
            {t('see_details')}
          </Button>
        </Box>
      ),
    },
  ];
}
export function getMobileColumns(props: PropsType): ColumnsType<Service> {
  const { t, router, theme } = props;

  const handleClick = (serviceName: string) =>
    router.push(`${ROUTES.BUSINESS.TARIFF_DETAILS}?service-name=${serviceName}`);

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({
        servicePersianName,
        bankingShare,
        serviceName,
        operationShare,
        feeType, // <--- Make sure to destructure feeType here
      }) {
        // Same icon/text logic
        let icon;
        let text = '-';

        switch (feeType) {
          case FEETYPE.FIXED:
            icon = <i className='icon-folder' style={{ fontSize: '2rem', color: theme.primary.main }} />;
            text = t('fixed');
            break;
          case FEETYPE.STEP:
            icon = <i className='icon-3square' style={{ fontSize: '2rem', color: theme.secondary.main }} />;
            text = t('step');
            break;
          case FEETYPE.RANGE:
            icon = <i className='icon-star' style={{ fontSize: '2rem', color: theme.warning._500 }} />;
            text = t('range');
            break;
        }

        const data = [
          {
            title: t('service_persian_name'),
            value: getValueOrDash(servicePersianName),
          },
          {
            title: t('service_english_name'),
            value: getValueOrDash(serviceName),
          },
          {
            title: t('banking_share'),
            value: `${getValueOrDash(bankingShare)}%`,
          },
          {
            title: t('contribution_operational_team'),
            value: `${getValueOrDash(operationShare)}%`,
          },
          {
            title: t('tariff_type'),
            value: (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                {icon}
                <span>{text}</span>
              </div>
            ),
          },
          {
            title: '',
            colon: false,
            value: (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant='link' color='primary' onClick={() => handleClick(serviceName)}>
                  {t('see_details')}
                </Button>
              </div>
            ),
          },
        ];

        return <Table.MobileColumns columns={data} minHeight={'4.4rem'} />;
      },
    },
  ];
}
