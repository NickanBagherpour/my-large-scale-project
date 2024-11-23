import styled from 'styled-components';

export const Container = styled.div`
  border: ${(p) => `1px solid ${p.theme.primary.main}`};
  border-radius: 2.4rem;
  padding: 2.4rem 2.4rem 6.9rem;
  background: ${(p) => p.theme.background.main};
`;

export const IconContainer = styled.div`
  border-radius: 1.6rem;
  background-color: ${(p) => p.theme.primary._500};
  padding: 1.2rem;
  width: fit-content;
  margin-bottom: 1.6rem;
`;

export const Icon = styled.i`
  font-size: 4rem;
  color: ${(p) => p.theme.onPrimary};
`;

export const Title = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1.6rem;
`;

export const Desc = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.56;
  color: ${(p) => p.theme.text.tertiary};
  margin: 0;
`;
