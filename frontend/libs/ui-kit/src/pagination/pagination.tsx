import React from 'react';
import { PaginationProps as MuiPaginationProps } from '@mui/material';

import * as S from './pagination.style';

export type PaginationProps = MuiPaginationProps & {
  //
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { ...rest } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
   // console.log(value);
  };

  return <S.Pagination {...rest} />;
};

export default Pagination;
