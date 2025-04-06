import React from 'react';
import * as S from './table-container.style';
import { Nullable } from '@oxygen/types';
import { TableResponseType } from '../../types';

export type TableContainerPropsType = {
  data: Nullable<TableResponseType>;
  loading: boolean;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const { data, loading } = props;
  const tableData = [];
  return (
    <S.TableContainer>
      <S.Table dataSource={tableData} columns={[]} mobileColumns={[]} loading={loading}></S.Table>
    </S.TableContainer>
  );
};
