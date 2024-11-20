import React from 'react';

import { Badge, Tooltip } from 'antd';
import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';

import { ColumnsType, Table, MobileColumnType } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { ClientHistoryData } from '@oxygen/types';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
  theme: DefaultTheme;
};

export function getDesktopColumns(props: Props): ColumnsType<ClientHistoryData> {
  const { t, theme } = props;

  const badgeColor = theme.error._600;

  return [
    {
      title: t('table.edit_time'),
      dataIndex: 'editTime',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
        // convertShamsiDateFormat
      },
    },
    {
      title: t('table.admin_name'),
      dataIndex: 'adminName',
      align: 'center',
      width: 'min-content',
      render: (value, record) => {
        return (
          <S.ValueContainer>
            {(value?.showBadge ?? 'show') && <Badge color={badgeColor} />}
            <span>{getValueOrDash(value)}</span>
          </S.ValueContainer>
        );
      },
    },
    {
      title: t('table.client_latin_name'),
      dataIndex: 'clientLatinName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_farsi_name'),
      dataIndex: 'clientFarsiName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      align: 'center',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => {
        return (
          <Tooltip placement='top' title={getValueOrDash(value)}>
            {getValueOrDash(value)}
          </Tooltip>
        );
      },
    },
    {
      title: t('table.client_id'),
      dataIndex: 'clientId',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => {
        return (
          <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
            {getValueOrDash(value)}
          </Tooltip>
        );
      },
    },
    {
      title: t('table.verification_id'),
      dataIndex: 'verificationId',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.aggregator_status'),
      dataIndex: 'aggregatorStatus',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.aggregator_name'),
      dataIndex: 'aggregatorName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.address'),
      dataIndex: 'address',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.input_address'),
      dataIndex: 'inputAddress',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ClientHistoryData> {
  const { t, theme } = props;
  const badgeColor = theme.error._600;

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
            value: (
              <S.ValueContainer>
                {(value?.adminName?.showBadge ?? 'show') && <Badge offset={[2, 2]} color={badgeColor} />}
                {getValueOrDash(value?.adminName)}
              </S.ValueContainer>
            ),
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
