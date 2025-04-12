import React, { useState } from 'react';
import * as S from './table-container.style';
import { Nullable } from '@oxygen/types';
import { TableResponseType } from '../../types';
import { getDesktopColumns } from '../../utils/table-list';
import { useTr } from '@oxygen/translation';
import { useAppState } from '../../context';
import { Button, Modal } from '@oxygen/ui-kit';

export type TableContainerPropsType = {
  data: Nullable<TableResponseType>;
  loading: boolean;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const { data, loading } = props;
  const state = useAppState();
  const [t] = useTr();

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const close = () => setModalIsOpen(false);

  const pagination = state.table.pagination;
  const tableData = [];
  console.log('this is the data :', data);
  const prepareColumnsParams = { tableData, t, pagination };
  const tableDesctopColumns = getDesktopColumns(prepareColumnsParams);
  // const tableMobileColumns = getMobileColumns(prepareColumnsParams);

  return (
    <S.TableContainer>
      <S.Table dataSource={tableData} columns={tableDesctopColumns} loading={loading}></S.Table>
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
            key={'delete'}
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
