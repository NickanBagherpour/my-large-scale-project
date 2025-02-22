import { TFunction } from 'i18next';

import type { Service } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';
import { Button, ColumnsType, Table } from '@oxygen/ui-kit';

import { ADD_SERVER_MODAL_FORM_ITEM } from '../consts';

import { UpstreamListTarget } from '../../types';

type Props = {
  t: TFunction;
  deletable?: boolean;
  setToggleInfo?: any;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t } = props;

  return [
    {
      title: t('upstream_tab.table.range'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.DOMAIN],
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('upstream_tab.table.health_status'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.HEALTH],
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        return getValueOrDash(value ?? t('upstream_tab.healthy'));
      },
    },
    {
      title: t('upstream_tab.table.weight'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.WEIGHT],
      align: 'center',
      ellipsis: true,
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ domain, weight }: UpstreamListTarget) {
        const data: any = [
          { title: t('upstream_tab.table.range'), value: domain },
          { title: t('upstream_tab.table.health_status'), value: t('upstream_tab.healthy') },
          { title: t('upstream_tab.table.weight'), value: weight },
        ];
        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
