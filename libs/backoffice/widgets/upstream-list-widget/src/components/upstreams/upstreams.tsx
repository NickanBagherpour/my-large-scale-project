import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { Nullable } from '@oxygen/types';

import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-list.util';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import ConfirmDeleteModal from '../confirm-delete-modal/confirm-delete-modal';
import { useGetUpstreamServicesQuery } from '../../services';
import { UpstreamItemType } from '../../types';

import * as S from './upstreams.style';

type Props = {
  data: UpstreamItemType[];
  total?: number;
  isLoading: boolean;
};

export default function Upstreams(props: Props) {
  const { data, total, isLoading } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [upstreamName, setUpstreamName] = useState<Nullable<string>>();
  const [openModal, setOpenModal] = useState(false);
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

  const deleteUpstream = async (record: UpstreamItemType) => {
    await queryClient.invalidateQueries({
      queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_LIST.GET_UPSTREAM_SERVICES, upstreamName],
      refetchType: 'none',
    });
    setUpstreamName(record?.name);
    setOpenModal(true);
  };

  const getColumnsParams = { t, pagination, deleteUpstream };
  const desktopColumns = getDesktopColumns(getColumnsParams);
  const mobileColumns = getMobileColumns(getColumnsParams);

  return (
    <>
      <S.TableContainer>
        {data?.length ? (
          <Table
            loading={isLoading}
            current={pagination.page}
            total={total}
            dataSource={data}
            pagination={{ pageSize: pagination.rowsPerPage }}
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            variant={'simple'}
            title={t('table.upstreams_list')}
            onChange={handlePageChange}
            rowKey={'id'}
          />
        ) : (
          <NoResult isLoading={isLoading} />
        )}
      </S.TableContainer>
      {openModal && (
        <ConfirmDeleteModal openModal={openModal} setOpenModal={setOpenModal} upstreamName={upstreamName} />
      )}
    </>
  );
}
