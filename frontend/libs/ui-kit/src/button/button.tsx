import React from 'react';

import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './button.style';

export type ButtonProps = Omit<AntButtonProps, 'color'> & {
  children?: React.ReactNode;
  // type?:AntButtonProps['type'];
  color?: 'warning' | 'error' | 'secondary' | 'primary';
  flex?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { children, color = 'primary', flex = true, ...rest } = props;

  return (
    <StyledButton color={color} flex={flex} {...rest}>
      {children}
    </StyledButton>
  );
};

// export default Button;
