import { useTr } from '@oxygen/translation';
import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import type { TablePaginationConfig } from 'antd';
import { useState } from 'react';
import { clients } from '../../utils/consts';
import { ROUTES } from '@oxygen/utils';
import * as S from './data-table.style';

export default function DataTable() {
  const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { page, size } = pagination;
  const [t] = useTr();

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
      /////
      filters: [
        {
          text: '1404',
          value: '1404',
        },
        {
          text: '1403',
          value: '1403',
        },
        {
          text: '1402',
          value: '1402',
        },
        {
          text: '1401',
          value: '1401',
        },
        {
          text: '1400',
          value: '1400',
        },
        {
          text: '1399',
          value: '1399',
        },
      ],
      filterDropdown: ({ filters }) => {
        return (
          <S.Dropdown>
            {filters?.map((filter, idx) => (
              <li key={idx}>
                <Button variant='text' color='primary'>
                  {filter.text}
                </Button>
              </li>
            ))}
          </S.Dropdown>
        );
      },
      onFilter: (value, record) => {
        return value === record.year;
      },
      filterIcon: (filtered: boolean) => {
        return <S.ChevIcon className='icon-chev-down' $filtered={filtered} />;
      },
      /////
    },
    {
      title: t('month'),
      dataIndex: 'month',
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
