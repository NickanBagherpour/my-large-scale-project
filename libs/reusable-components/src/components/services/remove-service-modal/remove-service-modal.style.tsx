import { MarkText as KitMarkText } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const MarkText = styled(KitMarkText)`
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
`;
