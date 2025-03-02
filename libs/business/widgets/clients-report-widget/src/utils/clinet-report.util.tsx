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
      title: `${t('national')}`,
      dataIndex: 'clientEnglishName',
      key: 'national',
      align: 'center',
      // width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
          {getValueOrDash(value)}
        </Tooltip>
      ),
    },
    {
      title: `${t('name')}`,
      dataIndex: 'clientPersianName',
      key: 'clientPersianName',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)} arrow={true}>
          <S.Name text={getValueOrDash(value)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },

    {
      title: '',
      dataIndex: '',
      key: 'actions',
      align: 'left',
      render: (value, record) => (
        <Box gap='1.6rem' display={'flex'} alignItems={'center'} justifyContent={'end'}>
          <S.DetailsButton
            size={'small'}
            variant={'link'}
            href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?name=${record.name ?? ''}`}
          >
            {t('services_report')}
          </S.DetailsButton>

          <S.DetailsButton
            size={'small'}
            variant={'link'}
            href={`${ROUTES.BUSINESS.META_CLIENTS_REPORT}?name=${record.clientEnglishName ?? ''}`}
          >
            {t('details')}
          </S.DetailsButton>
        </Box>
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
                text={getValueOrDash(value?.clientEnglishName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('national'),
            value: getValueOrDash(value?.clientPersianName),
          },

          {
            title: '',
            value: (
              <Box display={'flex'} style={{ gap: '0.8rem' }}>
                <S.DetailsButton
                  size={'small'}
                  variant={'link'}
                  href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?name=${record.name ?? ''}`}
                >
                  {t('services_report')}
                </S.DetailsButton>

                <S.DetailsButton
                  size={'small'}
                  variant={'link'}
                  href={`${ROUTES.BUSINESS.META_CLIENTS_REPORT}?name=${record.clientEnglishName ?? ''}`}
                >
                  {t('details')}
                </S.DetailsButton>
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
