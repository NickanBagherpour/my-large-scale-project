import React from 'react';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';
import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import { ServiceType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-list.util';

import * as S from './services.style';

type ServicesProps = PageProps & {
  data?: ServiceType[];
  isFetching: boolean;
  total?: number;
  searchTerm: string;
  isLoading: boolean;
  wordToHighlight: string;
  changeStatus: (status: boolean, name: string) => void;
  deleteService: (name: string, status: ParamsType) => void;
};

const Services: React.FC<ServicesProps> = (props) => {
  const { data, isFetching, total, wordToHighlight, changeStatus, deleteService } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const theme = useTheme();

  const {
    table: { pagination },
  } = state;

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

  const mobileColumns = getMobileColumns({ t, changeStatus, deleteService, theme, wordToHighlight });
  const desktopColumns = getDesktopColumns({ t, changeStatus, deleteService, theme, wordToHighlight });

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
        rowKey={() => uuid()}
      />
    </S.TableContainer>
  );
};

export default Services;
