import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { ScopeListDataType } from '@oxygen/types';

import { TFunction } from 'i18next';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: {
    page: number;
    pageSize: number;
  };
};

export function getDesktopColumns(props: Props): ColumnsType<ScopeListDataType> {
  const {
    t,
    pagination: { page, pageSize },
  } = props;

  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'id',
      width: '2.8rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * pageSize + 1;
        return start + index;
      },
    },
    {
      width: '43.9rem',
      title: t('table.latin_name_scope'),
      dataIndex: 'name',
      align: 'center',
      render: (_val, _record, index) => {
        const { name } = _record;
        return getValueOrDash(name);
      },
    },
    {
      width: '43.9rem',
      title: t('table.persian_name_scope'),
      dataIndex: 'description',
      align: 'center',
      render: (_val, _record, index) => {
        const { description } = _record;
        return getValueOrDash(description);
      },
    },
    {
      width: '11.8rem',
      key: 'status',
      render: (_val, _record, index) => (
        <Button variant={'text'} href={`scope-information?id=${_record.id}`} color={'primary'}>
          {t('table.details')}
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ScopeListDataType> {
  const { t } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({ id, name, description }) => {
        const data = [
          { title: t('table.latin_name_scope'), value: getValueOrDash(name) },
          { title: t('table.persian_name_scope'), value: getValueOrDash(description) },
          {
            title: t('table.details'),
            value: (
              <Button className={'item__btn'} href={`scope-information?id=${id}`} variant={'text'} color={'primary'}>
                {t('table.details')}
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
