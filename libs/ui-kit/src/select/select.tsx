import React, { useState } from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import * as S from './select.style';

export type SelectProps = AntSelectProps & {
  // children?: React.ReactNode;
};

export const Select = (props: AntSelectProps) => {
  const { loading = false, disabled = false, suffixIcon = null, defaultValue, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownVisibleChange = (open) => {
    setIsOpen(open);
  };

  let _suffix: {
    suffixIcon?: React.ReactNode;
  } = {};

  if (suffixIcon) {
    _suffix.suffixIcon = suffixIcon;
  } else if (loading) {
    _suffix = {};
  } else {
    _suffix.suffixIcon = <S.Icon className={`icon-chev-down`} />; //fix  me change to custom icon if needed
  }

  return (
    <S.StyledSelect
      className={isOpen ? 'select-open' : 'select-closed'}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      disabled={loading || disabled}
      loading={loading}
      {..._suffix}
      {...rest}
    />
  );
};

Select.Option = AntSelect.Option;
