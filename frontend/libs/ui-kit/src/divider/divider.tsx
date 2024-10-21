import React from 'react';

import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd';

import * as S from './divider.style';

export type DividerProps = AntDividerProps & {
  //
};

export const Divider = (props: DividerProps) => {
  const { children, ...rest } = props;

  return children ? <S.StyledDivider {...rest}>{children}</S.StyledDivider> : <S.StyledDivider {...rest} />;
};
