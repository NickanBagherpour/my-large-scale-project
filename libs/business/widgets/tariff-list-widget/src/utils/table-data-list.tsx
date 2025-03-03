import { Box, Button, ColumnsType, Table } from '@oxygen/ui-kit';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { WithBadge } from '@oxygen/reusable-components';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
type PropsType = {
  t: TFunction;
  toggleRemoveModal: () => void;
  setServiceToUnassign: (serviceName: string) => void;
  router: AppRouterInstance;
};
export function getDesktopColumns(props: PropsType): ColumnsType<Service> {
  const { t, toggleRemoveModal, setServiceToUnassign, router } = props;
  const handleClick = (serviceName) => router.push(`${ROUTES.BUSINESS.TARIFF_LIST}?service-name=${serviceName}`);
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
      title: t('service_name'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('banking_share'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      title: t('contribution_operational_team'),
      dataIndex: 'scope',
      align: 'center',
    },
    {
      title: t('tariff_type'),
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: t('tariff_amount'),
      dataIndex: 'version',
      align: 'center',
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
  const handleClick = (serviceName) => router.push(`${ROUTES.BUSINESS.TARIFF_LIST}?service-name=${serviceName}`);
  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ id, scopes, paths, serviceName, persianName, name }) {
        const data = [
          { title: t('service_name'), value: getValueOrDash(serviceName) },
          { title: t('banking_share'), value: getValueOrDash(persianName) },
          { title: t('contribution_operational_team'), value: getValueOrDash(persianName) },
          {
            title: t('tariff_type'),
            value: getValueOrDash(persianName),
          },
          {
            title: t('tariff_amount'),
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
