import React from 'react';
import { TFunction } from 'i18next';

import { Button, ColumnsType, MarkText, MobileColumnType, Table } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, widthByButtonCount } from '@oxygen/utils';
import { ITheme, Pagination } from '@oxygen/types';

import { ServiceItemType } from '../types';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
  theme: ITheme;
  wordToHighlight: string;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setServiceName: (value: ((prevState: string) => string) | string) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<ServiceItemType> {
  const {
    t,
    pagination: { page, rowsPerPage },
    theme,
    wordToHighlight,
    setOpenModal,
    setServiceName,
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
      dataIndex: 'serviceName',
      align: 'center',
      ellipsis: true,
      render: (_val, record) => {
        return (
          <MarkText
            text={getValueOrDash(record?.serviceName)}
            highlightColor={highlightColor}
            wordToHighlight={wordToHighlight}
          />
        );
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'servicePersianName',
      align: 'center',
      ellipsis: true,
      render: (_val, record) => {
        return getValueOrDash(record?.servicePersianName);
      },
    },
    {
      title: t('table.status'),
      dataIndex: 'isActive',
      align: 'center',
      ellipsis: true,
      render: (_val, record) => {
        const status = record?.isActive ? t('table.active') : t('table.inActive');
        return <S.StatusContainer $status={record?.isActive}>{getValueOrDash(status)}</S.StatusContainer>;
      },
    },
    {
      title: '',
      dataIndex: '',
      align: 'left',
      width: widthByButtonCount(2),
      render: (value, record) => (
        <S.ActionBox>
          <Button variant={'link'} size={'small'} disabled={true}>
            {t('table.detail_report')}
          </Button>
          <Button
            variant={'link'}
            size={'small'}
            // href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name}`}
            onClick={() => {
              setOpenModal(true);
              setServiceName(record?.serviceName);
            }}
          >
            {t('button.detail')}
          </Button>
        </S.ActionBox>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<ServiceItemType> {
  const {
    t,
    pagination: { page, rowsPerPage },
    wordToHighlight,
    theme,
    setOpenModal,
    setServiceName,
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
              <MarkText
                text={getValueOrDash(record?.serviceName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('table.persian_name'),
            value: getValueOrDash(value?.servicePersianName),
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
                  // href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name}`}
                  onClick={() => {
                    setOpenModal(true);
                    setServiceName(record?.serviceName);
                  }}
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
