import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';

import { ColumnsType, Table } from '@oxygen/ui-kit';
import { ScopeInformationService } from '@oxygen/types';
import { CONSTANTS, getValueOrDash, widthByButtonCount } from '@oxygen/utils';
import { WithBadge } from '@oxygen/reusable-components';

import * as S from './second-tab-table-util.style';

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
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = page * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('second_tab.service_name'),
      dataIndex: 'name',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
          {getValueOrDash(value)}
        </Tooltip>
      ),
    },
    {
      title: t('second_tab.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
          {getValueOrDash(value)}
        </Tooltip>
      ),
    },
    {
      title: t('second_tab.scope'),
      dataIndex: 'scopes',
      align: 'center',
      render: (value) => {
        return <WithBadge items={value} />;
      },
    },
    {
      title: t('second_tab.url'),
      dataIndex: 'paths',
      align: 'center',
      render: (value) => {
        return <WithBadge items={value} />;
      },
    },
    {
      title: t('second_tab.version'),
      dataIndex: 'version',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      width: widthByButtonCount(1),
      align: 'left',
      key: 'action',
      render: (value) => (
        <S.DetailsBtn
          variant='link'
          color='primary'
          size={'small'}
          onClick={() => {
            updateServiceName(value?.name);
            toggleModal('details', true);
          }}
        >
          {t('details')}
        </S.DetailsBtn>
      ),
    },
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
          { title: t('second_tab.scope'), value: <WithBadge items={scopes} /> },
          {
            title: t('second_tab.url'),
            value: <WithBadge items={paths} />,
          },
          { title: t('second_tab.version'), value: getValueOrDash(version) },
          {
            title: '',
            colon: false,
            value: (
              <S.DetailsBtn
                className='item__btn'
                variant='link'
                size={'small'}
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
        ];

        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
