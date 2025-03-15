import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, Table } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';

import { PaginationType } from '../context/types';

type Props = {
  t: TFunction;
  pagination: Omit<PaginationType, 'sort'>;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, pagination } = props;
  const { page, rowsPerPage } = pagination;

  return [
    {
      title: t('uikit.index'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = page * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.english_name'),
      align: 'center',
      dataIndex: 'serviceEnglishName',
      render: (serviceEnglishName) => (
        <Tooltip placement='top' title={getValueOrDash(serviceEnglishName)} arrow={true}>
          {getValueOrDash(serviceEnglishName)}
        </Tooltip>
      ),
    },
    {
      title: t('table.persian_name'),
      align: 'center',
      dataIndex: 'serviceName',
      render: (serviceName) => (
        <Tooltip placement='top' title={getValueOrDash(serviceName)} arrow={true}>
          {getValueOrDash(serviceName)}
        </Tooltip>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t } = props;
  return [
    {
      title: '',
      key: 'id',
      render: ({ serviceName, serviceEnglishName }) => {
        const data = [
          { title: t('table.english_name'), value: getValueOrDash(serviceName) },
          { title: t('table.persian_name'), value: getValueOrDash(serviceEnglishName) },
        ];
        return <Table.MobileColumns columns={data} />;
      },
    },
  ];
}
