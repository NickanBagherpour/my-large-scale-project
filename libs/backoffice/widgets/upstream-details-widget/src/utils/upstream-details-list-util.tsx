import React from 'react';
import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { UpstreamDetailsType } from '../types';

import * as S from '../components/upstream-details-list/upstream-details-list.style';

type Props = {
  t: TFunction;
  deleteUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
  editUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
};

type ServerDeleteModalProps = {
  t: TFunction;
};

const renderHealthStatus = (t, value) => {
  switch (value) {
    case '0':
      return t('unHealth');
    case '1':
      return t('health');
  }
};

export function getDesktopColumns(props: Props): ColumnsType<UpstreamDetailsType> {
  const { t, deleteUpstream, editUpstream } = props;
  return [
    {
      title: `${t('domain')}`,
      dataIndex: 'domain',
      key: 'domain',
      render: (domain) => getValueOrDash(domain),
    },
    {
      title: `${t('health_status')}`,
      dataIndex: 'healthStatus',
      key: 'health_status',
      render: (value) => {
        return getValueOrDash(renderHealthStatus(t, value) ? renderHealthStatus(t, value) : t('health'));
      },
    },
    {
      title: `${t('weight')}`,
      dataIndex: 'weight',
      key: 'weight',
      render: (weight) => getValueOrDash(weight),
    },

    {
      title: '',
      dataIndex: 'id', // This maps to the `id` value from `UpstreamDetailsType`
      key: 'id',
      render: (id: number, record: UpstreamDetailsType, index: number) => (
        <S.BtnContainer>
          <S.Edit onClick={() => editUpstream(id, record.domain, record.weight, record.healthStatus)}>
            {t('edit')}
          </S.Edit>
          <S.Trash
            className='icon-trash'
            onClick={() => deleteUpstream(id, record.domain, record.weight, record.healthStatus)}
          />
        </S.BtnContainer>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<UpstreamDetailsType> {
  const { t, deleteUpstream, editUpstream } = props;
  return [
    {
      title: '',
      dataIndex: '',
      render: ({ id, domain, healthStatus, weight }) => {
        const data: MobileColumnType[] = [
          {
            title: t('domain'),

            value: getValueOrDash(domain),
          },
          {
            title: t('health_status'),
            value: getValueOrDash(
              renderHealthStatus(t, healthStatus) ? renderHealthStatus(t, healthStatus) : t('health')
            ),
          },
          {
            title: t('weight'),
            value: getValueOrDash(weight),
          },
          {
            title: '',
            value: (
              <S.BtnContainer>
                <S.Edit onClick={() => editUpstream(id, domain, weight, healthStatus)}>{t('edit')}</S.Edit>
                <S.Trash className='icon-trash' onClick={() => deleteUpstream(id, domain, weight, healthStatus)} />
              </S.BtnContainer>
            ),
            colon: false,
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}

export function getDesktopColumnsDeleteServerModal(props: ServerDeleteModalProps): ColumnsType<UpstreamDetailsType> {
  const { t } = props;
  return [
    {
      title: `${t('domain')}`,
      dataIndex: 'domain',
      key: 'domain',
      render: (domain) => getValueOrDash(domain),
    },
    {
      title: `${t('health_status')}`,
      dataIndex: 'healthStatus',
      key: 'health_status',
      render: (value) => {
        return getValueOrDash(renderHealthStatus(t, value) ? renderHealthStatus(t, value) : t('health'));
      },
    },
    {
      title: `${t('weight')}`,
      dataIndex: 'weight',
      key: 'weight',
      render: (weight) => getValueOrDash(weight),
    },
  ];
}

export function getMobileColumnsDeleteServerModal(props: ServerDeleteModalProps): ColumnsType<UpstreamDetailsType> {
  const { t } = props;
  return [
    {
      title: '',
      dataIndex: '',
      render: (domain, healthStatus, weight) => {
        const data: MobileColumnType[] = [
          {
            title: t('domain'),

            value: getValueOrDash(domain),
          },
          {
            title: t('health_status'),

            value: getValueOrDash(
              renderHealthStatus(t, typeof healthStatus === 'string' && healthStatus !== '1')
                ? renderHealthStatus(t, healthStatus)
                : t('health')
            ),
          },
          {
            title: t('weight'),

            value: getValueOrDash(weight),
          },
        ];

        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
