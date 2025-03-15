import React from 'react';

import { TFunction } from 'i18next';

import { convertShamsiDateFormat, getValueOrDash, REGEX_PATTERNS } from '@oxygen/utils';
import { ColumnsType, HistoryCell, MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
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
    { key: 'isRefreshToken', label: 'Refresh Token' },
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
      render: (column) => {
        return (
          <Tooltip title={convertShamsiDateFormat(column?.value, true)}>
            {convertShamsiDateFormat(column?.value, true)}
          </Tooltip>
        );
      },
    },
    {
      title: t('table.modify_by'),
      dataIndex: 'userName',
      render: (column) => {
        return (
          <Tooltip title={column.value}>
            <HistoryCell item={column} />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.revision_type'),
      dataIndex: 'revisionDto',
      render: (_value, record) => {
        const variant = record?.revType?.code?.value;
        const isdeleted = record?.isDeleted?.value;
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
      className: 'right-to-left',
      minWidth: 100,
      render: (_value, record) => {
        const persianName = record?.persianName;
        return (
          <Tooltip title={persianName.value}>
            <HistoryCell item={persianName} />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      minWidth: 200,
      render: () => {
        return <Tooltip title={clientType}>{getValueOrDash(clientType)}</Tooltip>;
      },
    },
    {
      title: t('table.url'),
      dataIndex: 'url',
      render: (_value, record) => {
        const item = record?.url;
        return (
          <Tooltip title={item?.value}>
            <HistoryCell item={item} />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.inbound_url'),
      dataIndex: 'inboundUrl',
      render: (_value, record) => {
        const item = record?.inboundUrl;
        return (
          <Tooltip title={item?.value}>
            <HistoryCell item={item} />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.redirect_url'),
      dataIndex: 'redirectUrl',
      render: (_value, record) => {
        const item = record?.redirectUrl;
        return (
          <Tooltip title={item.value}>
            <HistoryCell item={item} />
          </Tooltip>
        );
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
          { title: t('table.edit_time'), value: getValueOrDash(value?.editTime) },
          {
            title: t('table.user_name'),
            value: getValueOrDash(value?.adminName),
          },
          {
            title: t('table.client_english_name'),
            value: getValueOrDash(value?.clientenglishName),
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

        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
