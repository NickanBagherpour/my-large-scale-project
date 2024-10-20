import React from 'react';

import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd';

import * as S from './progress.style';
import { useTheme } from 'styled-components';

export type ProgressProps = AntProgressProps & {
  isPrimary?: boolean;
};

export const Progress = (props: ProgressProps) => {
  const theme = useTheme();
  const { isPrimary, ...rest } = props;

  return <S.StyledProgress strokeColor={isPrimary ? theme.primary.main : ''} {...rest} />;
};
