import React from 'react';

import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';
import { Badge } from 'antd';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { convertShamsiDateFormat, getValueOrDash, normalizePhoneNumber } from '@oxygen/utils';

import { ApplicantHistoryData } from '@oxygen/types';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
  theme: DefaultTheme;
};

export function getDesktopColumns(props: Props): ColumnsType<ApplicantHistoryData> {
  const { t, theme } = props;
  const badgeColor = theme.error._600;

  return [
    {
      title: t('table.edit_time'),
      dataIndex: 'editTime',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return convertShamsiDateFormat(value);
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
      title: t('table.user_name'),
      dataIndex: 'userName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.national_code'),
      dataIndex: 'nationalCode',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.organization_name'),
      dataIndex: 'organizationName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.mobile'),
      dataIndex: 'mobile',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.phone'),
      dataIndex: 'phone',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return <S.PhoneContainer>{normalizePhoneNumber(value)}</S.PhoneContainer>;
      },
    },
    {
      title: t('table.email'),
      dataIndex: 'email',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ApplicantHistoryData> {
  const { t, theme } = props;
  const badgeColor = theme.error._600;
  return [
    {
      title: '',
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('table.edit_time'),
            value: convertShamsiDateFormat(value?.editTime),
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
            title: t('table.user_name'),
            value: getValueOrDash(value?.userName),
          },
          {
            title: t('table.national_code'),
            value: getValueOrDash(value?.nationalCode),
          },
          {
            title: t('table.organization_name'),
            value: getValueOrDash(value?.organizationName),
          },
          {
            title: t('table.mobile'),
            value: getValueOrDash(value?.mobile),
          },
          {
            title: t('table.phone'),
            value: normalizePhoneNumber(value?.phone),
          },
          {
            title: t('table.email'),
            value: getValueOrDash(value?.email),
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
