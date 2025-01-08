import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { Loading, Table } from '@oxygen/ui-kit';
import { uuid } from '@oxygen/utils';

import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-list.util';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetUpstreamTargetQuery } from '../../services/get-upstream-targets.api';
import ConfirmDeleteModal from '../confirm-delete-modal/confirm-delete-modal';
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
  const [upstreamName, setUpstreamName] = useState();
  const [openModal, setOpenModal] = useState(false);

  const {
    table: { pagination = { page: 1, rowsPerPage: 5 } } = { pagination: { page: 1, rowsPerPage: 5 } }, // Fallback for pagination
  } = state || {};

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

  const { data: targetData, isFetching } = useGetUpstreamTargetQuery(upstreamName);

  const deleteUpstream = (record: UpstreamItemType) => {
    setUpstreamName(record?.name);
    setOpenModal(true);
  };

  const getColumnsParams = { t, pagination, deleteUpstream };
  const desktopColumns = getDesktopColumns(getColumnsParams);
  const mobileColumns = getMobileColumns(getColumnsParams);

  return (
    <>
      <S.TableContainer>
        {data?.length > 0 ? (
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
            rowKey={() => uuid()}
            size={'small'}
          />
        ) : (
          <NoResult isLoading={isLoading} />
        )}
      </S.TableContainer>
      {targetData?.targets && openModal ? (
        <ConfirmDeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={targetData}
          upstreamName={upstreamName}
        />
      ) : (
        <Loading spinning={isFetching} />
      )}
    </>
  );
}
