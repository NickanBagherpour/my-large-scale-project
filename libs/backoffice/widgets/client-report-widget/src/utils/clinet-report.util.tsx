import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Box, Switch } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

// import { ParamsType } from '../types';
import { PaginationType } from '../context/types';

import * as S from '../components/client-report/client-report.style';

type Props = {
  t: TFunction;

  pagination: Omit<PaginationType, 'sort'>;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,

    pagination,
    theme,
    wordToHighlight,
  } = props;
  const highlightColor = theme.secondary.main;

  const { page, rowsPerPage } = pagination;

  return [
    // {
    //   title: t('row'),
    //   align: 'center',
    //   key: 'index',
    //   width: '0',
    //   render: (_val, _record, index) => {
    //     const start = (page - 1) * rowsPerPage + 1;
    //     return start + index;
    //   },
    // },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: {
        showTitle: true,
      },
      // width: 350,
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          <S.Name text={getValueOrDash(name)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('persianName')}`,
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
      ellipsis: {
        showTitle: true,
      },
      // width: 350,
      render: (persianName) => (
        <Tooltip placement='top' title={getValueOrDash(persianName)} arrow={true}>
          {getValueOrDash(persianName)}
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'servicesReport',
      key: 'servicesReport',
      align: 'center',
      ellipsis: {
        showTitle: true,
      },
      width: 150,
      render: (value, record) => (
        <Box display={'flex'} style={{ gap: '8rem' }} alignItems={'center'} justifyContent={'end'}>
          <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name ?? ''}`}>
            {t('services_report')}
          </S.Details>
          <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name ?? ''}`}>
            {t('details')}
          </S.Details>
        </Box>
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
            title: t('persianName'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: '',

            value: (
              <Box display={'flex'} style={{ gap: '4rem' }} alignItems={'center'}>
                <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}>
                  <S.ServicesReportOnMobile>{t('services_report')}</S.ServicesReportOnMobile>
                </S.Details>
                <S.Details href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}>
                  {t('details')}
                </S.Details>
              </Box>
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
