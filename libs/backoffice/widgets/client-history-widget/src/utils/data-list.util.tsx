import React from 'react';

import { TFunction } from 'i18next';

import { ColumnsType, Table, MobileColumnType, HistoryCell } from '@oxygen/ui-kit';
import { convertShamsiDateFormat, getValueOrDash } from '@oxygen/utils';

import { ClientHistoryItemType } from '../types';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
};

function renderGrantType(record) {
  const grantTypes = [
    { key: 'isAuthorizationFlow', label: 'Authorization Flow' },
    { key: 'isClientFlow', label: 'Client Flow' },
    { key: 'isImplicitFlow', label: 'Implicit Flow' },
    { key: 'isPasswordFlow', label: 'Password Flow' },
  ];

  const hasDifference = grantTypes.some(({ key }) => {
    const value = record[key];
    return value?.hasDifference === true;
  });

  const grantTypeLabels = grantTypes
    .filter(({ key }) => record[key]?.value === true)
    .map(({ label }) => label)
    .join(', ');

  return { value: getValueOrDash(grantTypeLabels), hasDifference: hasDifference };
}

export function getDesktopColumns(props: Props): ColumnsType<ClientHistoryItemType> {
  const { t } = props;

  return [
    {
      title: t('table.modify_date'),
      dataIndex: 'modifyDate',
      align: 'center',
      width: 'min-content',
      render: (value, record) => {
        return convertShamsiDateFormat(record?.clientInfoDto?.value?.modifyDate?.value);
      },
    },
    {
      title: t('table.modify_by'),
      dataIndex: 'modifyBy',
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        return getValueOrDash(record?.clientInfoDto?.value?.modifyBy?.value);
      },
    },
    {
      title: t('table.revision_type'),
      dataIndex: 'revisionDto',
      align: 'center',
      width: 'min-content',
      render: (value, record) => {
        const variant = record?.revisionDto?.value?.revType?.value?.code?.value;
        const isDeleted = record?.clientInfoDto?.value?.deleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {record?.revisionDto?.value?.revType?.value?.title?.value}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('table.grant_type'),
      dataIndex: 'grantType',
      ellipsis: true,
      render: (value, record) => {
        const grantType = renderGrantType(record?.clientInfoDto?.value);
        return <HistoryCell item={grantType} />;
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        const item = record?.clientInfoDto?.value?.commonClientInfoDto?.value?.persianName;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      ellipsis: true,
      align: 'center',
      render: (value, record) => {
        const item = record?.clientInfoDto?.value?.commonClientInfoDto?.value?.clientType?.value?.title;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.url'),
      dataIndex: 'url',
      ellipsis: true,
      align: 'center',
      render: (value, record) => {
        const item = record?.clientInfoDto?.value?.url;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.inbound_url'),
      dataIndex: 'inboundUrl',
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        const item = record?.clientInfoDto?.value?.inboundUrl;
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('table.redirect_url'),
      dataIndex: 'redirectUrl',
      align: 'center',
      ellipsis: true,
      render: (value, record) => {
        const item = record?.clientInfoDto?.value?.redirectUrl;
        return <HistoryCell item={item} />;
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ClientHistoryItemType> {
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
