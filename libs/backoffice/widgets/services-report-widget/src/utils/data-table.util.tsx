import React from 'react';
import { TFunction } from 'i18next';

import { Button, ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { Pagination } from '@oxygen/types';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;

  return [
    {
      title: t('uikit.index'),
      align: 'center',
      key: 'index',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.service_name'),
      dataIndex: 'serviceName',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.serviceName);
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      ellipsis: true,
      render: (_val, record) => {
        return getValueOrDash(record?.persianName);
      },
    },
    {
      title: t('table.scope'),
      dataIndex: 'scope',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.scope);
      },
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
      align: 'center',
      render: (_val, record) => {
        const status = record?.status;
        return <S.StatusContainer status={status}>{getValueOrDash(status)}</S.StatusContainer>;
      },
    },
    {
      key: 'clients_report',
      render: (item, record) => {
        return (
          <Button
            variant={'text'}
            // href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${record?.submissionId}`}
          >
            {t('table.clients_report')}
          </Button>
        );
      },
    },
    {
      key: 'details',
      render: (item, record) => {
        return (
          <Button
            variant={'text'}
            // href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${record?.submissionId}`}
          >
            {t('uikit.details')}
          </Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('uikit.index'),
            value: (page - 1) * rowsPerPage + 1 + index,
          },
          {
            title: t('table.service_name'),
            value: getValueOrDash(value?.serviceName),
          },
          {
            title: t('table.persian_name'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: t('table.scope'),
            value: getValueOrDash(value?.scope),
          },
          {
            title: t('table.status'),
            value: <S.StatusContainer status={record?.status}>{getValueOrDash(record?.status)}</S.StatusContainer>,
          },
          {
            title: t('table.clients_report'),
            value: (
              <Button
                variant={'text'}
                // href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${record?.submissionId}`}
              >
                {t('table.clients_report')}
              </Button>
            ),
          },
          {
            title: t('uikit.details'),
            value: (
              <Button
                variant={'text'}
                // href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?submissionId=${record?.submissionId}`}
              >
                {t('uikit.details')}
              </Button>
            ),
          },
        ];

        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
