import React from 'react';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { getDesktopColumns, getMobileColumns } from '../../utils/data-table.util';
import { updateModalTablePagination, updatePaginationAction, useAppDispatch, useAppState } from '../../context';
import DetailsModal from '../service-detail-modal/service-detail-modal';
import { MODAL_INITIAL_ROW_PER_PAGE } from '../../utils/consts';
import { ServicesReportResponseType } from '../../types';

import * as S from './data-table.style';

type DataTableProps = PageProps & {
  isLoading: boolean;
  data: ServicesReportResponseType['response'];
  wordToHighlight: string;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const { data, isLoading, wordToHighlight } = props;
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();
  const theme = useTheme();
  const [openModal, setOpenModal] = React.useState(false);
  const [serviceName, setServiceName] = React.useState('');

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePaginationAction(dispatch, {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const resetModalTablePage = () => {
    const updatedModalTablePagination = {
      page: 1,
      rowsPerPage: MODAL_INITIAL_ROW_PER_PAGE,
    };
    updateModalTablePagination(dispatch, updatedModalTablePagination);
  };
  const dataTableParams = { t, pagination, wordToHighlight, theme, setOpenModal, setServiceName };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);
  return (
    <S.TableContainer>
      {data?.content?.length ? (
        <S.Table
          loading={isLoading}
          current={pagination.page}
          total={data?.page?.totalElements}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          variant={'simple'}
          onChange={handlePageChange}
          rowKey={'id'}
        />
      ) : (
        <NoResult isLoading={isLoading} />
      )}
      {openModal && (
        <DetailsModal
          data={data?.content}
          isOpen={!!openModal}
          close={() => {
            setOpenModal(false);
            resetModalTablePage();
          }}
          serviceName={serviceName}
          dispatch={dispatch}
        />
      )}
    </S.TableContainer>
  );
};

export default DataTable;
