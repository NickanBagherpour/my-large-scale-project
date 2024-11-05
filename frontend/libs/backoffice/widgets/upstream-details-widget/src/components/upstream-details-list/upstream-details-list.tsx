import React from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { getValueOrDash, uuid } from '@oxygen/utils';
import { Table, Box, ColumnsType } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import * as S from './upstream-details-list.style';

import { UpstreamDetailsType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';

type UpstreamDetailsProps = PageProps & {
  data: UpstreamDetailsType[];
  isFetching: boolean;
  total?: number;
  isLoading: boolean;
  deleteUpstream: (name: string, status: ParamsType) => void;
};

const UpstreamDetails: React.FC<UpstreamDetailsProps> = (props) => {
  const { data, isFetching, total, deleteUpstream } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();

  const {
    table: { pagination },
  } = state;

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;

    if (pageSize && current) {
      const updatedPagination = {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      };
      updatePagination(dispatch, updatedPagination);
    }
  };

  const mobileColumns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        return (
          <Box flexDirection='column'>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('domain')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.domain)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('health_status')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.health_status)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('weight')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.weight)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}></span>
              <span className={'item__value'}>
                {<S.Trash className='icon-trash' onClick={() => deleteUpstream(value.domain, value.weight)} />}
              </span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: `${t('domain')}`,
      dataIndex: 'domain',
      key: 'domain',
      render: (domain) => getValueOrDash(domain),
    },
    {
      title: `${t('health_status')}`,
      dataIndex: 'healthStatus',
      key: 'healthStatus',
      render: (healthStatus) => getValueOrDash(healthStatus),
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
      key: 'domain',
      render: (domain, weight) => <S.Trash className='icon-trash' onClick={() => deleteUpstream(domain, weight)} />,
    },
  ];

  const tableData = data.map((item, index) => ({ ...item, index: index + 1 }));

  return (
    <S.TableContainer>
      <Table
        loading={isFetching}
        current={pagination.page}
        total={total}
        dataSource={tableData}
        columns={columns}
        mobileColumns={mobileColumns}
        hasContainer={false}
        pagination={{ pageSize: pagination.rowsPerPage }}
        onChange={handlePageChange}
        rowKey={() => uuid()}
      />
    </S.TableContainer>
  );
};

export default UpstreamDetails;
