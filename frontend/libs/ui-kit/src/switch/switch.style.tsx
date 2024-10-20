import styled from 'styled-components';
import { Switch as AntSwitch } from 'antd';

export const StyledSwitch = styled<any>(AntSwitch)`
  &.ant-switch-checked {
    background-color: ${(p) => p.theme.secondary.main};
  }
`;
