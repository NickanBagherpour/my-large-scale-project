import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Box, Switch } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

import { ParamsType } from '../types';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus: (status: boolean, name: string) => void;
  deleteService: (name: string, status: ParamsType) => void;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    { title: `${t('row')}`, dataIndex: 'index', key: 'index', align: 'center', width: 70, className: 'row-number' },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          <S.Name text={getValueOrDash(name)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('persian_name')}`,
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (persian_name) => (
        <Tooltip placement='top' title={getValueOrDash(persian_name)} arrow={true}>
          {getValueOrDash(persian_name)}
        </Tooltip>
      ),
    },
    {
      title: `${t('scope')}`,
      dataIndex: 'scope',
      key: 'scope',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (scope) => (
        <Tooltip placement='top' title={getValueOrDash(scope)} arrow={true}>
          <S.Name text={getValueOrDash(scope)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: 'url',
      dataIndex: 'path',
      key: 'path',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (url) => (
        <Tooltip placement='top' title={getValueOrDash(url)} arrow={true}>
          <S.Url href={ROUTES.BACKOFFICE.SERVICE_CREATION}>{getValueOrDash(url)}</S.Url>
        </Tooltip>
      ),
    },
    {
      title: `${t('version')}`,
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      width: 100,
      render: (version) => getValueOrDash(version),
    },
    {
      title: `${t('status')}`,
      dataIndex: 'isActive',
      key: 'isActive',
      width: 150,
      render: (isActive, name) => (
        <S.SwitchContainer>
          {t('operational')}
          <span style={{ margin: '0 1.2rem' }}>
            <Switch disabled={true} checked={isActive} />
          </span>
          {t('stopped')}
        </S.SwitchContainer>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'center',
      width: 80,
      render: (value, record) => (
        <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name ?? ''}`}>
          {t('detailed')}
        </S.Details>
      ),
    },
    // {
    //   title: '',
    //   dataIndex: 'name',
    //   key: 'name',
    //   align: 'center',
    //   width: 70,
    //   render: (name, status) => <S.Trash className='icon-trash' onClick={() => deleteService(name, status)} />,
    // },
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
              <S.Name
                text={getValueOrDash(value?.scope)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('url'),
            value: <S.Url href={ROUTES.BACKOFFICE.SERVICE_CREATION}>{getValueOrDash(value?.path)}</S.Url>,
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
              <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}>
                {t('detailed')}
              </S.Details>
            ),
            colon: false,
          },
          // {
          //   title: '',
          //   value: <S.Trash className='icon-trash' onClick={() => deleteService(value.name, value.status)} />,
          //   colon: false,
          // },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
