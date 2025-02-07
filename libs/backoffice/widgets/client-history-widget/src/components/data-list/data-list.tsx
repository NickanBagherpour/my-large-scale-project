import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { uuid } from '@oxygen/utils';
import { Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns } from '../../utils/data-list.util';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { ClientHistoryResponseType } from '../../types';

import * as S from './data-list.style';

type dataListProps = {
  data: ClientHistoryResponseType;
  isFetching: boolean;
};

const DataList: React.FC<dataListProps> = (props) => {
  const { data, isFetching } = props;

  const dispatch = useAppDispatch();
  const {
    table: { pagination },
  } = useAppState();
  const [t] = useTr();

  const lastValidTotal = data?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, limit: pageSize };
    updatePagination(dispatch, updatedPagination);
  };

  const clientPersianName = data?.commonClientInfoDto?.persianName;
  const clientType = data?.commonClientInfoDto?.clientType?.title;

  const desktopColumns = getDesktopColumns({ t, clientPersianName, clientType });

  return (
    <S.TableContainer>
      <Table
        scroll={{ x: 1200 }}
        loading={isFetching}
        dataSource={data?.content}
        pagination={{
          ...pagination,
          total: data?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: pagination?.limit,
          current: pagination?.page,
          hideOnSinglePage: false,
        }}
        columns={desktopColumns}
        // mobileColumns={mobileColumns}
        variant={'complex'}
        title={t('widget_name')}
        onChange={handlePageChange}
        rowKey={() => uuid()}
        size={'small'}
      />
    </S.TableContainer>
  );
};

export default DataList;
