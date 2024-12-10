import { TFunction } from 'i18next';

import type { Service } from '@oxygen/types';
import { Button, ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';

import { UpstreamTabModalType } from '../../components/upstream-list/fallback-select/creation/data-table/data-table';

import * as S from '../../components/upstream-list/upstream-list.style';
import { ADD_SERVER_MODAL_FORM_ITEM } from '../consts';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  t: TFunction;
  deletable?: boolean;
  toggleModal?: (modal: keyof UpstreamTabModalType) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t, deletable = false, toggleModal } = props;

  return [
    {
      title: t('upstream_tab.table.range'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.IP_PORT],
      align: 'center',
      render: (value, record) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('upstream_tab.table.health_status'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.HEALTH],
      align: 'center',
      render: (value, record) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('upstream_tab.table.weight'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.WEIGHT],
      align: 'center',
      // width: '7rem',
    },
    {
      ...(deletable && {
        title: '',
        dataIndex: 'status',
        key: 'id',
        align: 'center',
        render: (value) => {
          return (
            <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal!('removeService')}>
              <S.TrashIcon className='icon-trash' />
            </Button>
          );
          // disabled={disabled} defaultChecked={defaultChecked}
        },
      }),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, deletable = false, toggleModal } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data: any = [
          { title: t('step_two.service_name'), value: serviceName },
          { title: t('step_two.persian_name'), value: persianName },
          { title: t('step_two.scope'), value: scope },
          { title: t('step_two.version'), value: version },
          {
            ...(deletable && {
              title: '',
              value: (
                <Button
                  className='item__btn'
                  variant='link'
                  color='error'
                  onClick={() => toggleModal!('removeService')}
                >
                  <S.TrashIcon className='icon-trash' />
                </Button>
              ),
            }),
          },
        ];
        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
