import React from 'react';
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
      title: `${t('client_id')}`,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          <S.Name text={getValueOrDash(name)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('utc')}`,
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
      ellipsis: true,
      render: (persian_name) => (
        <Tooltip placement='top' title={getValueOrDash(persian_name)} arrow={true}>
          {getValueOrDash(persian_name)}
        </Tooltip>
      ),
    },
    {
      title: `${t('request_date')}`,
      dataIndex: 'scopes',
      key: 'scopes',
      align: 'center',
      ellipsis: true,
      render: (scopes) => (
        <Tooltip placement='top' title={getValueOrDash(scopes)} arrow={true}>
          <S.Name text={getValueOrDash(scopes)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('request_time')}`,
      dataIndex: 'paths',
      key: 'paths',
      align: 'center',
      ellipsis: true,
      render: (paths) => (
        <Tooltip placement='top' title={getValueOrDash(paths)} arrow={true}>
          <S.Name text={getValueOrDash(paths)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('service_id')}`,
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      ellipsis: true,
      render: (version) => getValueOrDash(version),
    },
    {
      title: `${t('service_name')}`,
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      ellipsis: true,
      render: (isActive, name) => (
        <Tooltip placement='top' title={getValueOrDash(isActive)} arrow={true}>
          <S.Name text={getValueOrDash(isActive)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('status')}`,
      dataIndex: 'details',
      key: 'details',
      align: 'center',
      ellipsis: true,
      render: (value, record) => (
        <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
          <S.Name text={getValueOrDash(value)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
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
            title: t('name'),
            value: (
              <S.Name
                text={getValueOrDash(value?.name)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('persian_name'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: t('scope'),
            value: (
              <WithBadge
                items={value.scopes}
                onRender={(value) => (
                  <S.Name
                    text={getValueOrDash(value)}
                    highlightColor={highlightColor}
                    wordToHighlight={wordToHighlight}
                  />
                )}
              />
            ),
          },
          {
            title: t('url'),
            value: <WithBadge items={value?.paths} onRender={(value) => <S.Url>{getValueOrDash(value)}</S.Url>} />,
          },
          {
            title: t('status'),
            value: (
              <span>
                {t('operational')}
                <span style={{ margin: '0 1.2rem' }}>
                  <Switch checked={value?.isActive} disabled={true} />
                </span>
                {t('stopped')}
              </span>
            ),
          },
          {
            title: '',
            value: (
              <S.Details
                variant={'link'}
                size={'small'}
                href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}
              >
                {t('detailed')}
              </S.Details>
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
