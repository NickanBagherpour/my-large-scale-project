import { BorderedSection } from '@oxygen/reusable-components';
import styled from 'styled-components';

export const Section = styled(BorderedSection)`
  background: ${(p) => p.theme.cardColor};
`;

export const Title = styled.h2`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 600;
  margin: 3.4rem 0 2.4rem;
`;

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
