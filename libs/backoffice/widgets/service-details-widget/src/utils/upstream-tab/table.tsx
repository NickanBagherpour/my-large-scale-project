import { TFunction } from 'i18next';

import type { Service } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';
import { Button, ColumnsType, Table } from '@oxygen/ui-kit';

import { UpstreamTabModalType } from '../../components/upstream-list/fallback-select/creation/data-table/data-table';

import { ADD_SERVER_MODAL_FORM_ITEM } from '../consts';

import { UpstreamListTarget } from '../../types';

import * as S from '../../components/upstream-list/upstream-list.style';

type Props = {
  t: TFunction;
  deletable?: boolean;
  toggleModal?: (modal: keyof UpstreamTabModalType) => void;
  setToggleInfo?: any;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t, deletable = false, toggleModal, setToggleInfo } = props;

  return [
    {
      title: t('upstream_tab.table.range'),
      dataIndex: [ADD_SERVER_MODAL_FORM_ITEM.DOMAIN],
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
        return getValueOrDash(value ?? t('upstream_tab.healthy'));
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
        render: (value, record, index) => {
          return (
            <Button
              className='item__btn'
              variant='link'
              color='error'
              onClick={() => {
                setToggleInfo(record);
                toggleModal!('removeService');
              }}
            >
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
