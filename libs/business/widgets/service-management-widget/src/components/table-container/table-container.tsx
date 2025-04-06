import React from 'react';
import * as S from './table-container.style';
import { Nullable } from '@oxygen/types';
import { TableResponseType } from '../../types';
import { getDesktopColumns } from '../../utils/table-list';
import { useTr } from '@oxygen/translation';
import { useAppState } from '../../context';

export type TableContainerPropsType = {
  data: Nullable<TableResponseType>;
  loading: boolean;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const { data, loading } = props;
  const state = useAppState();
  const [t] = useTr();

  const pagination = state.table.pagination;
  const tableData = [];
  console.log('this is the data :', data);
  const prepareColumnsParams = { tableData, t, pagination };
  const tableDesctopColumns = getDesktopColumns(prepareColumnsParams);
  // const tableMobileColumns = getMobileColumns(prepareColumnsParams);

  return (
    <S.TableContainer>
      <S.Table dataSource={tableData} columns={tableDesctopColumns} loading={loading}></S.Table>
    </S.TableContainer>
  );
};
