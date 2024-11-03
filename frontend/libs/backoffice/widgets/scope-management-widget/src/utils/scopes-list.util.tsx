import { Button, ColumnsType } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';

type Props = {
  t: TFunction;
  pagination: Pagination;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;

  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.latin_name_scope'),
      dataIndex: 'latin_name_scope',
      align: 'center',
    },
    {
      title: t('table.persian_name_scope'),
      dataIndex: 'persian_name_scope',
      align: 'center',
    },
    {
      width: '15rem',
      key: 'status',
      render: () => (
        <Button variant={'text'} color={'primary'}>
          {t('table.details')}
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;
  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.latin_name_scope'),
      dataIndex: 'latin_name_scope',
      align: 'center',
    },
    {
      title: t('table.persian_name_scope'),
      dataIndex: 'persian_name_scope',
      align: 'center',
    },
    {
      width: '15rem',
      key: 'status',
      render: () => (
        <Button variant={'text'} color={'primary'}>
          {t('table.details')}
        </Button>
      ),
    },
  ];
}
