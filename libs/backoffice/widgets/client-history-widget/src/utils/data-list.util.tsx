import React from 'react';

import { Badge } from 'antd';
import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';

import { ColumnsType, Table, MobileColumnType } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import { ItemType } from '../types';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
  theme: DefaultTheme;
};

export function getDesktopColumns(props: Props): ColumnsType<ItemType> {
  const { t, theme } = props;

  const badgeColor = theme.error._600 as string;

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
            {(value?.showBadge ?? 'show') && <Badge offset={[2, 0]} color={badgeColor} />}
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
      width: 100,
      ellipsis: true,
      render: (value) => {
        return (
          <S.EllipsisContainer width={100} title={getValueOrDash(value)}>
            {getValueOrDash(value)}
          </S.EllipsisContainer>
        );
      },
    },
    {
      title: t('table.client_id'),
      dataIndex: 'clientId',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (value) => {
        return (
          <S.EllipsisContainer width={100} title={getValueOrDash(value)}>
            {getValueOrDash(value)}
          </S.EllipsisContainer>
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

export function getMobileColumns(props: Props): ColumnsType<ItemType> {
  const { t, theme } = props;
  const badgeColor = theme.error._600 as string;

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
                {(value?.adminName?.showBadge ?? 'show') && <Badge offset={[2, 2]} color={badgeColor} />}{' '}
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
            value: (
              <S.EllipsisContainer width={200} title={value?.clientType}>
                <span className='item__value'>{getValueOrDash(value?.clientType)}</span>
              </S.EllipsisContainer>
            ),
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
