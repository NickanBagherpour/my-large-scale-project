import React from 'react';
import styled from 'styled-components';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

export type SelectProps = AntSelectProps & {
  // children?: React.ReactNode;
};

const StyledSelect = styled(AntSelect)`
  &.ant-select .ant-select-arrow {
    color: ${(p) => p.theme.border.main};
  }
`;
const Icon = styled.i`
  font-size: large;
`;

export const Select = (props: SelectProps) => {
  const { loading = false, disabled = false, suffixIcon = null, ...rest } = props;

  let _suffix: {
    suffixIcon?: React.ReactNode;
  } = {};

  if (suffixIcon) {
    _suffix.suffixIcon = suffixIcon;
  } else if (loading) {
    _suffix = {};
  } else {
    _suffix.suffixIcon = <Icon className={`icon-chev-down`} />; //fix  me change to custom icon if needed
  }

  return <StyledSelect disabled={loading || disabled} loading={loading} {..._suffix} {...rest} />;
};

Select.Option = AntSelect.Option;
