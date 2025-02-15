import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Box, Switch } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

// import { ParamsType } from '../types';

import * as S from '../components/client-report/client-report.style';

type Props = {
  t: TFunction;
  // changeStatus?: (status: boolean, name: string) => void;
  // deleteService?: (name: string, status: ParamsType) => void;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    // , changeStatus, deleteService
    theme,
    wordToHighlight,
  } = props;
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
      title: `${t('national')}`,
      dataIndex: 'national',
      key: 'national',
      align: 'center',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (national) => (
        <Tooltip placement='top' title={getValueOrDash(national)} arrow={true}>
          {getValueOrDash(national)}
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'servicesReport',
      key: 'servicesReport',
      align: 'center',
      width: 80,
      render: (value, record) => (
        <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name ?? ''}`}>
          {t('services_report')}
        </S.Details>
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
          {t('details')}
        </S.Details>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const {
    t,
    // , changeStatus, deleteService
    theme,
    wordToHighlight,
  } = props;
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
            title: t('national'),
            value: getValueOrDash(value?.national),
          },
          {
            title: '',
            value: (
              <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}>
                {t('services_report')}
              </S.Details>
            ),
            colon: false,
          },
          {
            title: '',
            value: (
              <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}>
                {t('details')}
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
