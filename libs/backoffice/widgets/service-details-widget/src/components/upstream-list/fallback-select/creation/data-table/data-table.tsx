import React from 'react';

import { Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import * as S from './data-table.style';

export type TablePropsType = PageProps & {
  //
};
export const DataTable: React.FC<TablePropsType> = (props) => {
  // const {} = props;
  return (
    <S.TableContainer>
      <Table />
    </S.TableContainer>
  );
};
