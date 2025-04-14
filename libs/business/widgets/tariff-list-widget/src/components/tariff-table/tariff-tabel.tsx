import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TablePaginationConfig } from 'antd/lib';

import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useApp, useToggle } from '@oxygen/hooks';
import { ConfirmRemoveModal } from '@oxygen/reusable-components';

import { getDesktopColumns, getMobileColumns } from '../../utils/table-data-list';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { useDeleteServiceQuery } from '../../services';

import * as S from './tariff-tabel.style';
import { useTheme } from 'styled-components';

export type TariffTablePropsType = PageProps & {
  tableData: any;
  isLoading: boolean;
};

export const TariffTable: React.FC<TariffTablePropsType> = (props) => {
  const { tableData, isLoading } = props;
  const {
    table: { pagination },
  } = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const router = useRouter();
  const theme = useTheme();

  const lastValidTotal = tableData?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, size: pageSize };
    updatePagination(dispatch, updatedPagination);
  };
  const size = pagination?.size || AVAILABLE_ROWS_PER_PAGE[0];
  const page = pagination?.page || 1;
  const tableColumnsParams = { t, router, theme, size, page };
  const desktopColumns = getDesktopColumns(tableColumnsParams);
  const mobileColumns = getMobileColumns(tableColumnsParams);
  return (
    <S.TariffTableContainer>
      <Table
        loading={isLoading}
        dataSource={tableData?.content}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        pagination={{
          total: tableData?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: pagination?.size,
          current: pagination?.page,
          hideOnSinglePage: false,
        }}
        onChange={handlePageChange}
        rowKey={(row) => row.serviceName}
      />
    </S.TariffTableContainer>
  );
};
