import React from 'react';

import { TFunction } from 'i18next';

import { ColumnsType, Table, MobileColumnType, HistoryCell } from '@oxygen/ui-kit';
import { convertShamsiDateFormat, getValueOrDash } from '@oxygen/utils';
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

  const grantTypeLabels = grantTypes
    .filter(({ key }) => record[key]?.value === true)
    .map(({ label }) => label)
    .join(', ');

  return { value: getValueOrDash(grantTypeLabels), hasDifference: hasDifference };
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
        return convertShamsiDateFormat(column?.value);
      },
    },
    {
      title: t('table.modify_by'),
      dataIndex: 'modifyBy',
      align: 'center',
      ellipsis: { showTitle: false },
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
        const variant = record?.revType?.value?.code?.value;
        const isDeleted = record?.deleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(record?.revType?.value?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('table.grant_type'),
      dataIndex: 'grantType',
      ellipsis: { showTitle: false },
      className: 'right-to-left',
      render: (_value, record) => {
        const grantType = renderGrantType(record);
        return <HistoryCell item={grantType} />;
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      ellipsis: { showTitle: false },
      className: 'right-to-left',
      render: (_value, record) => {
        const persianName = record?.persianName;
        return <HistoryCell item={persianName} />;
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      ellipsis: { showTitle: false },
      align: 'center',
      render: () => {
        return getValueOrDash(clientType ?? '');
      },
    },
    {
      title: t('table.url'),
      dataIndex: 'url',
      ellipsis: { showTitle: false },
      align: 'center',
      className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.url;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.inbound_url'),
      dataIndex: 'inboundUrl',
      align: 'center',
      ellipsis: { showTitle: false },
      className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.inboundUrl;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.redirect_url'),
      dataIndex: 'redirectUrl',
      align: 'center',
      ellipsis: { showTitle: false },
      className: 'right-to-left',
      render: (_value, record) => {
        const item = record?.redirectUrl;
        return <HistoryCell item={item} />;
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: (value) => {
        const columns: MobileColumnType[] = [
          {
            title: t('table.edit_time'),
            value: getValueOrDash(value?.editTime),
          },
          {
            title: t('table.admin_name'),
            value: getValueOrDash(value?.adminName),
          },
          {
            title: t('table.client_latin_name'),
            value: getValueOrDash(value?.clientLatinName),
          },
          {
            title: t('table.client_farsi_name'),
            value: getValueOrDash(value?.clientFarsiName),
          },
          {
            title: t('table.client_type'),
            value: getValueOrDash(value?.clientType),
          },
          {
            title: t('table.client_id'),
            value: getValueOrDash(value?.clientId),
          },
          {
            title: t('table.verification_id'),
            value: getValueOrDash(value?.verificationId),
          },
          {
            title: t('table.aggregator_status'),
            value: getValueOrDash(value?.aggregatorStatus),
          },
          {
            title: t('table.aggregator_name'),
            value: getValueOrDash(value?.aggregatorName),
          },
          {
            title: t('table.address'),
            value: getValueOrDash(value?.address),
          },
          {
            title: t('table.input_address'),
            value: getValueOrDash(value?.inputAddress),
          },
        ];

        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
