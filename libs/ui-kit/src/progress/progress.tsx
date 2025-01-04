import React from 'react';

import styled from 'styled-components';
import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd';

import { useAppTheme } from '@oxygen/hooks';

import * as S from './progress.style';

export type ProgressProps = AntProgressProps & {
  isPrimary?: boolean;
  height?: number | string;
};

export const StyledProgress = styled(AntProgress)`
  .ant-progress-outer {
    //display: flex;
    //flex-direction: row-reverse;

    .ant-progress-text {
      margin-right: 1rem;
    }
    .ant-progress-inner {
      //display: flex;
      //flex-direction: row-reverse;
      .ant-progress-bg {
        //padding: 0.8rem;
      }
    }
  }
`;

export const Progress = (props: ProgressProps) => {
  const theme = useAppTheme();
  const { isPrimary, height, size, ...rest } = props;

  let _size = {};

  if (size) {
    _size = size;
  } else if (height) {
    _size = { height: height };
  }

  return <S.StyledProgress strokeColor={isPrimary ? theme.primary.main : ''} size={_size} {...rest} />;
};
