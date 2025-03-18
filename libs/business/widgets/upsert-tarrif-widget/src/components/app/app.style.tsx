import styled from 'styled-components';
import { Footer as AppFooter, BorderedSection } from '@oxygen/reusable-components';

export const Footer = styled(AppFooter)`
  margin-top: 4rem;
`;

export const Section = styled(BorderedSection)`
  background: ${(p) => p.theme.cardColor};
`;

export const Title = styled.h2`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 600;
  margin: 3.4rem 0 2.4rem;
`;
