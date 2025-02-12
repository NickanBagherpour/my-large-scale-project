import React from 'react';
import { TFunction } from 'i18next';

import { ColumnsType, Table } from '@oxygen/ui-kit';
import { ScopeInformationService } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';

import * as S from './second-tab-table-util.style';
import WidthBadge from '../../../../../reusable-components/src/components/services/badge/badge';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

type Props = {
  t: TFunction;
  toggleModal: (modal: keyof Modal, item: boolean) => void;
  updateServiceName: (serviceName: string) => void;
  page: number;
  rowsPerPage: number;
};
export function getDesktopColumns(props: Props): ColumnsType<ScopeInformationService> {
  const { t, toggleModal, updateServiceName, page, rowsPerPage } = props;

  return [
    {
      title: t('second_tab.row'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = page * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('second_tab.service_name'),
      dataIndex: 'name',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('second_tab.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('second_tab.scope'),
      dataIndex: 'scopes',
      align: 'center',
      render: (value) => {
        return <WidthBadge items={value} />;
      },
    },
    {
      title: t('second_tab.url'),
      dataIndex: 'paths',
      align: 'center',
      render: (value) => {
        return <WidthBadge items={value} />;
      },
    },
    {
      title: t('second_tab.version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      width: '7rem',
      key: 'status',
      render: (value) => (
        <S.DetailsBtn
          variant='link'
          color='primary'
          onClick={() => {
            updateServiceName(value?.name);
            toggleModal('details', true);
          }}
        >
          {t('details')}
        </S.DetailsBtn>
      ),
    },
    //uncomment when remove service is needed

    // {
    //   width: '7rem',
    //   key: 'remove',
    //   render: (p) => (
    //     <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
    //       <S.TrashIcon className='icon-trash' />
    //     </Button>
    //   ),
    // },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ScopeInformationService> {
  const { t, toggleModal, updateServiceName } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ id, scopes, paths, version, persianName, name }: ScopeInformationService) {
        const data = [
          { title: t('second_tab.service_name'), value: getValueOrDash(name) },
          { title: t('second_tab.persian_name'), value: getValueOrDash(persianName) },
          { title: t('second_tab.scope'), value: <WidthBadge items={scopes} /> },
          {
            title: t('second_tab.url'),
            value: <WidthBadge items={paths} />,
          },
          { title: t('second_tab.version'), value: getValueOrDash(version) },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn
                className='item__btn'
                variant='link'
                color='primary'
                onClick={() => {
                  updateServiceName(name);
                  toggleModal('details', true);
                }}
              >
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          //uncomment when remove service is needed

          // {
          //   title: t('remove'),
          //   value: (
          //     <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
          //       <S.TrashIcon className='icon-trash' />
          //     </Button>
          //   ),
          // },
        ];

        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
