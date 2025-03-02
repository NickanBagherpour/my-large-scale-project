import { BorderedSection } from '@oxygen/reusable-components';
import styled from 'styled-components';

export const Section = styled(BorderedSection)`
  display: flex;
  gap: 2.4rem;
`;

export const Type = styled.h3`
  color: ${(p) => p.theme.text.primary};
`;
