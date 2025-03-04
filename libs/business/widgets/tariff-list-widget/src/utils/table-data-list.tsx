import { Box, Button, ColumnsType, getTheme, Table } from '@oxygen/ui-kit';
import type { Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FEETYPE } from './consts';
import { DefaultTheme } from 'styled-components';

type PropsType = {
  t: TFunction;
  toggleRemoveModal: () => void;
  setServiceToUnassign: (serviceName: string) => void;
  router: AppRouterInstance;
  theme: DefaultTheme;
};

export function getDesktopColumns(props: PropsType): ColumnsType<Service> {
  const { t, toggleRemoveModal, setServiceToUnassign, router, theme } = props;

  const handleClick = (serviceName) => router.push(`${ROUTES.BUSINESS.TARIFF_DETAILS}?service-name=${serviceName}`);
  return [
    {
      title: t('common.row_number'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = 1;
        return start + index;
      },
    },
    {
      title: t('service_persian_name'),
      dataIndex: 'servicePersianName',
      align: 'center',
    },
    {
      title: t('service_english_name'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('banking_share'),
      dataIndex: 'bankingShare',
      align: 'center',
      render: (value, record, index) => <>{`${value}%`}</>,
    },
    {
      title: t('contribution_operational_team'),
      dataIndex: 'operationShare',
      align: 'center',
      render: (value, record, index) => <>{`${value}%`}</>,
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
            icon = <i className='icon-star' style={{ fontSize: '2rem', color: theme.secondary.main }} />;
            text = t(`range`);

            break;
          default:
            text = '-';
            break;
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            {icon}
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      width: widthByButtonCount(2),
      key: '',
      align: 'left',
      render: (value, record) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant='link' color='primary' onClick={() => handleClick(value.serviceName)}>
            {t('see_details')}
          </Button>
          <Button
            variant='link'
            color='error'
            onClick={() => {
              toggleRemoveModal();
              setServiceToUnassign(record.serviceName);
            }}
          >
            <i style={{ fontSize: '2.4rem' }} className='icon-trash' />
          </Button>
        </div>
      ),
    },
  ];
}

export function getMobileColumns(props: PropsType): ColumnsType<any> {
  const { t, toggleRemoveModal, setServiceToUnassign, router } = props;
  const handleClick = (serviceName) => router.push(`${ROUTES.BUSINESS.TARIFF_DETAILS}?service-name=${serviceName}`);
  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ servicePersianName, bankingShare, serviceName, persianName, operationShare }) {
        const data = [
          { title: t('service_persian_name'), value: getValueOrDash(servicePersianName) },
          { title: t('service_english_name'), value: getValueOrDash(serviceName) },
          { title: t('banking_share'), value: getValueOrDash(bankingShare) },
          { title: t('contribution_operational_team'), value: getValueOrDash(operationShare) },
          {
            title: t('tariff_type'),
            value: getValueOrDash(persianName),
          },
          {
            title: t('details'),
            value: (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant='link' color='primary' onClick={() => handleClick(serviceName)}>
                  {t('see_details')}
                </Button>
              </div>
            ),
          },
          {
            title: t('remove'),
            value: (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant='link'
                  color='error'
                  onClick={() => {
                    toggleRemoveModal();
                    setServiceToUnassign(serviceName);
                  }}
                >
                  <i style={{ fontSize: '2.4rem' }} className='icon-trash' />
                </Button>
              </div>
            ),
          },
        ];

        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
