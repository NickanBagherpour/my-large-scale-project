import { useTr } from '@oxygen/translation';
import { Button, ColumnsType } from '@oxygen/ui-kit';
import type { TablePaginationConfig } from 'antd';
import { clients, months, years } from '../../utils/consts';
import { addThousandSeparator, getValueOrDash, ROUTES } from '@oxygen/utils';
import * as S from './data-table.style';
import {
  updateMonthAction,
  updatePaginationAction,
  updateYearAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import { prepareParams } from '../../utils';
import { useGetReportsQuery } from '../../services';

export default function DataTable() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const { page, size } = state;
  const params = prepareParams(state);
  const { data, isPending, isFetching } = useGetReportsQuery(params);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePaginationAction(dispatch, {
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
      render: (_val, _record, index) => {
        const start = (page - 1) * size + 1;
        return start + index;
      },
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
                    updateYearAction(dispatch, filter.value as number);
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
                    updateMonthAction(dispatch, filter.value as number);
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
      dataIndex: 'successCount',
      render: (count) => <S.Success>{getValueOrDash(addThousandSeparator(count))}</S.Success>,
    },
    {
      title: t('unsuccessful_transaction'),
      dataIndex: 'failedCount',
      render: (count) => <S.Failure>{getValueOrDash(addThousandSeparator(count))}</S.Failure>,
    },
    {
      title: t('total_transaction_count'),
      dataIndex: 'allCount',
      render: (count) => getValueOrDash(addThousandSeparator(count)),
    },
    {
      title: '',
      key: 'details',
      width: '15rem',
      render: (record) => {
        // TODO: get the client type from api
        return (
          <Button variant='link' href={`${ROUTES.BUSINESS.DETAILED_BILL_REPORT}?id=${record.id}&client-type=${2}`}>
            <i className='icon-document' />
            <span>{t('view_details')}</span>
          </Button>
        );
      },
    },
  ];

  return (
    <S.Table
      current={page}
      total={data?.totalElements}
      dataSource={data?.content}
      pagination={{ pageSize: size }}
      columns={columns}
      loading={isFetching}
      // mobileColumns={mobileColumns}
      onChange={changePage}
      rowKey={(row) => row.index}
    />
  );
}
