import React from 'react';
import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';

import { ColumnsType, MobileColumnType, Table, Box, Switch } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';

import { ParamsType } from '../types';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus: (status: boolean, name: string) => void;
  deleteService: (name: string, status: ParamsType) => void;
  theme: DefaultTheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    { title: `${t('row')}`, dataIndex: 'index', key: 'index', align: 'center', width: 70 },
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
        <S.Name text={getValueOrDash(name)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
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
      render: (persian_name) => getValueOrDash(persian_name),
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
        <S.Name text={getValueOrDash(scope)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
      ),
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (url) => <S.Url href={ROUTES.BACKOFFICE.SERVICE_CREATION}>{getValueOrDash(url)}</S.Url>,
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
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status, name) => (
        <S.SwitchContainer>
          {t('stopped')}
          <span style={{ margin: '0 1.2rem' }}>
            <Switch checked={status} onClick={() => changeStatus(status, name.name)} />
          </span>
          {t('operational')}
        </S.SwitchContainer>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'center',
      width: 70,
      render: (url) => <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?id=1234`}>{t('detailed')}</S.Details>,
    },
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 70,
      render: (name, status) => <S.Trash className='icon-trash' onClick={() => deleteService(name, status)} />,
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
              <S.Name
                text={getValueOrDash(value?.scope)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('url'),
            value: <S.Url href={ROUTES.BACKOFFICE.SERVICE_CREATION}>{getValueOrDash(value?.url)}</S.Url>,
          },
          {
            title: t('status'),
            value: (
              <span>
                {t('stopped')}
                <span style={{ margin: '0 1.2rem' }}>
                  <Switch checked={value?.status} onClick={() => changeStatus(value?.status, value?.name)} />
                </span>
                {t('operational')}
              </span>
            ),
          },
          {
            title: '',
            value: <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?id=1234`}>{t('detailed')}</S.Details>,
            colon: false,
          },
          {
            title: '',
            value: <S.Trash className='icon-trash' onClick={() => deleteService(value.name, value.status)} />,
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
