import { Button, ColumnsType } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import * as S from '../../../client-details-widget/src/components/services/services.style';

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
      width: '20rem',
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
      title: '',
      key: 'mobile-columns',
      render: ({ index, latin_name_scope, persian_name_scope }) => {
        const data = [
          { title: t('table.index'), value: index },
          { title: t('table.latin_name_scope'), value: latin_name_scope },
          { title: t('table.persian_name_scope'), value: persian_name_scope },
          {
            fullwidth: true,
            value: (
              <Button variant={'text'} color={'primary'}>
                {t('table.details')}
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map(({ title, value }) => (
              <S.RowItem>
                <strong>{title}</strong>
                {value}
              </S.RowItem>
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
