import React, { ReactNode } from 'react';

import { FormHelperText, IconButton, SelectProps as MuiSelectProps } from '@mui/material';

import * as S from './select.style';
import { useToggle } from '@oxygen-portal/hooks';
import { Box, Loading } from '../index';

export type SelectProps = MuiSelectProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  shrink?: boolean;
  loading?: boolean;
  helperText?: string;
};

const Select: React.FC<SelectProps> = (props) => {
  const {
    variant = 'outlined',
    size = 'small',
    // InputProps,
    // InputLabelProps,
    loading = false,
    label,
    labelId,
    startIcon,
    endIcon,
    shrink,
    error,
    helperText,
    ...rest
  } = props;
  const { name, id } = rest;

  const [toggle, setToggle] = useToggle(false);

  const id_name = id ?? name;

  const handleToggle = () => {
    if (loading) return;
    setToggle();
  };

  return (
    <>
      {label && (
        <S.InputLabel id={`${id_name}-label`} shrink={shrink} error={error}>
          {label}
        </S.InputLabel>
      )}
      <S.Select
        id={id_name}
        size={size}
        variant={variant}
        label={label}
        labelId={`${id_name}-label`}
        error={error}
        IconComponent={() => {
          return loading ? (
            <Box margin={'0.5rem 1rem 0rem 0'}>
              <Loading size={'2rem'} />
            </Box>
          ) : (
            <IconButton onClick={handleToggle}>
              <i className={`icon-bottom-arrow ${toggle && 'select-open'}`} />
            </IconButton>
          );
        }}
        open={toggle}
        onClose={handleToggle}
        onOpen={handleToggle}
        {...rest}
      ></S.Select>

      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
};
export default Select;
