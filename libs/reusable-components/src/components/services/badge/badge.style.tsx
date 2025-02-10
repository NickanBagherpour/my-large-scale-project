import { Badge as AntBadge } from 'antd';
import styled from 'styled-components';

export const Badge = styled(AntBadge)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline: 0.5rem;

  sup {
    font-size: 1.2rem;
    line-height: 2rem;
    position: static;
    background: ${(p) => p.theme.primary._400};
  }
`;
