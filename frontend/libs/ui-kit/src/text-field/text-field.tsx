import { IconButton, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React, { ChangeEvent, MouseEventHandler, ReactNode, useState } from 'react';

import { StyledTextField } from './text-field.style';

export type AllowType = 'all' | 'number' | 'letter' | RegExp;

export type TextFieldProps = MuiTextFieldProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  clearable?: boolean;
  shrink?: boolean;
  onClear?: MouseEventHandler;
  allow?: AllowType;
  customStyle?: React.CSSProperties;
};

const patternMap = {
  number: /^[0-9۰-۹]+$/,
  letter: /^[a-zA-Zآ-ی\s]+$/,
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    variant = 'outlined',
    size = 'medium',
    InputProps,
    InputLabelProps,
    startIcon,
    endIcon,
    clearable = false,
    onClear,
    shrink,
    allow = 'all',
    customStyle,
    ...rest
  } = props;
  const { name, id } = rest;

  let _InputLabelProps = InputLabelProps;

  function getPattern() {
    let pattern: string | RegExp = '';
    if (allow === 'all') {
      pattern = '';
    } else if (allow === 'number') {
      pattern = patternMap.number; // Allow only numbers
    } else if (allow === 'letter') {
      pattern = patternMap.letter; // Allow only letters and spaces
    } else if (allow instanceof RegExp) {
      pattern = allow.source;
    }
    return pattern;
  }

  const handleClear = (e) => {
    if (onClear) {
      onClear(e);
    }
  };

  /*  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const pattern = getPattern();

      console.log('test', event, value, pattern);
      event.preventDefault();

      if (pattern && value && !new RegExp(pattern).test(value)) {
        return;
      }

      if (props.onChange) {
        props.onChange(event);
      }
    };*/

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pattern = getPattern();
    // console.log('handleKeyPress', pattern);

    if (pattern && !new RegExp(pattern).test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pattern = getPattern();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    /* // Filter out characters that don't match the pattern
     const filteredText = pastedText
       .split('')
       .filter((char) => new RegExp(pattern).test(char))
       .join('');*/

    if (pattern && !new RegExp(pattern).test(pastedText)) {
      event.preventDefault();
    }
  };

  if (shrink) {
    _InputLabelProps = {
      ..._InputLabelProps,
      shrink: shrink,
    };
  }

  const renderStartIcon = startIcon && (
    <>
      {InputProps?.startAdornment}
      {startIcon}
    </>
  );

  const renderEndIcon = (endIcon || clearable) && (
    <>
      {InputProps?.endAdornment}
      {endIcon}
      {clearable && (
        <IconButton color='inherit' onClick={handleClear} disabled={props?.disabled ?? false}>
          <i className={'icon-close-circle'} />
        </IconButton>
      )}
    </>
  );

  return (
    <StyledTextField
      id={id ?? name}
      // value={value}
      size={size}
      variant={variant}
      {...rest}
      InputProps={{
        ...InputProps,
        startAdornment: renderStartIcon,
        endAdornment: renderEndIcon,
        inputProps: { ...InputProps?.inputProps },
      }}
      // InputProps={_InputProps}
      InputLabelProps={_InputLabelProps}
      onKeyPress={allow !== 'all' ? handleKeyPress : undefined}
      onPaste={allow !== 'all' ? handlePaste : undefined}
      // onChange={handleChange}
      sx={customStyle}
    ></StyledTextField>
  );
};
export default TextField;
