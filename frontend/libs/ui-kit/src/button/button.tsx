import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps, css, styled } from '@mui/material';

export type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  loading?: boolean;
  variant?: 'contained' | 'outlined' | 'text' | 'tona';
  displayTextOnLoading?: boolean;
};

const StyledButton = styled(MuiButton)<any>`
  padding: 1rem 2rem;
  min-width: ${(props) => (props.fullWidth ? 'inherit' : '6rem')};
  font-weight: 500;
  font-size: 1.4rem;
  height: 4.8rem;
  box-shadow: none;

  ${(props) => {
    if (props.is_tona === true)
      return css`
        background-color: ${props.theme.base[props.color]}20;
        border: 1px solid ${props.theme.base[props.color]};
        color: ${props.theme.base[props.color]};
      `;

    css``;
  }}

  span.MuiButton-endIcon,
  span.MuiButton-startIcon {
    color: inherit !important;
  }

  span.MuiButton-endIcon i,
  span.MuiButton-startIcon i {
    //font-size: 1.4rem;
  }

  .btn-loading {
    margin-left: 1rem;
  }
`;

const Button = (props: ButtonProps) => {
  const {
    children,
    loading = false,
    disabled = false,
    displayTextOnLoading = false,
    variant = 'text',
    ...rest
  } = props;

  function isTona() {
    if (variant === 'tona') {
      return true;
    }

    return false;
  }

  function getVariant() {
    if (variant === 'tona') {
      return 'outlined';
    }

    return variant;
  }

  return (
    <StyledButton variant={getVariant()} is_tona={isTona()} disabled={disabled || loading} {...rest}>
      {!loading || !displayTextOnLoading ? children : null}
      {loading && <CircularProgress className={'btn-loading'} thickness={3} size={'1.5rem'} />}
    </StyledButton>
  );
};
export default Button;
