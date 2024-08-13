import React from 'react';

import { Avatar as muiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';
import styled from '@emotion/styled';

export type AvatarProps = MuiAvatarProps & {
  // children?: React.ReactNode;
};

const StyledAvatar = styled(muiAvatar)``;

export const Avatar = (props: AvatarProps) => {
  const { ...rest } = props;

  return <StyledAvatar {...rest} />;
};

export default Avatar;
