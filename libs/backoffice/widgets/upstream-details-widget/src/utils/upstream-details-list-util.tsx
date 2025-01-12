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
    // {
    //   title: '',
    //   dataIndex: 'id', // This maps to the `id` value from `UpstreamDetailsType`
    //   key: 'edit',
    //   render: (id: number, record: UpstreamDetailsType, index: number) => (
    //     <S.Edit onClick={() => editUpstream(id, record.domain, record.weight, record.healthStatus)}>{t('edit')}</S.Edit>
    //   ),
    // },

    {
      title: '',
      dataIndex: 'id', // This maps to the `id` value from `UpstreamDetailsType`
      key: 'delete',
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
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('domain'),
            value: getValueOrDash(value?.domain),
          },
          {
            title: t('health_status'),
            value: getValueOrDash(
              renderHealthStatus(t, value?.healthStatus) ? renderHealthStatus(t, value) : t('health')
            ),
          },
          {
            title: t('weight'),
            value: getValueOrDash(value?.weight),
          },
          // {
          //   title: t('edit'),
          //   value: (
          //     <S.Edit onClick={() => editUpstream(value.id, value.domain, value.weight, value.healthStatus)}>
          //       {t('edit')}
          //     </S.Edit>
          //   ),
          // },
          {
            title: '',
            value: (
              <S.BtnContainer>
                <S.Edit onClick={() => editUpstream(value.id, value.domain, value.weight, value.healthStatus)}>
                  {t('edit')}
                </S.Edit>
                <S.Trash
                  className='icon-trash'
                  onClick={() => deleteUpstream(value.id, value.domain, value.weight, value.healthStatus)}
                />
              </S.BtnContainer>
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} />;
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
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('domain'),
            value: getValueOrDash(value?.domain),
          },
          {
            title: t('health_status'),
            value: getValueOrDash(
              renderHealthStatus(t, value?.healthStatus) ? renderHealthStatus(t, value) : t('health')
            ),
          },
          {
            title: t('weight'),
            value: getValueOrDash(value?.weight),
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
