import styled from 'styled-components';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

export const StyledSelect = styled(AntSelect)`
  &.ant-select .ant-select-arrow {
    color: ${(p) => p.theme.border.main};
  }

  &.select-open .ant-select-arrow {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }

  &.select-closed .ant-select-arrow {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }
`;
export const Icon = styled.i`
  font-size: large;
`;
