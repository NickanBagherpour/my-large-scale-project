import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { getDesktopColumns } from '../../utils/data-list.util';

import * as S from './data-list.style';

type AppProps = PageProps & {
  data: any;
  loading: boolean;
};

const DataTable: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { table } = useAppState();
  const dispatch = useAppDispatch();
  const { data, loading } = props;

  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const dataSource = data?.content || [];

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal);
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  const dataTableParams = { t };
  const desktopColumns = getDesktopColumns(dataTableParams);

  return (
    <S.TableContainer>
      <S.Table
        title={t('table.client_change_history')}
        size='small'
        variant='complex'
        columns={desktopColumns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          ...table?.pagination,
          total: data?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: table?.pagination?.limit,
          current: table?.pagination?.page,
          hideOnSinglePage: false,
        }}
        scroll={undefined}
        onChange={handlePageChange}
        rowKey={'id'}
      />
    </S.TableContainer>
  );
};
export default DataTable;
