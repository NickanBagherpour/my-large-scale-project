import React from 'react';

import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './button.style';
import Link from 'next/link';

export type ButtonProps = Omit<AntButtonProps, 'color'> & {
  children?: React.ReactNode;
  color?: 'warning' | 'error' | 'secondary' | 'primary';
  flex?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { children, color = 'primary', flex = true, href, ...rest } = props;

  if (href) {
    return (
      <Link href={href} passHref={true} legacyBehavior={true}>
        <StyledButton color={color} flex={flex} {...rest}>
          {children}
        </StyledButton>
      </Link>
    );
  } else {
    return (
      <StyledButton color={color} flex={flex} {...rest}>
        {children}
      </StyledButton>
    );
  }
};

// export default Button;
