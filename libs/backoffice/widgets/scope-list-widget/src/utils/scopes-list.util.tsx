import React from 'react';
import { TFunction } from 'i18next';

import { Button, ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';

import { ScopeListDataType, ScopeRequestParams, TypeScopeListParams } from '../types';

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
      key: 'id',
      align: 'center',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * pageSize + 1;
        return start + index;
      },
    },
    {
      title: t('table.english_name_scope'),
      dataIndex: 'name',
      align: 'center',
      render: (_val, _record, index) => {
        const { name } = _record;
        return <Tooltip title={getValueOrDash(name)}>{getValueOrDash(name)}</Tooltip>;
      },
    },
    {
      title: t('table.persian_name_scope'),
      dataIndex: 'description',
      align: 'center',
      render: (_val, _record, index) => {
        const { description } = _record;
        return <Tooltip title={getValueOrDash(description)}>{getValueOrDash(description)}</Tooltip>;
      },
    },
    {
      width: widthByButtonCount(1),
      key: 'action',
      align: 'left',
      ellipsis: false,
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
          { title: t('table.english_name_scope'), value: getValueOrDash(name) },
          {
            title: t('table.persian_name_scope'),
            value: getValueOrDash(description),
          },
          {
            title: '',
            colon: false,
            value: (
              <Button
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

  return reqObj;
};
