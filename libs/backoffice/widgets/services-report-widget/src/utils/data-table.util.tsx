import React from 'react';
import { TFunction } from 'i18next';

import { Button, ColumnsType, MarkText, MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { ITheme, Pagination } from '@oxygen/types';

import { ServiceDto } from '../types';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<ServiceDto> {
  const {
    t,
    pagination: { page, rowsPerPage },
    theme,
    wordToHighlight,
  } = props;
  const highlightColor = theme.secondary.main;

  return [
    {
      title: t('uikit.index'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.service_name'),
      dataIndex: 'name',
      align: 'center',
      render: (_val, record) => {
        return (
          <Tooltip placement='top' title={getValueOrDash(record?.name)} arrow={true}>
            <MarkText
              text={getValueOrDash(record?.name)}
              highlightColor={highlightColor}
              wordToHighlight={wordToHighlight}
            />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (_val, record) => {
        return (
          <Tooltip placement='top' title={getValueOrDash(record?.persianName)} arrow={true}>
            <MarkText
              text={getValueOrDash(record?.persianName)}
              highlightColor={highlightColor}
              wordToHighlight={wordToHighlight}
            />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.status'),
      dataIndex: 'isActive',
      align: 'center',
      render: (_val, record) => {
        const status = record?.isActive ? t('table.active') : t('table.inActive');
        return (
          <Tooltip placement='top' title={getValueOrDash(status)} arrow={true}>
            <S.StatusContainer $status={record?.isActive}>{getValueOrDash(status)}</S.StatusContainer>
          </Tooltip>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      align: 'left',
      width: widthByButtonCount(3),
      render: (value, record) => (
        <S.ActionBox>
          <Button variant={'link'} size={'small'} disabled={true}>
            {t('table.detail_report')}
          </Button>
          <Button
            variant={'link'}
            size={'small'}
            href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name}`}
          >
            {t('button.detail')}
          </Button>
        </S.ActionBox>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ServiceDto> {
  const {
    t,
    pagination: { page, rowsPerPage },
    wordToHighlight,
    theme,
  } = props;
  const highlightColor = theme.secondary.main;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('table.service_name'),
            value: (
              <Tooltip placement='top' title={getValueOrDash(record?.name)} arrow={true}>
                <MarkText
                  text={getValueOrDash(record?.name)}
                  highlightColor={highlightColor}
                  wordToHighlight={wordToHighlight}
                />
              </Tooltip>
            ),
          },
          {
            title: t('table.persian_name'),
            value: (
              <Tooltip placement='top' title={getValueOrDash(record?.persianName)} arrow={true}>
                <MarkText
                  text={getValueOrDash(record?.persianName)}
                  highlightColor={highlightColor}
                  wordToHighlight={wordToHighlight}
                />
              </Tooltip>
            ),
          },
          {
            title: t('table.status'),
            value: (
              <S.StatusContainer $status={record?.isActive}>
                {getValueOrDash(record?.isActive ? t('table.active') : t('table.inActive'))}
              </S.StatusContainer>
            ),
          },
          {
            title: t(''),
            colon: false,
            value: (
              <S.ActionBox>
                <Button
                  variant={'link'}
                  // href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name}`}
                  size={'small'}
                  disabled={true}
                >
                  {t('table.detail_report')}
                </Button>
                <Button
                  variant={'link'}
                  size={'small'}
                  href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name}`}
                >
                  {t('button.detail')}
                </Button>
              </S.ActionBox>
            ),
          },
        ];

        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
