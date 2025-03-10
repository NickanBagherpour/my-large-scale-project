import React from 'react';
import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';

import { Button, ColumnsType, MarkText, MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { Pagination } from '@oxygen/types';

import { ServiceItemType } from '../types';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
  theme: DefaultTheme;
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
      render: (_val, record) => {
        return (
          <Tooltip placement='top' title={getValueOrDash(record?.serviceName)} arrow={true}>
            <MarkText
              text={getValueOrDash(record?.serviceName)}
              highlightColor={highlightColor}
              wordToHighlight={wordToHighlight}
            />
          </Tooltip>
        );
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'servicePersianName',
      align: 'center',
      render: (_val, record) => (
        <Tooltip placement='top' title={getValueOrDash(record?.servicePersianName)} arrow={true}>
          <MarkText
            text={getValueOrDash(record?.servicePersianName)}
            highlightColor={highlightColor}
            wordToHighlight={wordToHighlight}
          />
        </Tooltip>
      ),
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
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
      render: (value, record) => {
        return (
          <S.ActionBox>
            <Button
              variant={'link'}
              size={'small'}
              href={`${ROUTES.BUSINESS.META_SERVICES_REPORT}?id=${record?.gateWayId}`}
            >
              {t('table.detail_report')}
            </Button>
            <Button
              variant={'link'}
              size={'small'}
              onClick={() => {
                setOpenModal(true);
                setServiceName(record?.serviceName);
              }}
            >
              {t('button.detail')}
            </Button>
          </S.ActionBox>
        );
      },
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
              <Tooltip placement='top' title={getValueOrDash(record?.serviceName)} arrow={true}>
                <MarkText
                  text={getValueOrDash(record?.serviceName)}
                  highlightColor={highlightColor}
                  wordToHighlight={wordToHighlight}
                />
              </Tooltip>
            ),
          },
          {
            title: t('table.persian_name'),
            value: (
              <Tooltip placement='top' title={getValueOrDash(record?.servicePersianName)} arrow={true}>
                <MarkText
                  text={getValueOrDash(record?.servicePersianName)}
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
                  size={'small'}
                  href={`${ROUTES.BUSINESS.META_SERVICES_REPORT}?id=${record?.gateWayId}`}
                >
                  {t('table.detail_report')}
                </Button>
                <Button
                  variant={'link'}
                  size={'small'}
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
