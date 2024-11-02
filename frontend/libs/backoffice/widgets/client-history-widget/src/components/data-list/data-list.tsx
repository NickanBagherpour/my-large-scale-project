import React from 'react';

import { useTr } from '@oxygen/translation';

import { Badge, TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { dateLocale, getValueOrDash, uuid } from '@oxygen/utils';
import { Box, ColumnsType, Table } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';
import { PageProps } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetReportDataQuery } from '../../services';

import * as S from './data-list.style';

type dataListProps = PageProps & {
  //
};

const DataList: React.FC<dataListProps> = (props) => {
  // const { data, isFetching } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const theme = useTheme();

  // const [showBadge, setShowBadge] = useState(true);

  const {
    table: { pagination },
  } = state;

  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      clientId: state?.clientId,
      ...pagination,
    };

    return params;
  }

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
        // convertShamsiDateFormat
      },
    },
    {
      title: t('table.admin_name'),
      dataIndex: 'adminName',
      align: 'center',
      width: 'min-content',
      render: (value, record) => {
        const showBadge = record?.someCondition;
        return (
          <S.ValueContainer>
            {'showBadge' && (
              <Badge
                status='error'
                // offset={[2, 0]}
                dot={showBadge}
                color={theme.error._600}
              />
            )}

            <span style={{ marginLeft: showBadge ? 8 : 0 }}>{getValueOrDash(value)}</span>
          </S.ValueContainer>
          // <Badge
          //   status={'error'}
          //   offset={[10, 0]}
          //   dot={showBadge}
          //   text={<span style={{ fontSize: 'inherit' }}>{getValueOrDash(value)}</span>}
          // ></Badge>
        );
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
    <S.TableContainer>
      {data?.content ? (
        <Table
          loading={isFetching}
          current={pagination.page}
          total={data?.total}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={columns}
          mobileColumns={mobileColumns}
          variant={'complex'}
          title={t('table.client_change_history')}
          hasContainer={true}
          onChange={handlePageChange}
          rowKey={() => uuid()}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.TableContainer>
  );
};

export default DataList;
