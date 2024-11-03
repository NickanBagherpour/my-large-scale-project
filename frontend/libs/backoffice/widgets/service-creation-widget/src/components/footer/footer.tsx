import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1rem;
  padding: 1.5rem 0;
  ${respondTo.down('sm')} {
    flex-direction: column;

    button {
      width: 100%;

      &:first-of-type {
        order: 1;
      }
    }
  }
`;
