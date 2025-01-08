import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';

import { PaginationType } from '../context/types';

import * as S from '../components/upstreams/upstreams.style';
import { UpstreamType } from '@oxygen/types';
import React from 'react';
import { UpstreamItemType } from '../types';

type Props = {
  t: TFunction;
  pagination: Omit<PaginationType, 'sort'>;
  deleteUpstream: any;
  //(record:UpstreamType) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<UpstreamItemType> {
  const { t, pagination, deleteUpstream } = props;
  const { page, rowsPerPage } = pagination;

  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'index',
      width: 70,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.english_name'),
      dataIndex: 'name',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'description',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },

    {
      title: t('table.active_servers'),
      dataIndex: 'activeServerCount',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: '',
      dataIndex: '',
      align: 'center',
      width: 'min-content',
      render: (value, record) => (
        <S.Details href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?id=${record.id}`}>{t('table.details')}</S.Details>
      ),
    },
    {
      title: '',
      dataIndex: '',
      align: 'center',
      width: 'min-content',
      render: (value, record) => (
        <S.Trash
          className='icon-trash'
          onClick={() => {
            // console.log('trash desktop',record);
            deleteUpstream(record);
          }}
        />
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<UpstreamItemType> {
  const {
    t,
    pagination: { page, rowsPerPage },
    deleteUpstream,
  } = props;
  return [
    {
      title: '',
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('table.index'),
            value: (page - 1) * rowsPerPage + 1 + index,
          },
          {
            title: t('table.english_name'),
            value: getValueOrDash(value?.name),
          },
          {
            title: t('table.persian_name'),
            value: getValueOrDash(value?.description),
          },
          {
            title: t('table.active_servers'),
            value: getValueOrDash(value?.activeServerCount),
          },
          {
            title: '',
            value: (
              <S.Details href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?id=${record.id}`}>{t('table.details')}</S.Details>
            ),
            colon: false,
          },
          {
            title: '',
            value: <S.Trash className='icon-trash' onClick={() => deleteUpstream(record)} />,
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
