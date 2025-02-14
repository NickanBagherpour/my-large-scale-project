import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { TFunction } from '@oxygen/translation';

import { ScopeListDataType, ScopeRequestParams, TypeScopeListParams } from '../types';

import * as S from '../components/data-table/data-table.style';
import React from 'react';

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
      // width: '2.8rem',
      width: '0',
      render: (_val, _record, index) => {
        const start = (page - 1) * pageSize + 1;
        return start + index;
      },
    },
    {
      // width: '43.9rem',
      title: t('table.latin_name_scope'),
      dataIndex: 'name',
      align: 'center',
      render: (_val, _record, index) => {
        const { name } = _record;
        return getValueOrDash(name);
      },
    },
    {
      // width: '43.9rem',
      title: t('table.persian_name_scope'),
      dataIndex: 'description',
      align: 'center',
      render: (_val, _record, index) => {
        const { description } = _record;
        return getValueOrDash(description);
      },
    },
    {
      // width: '11.8rem',
      width: '0',
      key: 'action',
      render: (_val, _record, index) => (
        <Button
          variant={'text'}
          size={'small'}
          href={`${ROUTES.BACKOFFICE.SCOPE_INFORMATION}?id=${_record.id}&name=${_record.name}`}
          color={'primary'}
        >
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
            title: '',
            colon: false,
            value: (
              <Button
                className={'item__btn'}
                size={'small'}
                href={`${ROUTES.BACKOFFICE.SCOPE_INFORMATION}?id=${id}&name=${name}`}
                variant={'text'}
                color={'primary'}
              >
                {t('table.details')}
              </Button>
            ),
          },
        ];

        return <Table.MobileColumns columns={data} minHeight={'4rem'}></Table.MobileColumns>;
      },
    },
  ];
}

export const prepareScopeListParams = (item: TypeScopeListParams): ScopeRequestParams => {
  const { searchField, page, pageSize, ...restParams } = item;

  const reqObj: ScopeRequestParams = {};

  if (searchField) {
    reqObj['search-field'] = searchField;
  }

  if (page) {
    reqObj.page = page - 1;
  }

  if (pageSize) {
    reqObj.size = pageSize;
  }

  reqObj.sort = '';

  return reqObj;
};
