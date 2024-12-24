import React from 'react';
import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import { PaginationType } from '../context/types';

import * as S from '../components/requested-services/requested-services.style';

type Props = {
  t: TFunction;
  pagination: PaginationType;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;
  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'index',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t(`table.service_name`),
      dataIndex: 'serviceName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t(`table.persian_name`),
      dataIndex: 'persianName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center',
    //   width: 'min-content',
    //   render: (value) => {
    //     return <S.StyledButton variant={'text'}>{t('table.details')}</S.StyledButton>;
    //   },
    // },
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
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('table.index'),
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
          // {
          //   title: '',
          //   value: (<S.Details>{t('table.details')}</S.Details>),
          //   colon: false,
          // },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
