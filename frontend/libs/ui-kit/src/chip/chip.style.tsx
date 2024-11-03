import styled from 'styled-components';
import { Tag as AntChip } from 'antd';

export const StyledChip = styled<any>(AntChip)`
  &.ant-tag {
    border: ${(p) => (p.type === 'unActive' ? `1px solid ${p.theme.border._500}` : 'inherit')};
    background-color: ${(p) => (p.type === 'unActive' ? p.theme.background.main : p.theme.primary._50)};
    color: ${(p) => (p.iconProp ? p.theme.primary.main : 'inherit')};
    cursor: ${(p) => (p.onClick && !p.iconProp ? 'pointer' : 'inherit')};
    padding: 0.6rem 1.6rem 0.6rem 1.6rem;
    height: 3.4rem;
    margin: 0;
    margin-right: 1.6rem;
    border-radius: 9999px;
    font-size: 1.4rem;
    line-height: 2.2rem;
  }

  .anticon {
    color: ${(p) => p.theme.text.primary};
    margin-left: 0.8rem;
  }

  .checked {
    margin-right: 1rem;
  }
`;
