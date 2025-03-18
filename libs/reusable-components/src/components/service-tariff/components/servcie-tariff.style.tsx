import styled from 'styled-components';

export const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
`;

export const Icon = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.primary.main};
`;
