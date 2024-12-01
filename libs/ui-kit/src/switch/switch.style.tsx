import styled from 'styled-components';
import { Switch as AntSwitch } from 'antd';

export const StyledSwitch = styled<any>(AntSwitch)`
  &.ant-switch {
    direction: rtl !important;
    cursor: ${(p) => p.notAllowed && 'not-allowed'};
    background-color: ${(p) => p.theme.border._100};
    border: 1px solid ${(p) => p.theme.border.main};
    .ant-switch-handle::before {
      background-color: ${(p) => p.theme.border.main};
      height: 15px;
      width: 15px;
    }
  }
  &.ant-switch-checked {
    background-color: ${(p) => p.theme.secondary.main};
    border: 1px solid ${(p) => p.theme.secondary.main};

    .ant-switch-handle::before {
      background-color: ${(p) => p.theme.surface};
    }

    .ant-switch-handle {
      inset-inline-start: calc(100% - 18px);
    }
  }
`;
