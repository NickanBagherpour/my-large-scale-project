import React from 'react';

import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd';

import * as S from './progress.style';

export type ProgressProps = AntProgressProps & {
  //
};

export const Progress = (props: AntProgressProps) => {
  const { ...rest } = props;

  return <S.StyledProgress {...rest} />;
};
