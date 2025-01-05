import React from 'react';
import type { TablePaginationConfig } from 'antd';
import { useRouter } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { updateMessageAction, updatePagination, useAppDispatch, useAppState } from '../../context';

import { getDesktopColumns, getMobileColumns } from '../../utils/request-list.util';

import * as S from './data-table.style';
import { useDeleteService } from '../../services/delete-service.api';
import { queryClient } from '@oxygen/client';
import { RQKEYS } from '@oxygen/utils';

type DataTableProps = PageProps & {
  requestListFetching: boolean;
  requestList: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();

  const { mutate, isPending } = useDeleteService();

  const { requestList, requestListFetching } = props;

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const handleApi = (params) => {
    mutate(params, {
      onSuccess: async () => {
        try {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.EDIT_REQUEST_LIST.UPDATE],
          });
        } catch (error) {
          //
        }
      },
      onError: (error) => {
        //
      },
    });
  };

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: current,
        rowsPerPage: pageSize,
      });
    }
  };

  const dataTableParams = { t, pagination, handleApi };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      <S.Table
        loading={requestListFetching}
        current={pagination.page}
        total={requestList?.page?.totalElements}
        dataSource={requestList?.content}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('button.return')}
        </ReturnButton>
      </FooterContainer>
    </S.DataTableContainer>
  );
};

export default DataTable;
