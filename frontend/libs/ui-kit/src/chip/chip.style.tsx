import styled from 'styled-components';
import { Tag as AntChip } from 'antd';

export const StyledChip = styled<any>(AntChip)`
  &.ant-tag {
    background-color: #fff;
    border: ${(p) => (p.active === 'true' ? 'none' : `1px solid ${p.theme.border._500}`)};
    background-color: ${(p) => (p.active === 'true' ? p.theme.border._300 : '#fff')};
    padding: 0.6rem 1.6rem 0.6rem 1.6rem;
    height: 3.4rem;
    margin: 0;
    margin-right: 1.6rem;
    border-radius: 9999px;
  }

  .anticon {
    color: ${(p) => p.theme.text.primary};
  }
`;
