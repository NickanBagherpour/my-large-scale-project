import { useTr } from '@oxygen/translation';
import { Button, ColumnsType } from '@oxygen/ui-kit';
import type { TablePaginationConfig } from 'antd';
import { useState } from 'react';
import { clients, months, years } from '../../utils/consts';
import { ROUTES } from '@oxygen/utils';
import * as S from './data-table.style';
import { updateMonthAction, updateYearAction, useAppDispatch } from '../../context';

export default function DataTable() {
  const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { page, size } = pagination;
  const [t] = useTr();
  const dispatch = useAppDispatch();

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === size ? current : 1,
        size: pageSize,
      });
    }
  };

  // TODO: handle responsivness, tooltip, etc.
  const columns: ColumnsType<(typeof clients)[number]> = [
    {
      title: t('row'),
      dataIndex: 'index',
      width: '8rem',
    },
    {
      title: t('aggregator_or_client_name'),
      dataIndex: 'name',
    },
    {
      title: t('year'),
      dataIndex: 'year',
      filters: years,
      filterDropdown: ({ filters, close }) => {
        return (
          <S.Dropdown>
            {filters?.map((filter, idx) => (
              <li key={idx}>
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => {
                    close();
                    updateYearAction(dispatch, filter.value as string);
                  }}
                >
                  {filter.text}
                </Button>
              </li>
            ))}
          </S.Dropdown>
        );
      },
      filterIcon: () => <S.ChevIcon className='icon-chev-down' />,
    },
    {
      title: t('month'),
      dataIndex: 'month',
      filters: months,
      filterDropdown: ({ filters, close }) => {
        return (
          <S.Dropdown>
            {filters?.map((filter, idx) => (
              <li key={idx}>
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => {
                    close();
                    updateMonthAction(dispatch, filter.value as string);
                  }}
                >
                  {filter.text}
                </Button>
              </li>
            ))}
          </S.Dropdown>
        );
      },
      filterIcon: () => <S.ChevIcon className='icon-chev-down' />,
    },
    {
      title: t('successful_transaction'),
      dataIndex: 'successfulTransaction',
      render: (tr) => <S.Success>{tr}</S.Success>,
    },
    {
      title: t('unsuccessful_transaction'),
      dataIndex: 'unsuccessfulTransaction',
      render: (tr) => <S.Failure>{tr}</S.Failure>,
    },
    {
      title: t('total_transaction_count'),
      dataIndex: 'totalTransactionCount',
    },
    {
      title: '',
      key: 'details',
      width: '15rem',
      render: () => (
        <Button variant='link' href={ROUTES.BUSINESS.DETAILED_BILL_REPORT}>
          <i className='icon-document' />
          <span>{t('view_details')}</span>
        </Button>
      ),
    },
  ];

  return (
    <S.Table
      loading={false}
      current={page}
      total={30}
      dataSource={clients}
      pagination={{ pageSize: size }}
      columns={columns}
      // mobileColumns={mobileColumns}
      onChange={changePage}
      rowKey={(row) => row.index}
    />
  );
}
