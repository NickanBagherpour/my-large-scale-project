import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Box, Switch } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';
import { WithBadge } from '@oxygen/reusable-components';

import { ParamsType } from '../types';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus?: (status: boolean, name: string) => void;
  deleteService?: (name: string, status: ParamsType) => void;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    { title: `${t('row')}`, dataIndex: 'index', key: 'index', align: 'center', width: 0, className: 'row-number' },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      // width: 150,
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
      // width: 50,
      ellipsis: {
        showTitle: true,
      },
      render: (persian_name) => (
        <Tooltip placement='top' title={getValueOrDash(persian_name)} arrow={true}>
          {getValueOrDash(persian_name)}
          {getValueOrDash(persian_name)}
        </Tooltip>
      ),
    },
    {
      title: `${t('scope')}`,
      dataIndex: 'scopes',
      key: 'scopes',
      align: 'center',
      // width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (scopes) => (
        <WithBadge
          items={scopes}
          onRender={(value) => (
            <S.Name text={getValueOrDash(value)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
          )}
        />
      ),
    },
    {
      title: 'url',
      dataIndex: 'paths',
      key: 'paths',
      align: 'center',
      // width: 120,
      ellipsis: true,
      render: (paths) => (
        <WithBadge
          items={[...paths, ...paths, ...paths]}
          onRender={(value) => <S.Url>{getValueOrDash(value)}</S.Url>}
        />
      ),
    },
    {
      title: `${t('version')}`,
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      width: 0,
      render: (version) => getValueOrDash(version),
    },
    {
      title: `${t('status')}`,
      dataIndex: 'isActive',
      key: 'isActive',
      // width: 150,
      render: (isActive, name) => (
        <S.SwitchContainer>
          <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>{t('operational')}</span>
          <span style={{ margin: '0 1.2rem' }}>
            <Switch disabled={true} checked={isActive} />
          </span>
          <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>{t('stopped')}</span>
        </S.SwitchContainer>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'center',
      width: 0,
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
