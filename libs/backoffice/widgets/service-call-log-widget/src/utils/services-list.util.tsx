import React, { JSX } from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Switch } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';
import { WithBadge } from '@oxygen/reusable-components';

// import { ParamsType } from '../types';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus?: (status: boolean, name: string) => void;
  deleteService?: (name: string, status: any) => void;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    // {
    //   title: `${t('row')}`,
    //   width: CONSTANTS.ROW_INDEX_WIDTH,
    //   dataIndex: 'index',
    //   key: 'index',
    //   align: 'center',
    //   className: 'row-number',
    // },
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
      render: (serviceName) => (
        <Tooltip placement='top' title={getValueOrDash(serviceName)} arrow={true}>
          {getValueOrDash(serviceName)}
        </Tooltip>
      ),
    },
    {
      title: `${t('count')}`,
      dataIndex: 'responseBody',
      key: 'responseBody',
      align: 'center',
      render: (responseBody) => (
        <Tooltip placement='top' title={getValueOrDash(responseBody)} arrow={true}>
          {getValueOrDash(JSON.parse(responseBody).amount)}
        </Tooltip>
      ),
    },
    {
      title: `${t('status')}`,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status, record) => (
        <Tooltip placement='top' title={getValueOrDash(status)} arrow={true}>
          {getValueOrDash(status)}
        </Tooltip>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    {
      title: '',
      dataIndex: '',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('client_id'),
            value: (
              <S.Name
                text={getValueOrDash(value?.name)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('utc'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: t('request_date'),
            value: getValueOrDash('1403/12/15'),
          },
          {
            title: t('request_time'),
            value: getValueOrDash('12:00'),
          },
          {
            title: t('service_id'),
            value: getValueOrDash(value?.id),
          },
          {
            title: t('service_name'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: t('status'),
            value: getValueOrDash('فعال'),
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
