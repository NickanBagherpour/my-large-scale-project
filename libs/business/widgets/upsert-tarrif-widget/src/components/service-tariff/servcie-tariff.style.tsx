import { BorderedSection } from '@oxygen/reusable-components';
import styled from 'styled-components';

export const Section = styled(BorderedSection)`
  background: ${(p) => p.theme.cardColor};
`;

export const TariffType = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;
`;

export const Type = styled.h3`
  color: ${(p) => p.theme.text.primary};
`;
