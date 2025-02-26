import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 1.5rem;
`;
export const Title = styled.div`
  color: ${(p) => p.theme.primary.main};
  font-weight: 500;
  font-size: 1.8rem;
`;
export const Controls = styled.div`
  gap: 2rem;
  display: flex;
`;
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
export const Date = styled.div``;
export const Text = styled.div`
  display: flex;
  gap: 1rem;
  color: ${(p) => p.theme.primary.main};
`;
