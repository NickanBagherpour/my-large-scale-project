import { Box as MuiBox, BoxProps as MuiBoxProps, styled } from '@mui/material';
import React from 'react';

export type BoxProps = MuiBoxProps & {
  //
};

const StyledBox = styled(MuiBox)<BoxProps>``;

const Box: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;

  return <StyledBox {...rest}>{children}</StyledBox>;
};

export default Box;
