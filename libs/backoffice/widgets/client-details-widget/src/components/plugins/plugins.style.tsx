import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  border: ${(p) => `1px solid ${p.theme.border._300}`};
  background: ${(p) => p.theme.background._100};
  border-radius: 0.8rem;
  padding: 2.4rem 1.8rem;
  margin-bottom: 2.4rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(p) => p.theme.text.primary};
  margin-bottom: 1.2rem;
`;
