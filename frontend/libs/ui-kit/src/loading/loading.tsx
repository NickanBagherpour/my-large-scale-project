import React from 'react';
import { CircularProgress, CircularProgressProps as MuiCircularProgressProps } from '@mui/material';
import styled from '@emotion/styled';

import Box, { BoxProps } from '../box/box';

export type LoadingProps = MuiCircularProgressProps & {
  hasContainer?: boolean;
  containerHeight?: string;
  containerProps?: BoxProps;
};

const StyledContainer = styled(Box)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(p) => p.height || '15rem'};
`;

const StyledCircularProgress = styled(CircularProgress)<LoadingProps>``;

const Loading: React.FC<LoadingProps> = (props) => {
  const { hasContainer = false, containerHeight, containerProps, ...rest } = props;

  return hasContainer ? (
    <StyledContainer height={containerHeight} {...containerProps}>
      <StyledCircularProgress {...rest} />
    </StyledContainer>
  ) : (
    <StyledCircularProgress {...rest} />
  );
};
export default Loading;
