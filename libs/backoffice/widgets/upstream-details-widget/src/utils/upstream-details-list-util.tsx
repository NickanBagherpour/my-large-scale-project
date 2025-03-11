import React from 'react';
import { TFunction } from 'i18next';

import { Box, ColumnsType, MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
import { getValueOrDash, widthByButtonCount } from '@oxygen/utils';
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
      title: t('domain'),
      dataIndex: 'domain',
      key: 'domain',
      align: 'center',
      render: (domain) => {
        return <Tooltip title={getValueOrDash(domain)}>{getValueOrDash(domain)}</Tooltip>;
      },
    },
    {
      title: t('health_status'),
      dataIndex: 'healthStatus',
      key: 'health_status',
      align: 'center',
      render: (value) => {
        return getValueOrDash(renderHealthStatus(t, value) ? renderHealthStatus(t, value) : t('health'));
      },
    },
    {
      title: t('weight'),
      dataIndex: 'weight',
      key: 'weight',
      align: 'center',
      render: (weight) => weight ?? getValueOrDash(weight),
    },

    {
      title: '',
      dataIndex: 'id', // This maps to the `id` value from `UpstreamDetailsType`
      key: 'id',
      width: widthByButtonCount(2),
      align: 'left',
      render: (id: number, record: UpstreamDetailsType, index: number) => (
        <S.ActionBox>
          <S.EditButton
            variant={'link'}
            onClick={() => editUpstream(id, record.domain, record.weight, record.healthStatus)}
            size={'small'}
          >
            {t('edit')}
          </S.EditButton>

          <S.TrashButton
            variant={'link'}
            color={'error'}
            size={'small'}
            onClick={() => deleteUpstream(id, record.domain, record.weight, record.healthStatus)}
          >
            <i className={'icon-trash'} />
          </S.TrashButton>
        </S.ActionBox>
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
            value: weight ?? getValueOrDash(weight),
          },
          {
            title: '',
            colon: false,
            value: (
              <Box display={'flex'} style={{ gap: '2rem' }} alignItems={'center'}>
                <S.EditButton onClick={() => editUpstream(id, domain, weight, healthStatus)} variant={'link'}>
                  {t('edit')}
                </S.EditButton>
                <S.TrashButton
                  variant={'link'}
                  color={'error'}
                  onClick={() => deleteUpstream(id, domain, weight, healthStatus)}
                >
                  <i className={'icon-trash'} />
                </S.TrashButton>
              </Box>
            ),
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
      title: t('domain'),
      dataIndex: 'domain',
      key: 'domain',
      render: (domain) => getValueOrDash(domain),
    },
    {
      title: t('health_status'),
      dataIndex: 'healthStatus',
      key: 'health_status',
      render: (value) => {
        return getValueOrDash(renderHealthStatus(t, value) ? renderHealthStatus(t, value) : t('health'));
      },
    },
    {
      title: t('weight'),
      dataIndex: 'weight',
      key: 'weight',
      render: (weight) => weight ?? getValueOrDash(weight),
    },
  ];
}

export function getMobileColumnsDeleteServerModal(props: ServerDeleteModalProps): ColumnsType<UpstreamDetailsType> {
  const { t } = props;
  return [
    {
      title: '',
      dataIndex: '',
      render: (value) => {
        const data: MobileColumnType[] = [
          {
            title: t('domain'),
            value: getValueOrDash(value?.domain),
          },
          {
            title: t('health_status'),
            value: getValueOrDash(
              renderHealthStatus(t, typeof value?.healthStatus === 'string' && value?.healthStatus !== '1')
                ? renderHealthStatus(t, value?.healthStatus)
                : t('health')
            ),
          },
          {
            title: t('weight'),
            value: value?.weight ?? getValueOrDash(value?.weight),
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
