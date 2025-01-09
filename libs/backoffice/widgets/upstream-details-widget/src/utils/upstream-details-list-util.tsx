import React from 'react';
import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { UpstreamDetailsType } from '../types';

import * as S from '../components/upstream-details-list/upstream-details-list.style';

type Props = {
  t: TFunction;
  deleteUpstream: (name: string) => void;
  editUpstream: (name: string) => void;
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
        return getValueOrDash(renderHealthStatus(t, value));
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
      dataIndex: 'domain',
      key: 'domain,',
      render: (domain, record) => <S.Edit onClick={() => editUpstream(domain)}> {t('edit')}</S.Edit>,
    },

    {
      title: '',
      dataIndex: 'domain',
      key: 'domain',
      render: (domain, record) => <S.Trash className='icon-trash' onClick={() => deleteUpstream(domain)} />,
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
            value: getValueOrDash(renderHealthStatus(t, value?.healthStatus)),
          },
          {
            title: t('weight'),
            value: getValueOrDash(value?.weight),
          },
          {
            title: t('edit'),
            value: <S.Edit onClick={() => editUpstream(value.domain)} />,
          },
          {
            title: '',
            value: <S.Trash className='icon-trash' onClick={() => deleteUpstream(value.domain)} />,
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
        return getValueOrDash(renderHealthStatus(t, value));
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
            value: getValueOrDash(renderHealthStatus(t, value?.healthStatus)),
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
