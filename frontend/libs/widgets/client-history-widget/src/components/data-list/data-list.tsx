import React, { ChangeEvent } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Box, ColumnsType, Table } from '@oxygen/ui-kit';
import { dateLocale, getValueOrDash, uuid } from '@oxygen/utils';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './data-list.style';

type dataListProps = PageProps & {
  data: any;
  isFetching: boolean;
};

const DataList: React.FC<dataListProps> = (props) => {
  const { data, isFetching } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const {
    table: { pagination },
  } = state;
  console.log('state', state);

  // const handlePageChange = async (_: ChangeEvent<unknown>, page: number, rowsPerPage?: number) => {
  // const updatedPagination = { page, ...(rowsPerPage ? { limit: rowsPerPage } : {}) };

  const handlePageChange = async (pageData: any) => {
    const updatedPagination = { page: pageData.current, ...(pageData.pageSize ? { limit: pageData.pageSize } : {}) };
    updatePagination(dispatch, updatedPagination);
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
              <span className={'item__title'}>{t('table.edit_time')} </span>
              <span className={'item__value'}>{getValueOrDash(dateLocale(value?.editTime))}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.admin_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.adminName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.client_latin_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.clientLatinName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.client_farsi_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.clientFarsiName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.client_type')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.clientType)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.client_id')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.clientId)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.verification_id')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.verificationId)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.aggregator_status')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.aggregatorStatus)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.aggregator_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.aggregatorName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.address')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.address)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.input_address')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.inputAddress)}</span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: t('table.edit_time'),
      dataIndex: 'editTime',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.admin_name'),
      dataIndex: 'adminName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_latin_name'),
      dataIndex: 'clientLatinName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_farsi_name'),
      dataIndex: 'clientFarsiName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_type'),
      dataIndex: 'clientType',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.client_id'),
      dataIndex: 'clientId',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.verification_id'),
      dataIndex: 'verificationId',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.aggregator_status'),
      dataIndex: 'aggregatorStatus',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.aggregator_name'),
      dataIndex: 'aggregatorName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.address'),
      dataIndex: 'address',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.input_address'),
      dataIndex: 'inputAddress',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
  ];

  return (
    <Box marginTop={'2.4rem'}>
      <Table
        columns={columns}
        mobileColumns={mobileColumns}
        variant={'complex'}
        total={data?.totalElements}
        current={pagination.page}
        // size={pagination.limit}
        title={t('table.client_change_history')}
        hasContainer={true}
        dataSource={data?.content}
        loading={isFetching}
        onChange={handlePageChange}
        rowKey={() => uuid()}
      />
    </Box>
  );
};

export default DataList;
