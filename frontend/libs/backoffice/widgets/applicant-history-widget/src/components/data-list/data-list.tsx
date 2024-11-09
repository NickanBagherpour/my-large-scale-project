import React from 'react';

import { Badge, TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { dateLocale, getValueOrDash, uuid } from '@oxygen/utils';
import { Box, ColumnsType, Table } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
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
              <span className={'item__value'}>{getValueOrDash(value?.editTime)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <S.BadgeItemContainer>
                {'showBadge' && <Badge status='error' offset={[2, 0]} dot={true} color={theme.error._600} />}
                <span className={'item__title'}>{t('table.admin_name')}</span>
              </S.BadgeItemContainer>
              <span className={'item__value'}>{getValueOrDash(value?.adminName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.user_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.userName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.national_code')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.nationalCode)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.organization_name')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.organizationName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.mobile')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.mobile)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.phone')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.phone)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className={'item__title'}>{t('table.email')} </span>
              <span className={'item__value'}>{getValueOrDash(value?.email)}</span>
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
            {'showBadge' && <Badge status='error' offset={[2, 0]} dot={showBadge} color={theme.error._600} />}
            <span>{getValueOrDash(value)}</span>
          </S.ValueContainer>
        );
      },
    },
    {
      title: t('table.user_name'),
      dataIndex: 'userName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.national_code'),
      dataIndex: 'nationalCode',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.organization_name'),
      dataIndex: 'organizationName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.mobile'),
      dataIndex: 'mobile',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.phone'),
      dataIndex: 'phone',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('table.email'),
      dataIndex: 'email',
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
          title={t('table.applicant_change_history')}
          // hasContainer={true}
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
