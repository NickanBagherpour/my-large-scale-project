import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import * as S from '../../components/upstream-list/upstream-list.style';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { Modal } from '../services-table.util';

type Props = {
  t: TFunction;
};
export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t } = props;

  return [
    {
      title: t('upstream_tab.table.range'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('upstream_tab.table.health_status'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      title: t('upstream_tab.table.weight'),
      dataIndex: 'scope',
      align: 'center',
      // width: '7rem',
    },
  ];
}

export function getMobileColumns(props) {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data = [
          { title: t('step_two.service_name'), value: serviceName },
          { title: t('step_two.persian_name'), value: persianName },
          { title: t('step_two.scope'), value: scope },
          { title: t('step_two.version'), value: version },
        ];
        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
