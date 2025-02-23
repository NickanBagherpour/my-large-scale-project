import { Badge as AntBadge } from 'antd';
import styled, { css } from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const Badge = styled(AntBadge)`
  display: inline-flex;
  justify-content: center;
  margin-right: 0.5rem;
  margin-left: 0.5rem;

  sup {
    font-size: 1.2rem;
    line-height: 2rem;

    ${respondTo.down('md')} {
      line-height: 2.5rem;
    }

    position: static;
    background: ${(p) => p.theme.primary._400};
  }
`;

export const StyledList = styled.ul<{ $isPersian: boolean }>`
  ${(p) =>
    p.$isPersian
      ? css`
          direction: ltr;
        `
      : css`
          direction: rtl;
        `};
  padding-inline-start: 2rem;
`;
