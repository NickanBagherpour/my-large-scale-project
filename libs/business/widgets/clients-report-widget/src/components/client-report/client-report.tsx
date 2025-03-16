import React, { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';

import { ClientReportDto } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/client-report.util';

import ClientDetailsModal from '../client-details-modal/client-details-modal';
import * as S from './client-report.style';

type ClientReportsProps = PageProps & {
  data?: ClientReportDto[];
  isFetching: boolean;
  total?: number;
  searchTerm: string;
  isLoading: boolean;
  wordToHighlight: string;
};

const ClientReports: React.FC<ClientReportsProps> = (props) => {
  const { data, isFetching, total, wordToHighlight } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const theme = useAppTheme();

  const {
    table: { pagination },
  } = state;

  const [clientDetailsToView, setClientDetailsToView] = useState<ClientReportDto | null>(null);

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

  const mobileColumns = getMobileColumns({
    t,
    theme,
    pagination,
    wordToHighlight,
    addClientDetailsToView: (client) => setClientDetailsToView(client),
  });
  const desktopColumns = getDesktopColumns({
    t,
    theme,
    pagination,
    wordToHighlight,
    addClientDetailsToView: (client) => {
      setClientDetailsToView(client);
    },
  });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));

  return (
    <S.TableContainer>
      <Table
        loading={isFetching}
        current={pagination.page}
        total={total}
        dataSource={tableData}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        hasContainer={false}
        pagination={{ pageSize: pagination.rowsPerPage }}
        onChange={handlePageChange}
        rowKey={(row) => row.clientKey}
        minHeight={'auto'}
      />
      {!!clientDetailsToView && (
        <ClientDetailsModal
          dispatch={dispatch}
          client={clientDetailsToView}
          isOpen={!!clientDetailsToView}
          close={() => setClientDetailsToView(null)}
        />
      )}
    </S.TableContainer>
  );
};

export default ClientReports;
