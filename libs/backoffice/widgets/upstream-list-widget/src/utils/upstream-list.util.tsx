import React from 'react';
import { TFunction } from 'i18next';

import { Box, ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
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
      width: '0',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.english_name'),
      dataIndex: 'name',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'description',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },

    {
      title: t('table.active_servers'),
      dataIndex: 'activeServerCount',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: '',
      dataIndex: '',
      width: 1,
      render: (value, record) => (
        <Box display={'flex'} style={{ gap: '2rem' }}>
          <S.DetailsButton
            variant={'link'}
            href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${record.name}`}
            size={'small'}
          >
            {t('button.detail')}
          </S.DetailsButton>

          <S.TrashButton
            variant={'text'}
            color={'error'}
            size={'small'}
            onClick={() => {
              deleteUpstream(record);
            }}
          >
            <i className={'icon-trash'} />
          </S.TrashButton>
        </Box>
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
            title: '',
            colon: false,
            value: (
              <>
                <Box display={'flex'} style={{ gap: '2rem' }}>
                  <S.DetailsButton
                    variant={'link'}
                    href={`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${record.name}`}
                  >
                    {t('button.detail')}
                  </S.DetailsButton>

                  <S.TrashButton
                    variant={'text'}
                    color={'error'}
                    onClick={() => {
                      deleteUpstream(record);
                    }}
                  >
                    <i className={'icon-trash'} />
                  </S.TrashButton>
                </Box>
              </>
            ),
          },
        ];
        return <Table.MobileColumns minHeight={'40px'} columns={columns} />;
      },
    },
  ];
}
