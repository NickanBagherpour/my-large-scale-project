import React from 'react';

import { TFunction } from 'i18next';

import { convertShamsiDateFormat, getValueOrDash, REGEX_PATTERNS } from '@oxygen/utils';
import { ColumnsType, HistoryCell } from '@oxygen/ui-kit';
import { WithBadge } from '@oxygen/reusable-components';
import { Nullable } from '@oxygen/types';

import { NormalizedClientHistoryItemType } from '../types';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
  clientType: Nullable<string>;
};

function renderGrantType(record) {
  const grantTypes = [
    { key: 'isAuthorizationFlow', label: 'Authorization Flow' },
    { key: 'isClientFlow', label: 'Client Flow' },
    { key: 'isImplicitFlow', label: 'Implicit Flow' },
    { key: 'isPasswordFlow', label: 'Password Flow' },
  ];

  if (!record) return { value: getValueOrDash(''), hasDifference: false };

  const hasDifference = grantTypes.some(({ key }) => record[key]?.hasDifference === true);

  const grantTypeLabelsArray = grantTypes.filter(({ key }) => record[key]?.value === true).map(({ label }) => label);

  return { value: grantTypeLabelsArray, hasDifference: hasDifference };
}

export function getDesktopColumns(props: Props): ColumnsType<NormalizedClientHistoryItemType> {
  const { t, clientType } = props;

  return [
    {
      title: t('table.modify_date'),
      dataIndex: 'modifyDate',
      align: 'center',
      width: 'min-content',
      render: (column) => {
        return convertShamsiDateFormat(column?.value, true);
      },
    },
    {
      title: t('table.modify_by'),
      dataIndex: 'modifyBy',
      align: 'center',
      ellipsis: true,
      render: (column) => {
        return getValueOrDash(column?.value);
      },
    },
    {
      title: t('table.revision_type'),
      dataIndex: 'revisionDto',
      align: 'center',
      width: 'min-content',
      render: (_value, record) => {
        const variant = record?.revType?.code?.value;
        const isdeleted = record?.deleted?.value;
        return (
          <S.RevisionType variant={variant} $isdeleted={isdeleted}>
            {getValueOrDash(record?.revType?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('table.grant_type'),
      dataIndex: 'grantType',
      ellipsis: { showTitle: false },
      width: '20rem',
      render: (_value, record) => {
        const grantType = renderGrantType(record);

        return (
          <S.valueWrapper>
            <WithBadge
              items={grantType.value}
              // onRender={() => <HistoryCell item={grantType} />}
            />
            <HistoryCell item={grantType} showValue={false} />
          </S.valueWrapper>
        );
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      ellipsis: true,
      className: 'right-to-left',
      render: (_value, record) => {
        const persianName = record?.persianName;
        return <HistoryCell item={persianName} />;
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      ellipsis: true,
      align: 'center',
      render: () => {
        return getValueOrDash(clientType ?? '');
      },
    },
    {
      title: t('table.url'),
      dataIndex: 'url',
      ellipsis: true,
      align: 'center',
      // className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.url;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.inbound_url'),
      dataIndex: 'inboundUrl',
      align: 'center',
      ellipsis: true,
      // className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.inboundUrl;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.redirect_url'),
      dataIndex: 'redirectUrl',
      align: 'center',
      ellipsis: true,
      // className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.redirectUrl;
        return <HistoryCell item={item} />;
      },
    },
  ];
}
