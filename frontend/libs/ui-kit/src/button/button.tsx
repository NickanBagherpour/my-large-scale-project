import React from 'react';

import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './button.style';

export type ButtonProps = Omit<AntButtonProps, 'type'> & {
  children?: React.ReactNode;
  type?: 'table' | AntButtonProps['type'];
  flex?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { children, type, flex = true, ...rest } = props;

  let _type: any = type;
  if (type === 'table') {
    _type = 'default';
  }

  return (
    <StyledButton type={_type} org_type={type} flex={flex} {...rest}>
      {children}
    </StyledButton>
  );
};

// export default Button;
