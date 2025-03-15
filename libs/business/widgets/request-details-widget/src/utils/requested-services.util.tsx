import React from 'react';

import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';

import { PaginationType } from '../context/types';

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
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t(`table.service_name`),
      dataIndex: 'name',
      align: 'center',
      render: (value) => {
        return <Tooltip title={getValueOrDash(value)}>{getValueOrDash(value)}</Tooltip>;
      },
    },
    {
      title: t(`table.persian_name`),
      dataIndex: 'persianName',
      align: 'center',
      render: (value) => {
        return <Tooltip title={getValueOrDash(value)}>{getValueOrDash(value)}</Tooltip>;
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
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          // {
          //   title: t('table.index'),
          //   value: (page - 1) * rowsPerPage + 1 + index,
          // },
          {
            title: t('table.service_name'),
            value: <Tooltip title={getValueOrDash(value?.name)}>{getValueOrDash(value?.name)}</Tooltip>,
          },
          {
            title: t('table.persian_name'),
            value: <Tooltip title={getValueOrDash(value?.persianName)}>{getValueOrDash(value?.persianName)}</Tooltip>,
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
