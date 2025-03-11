import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus?: (status: boolean, name: string) => void;
  deleteService?: (name: string, status: any) => void;
  theme: ITheme;
  wordToHighlight: string;
};

const getStatusColor = (status: number, theme: ITheme): string => {
  if (status >= 200 && status < 300) return theme.success.main; // Success
  if (status >= 300 && status < 400) return theme.warning.main; // Redirects
  if (status >= 400 && status < 500) return theme.error.main; // Client errors
  if (status >= 500) return theme.error._600; // Server errors
  return theme.secondary.main; // Default for unknown statuses
};

const renderWithTooltip = (value: string | number) => (
  <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
    {getValueOrDash(value)}
  </Tooltip>
);

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;

  return [
    {
      title: `${t('client_name')}`,
      dataIndex: 'clientName',
      key: 'clientName',
      align: 'center',
      render: (clientName) => (
        <Tooltip placement='top' title={getValueOrDash(clientName)} arrow={true}>
          <S.Name text={clientName} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('service_name')}`,
      dataIndex: 'serviceName',
      key: 'serviceName',
      align: 'center',
      render: renderWithTooltip,
    },
    {
      title: `${t('request_date')}`,
      dataIndex: 'requestDate',
      key: 'requestDate',
      align: 'center',
      render: renderWithTooltip,
    },
    {
      title: `${t('request_time')}`,
      dataIndex: 'requestTime',
      key: 'requestTime',
      align: 'center',
      render: renderWithTooltip,
    },
    {
      title: `${t('status')}`,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) => (
        <Tooltip placement='top' title={getValueOrDash(status)} arrow={true}>
          <p style={{ color: getStatusColor(status, theme), fontWeight: 'bold' }}>{getValueOrDash(status)}</p>
        </Tooltip>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;

  return [
    {
      title: '',
      dataIndex: '',
      render: (value) => {
        const columns: MobileColumnType[] = [
          {
            title: t('client_name'),
            value: getValueOrDash(value?.clientName),
          },
          {
            title: t('service_name'),
            value: (
              <S.Name
                text={getValueOrDash(value?.serviceName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('request_date'),
            value: getValueOrDash(value?.requestDate),
          },
          {
            title: t('request_time'),
            value: getValueOrDash(value?.requestTime),
          },
          {
            title: t('status'),
            value: (
              <p style={{ color: getStatusColor(value?.status, theme), fontWeight: 'bold' }}>
                {getValueOrDash(value?.status)}
              </p>
            ),
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
