import { Box, Button, ColumnsType, Table } from '@oxygen/ui-kit';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { CONSTANTS, widthByButtonCount } from '@oxygen/utils';
type Props = {
  t: TFunction;
};
export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t } = props;

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
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant='link' color='primary' onClick={() => console.log('details')}>
            {t('see_details')}
          </Button>
          <Button variant='link' color='error' onClick={() => console.log('removeService')}>
            <i className='icon-trash' />
          </Button>
        </div>
      ),
    },
  ];
}
