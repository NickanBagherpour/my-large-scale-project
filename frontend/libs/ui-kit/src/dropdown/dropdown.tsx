import React from 'react';
import styled from 'styled-components';
import { Dropdown as AntDropdown, DropdownProps as AntDropdownProps } from 'antd';
import { DropdownSelect } from './dropdown-select/dropdown-select';

export type DropdownProps = AntDropdownProps & {
  // children?: React.ReactNode;
};

const StyledDropdown = styled(AntDropdown)`

`;

export const Dropdown = (props: DropdownProps) => {
  const {  ...rest } = props;

  return <StyledDropdown {...rest} />;
};

Dropdown.Select = DropdownSelect;
