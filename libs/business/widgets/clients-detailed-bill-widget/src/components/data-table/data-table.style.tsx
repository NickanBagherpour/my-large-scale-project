import styled from 'styled-components';
import { Table as UikitTable } from '@oxygen/ui-kit';

export const Table = styled(UikitTable)`
  tr > *:nth-last-child(2) {
    background: ${(p) => p.theme.background._100};
  }
`;

export const Dropdown = styled.ul`
  max-height: 25rem;
  padding: 0.8rem;
  list-style-type: none;
  margin: 0;

  div:has(&) {
    background: white;
  }

  & button {
    width: 100%;
    padding: 0.8rem 1.6rem;
    color: ${(p) => p.theme.text.primary} !important;
  }
`;

export const ChevIcon = styled.i`
  transform: rotate(0deg);
  color: ${(p) => p.theme.text.primary};
  transition: transform 200ms;

  .ant-dropdown-open:has(&) i {
    transform: rotate(180deg);
  }
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

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const Icon = styled.i`
  color: ${(p) => p.theme.warning.main};
  font-size: 2rem;
`;
