import styled from 'styled-components';

export const Header = styled.header`
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-bottom: ${(p) => `1px solid ${p.theme.border._100}`};
  margin-bottom: 2.8rem;
`;

export const Name = styled.h1`
  color: ${(p) => p.theme.primary.main};
  font-size: 1.8rem;
  font-weight: 600;
`;

export const Count = styled.span`
  font-size: 1.4rem;
  color: ${(p) => p.theme.text.quaternary};
`;
