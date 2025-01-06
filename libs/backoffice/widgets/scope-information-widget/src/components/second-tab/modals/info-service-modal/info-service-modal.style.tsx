import styled from 'styled-components';

export const StyledSpan = styled.span<{ isOperational: boolean }>`
  color: ${(p) => (p.isOperational ? p.theme.primary.main : p.theme.warning.main)};
  font-weight: 500;
`;
