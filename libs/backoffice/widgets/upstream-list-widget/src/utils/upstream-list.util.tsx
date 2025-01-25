import React from 'react';
import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { UpstreamItemType } from '../types';
import { PaginationType } from '../context/types';

import * as S from '../components/upstreams/upstreams.style';

type Props = {
  t: TFunction;
  pagination: Omit<PaginationType, 'sort'>;
  deleteUpstream: any;
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
        <S.Details href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${record.name}`}>
          {t('button.detail')}
        </S.Details>
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
            deleteUpstream(record);
          }}
        />
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<UpstreamItemType> {
  const { t, deleteUpstream } = props;
  return [
    {
      title: '',
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
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
            title: t('button.detail'),
            value: (
              <S.Details href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${record.name}`}>
                {t('button.detail')}
              </S.Details>
            ),
          },
          {
            title: t('button.delete'),
            value: <S.Trash className='icon-trash' onClick={() => deleteUpstream(record)} />,
          },
        ];
        return <Table.MobileColumns minHeight={'40px'} columns={columns} />;
      },
    },
  ];
}
