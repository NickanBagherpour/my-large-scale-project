import React, { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';
import { useRouter } from 'next/navigation';
import { queryClient } from '@oxygen/client';
import { uuid } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';
import { Table, Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer } from '@oxygen/reusable-components';
import AddServerModal from '../modal-add-server/modal-add-server';
import MainDeleteServerModal from '../modal-delete-server/modal-delete-server';
import { useAddServerToUpstreamMutationQuery, useDeleteServerFromUpstreamMutationQuery } from '../../services';

import { UpstreamDetailsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-details-list-util';

import * as S from './upstream-details-list.style';

type UpstreamDetailsProps = PageProps & {
  data: UpstreamDetailsType[];
  isFetching: boolean;
  total?: number;

  upstreamName: string | null;
};

const UpstreamDetailsList: React.FC<UpstreamDetailsProps> = (props) => {
  const { data, isFetching, total, upstreamName } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const theme = useAppTheme();

  const router = useRouter();
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  const [openAddServerModal, setOpenAddServerModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [initialValue, setInitialValue] = useState<UpstreamDetailsType | undefined>(undefined);

  const {
    table: { pagination },
  } = state;

  const { mutate, status } = useAddServerToUpstreamMutationQuery();
  const {
    mutate: deleteServerMutate,
    isPending: deleteServerIsPending,
    isError,
    isSuccess,
  } = useDeleteServerFromUpstreamMutationQuery();
  const deleteServerStatus = deleteServerIsPending ? 'pending' : isError ? 'error' : isSuccess ? 'success' : 'idle';

  const handleAddServer = async (values) => {
    try {
      const params = {
        upstreamName: upstreamName,
        domain: values.domain,
        weight: parseInt(values.weight),
        id: selectedServerId ? selectedServerId : null,
      };

      await mutate(params, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_DETAILS.GET_LIST] });
        },
        onError: (error) => {
          console.error('request delete server  failed:', error);
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleAddModalServer = () => {
    setInitialValue(undefined);
    setOpenAddServerModal(true);
    setSelectedServerId(null);
  };

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

  const handleReturn = () => {
    router.back();
  };

  const handleEditServer = (id: number, domain: string, weight: string, healthStatus: string) => {
    setSelectedServerId(id);
    setOpenAddServerModal(true);
    setInitialValue({ domain, weight, healthStatus: '1' });
  };

  const handleDeleteServer = (id: number, domain: string, weight: string, healthStatus: string) => {
    setSelectedServerId(id);
    setOpenDeleteModal(true);
    setInitialValue({ domain, weight, healthStatus: '1' });
  };

  const handleDeleteOk = () => {
    deleteServerMutate(selectedServerId, {
      onSuccess: (data) => {
        setOpenDeleteModal(false);
        queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_DETAILS.GET_LIST] });
        console.log('request delete server successful:', data);
      },
      onError: (error) => {
        setOpenDeleteModal(false);
        console.error('request delete server  failed:', error);
      },
    });
  };

  const desktopColumns = getDesktopColumns({ t, deleteUpstream: handleDeleteServer, editUpstream: handleEditServer });
  const mobileColumns = getMobileColumns({ t, deleteUpstream: handleDeleteServer, editUpstream: handleEditServer });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));
  return (
    <S.ServerContainer>
      <AddServerModal
        title={selectedServerId ? t('edit_server') : t('add_server')}
        open={openAddServerModal}
        setOpen={setOpenAddServerModal}
        onConfirm={handleAddServer}
        status={status}
        initialData={initialValue}
        successMsg='edit_upstream_successfully'
        selectedServerId={selectedServerId}
      />

      <MainDeleteServerModal
        title={t('delete_server')}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        status={deleteServerStatus}
        centered
        initialData={initialValue}
        onOk={() => handleDeleteOk()}
        data={initialValue ? [initialValue] : []}
        successMsg='delete_server_successfully'
        cancelText={t('button.cancel')}
        okText={t('button.delete')}
        okButtonProps={{ style: { backgroundColor: theme.error.main } }}
        cancelButtonProps={{ style: { color: theme.primary.main } }}
      />
      <S.ServerContent>
        <S.Actions>
          <S.UpstreamServerTitle>{t('upstream_server_title')}</S.UpstreamServerTitle>
          <Button color={'secondary'} onClick={() => handleAddModalServer()}>
            <i className={'icon-plus'}></i>
            {t('add_server')}
          </Button>
        </S.Actions>
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
      </S.ServerContent>
      <FooterContainer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
      </FooterContainer>
    </S.ServerContainer>
  );
};

export default UpstreamDetailsList;
