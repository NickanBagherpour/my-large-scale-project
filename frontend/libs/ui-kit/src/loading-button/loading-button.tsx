import React from 'react';
import { LoadingButton as MuiLoadingButton, LoadingButtonProps as MuiLoadingButtonProps } from '@mui/lab';
import styled from '@emotion/styled';

type OtherVariantType = 'outlinedLight' | 'textPrimary';

export type LoadingButtonProps = MuiLoadingButtonProps & {
  otherVariant?: OtherVariantType;
  active?: boolean;
};

export type $LoadingButtonProps = LoadingButtonProps & {
  $otherVariant?: OtherVariantType;
  $active?: boolean;
};

const StyledLoadingButton = styled(MuiLoadingButton)<$LoadingButtonProps>`
  padding: 1rem;
  min-width: ${(props) => (props.fullWidth ? 'inherit' : '10rem')};
  font-weight: 500;
  font-size: 1.4rem;
  height: 4rem;
  color: ${getColor};
  border-color: ${getColor};
`;

function getColor(props: any) {
  let color = props.variant === 'contained' ? '#fff' : props.theme.base.textSecondary;

  if (props.$active) {
    return props.theme.base.primary;
  }

  if (!props.$otherVariant) {
    return color;
  }

  if (props.$otherVariant === 'textPrimary') {
    color = props.theme.base.primary;
  } else if (props.$otherVariant === 'outlinedLight') {
    color = props.theme.base.hint;
  }

  return color;
}

const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  const { children, otherVariant, active = false, ...rest } = props;

  return (
    <StyledLoadingButton $otherVariant={otherVariant} $active={active} {...rest}>
      {children}
    </StyledLoadingButton>
  );
};
export default LoadingButton;
