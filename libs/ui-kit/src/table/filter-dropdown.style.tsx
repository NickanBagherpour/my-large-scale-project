import styled from 'styled-components';
import { Button } from '../button/button';

export const Dropdown = styled.ul`
  max-height: 25rem;
  padding: 0.8rem;
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  div:has(&) {
    background: white;
  }

  & button {
    width: 100%;
    padding: 0.8rem 1.6rem;
    color: ${(p) => p.theme.text.primary} !important;
  }
`;

export const FilterBtn = styled(Button)<{ $active: boolean }>`
  background: ${(p) => (p.$active ? p.theme.primary._50 : 'inherit')};
`;

export const ChevIcon = styled.i`
  transform: rotate(0deg);
  color: ${(p) => p.theme.text.primary};
  transition: transform 200ms;

  .ant-dropdown-open:has(&) i {
    transform: rotate(180deg);
  }
`;
