import React, { useState } from 'react';
import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';

import { getDesktopColumns } from '../../utils/table-list';
import { TableResponseType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';

import { TablePaginationConfig } from 'antd';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

import * as S from './table-container.style';

export type TableContainerPropsType = {
  data: Nullable<TableResponseType>;
  loading: boolean;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const { data, loading } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const close = () => setModalIsOpen(false);

  const pagination = state.table.pagination;
  const tableData = data?.content ?? [];

  const lastValidTotal = data?.page?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, size: pageSize };
    updatePagination(dispatch, updatedPagination);
  };
  const size = pagination?.size || AVAILABLE_ROWS_PER_PAGE[1];
  const page = pagination?.page || 1;

  const prepareColumnsParams = { data, t, pagination, setModalIsOpen };
  const tableDesctopColumns = getDesktopColumns(prepareColumnsParams);
  // const tableMobileColumns = getMobileColumns(prepareColumnsParams);

  return (
    <S.TableContainer>
      <S.Table
        loading={loading}
        dataSource={tableData}
        columns={tableDesctopColumns}
        /*mobileColumns={mobileColumns}*/
        pagination={{
          total: data?.page?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: size,
          current: page,
          hideOnSinglePage: false,
        }}
        onChange={handlePageChange}
        rowKey={(row) => row.name}
        minHeight={'auto'}
      ></S.Table>

      <Modal
        centered
        title={t('warning')}
        open={modalIsOpen}
        closable={true}
        onCancel={close}
        footer={[
          <Button key={'cancel'} onClick={close} size='large' color='primary' variant='outlined' disabled={false}>
            {t('button.cancel')}
          </Button>,
          <Button
            key={'tegister'}
            onClick={() => console.log('you click on register button')}
            size='large'
            color='primary'
            loading={false}
            disabled={false}
          >
            {t('button.register')}
          </Button>,
        ]}
      >
        this is the test for the modal
      </Modal>
    </S.TableContainer>
  );
};
