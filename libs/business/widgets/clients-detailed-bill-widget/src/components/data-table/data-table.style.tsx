import styled from 'styled-components';
import { Table as UikitTable } from '@oxygen/ui-kit';

export const Table = styled(UikitTable)`
  tr > *:nth-last-child(2) {
    background: ${(p) => p.theme.background._100};
  }
`;

export const Dropdown = styled.ul`
  max-height: 25rem;
  padding: 0;
  list-style-type: none;

  div:has(&) {
    background: white;
  }

  & button {
    width: 100%;
    padding: 0.8rem 1.6rem;
  }
`;

export const ChevIcon = styled.i<{ $filtered: boolean }>`
  transform: ${(p) => (p.$filtered ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

export const Success = styled.span`
  color: ${(p) => p.theme.secondary.main};
  font-weight: 700;
`;

export const Failure = styled.span`
  color: ${(p) => p.theme.error.main};
  font-weight: 700;
`;

export const Total = styled.span`
  color: ${(p) => p.theme.error.main};
  font-weight: 700;
`;
