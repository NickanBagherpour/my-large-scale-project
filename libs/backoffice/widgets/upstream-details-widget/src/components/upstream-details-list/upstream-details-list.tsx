import React from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';

import { uuid } from '@oxygen/utils';
import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import { UpstreamDetailsType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-details-list-util';

import * as S from './upstream-details-list.style';

type UpstreamDetailsProps = PageProps & {
  data: UpstreamDetailsType[];
  isFetching: boolean;
  total?: number;
  isLoading: boolean;
  deleteUpstream: (domain: string) => void;
};

const UpstreamDetails: React.FC<UpstreamDetailsProps> = (props) => {
  const { data, isFetching, total, deleteUpstream } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();

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

  const desktopColumns = getDesktopColumns({ t, deleteUpstream });
  const mobileColumns = getMobileColumns({ t, deleteUpstream });

  const tableData = data.map((item, index) => ({ ...item, index: index + 1 }));

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
        showHeader
      />
    </S.TableContainer>
  );
};

export default UpstreamDetails;
